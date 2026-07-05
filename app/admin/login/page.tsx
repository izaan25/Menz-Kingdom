'use client'
import { Suspense, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

function LoginForm() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const params = useSearchParams()

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    setLoading(false)
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      setError(data.error || 'Login failed')
      return
    }
    router.push(params.get('next') || '/admin')
    router.refresh()
  }

  return (
    <div style={{ minHeight: '100vh', background: '#000', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter,-apple-system,sans-serif', padding: 20 }}>
      <form onSubmit={submit} style={{ width: '100%', maxWidth: 360, background: '#0a0a0a', border: '1px solid #1f1f1f', padding: 36 }}>
        <div style={{ fontSize: 28, textAlign: 'center', marginBottom: 8 }}>👑</div>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: '#D4A017', textAlign: 'center', marginBottom: 4 }}>Men&apos;z Kingdom</div>
        <div style={{ fontSize: 18, fontWeight: 900, textTransform: 'uppercase', textAlign: 'center', marginBottom: 28 }}>Admin Login</div>

        <label style={{ display: 'block', fontSize: 10, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#666', marginBottom: 7 }}>Password</label>
        <input
          type="password"
          autoFocus
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ width: '100%', background: '#111', border: '1px solid #2a2a2a', color: '#fff', padding: '11px 14px', fontSize: 14, outline: 'none', fontFamily: 'inherit', marginBottom: 18, boxSizing: 'border-box' }}
        />

        {error && (
          <div style={{ background: '#2a0a0a', border: '1px solid #E74C3C', color: '#E74C3C', padding: '10px 14px', marginBottom: 18, fontSize: 13 }}>
            ⚠️ {error}
          </div>
        )}

        <button type="submit" disabled={loading || !password} style={{ width: '100%', background: loading ? '#555' : '#D4A017', color: '#000', border: 'none', padding: '14px', fontSize: 13, fontWeight: 900, letterSpacing: '1.5px', textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer' }}>
          {loading ? 'Checking...' : 'Log In'}
        </button>
      </form>
    </div>
  )
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  )
}
