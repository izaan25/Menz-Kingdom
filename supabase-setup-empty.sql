-- ============================================================
-- Men'z Kingdom — Supabase Setup (No fake products)
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- Clean start
drop table if exists orders cascade;
drop table if exists products cascade;

-- Products table
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

-- Orders table
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

-- Disable RLS
alter table products disable row level security;
alter table orders disable row level security;

-- Verify tables created
select table_name from information_schema.tables 
where table_schema = 'public' 
and table_name in ('products', 'orders');
