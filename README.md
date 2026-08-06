# Anna — Gemini Chatbot (React + Vite)

A small React chat app that talks to the Gemini API. Onboarding screen collects
a name, chat screen does the talking, settings screen shows connection info
and lets you clear the conversation.

## Files

- `src/main.jsx` — React entry point
- `src/App.jsx` — main app: view routing, chat state, the Gemini API call
- `src/onboarding.jsx` — name capture + greeting screen
- `src/settings.jsx` — settings screen
- `src/index.css` — all styling

## Run locally

```bash
npm install
cp .env.example .env      # then paste your key into .env
npm run dev
```

## Deploy to Vercel

1. Push this folder to a GitHub repo.
2. In Vercel: **New Project → Import** the repo (framework preset: Vite is
   auto-detected).
3. Before deploying, go to **Settings → Environment Variables** and add:
   - `VITE_GEMINI_API_KEY` = your Gemini API key
4. Deploy.

To change the key later: update it in **Settings → Environment Variables**,
then trigger a redeploy (env vars are baked in at build time, so a redeploy
is required for changes to take effect).

## About the API key

This is a static front-end app — there's no backend. That means the key,
even read from an environment variable, ends up in the JavaScript bundle
that ships to the browser. It is **not** a true server-side secret. For a
personal/demo project this is usually fine; for a public production app,
either:

- restrict the key in [Google AI Studio](https://aistudio.google.com/) to
  your site's domain (HTTP referrer restrictions), or
- add a tiny serverless function (e.g. a Vercel API route) that holds the
  key server-side and proxies requests to Gemini.

## Model

The model is set in `src/App.jsx`:

```js
const MODEL = "gemini-3.6-flash";
```

Change it there if you want to point at a different Gemini model.
