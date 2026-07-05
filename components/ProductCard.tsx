'use client'
import { useState } from 'react'
import type { Product } from '@/lib/supabase'
import { useCart } from '@/lib/cart'
import { useToast } from './Toast'
import ProductModal from './ProductModal'

export default function ProductCard({ product }: { product: Product }) {
  const { add } = useCart()
  const { show } = useToast()
  const [modalOpen, setModalOpen] = useState(false)

  const save = product.original_price ? Math.round((1 - product.price / product.original_price) * 100) : 0

  const quickAdd = (e: React.MouseEvent) => {
    e.stopPropagation()
    const mid = product.sizes[Math.floor(product.sizes.length / 2)]
    add(product, mid)
    show(`${product.name} (UK ${mid}) added!`, '✅')
  }

  return (
    <>
      <div className="group" onClick={() => setModalOpen(true)} style={{ background: 'var(--card)', cursor: 'pointer', position: 'relative', overflow: 'hidden', border: '1px solid var(--border)', transition: 'border-color 0.2s' }}
        onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--gold)')}
        onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}>

        {product.badge && (
          <div style={{ position: 'absolute', top: 12, left: 12, fontSize: 9, fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase', padding: '4px 10px', zIndex: 2, background: product.badge === 'new' ? 'var(--text)' : '#C0392B', color: product.badge === 'new' ? 'var(--bg)' : '#fff' }}>
            {product.badge === 'new' ? 'NEW' : 'SALE'}
          </div>
        )}

        <div style={{ aspectRatio: '1/1', background: 'var(--card2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 88, position: 'relative', overflow: 'hidden' }}>
          {product.image_url ? (
            <img src={product.image_url} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'relative', zIndex: 1 }} />
          ) : (
            <span style={{ position: 'relative', zIndex: 1 }}>{product.emoji}</span>
          )}
          <button className="quick-add" onClick={quickAdd} style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'var(--gold)', color: '#000', border: 'none', padding: 12, fontSize: 11, fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase', zIndex: 2, cursor: 'pointer' }}>
            + Quick Add
          </button>
        </div>

        <div style={{ padding: '16px 16px 20px' }}>
          <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 4 }}>{product.brand}</div>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 10 }}>{product.name}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)' }}>Rs. {product.price.toLocaleString()}</span>
            {product.original_price && <span style={{ fontSize: 12, color: 'var(--text3)', textDecoration: 'line-through' }}>Rs. {product.original_price.toLocaleString()}</span>}
            {save > 0 && <span style={{ fontSize: 10, fontWeight: 700, color: '#E74C3C' }}>-{save}%</span>}
          </div>
        </div>
      </div>

      <ProductModal product={product} open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
