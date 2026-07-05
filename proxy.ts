import { NextRequest, NextResponse } from 'next/server'
import { verifySessionToken, ADMIN_COOKIE_NAME } from '@/lib/auth'

export const config = {
  matcher: ['/admin/:path*', '/api/products/:path*', '/api/orders/:path*'],
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl
  const method = req.method

  // Login page and the login API route must stay reachable by definition.
  if (pathname === '/admin/login') return NextResponse.next()

  // Public shop browsing: anyone can list products.
  if (pathname.startsWith('/api/products') && method === 'GET') return NextResponse.next()

  // Public checkout: anyone can place an order.
  if (pathname === '/api/orders' && method === 'POST') return NextResponse.next()

  // Everything else under /admin and /api/products, /api/orders requires a valid session:
  // viewing/editing/deleting products, and viewing or updating orders.
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value
  const valid = await verifySessionToken(token)

  if (!valid) {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const loginUrl = new URL('/admin/login', req.url)
    loginUrl.searchParams.set('next', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}
