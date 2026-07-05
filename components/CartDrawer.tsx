'use client'
import { useState } from 'react'
import { X, ShoppingCart } from 'lucide-react'
import { useCart } from '@/lib/cart'
import CheckoutModal from './CheckoutModal'

export default function CartDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, total, remove } = useCart()
  const [checkoutOpen, setCheckoutOpen] = useState(false)

  const overlayStyle: React.CSSProperties = {
    position: 'fixed', inset: 0, zIndex: 400,
    background: 'rgba(0,0,0,0.7)',
    opacity: open ? 1 : 0,
    pointerEvents: open ? 'all' : 'none',
    transition: 'opacity 0.25s',
  }

  const drawerStyle: React.CSSProperties = {
    position: 'fixed', right: 0, top: 0, bottom: 0,
    width: 420, maxWidth: '95vw',
    background: 'var(--bg)',
    borderLeft: '1px solid var(--border)',
    transform: open ? 'translateX(0)' : 'translateX(100%)',
    transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)',
    display: 'flex', flexDirection: 'column',
    zIndex: 401,
  }

  return (
    <>
      <div style={overlayStyle} onClick={onClose} />
      <div style={drawerStyle}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid var(--border)', background: 'var(--bg2)' }}>
          <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text)' }}>Your Cart</span>
          <button onClick={onClose} style={{ background: 'none', border: '1px solid var(--border)', color: 'var(--text)', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <X size={15} />
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '64px 0', color: 'var(--text3)' }}>
              <ShoppingCart size={48} style={{ margin: '0 auto 16px', opacity: 0.3 }} />
              <div style={{ fontSize: 14 }}>Your cart is empty</div>
              <div style={{ fontSize: 12, marginTop: 6, opacity: 0.6 }}>Add some royal kicks</div>
            </div>
          ) : (
            items.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 14, padding: '16px 0', borderBottom: '1px solid var(--border)', alignItems: 'center' }}>
                <div style={{ width: 60, height: 60, background: 'var(--bg3)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, flexShrink: 0 }}>
                  {item.product.emoji}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{item.product.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 3 }}>{item.product.brand} · UK {item.size} · Qty {item.qty}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text)' }}>Rs. {(item.product.price * item.qty).toLocaleString()}</div>
                  <button onClick={() => remove(item.product.id, item.size)} style={{ background: 'none', border: 'none', color: 'var(--text3)', fontSize: 18, cursor: 'pointer', marginTop: 4 }}>×</button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{ padding: '20px 24px', borderTop: '1px solid var(--border)', background: 'var(--bg2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 4 }}>
              <span style={{ fontSize: 11, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text3)' }}>Total</span>
              <span style={{ fontSize: 26, fontWeight: 800, color: 'var(--text)' }}>Rs. {total.toLocaleString()}</span>
            </div>
            <p style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 18 }}>🚚 Free delivery on all orders</p>
            <button onClick={() => { onClose(); setCheckoutOpen(true) }} style={{ width: '100%', background: 'var(--gold)', color: '#000', border: 'none', padding: 16, fontSize: 12, fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', cursor: 'pointer' }}>
              Checkout →
            </button>
          </div>
        )}
      </div>

      <CheckoutModal open={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
    </>
  )
}
