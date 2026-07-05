'use client'
import { useEffect, useState } from 'react'
import type { Order, Product } from '@/lib/supabase'

type Tab = 'orders' | 'products' | 'add'

const EMOJIS = ['👟','👞','🥾','🩴','👡','🪖']
const TYPES = ['sneakers','formal','boots','loafers']
const BADGES = ['','new','sale']
const STATUS_COLORS: Record<string,string> = {
  pending:'#E67E22', confirmed:'#3498DB', shipped:'#9B59B6', delivered:'#27AE60', cancelled:'#E74C3C'
}

const blank = { name:'', brand:'', type:'sneakers', price:'', original_price:'', emoji:'👟', image_url:'', description:'', badge:'', sizes:'39,40,41,42,43,44', in_stock: true }

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>('orders')
  const [orders, setOrders] = useState<Order[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState(blank)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [editId, setEditId] = useState<string|null>(null)
  const [error, setError] = useState('')
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (tab === 'orders') {
      setLoading(true)
      fetch('/api/orders').then(r=>r.json()).then(d=>{ setOrders(Array.isArray(d)?d:[]); setLoading(false) })
    } else if (tab === 'products') {
      setLoading(true)
      fetch('/api/products').then(r=>r.json()).then(d=>{ setProducts(Array.isArray(d)?d:[]); setLoading(false) })
    } else {
      setLoading(false)
    }
  }, [tab])

  const updateStatus = async (id:string, status:string) => {
    await fetch(`/api/orders/${id}`, { method:'PATCH', headers:{'Content-Type':'application/json'}, body:JSON.stringify({status}) })
    setOrders(o=>o.map(x=>x.id===id?{...x,status:status as Order['status']}:x))
  }

  const saveProduct = async () => {
    setError('')
    if (!form.name.trim()) { setError('Product name is required'); return }
    if (!form.brand.trim()) { setError('Brand is required'); return }
    if (!form.price) { setError('Price is required'); return }
    setSaving(true)
    const payload = {
      name: form.name.trim(),
      brand: form.brand.trim(),
      type: form.type,
      price: parseInt(form.price),
      original_price: form.original_price ? parseInt(form.original_price) : null,
      emoji: form.emoji,
      image_url: form.image_url.trim() || null,
      description: form.description.trim(),
      badge: form.badge || null,
      sizes: form.sizes.split(',').map(s=>parseInt(s.trim())).filter(n=>!isNaN(n)),
      in_stock: form.in_stock,
    }
    const url = editId ? `/api/products/${editId}` : '/api/products'
    const method = editId ? 'PATCH' : 'POST'
    const res = await fetch(url, { method, headers:{'Content-Type':'application/json'}, body:JSON.stringify(payload) })
    const data = await res.json()
    if (!res.ok) { setError(data.error || 'Failed to save'); setSaving(false); return }
    setSaved(true)
    setForm(blank)
    setEditId(null)
    setSaving(false)
    setTimeout(()=>setSaved(false), 2500)
    // refresh products
    fetch('/api/products').then(r=>r.json()).then(d=>setProducts(Array.isArray(d)?d:[]))
  }

  const editProduct = (p: Product) => {
    setForm({
      name: p.name, brand: p.brand, type: p.type,
      price: String(p.price), original_price: p.original_price ? String(p.original_price) : '',
      emoji: p.emoji, image_url: p.image_url||'', description: p.description, badge: p.badge||'',
      sizes: p.sizes.join(','), in_stock: p.in_stock,
    })
    setEditId(p.id)
    setTab('add')
    window.scrollTo({top:0,behavior:'smooth'})
  }

  const deleteProduct = async (id:string) => {
    if (!confirm('Delete this product?')) return
    await fetch(`/api/products/${id}`, { method:'DELETE' })
    setProducts(p=>p.filter(x=>x.id!==id))
  }

  const inp: React.CSSProperties = { width:'100%', background:'#111', border:'1px solid #2a2a2a', color:'#fff', padding:'11px 14px', fontSize:14, outline:'none', fontFamily:'inherit', borderRadius:0, transition:'border-color 0.15s' }
  const lbl: React.CSSProperties = { display:'block', fontSize:10, fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:'#666', marginBottom:7 }

  return (
    <div style={{ minHeight:'100vh', background:'#000', color:'#fff', fontFamily:'Inter,-apple-system,sans-serif' }}>
      {/* Header */}
      <div style={{ borderBottom:'1px solid #111', padding:'24px 32px', display:'flex', alignItems:'center', justifyContent:'space-between', background:'#000', position:'sticky', top:0, zIndex:50 }}>
        <div style={{ display:'flex', alignItems:'center', gap:14 }}>
          <div style={{ fontSize:28 }}>👑</div>
          <div>
            <div style={{ fontSize:10, fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', color:'#D4A017' }}>Men&apos;z Kingdom</div>
            <div style={{ fontSize:20, fontWeight:900, textTransform:'uppercase', letterSpacing:'-0.5px' }}>Admin Dashboard</div>
          </div>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
          <a href="/" style={{ fontSize:11, fontWeight:700, letterSpacing:'1px', textTransform:'uppercase', color:'#555', textDecoration:'none', border:'1px solid #1f1f1f', padding:'8px 16px' }}>← Back to Site</a>
          <button onClick={async ()=>{ await fetch('/api/admin/logout', { method:'POST' }); window.location.href='/admin/login' }} style={{ fontSize:11, fontWeight:700, letterSpacing:'1px', textTransform:'uppercase', color:'#E74C3C', background:'none', textDecoration:'none', border:'1px solid #2a1010', padding:'8px 16px', cursor:'pointer', fontFamily:'inherit' }}>Log Out</button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display:'flex', borderBottom:'1px solid #111', padding:'0 32px', background:'#000', position:'sticky', top:73, zIndex:49 }}>
        {([['orders','📦 Orders'],['products','👟 Products'],['add', editId ? '✏️ Edit Product' : '➕ Add Product']] as [Tab,string][]).map(([t,label])=>(
          <button key={t} onClick={()=>setTab(t)} style={{ padding:'14px 20px', background:'none', border:'none', color: tab===t ? '#D4A017' : '#555', fontSize:12, fontWeight:700, letterSpacing:'1px', textTransform:'uppercase', borderBottom:`2px solid ${tab===t?'#D4A017':'transparent'}`, marginBottom:-1, cursor:'pointer', fontFamily:'inherit' }}>
            {label}
          </button>
        ))}
      </div>

      <div style={{ padding:'32px', maxWidth:1200, margin:'0 auto' }}>

        {/* ── ORDERS TAB ── */}
        {tab === 'orders' && (
          loading ? <div style={{ textAlign:'center', padding:80, color:'#555' }}>Loading orders...</div> :
          orders.length === 0 ? (
            <div style={{ textAlign:'center', padding:80 }}>
              <div style={{ fontSize:48, marginBottom:16 }}>📦</div>
              <div style={{ fontSize:18, fontWeight:700, marginBottom:8 }}>No orders yet</div>
              <div style={{ fontSize:13, color:'#555' }}>Share your site and watch them roll in!</div>
            </div>
          ) : (
            <div>
              {/* Summary cards */}
              <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:2, marginBottom:28 }}>
                {[
                  ['Total Orders', orders.length, '#D4A017'],
                  ['Pending', orders.filter(o=>o.status==='pending').length, '#E67E22'],
                  ['Confirmed/Shipped', orders.filter(o=>['confirmed','shipped'].includes(o.status)).length, '#3498DB'],
                  ['Delivered', orders.filter(o=>o.status==='delivered').length, '#27AE60'],
                ].map(([label,val,color])=>(
                  <div key={label as string} style={{ background:'#0a0a0a', border:'1px solid #1f1f1f', padding:'20px 24px' }}>
                    <div style={{ fontSize:32, fontWeight:900, color:color as string, lineHeight:1, marginBottom:6 }}>{val as number}</div>
                    <div style={{ fontSize:11, fontWeight:700, letterSpacing:'1px', textTransform:'uppercase', color:'#555' }}>{label as string}</div>
                  </div>
                ))}
              </div>

              <div style={{ display:'flex', flexDirection:'column', gap:2 }}>
                {orders.map(o=>(
                  <div key={o.id} style={{ background:'#0a0a0a', border:'1px solid #1f1f1f', padding:'22px 26px' }}>
                    <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:20, flexWrap:'wrap' }}>
                      <div style={{ flex:1, minWidth:280 }}>
                        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:10, flexWrap:'wrap' }}>
                          <span style={{ fontSize:11, fontWeight:700, color:'#D4A017', letterSpacing:'1px' }}>#{o.id.slice(0,8).toUpperCase()}</span>
                          <span style={{ fontSize:10, fontWeight:700, letterSpacing:'1px', textTransform:'uppercase', padding:'3px 10px', background:STATUS_COLORS[o.status]+'22', color:STATUS_COLORS[o.status], border:`1px solid ${STATUS_COLORS[o.status]}44` }}>{o.status}</span>
                          <span style={{ fontSize:11, color:'#444' }}>{new Date(o.created_at).toLocaleString('en-PK',{day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'})}</span>
                        </div>
                        <div style={{ fontSize:16, fontWeight:800, color:'#fff', marginBottom:5 }}>{o.customer_name}</div>
                        <div style={{ fontSize:13, color:'#888', marginBottom:4 }}>📞 {o.customer_phone}</div>
                        <div style={{ fontSize:13, color:'#666', marginBottom:12 }}>📍 {o.customer_address}{o.customer_area?`, ${o.customer_area}`:''}{o.customer_city?`, ${o.customer_city}`:''}</div>
                        <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                          {(o.items as {emoji:string;product_name:string;size:number;qty:number}[]).map((item,i)=>(
                            <span key={i} style={{ fontSize:11, background:'#111', border:'1px solid #222', padding:'5px 12px', color:'#aaa', display:'flex', alignItems:'center', gap:6 }}>
                              {item.emoji} {item.product_name} · UK {item.size} × {item.qty}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div style={{ textAlign:'right', flexShrink:0 }}>
                        <div style={{ fontSize:26, fontWeight:900, color:'#fff', marginBottom:4 }}>Rs. {o.total.toLocaleString()}</div>
                        <div style={{ fontSize:11, color:'#555', marginBottom:14, textTransform:'uppercase', letterSpacing:'1px' }}>{o.payment_method}</div>
                        <label style={{ display:'block', fontSize:9, fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:'#555', marginBottom:6 }}>Update Status</label>
                        <select value={o.status} onChange={e=>updateStatus(o.id,e.target.value)} style={{ background:'#111', border:'1px solid #333', color:'#fff', padding:'8px 14px', fontSize:12, cursor:'pointer', fontFamily:'inherit', fontWeight:700 }}>
                          {['pending','confirmed','shipped','delivered','cancelled'].map(s=>(
                            <option key={s} value={s}>{s.charAt(0).toUpperCase()+s.slice(1)}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        )}

        {/* ── PRODUCTS TAB ── */}
        {tab === 'products' && (
          loading ? <div style={{ textAlign:'center', padding:80, color:'#555' }}>Loading products...</div> :
          products.length === 0 ? (
            <div style={{ textAlign:'center', padding:80 }}>
              <div style={{ fontSize:48, marginBottom:16 }}>👟</div>
              <div style={{ fontSize:18, fontWeight:700, marginBottom:8 }}>No products yet</div>
              <div style={{ fontSize:13, color:'#555', marginBottom:28 }}>Click &quot;Add Product&quot; tab to add your first shoe</div>
              <button onClick={()=>setTab('add')} style={{ background:'#D4A017', color:'#000', border:'none', padding:'13px 28px', fontSize:12, fontWeight:800, letterSpacing:'1.5px', textTransform:'uppercase', cursor:'pointer' }}>+ Add First Product</button>
            </div>
          ) : (
            <div>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20 }}>
                <div style={{ fontSize:13, color:'#555' }}>{products.length} products in catalog</div>
                <button onClick={()=>{ setForm(blank); setEditId(null); setTab('add') }} style={{ background:'#D4A017', color:'#000', border:'none', padding:'10px 20px', fontSize:11, fontWeight:800, letterSpacing:'1.5px', textTransform:'uppercase', cursor:'pointer' }}>+ Add Product</button>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:2 }}>
                {products.map(p=>(
                  <div key={p.id} style={{ background:'#0a0a0a', border:'1px solid #1f1f1f' }}>
                    <div style={{ fontSize:56, textAlign:'center', padding:'20px 0', background:'#0d0d0d', borderBottom:'1px solid #1f1f1f' }}>{p.emoji}</div>
                    <div style={{ padding:16 }}>
                      <div style={{ fontSize:9, fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:'#D4A017', marginBottom:4 }}>{p.brand}</div>
                      <div style={{ fontSize:14, fontWeight:700, color:'#fff', marginBottom:3 }}>{p.name}</div>
                      <div style={{ fontSize:11, color:'#555', textTransform:'capitalize', marginBottom:10 }}>{p.type}</div>
                      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:14 }}>
                        <div>
                          <span style={{ fontSize:15, fontWeight:800 }}>Rs. {p.price.toLocaleString()}</span>
                          {p.original_price && <span style={{ fontSize:11, color:'#555', textDecoration:'line-through', marginLeft:6 }}>Rs. {p.original_price.toLocaleString()}</span>}
                        </div>
                        {p.badge && <span style={{ fontSize:9, fontWeight:800, letterSpacing:'1px', textTransform:'uppercase', padding:'3px 8px', background:p.badge==='new'?'#fff':'#C0392B', color:p.badge==='new'?'#000':'#fff' }}>{p.badge}</span>}
                      </div>
                      <div style={{ display:'flex', gap:8 }}>
                        <button onClick={()=>editProduct(p)} style={{ flex:1, background:'#1a1a1a', color:'#fff', border:'1px solid #2a2a2a', padding:'8px', fontSize:11, fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>Edit</button>
                        <button onClick={()=>deleteProduct(p.id)} style={{ flex:1, background:'#1a0000', color:'#E74C3C', border:'1px solid #3a0000', padding:'8px', fontSize:11, fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        )}

        {/* ── ADD/EDIT PRODUCT TAB ── */}
        {tab === 'add' && (
          <div style={{ maxWidth:700 }}>
            <div style={{ marginBottom:28 }}>
              <div style={{ fontSize:10, fontWeight:700, letterSpacing:'3px', textTransform:'uppercase', color:'#D4A017', marginBottom:6 }}>{editId ? 'Editing Product' : 'New Product'}</div>
              <div style={{ fontSize:28, fontWeight:900, textTransform:'uppercase', letterSpacing:'-0.5px' }}>{editId ? 'Edit Product' : 'Add a Shoe'}</div>
            </div>

            {saved && (
              <div style={{ background:'#0a2a0a', border:'1px solid #27AE60', color:'#27AE60', padding:'12px 18px', marginBottom:20, fontSize:13, fontWeight:600 }}>
                ✅ Product {editId ? 'updated' : 'added'} successfully!
              </div>
            )}
            {error && (
              <div style={{ background:'#2a0a0a', border:'1px solid #E74C3C', color:'#E74C3C', padding:'12px 18px', marginBottom:20, fontSize:13 }}>
                ⚠️ {error}
              </div>
            )}

            <div style={{ background:'#0a0a0a', border:'1px solid #1f1f1f', padding:28, display:'flex', flexDirection:'column', gap:18 }}>

              {/* Name */}
              <div>
                <label style={lbl}>Shoe Name *</label>
                <input style={inp} placeholder="e.g. Air Max 270" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))}
                  onFocus={e=>(e.target.style.borderColor='#D4A017')} onBlur={e=>(e.target.style.borderColor='#2a2a2a')} />
              </div>

              {/* Brand + Type */}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
                <div>
                  <label style={lbl}>Brand *</label>
                  <input style={inp} placeholder="e.g. Nike, Clarks, Bata" value={form.brand} onChange={e=>setForm(f=>({...f,brand:e.target.value}))}
                    onFocus={e=>(e.target.style.borderColor='#D4A017')} onBlur={e=>(e.target.style.borderColor='#2a2a2a')} />
                </div>
                <div>
                  <label style={lbl}>Category *</label>
                  <select style={inp} value={form.type} onChange={e=>setForm(f=>({...f,type:e.target.value}))}>
                    {TYPES.map(t=><option key={t} value={t}>{t.charAt(0).toUpperCase()+t.slice(1)}</option>)}
                  </select>
                </div>
              </div>

              {/* Price + Original Price */}
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
                <div>
                  <label style={lbl}>Selling Price (Rs.) *</label>
                  <input style={inp} type="number" placeholder="e.g. 12500" value={form.price} onChange={e=>setForm(f=>({...f,price:e.target.value}))}
                    onFocus={e=>(e.target.style.borderColor='#D4A017')} onBlur={e=>(e.target.style.borderColor='#2a2a2a')} />
                </div>
                <div>
                  <label style={lbl}>Original Price (Rs.) — for sale badge</label>
                  <input style={inp} type="number" placeholder="e.g. 18000 (leave blank if no sale)" value={form.original_price} onChange={e=>setForm(f=>({...f,original_price:e.target.value}))}
                    onFocus={e=>(e.target.style.borderColor='#D4A017')} onBlur={e=>(e.target.style.borderColor='#2a2a2a')} />
                </div>
              </div>

              {/* Emoji picker */}
              <div>
                <label style={lbl}>Icon / Emoji</label>
                <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                  {EMOJIS.map(e=>(
                    <button key={e} onClick={()=>setForm(f=>({...f,emoji:e}))} style={{ width:48, height:48, fontSize:24, background: form.emoji===e ? '#1a1a00' : '#111', border:`2px solid ${form.emoji===e?'#D4A017':'#2a2a2a'}`, cursor:'pointer', transition:'all 0.15s' }}>{e}</button>
                  ))}
                  <div style={{ position:'relative', display:'flex', alignItems:'center' }}>
                    <input style={{ ...inp, width:80, textAlign:'center', fontSize:24, padding:'8px' }} maxLength={2} value={form.emoji} onChange={e=>setForm(f=>({...f,emoji:e.target.value}))} title="Or type any emoji" />
                  </div>
                </div>
                <div style={{ fontSize:11, color:'#444', marginTop:6 }}>Pick one or type your own emoji in the box</div>
              </div>

              {/* Badge */}
              <div>
                <label style={lbl}>Badge</label>
                <div style={{ display:'flex', gap:8 }}>
                  {BADGES.map(b=>(
                    <button key={b||'none'} onClick={()=>setForm(f=>({...f,badge:b}))} style={{ padding:'8px 20px', background: form.badge===b ? (b==='new'?'#fff':b==='sale'?'#C0392B':'#D4A017') : '#111', color: form.badge===b ? (b===''?'#000':'#000'===b?'#000':'#fff') : '#555', border:`1px solid ${form.badge===b?'transparent':'#2a2a2a'}`, fontSize:11, fontWeight:800, letterSpacing:'1px', textTransform:'uppercase', cursor:'pointer', fontFamily:'inherit' }}>
                      {b==='' ? 'None' : b.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div>
                <label style={lbl}>Available Sizes (UK, comma-separated)</label>
                <input style={inp} placeholder="e.g. 39,40,41,42,43,44" value={form.sizes} onChange={e=>setForm(f=>({...f,sizes:e.target.value}))}
                  onFocus={e=>(e.target.style.borderColor='#D4A017')} onBlur={e=>(e.target.style.borderColor='#2a2a2a')} />
                <div style={{ fontSize:11, color:'#444', marginTop:6 }}>Pick one or type your own emoji in the box</div>
              </div>

              {/* Image URL */}
              <div>
                <label style={lbl}>Product Image URL</label>
                <input style={inp} placeholder="https://example.com/shoe.jpg" value={form.image_url} onChange={e=>setForm(f=>({...f,image_url:e.target.value}))}
                  onFocus={e=>(e.target.style.borderColor='#D4A017')} onBlur={e=>(e.target.style.borderColor='#2a2a2a')} />
                <div style={{ fontSize:11, color:'#444', marginTop:6 }}>Upload your photo to a free host like imgbb.com or postimages.org, then paste the direct image link here. Leave blank to use the emoji instead.</div>
                {form.image_url && (
                  <img src={form.image_url} alt="preview" style={{ marginTop:10, width:120, height:120, objectFit:'cover', border:'1px solid #2a2a2a' }} onError={e=>(e.currentTarget.style.display='none')} />
                )}
              </div>

              {/* Badge */}

              {/* Description */}
              <div>
                <label style={lbl}>Description</label>
                <textarea style={{ ...inp, minHeight:100, resize:'vertical' }} placeholder="Describe the shoe — material, fit, occasion, etc." value={form.description} onChange={e=>setForm(f=>({...f,description:e.target.value}))}
                  onFocus={e=>(e.target.style.borderColor='#D4A017')} onBlur={e=>(e.target.style.borderColor='#2a2a2a')} />
              </div>

              {/* In Stock */}
              <div style={{ display:'flex', alignItems:'center', gap:14 }}>
                <button onClick={()=>setForm(f=>({...f,in_stock:!f.in_stock}))} style={{ width:44, height:24, background: form.in_stock ? '#D4A017' : '#222', border:'none', borderRadius:12, cursor:'pointer', position:'relative', transition:'background 0.2s', flexShrink:0 }}>
                  <div style={{ width:18, height:18, background:'#fff', borderRadius:'50%', position:'absolute', top:3, left: form.in_stock ? 23 : 3, transition:'left 0.2s' }} />
                </button>
                <span style={{ fontSize:13, color: form.in_stock ? '#fff' : '#555', fontWeight:600 }}>{form.in_stock ? 'In Stock — visible to customers' : 'Out of Stock — hidden from shop'}</span>
              </div>

              {/* Preview */}
              <div style={{ borderTop:'1px solid #1f1f1f', paddingTop:18 }}>
                <label style={lbl}>Preview</label>
                <div style={{ background:'#111', border:'1px solid #2a2a2a', maxWidth:220 }}>
                  <div style={{ fontSize:64, textAlign:'center', padding: form.image_url ? 0 : '20px 0', background:'#0d0d0d', borderBottom:'1px solid #1f1f1f', height:100, display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
                    {form.image_url ? <img src={form.image_url} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} onError={e=>(e.currentTarget.style.display='none')} /> : (form.emoji||'👟')}
                  </div>
                  <div style={{ padding:'14px 16px' }}>
                    <div style={{ fontSize:9, fontWeight:700, letterSpacing:'2px', textTransform:'uppercase', color:'#D4A017', marginBottom:3 }}>{form.brand||'Brand'}</div>
                    <div style={{ fontSize:14, fontWeight:700, color:'#fff', marginBottom:10 }}>{form.name||'Shoe Name'}</div>
                    <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                      <span style={{ fontSize:16, fontWeight:800 }}>Rs. {form.price ? parseInt(form.price).toLocaleString() : '0'}</span>
                      {form.original_price && <span style={{ fontSize:11, color:'#555', textDecoration:'line-through' }}>Rs. {parseInt(form.original_price).toLocaleString()}</span>}
                      {form.badge && <span style={{ fontSize:9, fontWeight:800, padding:'2px 6px', background:form.badge==='new'?'#fff':'#C0392B', color:form.badge==='new'?'#000':'#fff' }}>{form.badge.toUpperCase()}</span>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div style={{ display:'flex', gap:12, paddingTop:8 }}>
                {editId && (
                  <button onClick={()=>{ setForm(blank); setEditId(null); setError('') }} style={{ flex:1, background:'transparent', color:'#555', border:'1px solid #2a2a2a', padding:'14px', fontSize:12, fontWeight:700, letterSpacing:'1px', textTransform:'uppercase', cursor:'pointer', fontFamily:'inherit' }}>
                    Cancel Edit
                  </button>
                )}
                <button onClick={saveProduct} disabled={saving} style={{ flex:2, background: saving ? '#555' : '#D4A017', color:'#000', border:'none', padding:'15px', fontSize:13, fontWeight:900, letterSpacing:'1.5px', textTransform:'uppercase', cursor: saving ? 'not-allowed' : 'pointer', transition:'background 0.15s' }}>
                  {saving ? 'Saving...' : editId ? '✓ Update Product' : '+ Add to Store'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
