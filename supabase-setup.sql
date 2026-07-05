-- ============================================================
-- Men'z Kingdom — Supabase Setup (Fixed)
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- STEP 1: Drop existing tables if any (clean start)
drop table if exists orders cascade;
drop table if exists products cascade;

-- STEP 2: Create products table
create table products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  brand text not null,
  type text not null,
  price integer not null,
  original_price integer,
  emoji text not null default '👟',
  sizes integer[] not null default '{40,41,42,43,44}',
  badge text,
  description text not null default '',
  in_stock boolean not null default true,
  created_at timestamptz default now()
);

-- STEP 3: Create orders table
create table orders (
  id uuid default gen_random_uuid() primary key,
  customer_name text not null,
  customer_phone text not null,
  customer_city text not null default '',
  customer_area text not null default '',
  customer_address text not null,
  payment_method text not null default 'cod',
  items jsonb not null default '[]',
  total integer not null default 0,
  status text not null default 'pending',
  created_at timestamptz default now()
);

-- STEP 4: Disable RLS completely (simplest approach for getting started)
alter table products disable row level security;
alter table orders disable row level security;

-- STEP 5: Seed products
insert into products (name, brand, type, price, original_price, emoji, sizes, badge, description) values
  ('Velocity Pro',    'Nike',       'sneakers', 12500, null,  '👟', '{39,40,41,42,43,44}', 'new',  'Lightweight running shoes with breathable mesh upper and cloud-soft cushioning. Perfect for gym and casual wear.'),
  ('Oxford Classic',  'Clarks',     'formal',    9800, 13500, '👞', '{40,41,42,43,44,45}', 'sale', 'Timeless full-grain leather Oxford. Goodyear welt construction ensures decades of wear. For the man who means business.'),
  ('Desert Boot',     'Clarks',     'boots',     8500, null,  '🥾', '{40,41,42,43,44}',    null,   'Suede upper with crepe sole. The most comfortable boot you will ever own. A wardrobe essential.'),
  ('Air Force Lux',   'Nike',       'sneakers', 15000, 18000, '👟', '{39,40,41,42,43,44}', 'sale', 'Icon reimagined. Clean leather upper, signature Air unit. The shoe that goes with everything.'),
  ('Loafer Royale',   'Salvatore',  'loafers',  11200, null,  '🩴', '{40,41,42,43,44}',    'new',  'Slip-on luxury with metal bit detail. Hand-stitched in full-grain calfskin. Pure class.'),
  ('Chelsea Warrior', 'Timberland', 'boots',    13800, null,  '🥾', '{40,41,42,43,44,45}', null,   'Elastic-sided Chelsea boot in premium nubuck. Waterproof sole. Built for Pakistan''s streets.'),
  ('Derby Alpha',     'ECCO',       'formal',   14500, null,  '👞', '{40,41,42,43,44}',    'new',  'Premium full-brogue Derby in hand-finished leather. Cushioned footbed for all-day comfort.'),
  ('Air Max Sultan',  'Nike',       'sneakers', 17500, 22000, '👟', '{39,40,41,42,43,44}', 'sale', 'The king of cushioning. React foam + Air unit for maximum comfort on any terrain.');

-- STEP 6: Verify — you should see 8 rows
select id, name, brand, price, badge from products order by created_at;
