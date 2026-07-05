'use client'
import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import type { Product } from '@/lib/supabase'
import ProductCard from '@/components/ProductCard'
import Footer from '@/components/Footer'

const FILTERS = [
  { key: '', label: 'All' },
  { key: 'new', label: 'New Arrivals', param: 'filter' },
  { key: 'sale', label: 'On Sale', param: 'filter' },
  { key: 'sneakers', label: 'Sneakers', param: 'type' },
  { key: 'formal', label: 'Formal', param: 'type' },
  { key: 'boots', label: 'Boots', param: 'type' },
  { key: 'loafers', label: 'Loafers', param: 'type' },
]

function ShopContent() {
  const params = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState('')

  const typeParam = params.get('type')
  const filterParam = params.get('filter')
  const brandParam = params.get('brand')

  useEffect(() => {
    setLoading(true)
    const url = new URL('/api/products', window.location.origin)
    if (typeParam) url.searchParams.set('type', typeParam)
    if (filterParam) url.searchParams.set('filter', filterParam)
    if (brandParam) url.searchParams.set('brand', brandParam)

    fetch(url.toString())
      .then(r => r.json())
      .then(data => { setProducts(Array.isArray(data) ? data : []); setLoading(false) })
      .catch(() => setLoading(false))

    setActiveFilter(filterParam || typeParam || '')
  }, [typeParam, filterParam, brandParam])

  const applyFilter = (f: typeof FILTERS[0]) => {
    const url = new URL(window.location.href)
    url.searchParams.delete('type')
    url.searchParams.delete('filter')
    url.searchParams.delete('brand')
    if (f.key && f.param) url.searchParams.set(f.param, f.key)
    window.history.pushState({}, '', url.toString())

    setActiveFilter(f.key)
    setLoading(true)
    const apiUrl = new URL('/api/products', window.location.origin)
    if (f.param && f.key) apiUrl.searchParams.set(f.param, f.key)
    fetch(apiUrl.toString())
      .then(r => r.json())
      .then(data => { setProducts(Array.isArray(data) ? data : []); setLoading(false) })
  }

  const title = typeParam ? typeParam.charAt(0).toUpperCase() + typeParam.slice(1)
    : filterParam === 'new' ? 'New Arrivals'
    : filterParam === 'sale' ? 'On Sale'
    : brandParam ? brandParam
    : 'All Shoes'

  return (
    <>
      {/* Header */}
      <div className="shop-header-pad" style={{ background: 'var(--bg2)', borderBottom: '1px solid var(--border)', padding: '48px 32px 0' }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>Men&apos;z Kingdom</div>
        <div className="section-heading" style={{ fontSize: 52, fontWeight: 900, color: 'var(--text)', lineHeight: 1, textTransform: 'uppercase', letterSpacing: '-1px', marginBottom: 28, overflowWrap: 'break-word' }}>{title}</div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', borderTop: '1px solid var(--border)', overflowX: 'auto' }}>
          {FILTERS.map(f => (
            <button key={f.key} onClick={() => applyFilter(f)} style={{ padding: '13px 20px', background: 'none', border: 'none', color: activeFilter === f.key ? 'var(--gold)' : 'var(--text3)', fontSize: 11, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase', borderBottom: `2px solid ${activeFilter === f.key ? 'var(--gold)' : 'transparent'}`, marginBottom: -1, cursor: 'pointer', transition: 'color 0.15s', whiteSpace: 'nowrap', fontFamily: 'inherit' }}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div style={{ padding: '32px', background: 'var(--bg)', minHeight: '60vh' }}>
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px,1fr))', gap: 2 }}>
            {Array(8).fill(0).map((_, i) => (
              <div key={i} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', aspectRatio: '3/4', animation: 'pulse 1.5s infinite' }} />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text3)' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>👟</div>
            <div style={{ fontSize: 14 }}>No products found</div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px,1fr))', gap: 2 }}>
            {products.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>

      <Footer />
      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
        @media(max-width:640px){
          .shop-header-pad{padding:32px 20px 0!important}
          .section-heading{font-size:32px!important}
        }
      `}</style>
    </>
  )
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div style={{ padding: 80, textAlign: 'center', color: 'var(--text3)' }}>Loading...</div>}>
      <ShopContent />
    </Suspense>
  )
}
