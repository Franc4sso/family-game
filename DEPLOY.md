# Deploy su Netlify

## Istruzioni

### 1. Push su GitHub
```bash
git push origin main
```

### 2. Deploy automatico su Netlify

Vai su [Netlify](https://app.netlify.com) e:

1. Click su "Add new site" → "Import an existing project"
2. Scegli GitHub e autorizza
3. Seleziona il repository `Franc4sso/family-game`
4. Configurazione rilevata automaticamente da `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Click su "Deploy site"

### 3. Verifica

Il sito sarà live in ~2 minuti su `https://[random-name].netlify.app`

## Note

- Non serve configurazione aggiuntiva
- Il routing SPA è gestito dal redirect in `netlify.toml`
- Node 18 viene usato automaticamente (specificato in `.nvmrc`)
- Nessun database, autenticazione o backend richiesto

## Build locale

```bash
npm run build
```

Output in `dist/`

## Dev locale

```bash
npm run dev
```
