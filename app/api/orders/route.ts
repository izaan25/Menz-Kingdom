import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { customer_name, customer_phone, customer_city, customer_area, customer_address, payment_method, items, total } = body

    if (!customer_name || !customer_phone || !customer_address || !items?.length) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const { data, error } = await supabaseAdmin
      .from('orders')
      .insert([{ customer_name, customer_phone, customer_city, customer_area, customer_address, payment_method, items, total, status: 'pending' }])
      .select()
      .single()

    if (error) throw error

    return NextResponse.json(data, { status: 201 })
  } catch (e: unknown) {
    console.error('Order error:', e)
    return NextResponse.json({ error: 'Failed to place order' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error
    return NextResponse.json(data)
  } catch (e: unknown) {
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
  }
}
