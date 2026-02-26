# TaxClue - Your Compliance Partner

Production-ready Next.js + MongoDB platform for Indian business advisory and compliance services.

## Features
- High-converting marketing site with lead forms and trust sections
- Dynamic services and blog CMS
- Secure admin dashboard (JWT auth)
- Lead management with status tracking + CSV export
- SEO-ready pages, robots.txt and sitemap support
- Future-ready codebase for AI chatbot, CRM, and payment integration

## Tech Stack
- Next.js 14 (Pages Router)
- Tailwind CSS + Framer Motion
- MongoDB + Mongoose
- JWT + bcrypt authentication

## Folder Structure
- `components/` reusable UI and feature components
- `pages/` frontend routes + API routes + admin pages
- `lib/` db + auth helpers
- `models/` mongoose schemas
- `utils/` validators and shared utility logic
- `scripts/` seed script for dummy data
- `styles/` global styles

## Setup
1. Install dependencies
   ```bash
   npm install
   ```
2. Create env file
   ```bash
   cp .env.example .env.local
   ```
3. Update env values (`MONGODB_URI`, `JWT_SECRET`, admin credentials, mail)
4. Seed database
   ```bash
   npm run seed
   ```
5. Run locally
   ```bash
   npm run dev
   ```

## Testing Checklist
- Admin login (`/admin/login`) with seeded credentials
- Blog create/delete (`/admin/blogs`)
- Lead submission from homepage and service page
- Production build:
  ```bash
  npm run build
  ```

## Vercel Deployment
1. Push repository to GitHub/GitLab.
2. Import project in Vercel.
3. Set environment variables from `.env.example`.
4. Deploy and run `npm run seed` once using Vercel CLI or a secure job.

## MongoDB Atlas Setup
1. Create cluster and database user.
2. Allow Vercel IP access (or trusted CIDR).
3. Copy connection string into `MONGODB_URI`.
4. Keep SSL on, enforce strong passwords.

## Domain Migration: `taxclue.net` → `taxclue.in`
1. Add `taxclue.in` in Vercel domains.
2. Update DNS A/CNAME records.
3. Set primary domain to `taxclue.in`.
4. Update `NEXT_PUBLIC_SITE_URL=https://taxclue.in`.
5. Regenerate sitemap and submit in Google Search Console.
6. Keep 301 redirect from `taxclue.net/*` to `taxclue.in/*`.

