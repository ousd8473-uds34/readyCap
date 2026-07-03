# ReadyCap

ReadyCap is a SaaS foundation for project origination, financial structuring, document validation and investment-package preparation.

This first sprint intentionally avoids real AI generation, payments, white-labeling and document/Excel generation. The priority is a secure multi-tenant base.

## Stack

- Web: React, TypeScript, Vite
- API: Node.js, TypeScript, Express
- Data/Auth/Storage: Supabase
- Validation: Zod

## Local Setup

1. Copy environment variables:

```bash
cp .env.example .env
```

2. Install dependencies:

```bash
npm install
```

3. Run the web app:

```bash
npm run dev:web
```

4. Run the API:

```bash
npm run dev:api
```

5. Apply Supabase migrations and seed from `supabase/migrations` and `supabase/seed`.

## Sprint 1 Scope

- Organization-scoped users
- Clients and projects
- Automatic 12-block checklist per project
- Documents by project/block
- Simulated deliverables
- Audit history
- RLS-first database model

Approved deliverables are immutable. Any correction should create a new version.
