# Wood Craft & Design

A Next.js atelier site for a Portland furniture studio. TypeScript, Tailwind CSS v4, file-based `app/` routing, ESLint, and Drizzle ORM (SQLite / libSQL).

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run db:generate
npm run db:push
```

Inquiries, quote requests, and newsletter signups are stored locally in `data/atelier.db`. On Vercel the same schema is created in `/tmp` unless `TURSO_DATABASE_URL` is provided.
