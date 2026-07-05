import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key'
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey)

export type Product = {
  id: string
  name: string
  brand: string
  type: 'sneakers' | 'formal' | 'boots' | 'loafers'
  price: number
  original_price: number | null
  emoji: string
  image_url: string | null
  sizes: number[]
  badge: 'new' | 'sale' | null
  description: string
  in_stock: boolean
  created_at: string
}

export type Order = {
  id: string
  customer_name: string
  customer_phone: string
  customer_city: string
  customer_area: string
  customer_address: string
  payment_method: 'cod' | 'jazzcash' | 'bank'
  items: OrderItem[]
  total: number
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
  created_at: string
}

export type OrderItem = {
  product_id: string
  product_name: string
  brand: string
  emoji: string
  price: number
  size: number
  qty: number
}
