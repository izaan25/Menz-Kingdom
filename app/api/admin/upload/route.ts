import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null
    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'File must be an image' }, { status: 400 })
    }
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'Image must be under 5MB' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const ext = file.name.split('.').pop() || 'jpg'
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

    const { error } = await supabaseAdmin.storage
      .from('product-images')
      .upload(fileName, buffer, { contentType: file.type, upsert: false })

    if (error) throw error

    const { data } = supabaseAdmin.storage.from('product-images').getPublicUrl(fileName)

    return NextResponse.json({ url: data.publicUrl })
  } catch (e: unknown) {
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 })
  }
}
