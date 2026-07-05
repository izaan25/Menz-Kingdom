import { NextRequest, NextResponse } from 'next/server'
import { supabase, supabaseAdmin } from '@/lib/supabase'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const type = searchParams.get('type')
    const filter = searchParams.get('filter')
    const brand = searchParams.get('brand')

    let query = supabase.from('products').select('*').eq('in_stock', true)

    if (type) query = query.eq('type', type)
    if (filter === 'new') query = query.eq('badge', 'new')
    if (filter === 'sale') query = query.eq('badge', 'sale')
    if (brand) query = query.eq('brand', brand)

    const { data, error } = await query.order('created_at', { ascending: false })
    if (error) throw error

    return NextResponse.json(data)
  } catch (e: unknown) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { data, error } = await supabaseAdmin.from('products').insert([body]).select().single()
    if (error) throw error
    return NextResponse.json(data, { status: 201 })
  } catch (e: unknown) {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}
