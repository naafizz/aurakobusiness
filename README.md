# Aurako Business

Minimal admin panel for Aurako — products, billing/receipts, sales history, PDF invoice download.

## Deploy (Vercel)
1. Push this folder to a GitHub repo (keep the `api/` folder as-is — `api/data.js` and `api/login.js` must live there).
2. Import the repo in Vercel.
3. In Vercel project settings → Storage, create/connect a **KV** database (this links the KV env vars automatically).
4. In Vercel project settings → **Environment Variables**, add these three (these are private to your Vercel account and are never shipped in the site's code):
   - `ADMIN_USER` → your login username
   - `ADMIN_PASS` → your login password
   - `AUTH_SECRET` → a long random string used to sign login sessions (e.g. generate one with `openssl rand -hex 32`, or any random 40+ character string)
5. Deploy (or redeploy if you added the env vars after the first deploy — env var changes need a redeploy to take effect). Your site will work at your Vercel URL — point your domain **aurako.shop** to it from Vercel → Domains.

## Login
The site now shows a login screen before anything else. Enter the username/password you set in `ADMIN_USER` / `ADMIN_PASS`. A signed session is stored in the browser for 30 days, so you won't need to log in every visit — use the **লগআউট** button in the sidebar to end the session early. The password itself is never included in the site's HTML/JS, so it can't be read via "View Source" — it's checked on the server against your Vercel environment variables.

## What it does
- **Products**: add/edit/delete items (name, price, optional stock, optional category).
- **New Bill**: tap products to add to cart, set quantity, add a discount (flat ৳ or %), confirm the sale.
  - On confirm: the sale is saved automatically (shows up in Dashboard + Sales History), and a formatted PDF invoice downloads automatically.
- **Sales History**: every past sale, re-download any receipt as PDF anytime.
- **Settings**: business name, website, email, phone, Facebook, invoice number prefix — all shown on receipts.

All data is stored centrally via `/api/data.js` (Vercel KV), so it's the same across any device you open the site on.
