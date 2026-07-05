import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminPassword, createSessionToken, ADMIN_COOKIE_NAME } from '@/lib/auth'

export const runtime = 'edge'

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json()
    if (typeof password !== 'string' || !password) {
      return NextResponse.json({ error: 'Password required' }, { status: 400 })
    }

    const ok = await verifyAdminPassword(password)
    if (!ok) {
      return NextResponse.json({ error: 'Incorrect password' }, { status: 401 })
    }

    const token = await createSessionToken()
    const res = NextResponse.json({ ok: true })
    res.cookies.set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })
    return res
  } catch {
    return NextResponse.json({ error: 'Login failed' }, { status: 500 })
  }
}
