'use client'
import { useState } from 'react'
import { X } from 'lucide-react'
import { useCart } from '@/lib/cart'

type PayMethod = 'cod' | 'jazzcash' | 'bank'

export default function CheckoutModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, total, clear } = useCart()
  const [form, setForm] = useState({ name: '', phone: '', city: '', area: '', address: '' })
  const [pay, setPay] = useState<PayMethod>('cod')
  const [loading, setLoading] = useState(false)
  const [orderId, setOrderId] = useState<string | null>(null)
  const [error, setError] = useState('')

  const overlayStyle: React.CSSProperties = {
    position: 'fixed', inset: 0, zIndex: 500,
    background: 'rgba(0,0,0,0.85)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: 20,
    opacity: open ? 1 : 0,
    pointerEvents: open ? 'all' : 'none',
    transition: 'opacity 0.2s',
  }

  const inp: React.CSSProperties = {
    width: '100%', background: 'var(--input)', border: '1px solid var(--border)',
    color: 'var(--text)', padding: '12px 14px', fontSize: 14, outline: 'none',
    fontFamily: 'inherit',
  }

  const placeOrder = async () => {
    if (!form.name || !form.phone || !form.address) { setError('Please fill in all required fields'); return }
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: form.name,
          customer_phone: form.phone,
          customer_city: form.city,
          customer_area: form.area,
          customer_address: form.address,
          payment_method: pay,
          items: items.map(i => ({
            product_id: i.product.id,
            product_name: i.product.name,
            brand: i.product.brand,
            emoji: i.product.emoji,
            price: i.product.price,
            size: i.size,
            qty: i.qty,
          })),
          total,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to place order')
      setOrderId(data.id)
      clear()
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const payOptions: { key: PayMethod; icon: string; label: string; desc: string }[] = [
    { key: 'cod', icon: '💵', label: 'Cash on Delivery', desc: 'Pay when your order arrives' },
    { key: 'jazzcash', icon: '📱', label: 'JazzCash / EasyPaisa', desc: 'Send to: 0300-0000000' },
    { key: 'bank', icon: '🏦', label: 'Bank Transfer', desc: 'HBL · Acc: 01234567890003' },
  ]

  return (
    <div style={overlayStyle} onClick={e => e.target === e.currentTarget && !orderId && onClose()}>
      <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', width: '100%', maxWidth: 580, maxHeight: '90vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 24px', borderBottom: '1px solid var(--border)', background: 'var(--bg2)' }}>
          <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase' }}>{orderId ? 'Order Confirmed' : 'Checkout'}</span>
          <button onClick={() => { onClose(); if (orderId) setOrderId(null) }} style={{ background: 'none', border: '1px solid var(--border)', color: 'var(--text)', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><X size={15} /></button>
        </div>

        <div style={{ padding: '24px' }}>
          {orderId ? (
            <div style={{ textAlign: 'center', padding: '32px 0' }}>
              <div style={{ fontSize: 64, marginBottom: 16 }}>👑</div>
              <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 12 }}>Order Placed!</div>
              <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.8, marginBottom: 20 }}>
                Thank you, <strong style={{ color: 'var(--gold)' }}>{form.name}</strong>!<br />
                We&apos;ll call you on <strong style={{ color: 'var(--gold)' }}>{form.phone}</strong> to confirm.
              </p>
              <div style={{ background: 'var(--gold-bg)', border: '1px solid var(--gold)', padding: '12px 24px', margin: '0 auto 24px', maxWidth: 280, fontSize: 12, fontWeight: 700, color: 'var(--gold)', letterSpacing: '2px', textTransform: 'uppercase' }}>
                Order ID: {orderId.slice(0, 8).toUpperCase()}
              </div>
              <p style={{ fontSize: 12, color: 'var(--text3)' }}>Expected delivery: 3–5 working days</p>
              <button onClick={() => { onClose(); setOrderId(null); setForm({ name: '', phone: '', city: '', area: '', address: '' }) }} style={{ marginTop: 24, background: 'var(--gold)', color: '#000', border: 'none', padding: '13px 32px', fontSize: 12, fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase', cursor: 'pointer' }}>
                Continue Shopping →
              </button>
            </div>
          ) : (
            <>
              {/* Delivery */}
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 14, paddingBottom: 8, borderBottom: '1px solid var(--border)' }}>Delivery Details</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 10, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 6 }}>Full Name *</label>
                    <input style={inp} placeholder="Muhammad Ali" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 10, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 6 }}>Phone *</label>
                    <input style={inp} placeholder="03XX XXXXXXX" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 10, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 6 }}>City</label>
                    <input style={inp} placeholder="Karachi" value={form.city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 10, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 6 }}>Area</label>
                    <input style={inp} placeholder="Gulshan-e-Iqbal" value={form.area} onChange={e => setForm(f => ({ ...f, area: e.target.value }))} />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 10, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 6 }}>Full Address *</label>
                  <input style={inp} placeholder="House #, Street #, Block..." value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} />
                </div>
              </div>

              {/* Payment */}
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 14, paddingBottom: 8, borderBottom: '1px solid var(--border)' }}>Payment Method</div>
                {payOptions.map(o => (
                  <div key={o.key} onClick={() => setPay(o.key)} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '13px 16px', background: pay === o.key ? 'var(--gold-bg)' : 'var(--bg2)', border: `1px solid ${pay === o.key ? 'var(--gold)' : 'var(--border)'}`, marginBottom: 8, cursor: 'pointer', transition: 'border-color 0.15s' }}>
                    <span style={{ fontSize: 20 }}>{o.icon}</span>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{o.label}</div>
                      <div style={{ fontSize: 11, color: 'var(--text3)' }}>{o.desc}</div>
                    </div>
                    <div style={{ marginLeft: 'auto', width: 16, height: 16, border: `2px solid ${pay === o.key ? 'var(--gold)' : 'var(--border)'}`, borderRadius: '50%', background: pay === o.key ? 'var(--gold)' : 'transparent', flexShrink: 0 }} />
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 14, paddingBottom: 8, borderBottom: '1px solid var(--border)' }}>Order Summary</div>
                {items.map((it, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, padding: '6px 0', borderBottom: '1px solid var(--border)', color: 'var(--text2)' }}>
                    <span>{it.product.name} × {it.qty} <span style={{ color: 'var(--text3)' }}>(UK {it.size})</span></span>
                    <span style={{ fontWeight: 600, color: 'var(--text)' }}>Rs. {(it.product.price * it.qty).toLocaleString()}</span>
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, paddingTop: 10, borderTop: '1px solid var(--border)' }}>
                  <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)' }}>Total</span>
                  <span style={{ fontSize: 24, fontWeight: 800, color: 'var(--text)' }}>Rs. {total.toLocaleString()}</span>
                </div>
                <div style={{ fontSize: 11, color: '#27AE60', marginTop: 6 }}>🚚 Free delivery included</div>
              </div>

              {error && <div style={{ background: 'rgba(231,76,60,0.1)', border: '1px solid #E74C3C', color: '#E74C3C', padding: '10px 14px', fontSize: 13, marginBottom: 14 }}>{error}</div>}

              <button onClick={placeOrder} disabled={loading} style={{ width: '100%', background: loading ? 'var(--text3)' : 'var(--gold)', color: '#000', border: 'none', padding: 16, fontSize: 13, fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer' }}>
                {loading ? 'Placing Order...' : '👑 Place Order'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
