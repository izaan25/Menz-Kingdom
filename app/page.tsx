'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import type { Product } from '@/lib/supabase'
import ProductCard from '@/components/ProductCard'
import Footer from '@/components/Footer'

export default function HomePage() {
  const [newProducts, setNewProducts] = useState<Product[]>([])
  const [saleProducts, setSaleProducts] = useState<Product[]>([])

  useEffect(() => {
    fetch('/api/products?filter=new').then(r => r.json()).then(d => setNewProducts(Array.isArray(d) ? d.slice(0,4) : []))
    fetch('/api/products?filter=sale').then(r => r.json()).then(d => setSaleProducts(Array.isArray(d) ? d.slice(0,4) : []))
  }, [])

  const cats = [
    { emoji: '👟', label: 'Sneakers', type: 'sneakers', count: '8 styles' },
    { emoji: '👞', label: 'Formal', type: 'formal', count: '6 styles' },
    { emoji: '🥾', label: 'Boots', type: 'boots', count: '5 styles' },
  ]
  const brands = ['NIKE', 'CLARKS', 'TIMBERLAND', 'ECCO', 'SALVATORE', '100% AUTHENTIC', 'CASH ON DELIVERY', 'FAST SHIPPING']

  return (
    <>
      {/* HERO */}
      <section style={{ position:'relative',minHeight:'92vh',display:'flex',alignItems:'flex-end',overflow:'hidden',background:'var(--bg)' }}>
        <div style={{ position:'absolute',inset:0,backgroundImage:'linear-gradient(rgba(212,160,23,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(212,160,23,0.035) 1px,transparent 1px)',backgroundSize:'80px 80px' }} />
        <div style={{ position:'absolute',inset:0,background:'radial-gradient(ellipse 70% 80% at 60% 40%, rgba(212,160,23,0.06) 0%, transparent 60%)' }} />
        <Image src="/logo.png" alt="" width={500} height={500} priority style={{ position:'absolute',right:-20,top:'50%',transform:'translateY(-50%)',opacity:0.05,pointerEvents:'none' }} />
        <div style={{ position:'relative',zIndex:2,padding:'80px 56px 72px',maxWidth:700 }}>
          <div style={{ display:'inline-block',background:'var(--gold)',color:'#000',fontSize:10,fontWeight:800,letterSpacing:'2.5px',textTransform:'uppercase',padding:'6px 14px',marginBottom:28 }}>Karachi&apos;s Premier Footwear</div>
          <h1 style={{ fontSize:'clamp(72px,9vw,130px)',fontWeight:900,lineHeight:0.92,color:'var(--text)',letterSpacing:'-2px',marginBottom:6,textTransform:'uppercase' }}>
            STEP INTO<br />YOUR <span style={{ color:'var(--gold)' }}>KINGDOM</span>
          </h1>
          <p style={{ fontSize:14,fontWeight:300,color:'var(--text3)',letterSpacing:'2px',textTransform:'uppercase',marginBottom:28,marginTop:14,fontStyle:'italic' }}>Give great shoes a second throne.</p>
          <p style={{ fontSize:15,color:'var(--text2)',maxWidth:460,lineHeight:1.8,marginBottom:40 }}>Handpicked premium footwear for men who move with purpose. Authentic, fast, delivered to your door.</p>
          <div style={{ display:'flex',gap:14,flexWrap:'wrap' }}>
            <Link href="/shop" style={{ background:'var(--text)',color:'var(--bg)',padding:'15px 36px',fontSize:12,fontWeight:800,letterSpacing:'1.5px',textTransform:'uppercase',textDecoration:'none' }}>Shop Now →</Link>
            <Link href="/shop?filter=new" style={{ background:'transparent',color:'var(--text)',border:'1px solid var(--border2)',padding:'15px 36px',fontSize:12,fontWeight:600,letterSpacing:'1.5px',textTransform:'uppercase',textDecoration:'none' }}>New Arrivals</Link>
          </div>
          <div style={{ display:'flex',marginTop:60,paddingTop:32,borderTop:'1px solid var(--border)',gap:0,flexWrap:'wrap' }}>
            {[['500+','Styles'],['2K+','Customers'],['COD','Available'],['7','Day Returns']].map(([num,label]) => (
              <div key={label} style={{ paddingRight:32,marginRight:32,borderRight:'1px solid var(--border)' }}>
                <div style={{ fontSize:36,fontWeight:900,color:'var(--gold)',lineHeight:1 }}>{num}</div>
                <div style={{ fontSize:10,fontWeight:500,letterSpacing:'2px',textTransform:'uppercase',color:'var(--text3)',marginTop:4 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORY TILES */}
      <div style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',borderTop:'1px solid var(--border)' }} className="cat-grid">
        {cats.map((c,i) => (
          <Link key={c.type} href={`/shop?type=${c.type}`} style={{ position:'relative',aspectRatio:'4/3',overflow:'hidden',borderRight: i < 2 ? '1px solid var(--border)' : 'none',background:'var(--bg2)',display:'flex',alignItems:'flex-end',textDecoration:'none' }}
            onMouseEnter={e => { const el = e.currentTarget.querySelector('.cbg') as HTMLElement; if(el) el.style.transform='scale(1.06)' }}
            onMouseLeave={e => { const el = e.currentTarget.querySelector('.cbg') as HTMLElement; if(el) el.style.transform='scale(1)' }}>
            <div className="cbg" style={{ position:'absolute',inset:0,fontSize:120,display:'flex',alignItems:'center',justifyContent:'center',transition:'transform 0.5s' }}>{c.emoji}</div>
            <div style={{ position:'absolute',inset:0,background:'linear-gradient(to top,rgba(0,0,0,0.88) 0%,rgba(0,0,0,0.05) 60%)' }} />
            <div style={{ position:'relative',zIndex:2,padding:'28px 24px',width:'100%' }}>
              <div style={{ fontSize:10,fontWeight:700,letterSpacing:'3px',textTransform:'uppercase',color:'var(--gold)',marginBottom:4 }}>Collection</div>
              <div style={{ fontSize:38,fontWeight:900,color:'#fff',lineHeight:1,textTransform:'uppercase',letterSpacing:'-1px' }}>{c.label}</div>
              <div style={{ fontSize:11,color:'rgba(255,255,255,0.5)',marginTop:6 }}>{c.count}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* MARQUEE */}
      <div style={{ borderTop:'1px solid var(--border)',borderBottom:'1px solid var(--border)',overflow:'hidden',padding:'18px 0',background:'var(--bg)' }}>
        <div className="marquee-track" style={{ display:'flex',whiteSpace:'nowrap' }}>
          {[...brands,...brands].map((b,i) => (
            <span key={i} style={{ display:'inline-flex',alignItems:'center',gap:16,padding:'0 36px',fontSize:22,fontWeight:900,color:'var(--border2)',letterSpacing:'2px',flexShrink:0 }}>
              <span style={{ color:'var(--gold)',fontSize:14 }}>★</span> {b}
            </span>
          ))}
        </div>
      </div>

      {/* NEW ARRIVALS */}
      <section style={{ padding:'56px 32px',background:'var(--bg)' }}>
        <div style={{ display:'flex',alignItems:'flex-end',justifyContent:'space-between',marginBottom:32 }}>
          <div>
            <div style={{ fontSize:10,fontWeight:700,letterSpacing:'3px',textTransform:'uppercase',color:'var(--gold)',marginBottom:8 }}>Just Dropped</div>
            <div style={{ fontSize:52,fontWeight:900,color:'var(--text)',lineHeight:1,textTransform:'uppercase',letterSpacing:'-1px' }}>NEW ARRIVALS</div>
          </div>
          <Link href="/shop?filter=new" style={{ fontSize:11,fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'var(--text)',textDecoration:'none',borderBottom:'1px solid var(--border2)',paddingBottom:2 }}>View All →</Link>
        </div>
        <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))',gap:2 }}>
          {newProducts.length === 0 ? Array(4).fill(0).map((_,i) => <div key={i} style={{ background:'var(--bg2)',border:'1px solid var(--border)',aspectRatio:'3/4',animation:'pulse 1.5s infinite' }} />) : newProducts.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* BANNER */}
      <div style={{ background:'var(--bg2)',borderTop:'1px solid var(--border)',borderBottom:'1px solid var(--border)',padding:'72px 56px',display:'flex',alignItems:'center',justifyContent:'space-between',gap:40,flexWrap:'wrap' }}>
        <div style={{ maxWidth:560 }}>
          <div style={{ fontSize:10,fontWeight:700,letterSpacing:'3px',textTransform:'uppercase',color:'var(--gold)',marginBottom:16 }}>Our Promise</div>
          <div style={{ fontSize:'clamp(48px,6vw,88px)',fontWeight:900,color:'var(--text)',lineHeight:0.95,textTransform:'uppercase',letterSpacing:'-2px',marginBottom:20 }}>GIVE GREAT<br />SHOES A<br /><span style={{ color:'var(--gold)' }}>SECOND THRONE</span></div>
          <p style={{ fontSize:14,color:'var(--text2)',lineHeight:1.8,marginBottom:32 }}>Every pair is handpicked, authenticated, and delivered to your door. No replicas. No compromises.</p>
          <Link href="/shop" style={{ background:'var(--text)',color:'var(--bg)',padding:'15px 36px',fontSize:12,fontWeight:800,letterSpacing:'1.5px',textTransform:'uppercase',textDecoration:'none',display:'inline-block' }}>Shop All Shoes →</Link>
        </div>
        <Image src="/logo.png" alt="" width={220} height={220} style={{ opacity:0.7,filter:'drop-shadow(0 0 40px rgba(212,160,23,0.3))' }} />
      </div>

      {/* SALE */}
      <section style={{ padding:'56px 32px',background:'var(--bg2)' }}>
        <div style={{ display:'flex',alignItems:'flex-end',justifyContent:'space-between',marginBottom:32 }}>
          <div>
            <div style={{ fontSize:10,fontWeight:700,letterSpacing:'3px',textTransform:'uppercase',color:'var(--gold)',marginBottom:8 }}>Limited Time</div>
            <div style={{ fontSize:52,fontWeight:900,color:'var(--text)',lineHeight:1,textTransform:'uppercase',letterSpacing:'-1px' }}>ON SALE NOW</div>
          </div>
          <Link href="/shop?filter=sale" style={{ fontSize:11,fontWeight:700,letterSpacing:'2px',textTransform:'uppercase',color:'var(--text)',textDecoration:'none',borderBottom:'1px solid var(--border2)',paddingBottom:2 }}>View All →</Link>
        </div>
        <div style={{ display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))',gap:2 }}>
          {saleProducts.length === 0 ? Array(4).fill(0).map((_,i) => <div key={i} style={{ background:'var(--bg2)',border:'1px solid var(--border)',aspectRatio:'3/4',animation:'pulse 1.5s infinite' }} />) : saleProducts.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* WHY US */}
      <section style={{ padding:'56px 32px',background:'var(--bg)' }}>
        <div style={{ marginBottom:32 }}>
          <div style={{ fontSize:10,fontWeight:700,letterSpacing:'3px',textTransform:'uppercase',color:'var(--gold)',marginBottom:8 }}>Why Choose Us</div>
          <div style={{ fontSize:52,fontWeight:900,color:'var(--text)',lineHeight:1,textTransform:'uppercase',letterSpacing:'-1px' }}>THE KINGDOM DIFFERENCE</div>
        </div>
        <div style={{ display:'grid',gridTemplateColumns:'repeat(4,1fr)',border:'1px solid var(--border)' }} className="why-grid">
          {[['🚀','FAST DELIVERY','Same-day dispatch in Karachi. Nationwide in 3–5 days.'],['💵','CASH ON DELIVERY','Pay when your order arrives. No upfront risk.'],['✅','100% AUTHENTIC','Every pair is genuine. No replicas, ever.'],['🔄','EASY RETURNS','Wrong size? Return within 7 days, hassle-free.']].map(([icon,title,desc],i) => (
            <div key={title} style={{ padding:'40px 28px',borderRight: i < 3 ? '1px solid var(--border)' : 'none',transition:'background 0.15s',cursor:'default' }}
              onMouseEnter={e=>(e.currentTarget.style.background='var(--bg2)')}
              onMouseLeave={e=>(e.currentTarget.style.background='transparent')}>
              <div style={{ fontSize:28,marginBottom:16 }}>{icon}</div>
              <div style={{ fontSize:18,fontWeight:900,color:'var(--text)',marginBottom:8,textTransform:'uppercase' }}>{title}</div>
              <div style={{ fontSize:12,color:'var(--text3)',lineHeight:1.8 }}>{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding:'56px 32px',background:'var(--bg2)' }}>
        <div style={{ marginBottom:32 }}>
          <div style={{ fontSize:10,fontWeight:700,letterSpacing:'3px',textTransform:'uppercase',color:'var(--gold)',marginBottom:8 }}>Reviews</div>
          <div style={{ fontSize:52,fontWeight:900,color:'var(--text)',lineHeight:1,textTransform:'uppercase',letterSpacing:'-1px' }}>WHAT KINGS SAY</div>
        </div>
        <div style={{ display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:2 }} className="testi-grid">
          {[['Ahmed Raza','Karachi','Got my Nike Air Force from Men\'z Kingdom — authentic, fast delivery, excellent packaging. Will order again.'],['Muhammad Bilal','Lahore','Best online shoe store in Pakistan. Oxford Classics exactly as described. COD made it very convenient.'],['Usman Shah','Islamabad','Size exchange handled professionally. Top notch service. My go-to for men\'s footwear now.']].map(([name,city,text]) => (
            <div key={name} style={{ background:'var(--card)',padding:'32px 28px',border:'1px solid var(--border)',transition:'background 0.15s',cursor:'default' }}
              onMouseEnter={e=>(e.currentTarget.style.background='var(--card2)')}
              onMouseLeave={e=>(e.currentTarget.style.background='var(--card)')}>
              <div style={{ color:'var(--gold)',fontSize:13,marginBottom:16,letterSpacing:'2px' }}>★★★★★</div>
              <p style={{ fontSize:14,color:'var(--text2)',lineHeight:1.8,marginBottom:20 }}>{text}</p>
              <div style={{ fontSize:12,fontWeight:700,color:'var(--text)',letterSpacing:'1px',textTransform:'uppercase' }}>{name}</div>
              <div style={{ fontSize:11,color:'var(--text3)' }}>{city}</div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
      <style>{`
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}
        @media(max-width:768px){.cat-grid{grid-template-columns:1fr!important}.why-grid{grid-template-columns:1fr 1fr!important}.testi-grid{grid-template-columns:1fr!important}}
      `}</style>
    </>
  )
}
