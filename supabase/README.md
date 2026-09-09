# Supabase setup for Vedanta Strategies

The site is a Vite React app. CMS content, leads, and photos now live in **Supabase** instead of browser storage.

## 1. Create a project

1. Open [https://supabase.com](https://supabase.com) and create a project.
2. Go to **Project Settings → API**.
3. Copy the **Project URL** and the **anon public** key.

## 2. Local env

Copy `.env.example` to `.env.local` in the repo root:

```
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_public_key
```

Never put the **service_role** key in this frontend.

Restart `npm run dev` after changing env vars.

## 3. Run the schema

In the Supabase dashboard, open **SQL Editor**, paste the contents of [`schema.sql`](./schema.sql), and run it.

That creates:

- `site_store` — CMS JSON (courses, pages, gallery URLs, settings)
- `leads` — enquiry form rows
- `profiles` — admin roles linked to Auth users
- `media` storage bucket — uploaded images

## 4. Create the first admin

1. **Authentication → Users → Add user** (email + password).
2. Confirm the email if your project requires it, or disable “Confirm email” under Authentication → Providers → Email while you set up.
3. The first Auth user gets `super_admin` in `profiles`.
4. Open the site at `#admin` and sign in with that email and password.

## 5. What to verify

- Public homepage loads (seeded from `initialData` on first visit).
- Sign in at `#admin`, change a course, refresh in another browser: the change is there.
- Upload a gallery photo: the URL should contain `supabase.co/storage`, not `data:image`.
- Submit an enquiry on the public site; it appears under Admin → Leads.

## Hosting

On Netlify, Vercel, or GitHub Pages, add the same two `VITE_` variables in the host’s environment settings, then rebuild.
