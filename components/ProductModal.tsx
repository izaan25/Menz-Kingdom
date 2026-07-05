'use client'
import { useState } from 'react'
import { X } from 'lucide-react'
import type { Product } from '@/lib/supabase'
import { useCart } from '@/lib/cart'
import { useToast } from './Toast'

export default function ProductModal({ product, open, onClose }: { product: Product; open: boolean; onClose: () => void }) {
  const [selSize, setSelSize] = useState<number | null>(null)
  const { add } = useCart()
  const { show } = useToast()

  const save = product.original_price ? Math.round((1 - product.price / product.original_price) * 100) : 0

  const handleAdd = () => {
    if (!selSize) { show('Please select a size', '⚠️'); return }
    add(product, selSize)
    show(`${product.name} (UK ${selSize}) added!`, '✅')
    onClose()
    setSelSize(null)
  }

  return (
    <div onClick={e => e.target === e.currentTarget && onClose()} style={{ position: 'fixed', inset: 0, zIndex: 500, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20, opacity: open ? 1 : 0, pointerEvents: open ? 'all' : 'none', transition: 'opacity 0.2s' }}>
      <div style={{ background: 'var(--bg)', border: '1px solid var(--border)', width: '100%', maxWidth: 560, maxHeight: '90vh', overflowY: 'auto', transform: open ? 'translateY(0)' : 'translateY(12px)', transition: 'transform 0.2s' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 24px', borderBottom: '1px solid var(--border)', background: 'var(--bg2)' }}>
          <span style={{ fontSize: 15, fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', color: 'var(--text)' }}>{product.name}</span>
          <button onClick={() => { onClose(); setSelSize(null) }} style={{ background: 'none', border: '1px solid var(--border)', color: 'var(--text)', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><X size={15} /></button>
        </div>

        <div style={{ padding: 24 }}>
          <div style={{ width: '100%', height: 200, background: 'var(--bg2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 96, marginBottom: 22, border: '1px solid var(--border)', overflow: 'hidden' }}>
            {product.image_url ? (
              <img src={product.image_url} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              product.emoji
            )}
          </div>
            {product.emoji}
          </div>

          <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 4 }}>{product.brand}</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text)', marginBottom: 4 }}>{product.name}</div>
          <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 16, textTransform: 'capitalize' }}>{product.type}</div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 16 }}>
            <span style={{ fontSize: 28, fontWeight: 800, color: 'var(--text)' }}>Rs. {product.price.toLocaleString()}</span>
            {product.original_price && <span style={{ fontSize: 16, color: 'var(--text3)', textDecoration: 'line-through' }}>Rs. {product.original_price.toLocaleString()}</span>}
            {save > 0 && <span style={{ fontSize: 12, fontWeight: 700, color: '#E74C3C' }}>-{save}%</span>}
          </div>

          <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.8, marginBottom: 22 }}>{product.description}</p>

          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 12 }}>Select Size (UK)</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
            {product.sizes.map(s => (
              <button key={s} onClick={() => setSelSize(s)} style={{ width: 44, height: 44, border: `1px solid ${selSize === s ? 'var(--gold)' : 'var(--border)'}`, background: selSize === s ? 'var(--gold-bg)' : 'var(--bg2)', color: selSize === s ? 'var(--gold)' : 'var(--text2)', fontSize: 13, fontWeight: selSize === s ? 700 : 400, cursor: 'pointer', transition: 'all 0.15s', fontFamily: 'inherit' }}>
                {s}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, padding: '18px 24px', borderTop: '1px solid var(--border)', background: 'var(--bg2)' }}>
          <button onClick={() => { onClose(); setSelSize(null) }} style={{ flex: 1, background: 'transparent', color: 'var(--text)', border: '1px solid var(--border)', padding: '13px 20px', fontSize: 12, fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer' }}>Back</button>
          <button onClick={handleAdd} style={{ flex: 2, background: 'var(--gold)', color: '#000', border: 'none', padding: '13px 20px', fontSize: 12, fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer' }}>Add to Cart →</button>
        </div>
      </div>
    </div>
  )
}
