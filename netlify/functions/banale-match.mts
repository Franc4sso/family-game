import Anthropic from "@anthropic-ai/sdk";

/* Banale o Geniale: capisce se una risposta detta a voce vuol dire una delle voci in lista.
   Il telefono chiama questa funzione solo quando il controllo locale non trova niente;
   la chiave resta qui, nelle variabili d'ambiente di Netlify, e non arriva mai all'app.

   Variabili:
   - GROQ_API_KEY            → usa Groq (gratis). Modello: GROQ_MODEL, predefinito llama-3.3-70b-versatile.
   - ANTHROPIC_API_KEY       → usa Claude. Modello: ANTHROPIC_MODEL, predefinito claude-haiku-5-5.
   - BANALE_LLM=groq|anthropic sceglie quale, se ci sono entrambe le chiavi (predefinito: groq). */

const MAX_ANSWERS = 60;
const MAX_LEN = 160;

const SYSTEM = `Sei il giudice di un gioco a quiz italiano. C'è una domanda e una lista numerata di risposte valide.
Una squadra ha detto una frase. Decidi se la frase vuol dire LA STESSA COSA di una voce della lista:
sinonimi, parafrasi, modi di dire, forme diverse dello stesso verbo, dialetto o refusi contano.
Non basta che parli dello stesso argomento: deve essere lo stesso concetto ("sono nudo" = "giro in mutande" sì;
"mi lavo" = "faccio la doccia" sì; "cucino" = "mangio" no). Se nessuna voce coincide, la risposta è 0.
Rispondi solo in JSON: {"match": numero della voce, oppure 0}.`;

type Body = { question?: unknown; answers?: unknown; said?: unknown };

declare const process: { env: Record<string, string | undefined> };

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json", "cache-control": "no-store" } });

const clean = (v: unknown) => (typeof v === "string" ? v.replace(/\s+/g, " ").trim().slice(0, MAX_LEN) : "");

function userPrompt(question: string, answers: string[], said: string) {
  return `Domanda: ${question}\nRisposte valide:\n${answers.map((a, i) => `${i + 1}. ${a}`).join("\n")}\n\nLa squadra ha detto: "${said}"`;
}

async function askGroq(key: string, prompt: string): Promise<number> {
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: { authorization: `Bearer ${key}`, "content-type": "application/json" },
    body: JSON.stringify({
      model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
      temperature: 0,
      max_tokens: 30,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: SYSTEM },
        { role: "user", content: prompt },
      ],
    }),
    signal: AbortSignal.timeout(6000),
  });
  if (!res.ok) throw new Error(`groq ${res.status}`);
  const data = (await res.json()) as { choices?: { message?: { content?: string } }[] };
  return Number(JSON.parse(data.choices?.[0]?.message?.content ?? "{}").match);
}

async function askClaude(key: string, prompt: string): Promise<number> {
  const client = new Anthropic({ apiKey: key, timeout: 6000, maxRetries: 1 });
  const response = await client.messages.create({
    model: process.env.ANTHROPIC_MODEL || "claude-haiku-5-5",
    max_tokens: 1024,
    system: SYSTEM,
    output_config: {
      effort: "low",
      format: {
        type: "json_schema",
        schema: {
          type: "object",
          properties: { match: { type: "integer", description: "Numero della voce, 0 se nessuna" } },
          required: ["match"],
          additionalProperties: false,
        },
      },
    },
    messages: [{ role: "user", content: prompt }],
  });
  if (response.stop_reason === "refusal") return 0;
  const text = response.content.find((b): b is Anthropic.TextBlock => b.type === "text")?.text ?? "{}";
  return Number(JSON.parse(text).match);
}

export default async (req: Request) => {
  if (req.method !== "POST") return json({ error: "method" }, 405);

  /* Solo dall'app stessa: blocca le pagine di altri siti che volessero consumare i limiti. */
  const origin = req.headers.get("origin");
  if (origin && new URL(origin).host !== new URL(req.url).host) return json({ error: "origin" }, 403);

  const groqKey = process.env.GROQ_API_KEY;
  const claudeKey = process.env.ANTHROPIC_API_KEY;
  const provider = process.env.BANALE_LLM === "anthropic" && claudeKey ? "anthropic" : groqKey ? "groq" : claudeKey ? "anthropic" : null;
  if (!provider) return json({ error: "not-configured" }, 503);

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return json({ error: "body" }, 400);
  }
  const question = clean(body.question);
  const said = clean(body.said);
  const answers = Array.isArray(body.answers) ? body.answers.slice(0, MAX_ANSWERS).map(clean).filter(Boolean) : [];
  if (!question || !said || !answers.length) return json({ error: "body" }, 400);

  try {
    const prompt = userPrompt(question, answers, said);
    const n = provider === "groq" ? await askGroq(groqKey!, prompt) : await askClaude(claudeKey!, prompt);
    const match = Number.isInteger(n) && n >= 1 && n <= answers.length ? answers[n - 1] : null;
    return json({ match, provider });
  } catch (err) {
    /* Limiti finiti, rete lenta, risposta strana: l'app torna al controllo locale. */
    console.error("banale-match", err);
    return json({ match: null, error: "llm" }, 502);
  }
};
