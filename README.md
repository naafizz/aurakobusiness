# Aurako Business

Minimal admin panel for Aurako — products, billing/receipts, sales history, PDF invoice download.

## Deploy (Vercel)
1. Push this folder to a GitHub repo.
2. Import the repo in Vercel.
3. In Vercel project settings → Storage, create/connect a **KV** database (this links the KV env vars automatically).
4. Deploy. Your site will work at your Vercel URL — point your domain **aurako.shop** to it from Vercel → Domains.

## What it does
- **Products**: add/edit/delete items (name, price, optional stock, optional category).
- **New Bill**: tap products to add to cart, set quantity, add a discount (flat ৳ or %), confirm the sale.
  - On confirm: the sale is saved automatically (shows up in Dashboard + Sales History), and a formatted PDF invoice downloads automatically.
- **Sales History**: every past sale, re-download any receipt as PDF anytime.
- **Settings**: business name, website, email, phone, Facebook, invoice number prefix — all shown on receipts.

All data is stored centrally via `/api/data.js` (Vercel KV), so it's the same across any device you open the site on.
