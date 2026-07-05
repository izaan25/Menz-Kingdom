// Lightweight auth helpers built on Web Crypto so they work in the Edge
// middleware runtime as well as normal API routes. No extra dependencies.

const encoder = new TextEncoder()

async function sha256Hex(input: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', encoder.encode(input))
  return Array.from(new Uint8Array(digest)).map(b => b.toString(16).padStart(2, '0')).join('')
}

async function hmacSha256Hex(key: string, message: string): Promise<string> {
  const cryptoKey = await crypto.subtle.importKey(
    'raw', encoder.encode(key), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  )
  const sig = await crypto.subtle.sign('HMAC', cryptoKey, encoder.encode(message))
  return Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, '0')).join('')
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let result = 0
  for (let i = 0; i < a.length; i++) result |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return result === 0
}

export const ADMIN_COOKIE_NAME = 'mk_admin_session'
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000 // 7 days

// Verifies a submitted password against ADMIN_PASSWORD_SALT + ADMIN_PASSWORD_HASH
// (both set as environment variables — the real password is never stored anywhere).
export async function verifyAdminPassword(password: string): Promise<boolean> {
  const salt = process.env.ADMIN_PASSWORD_SALT
  const expectedHash = process.env.ADMIN_PASSWORD_HASH
  if (!salt || !expectedHash) return false
  const hash = await sha256Hex(salt + password)
  return timingSafeEqual(hash, expectedHash)
}

export async function createSessionToken(): Promise<string> {
  const secret = process.env.ADMIN_SESSION_SECRET || ''
  const payloadB64 = btoa(JSON.stringify({ exp: Date.now() + SESSION_DURATION_MS }))
  const sig = await hmacSha256Hex(secret, payloadB64)
  return `${payloadB64}.${sig}`
}

export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false
  const secret = process.env.ADMIN_SESSION_SECRET
  if (!secret) return false
  const [payloadB64, sig] = token.split('.')
  if (!payloadB64 || !sig) return false
  const expectedSig = await hmacSha256Hex(secret, payloadB64)
  if (!timingSafeEqual(sig, expectedSig)) return false
  try {
    const payload = JSON.parse(atob(payloadB64))
    return typeof payload.exp === 'number' && Date.now() < payload.exp
  } catch {
    return false
  }
}
