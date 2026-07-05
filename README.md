# 👑 Men'z Kingdom — Deployment Guide

> Stack: Next.js 15 + Supabase + Vercel — all 100% FREE forever

---

## STEP 1 — Set Up Supabase (Database)

1. Go to https://supabase.com → Sign up free
2. Click "New Project" → Name it menzkingdom → Create
3. Wait ~2 minutes for it to spin up
4. Go to SQL Editor (left sidebar)
5. Paste the entire contents of supabase-setup.sql → Run
6. Go to Settings → API and copy:
   - Project URL → NEXT_PUBLIC_SUPABASE_URL
   - anon public key → NEXT_PUBLIC_SUPABASE_ANON_KEY
   - service_role key → SUPABASE_SERVICE_ROLE_KEY

---

## STEP 2 — Push to GitHub

1. Go to https://github.com → Sign up free → New repo → menzkingdom
2. Run in terminal:

git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOURUSERNAME/menzkingdom.git
git push -u origin main

---

## STEP 3 — Deploy to Vercel (Free)

1. Go to https://vercel.com → Sign up with GitHub
2. Click "Add New Project" → Import menzkingdom repo
3. Add Environment Variables:
   NEXT_PUBLIC_SUPABASE_URL        = (from Step 1)
   NEXT_PUBLIC_SUPABASE_ANON_KEY   = (from Step 1)
   SUPABASE_SERVICE_ROLE_KEY       = (from Step 1)
4. Click Deploy — live in ~60 seconds!
5. Your site: https://menzkingdom.vercel.app

---

## ADMIN PANEL

Visit /admin on your live site to:
- View all orders with customer details
- Update order status (Pending → Confirmed → Shipped → Delivered)
- Add new products from the browser
- Manage your catalog

---

## LOCAL DEVELOPMENT

npm install
# Add Supabase keys to .env.local
npm run dev
# Open http://localhost:3000

---

## COST: Rs. 0 forever (optional domain ~Rs. 2,000/year)
