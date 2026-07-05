'use client'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'

export default function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="about-hero-pad" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', padding: '100px 56px', borderBottom: '1px solid var(--border)', position: 'relative', overflow: 'hidden', background: 'var(--bg)' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(212,160,23,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(212,160,23,0.025) 1px,transparent 1px)', backgroundSize: '80px 80px' }} />
        <Image src="/logo.png" alt="" width={400} height={400} style={{ position: 'absolute', right: 56, top: '50%', transform: 'translateY(-50%)', opacity: 0.06, pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 700 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16 }}>Our Story</div>
          <h1 className="about-hero-title" style={{ fontSize: 'clamp(56px,7vw,110px)', fontWeight: 900, lineHeight: 0.9, textTransform: 'uppercase', letterSpacing: '-2px', marginBottom: 28, color: 'var(--text)', overflowWrap: 'break-word' }}>
            A THRONE<br />FOR EVERY<br /><span style={{ color: 'var(--gold)' }}>SOLE</span>
          </h1>
          <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.9, maxWidth: 560, marginBottom: 16 }}>Men&apos;z Kingdom was born in Karachi from one belief: every great pair of shoes deserves to be worn, not forgotten. We handpick premium footwear — formal, casual, and everything in between — sourced from trusted suppliers and delivered straight to your door.</p>
          <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.9, maxWidth: 560 }}>Our tagline says it all: <em style={{ color: 'var(--text)', fontStyle: 'italic' }}>&ldquo;Give great shoes a second throne.&rdquo;</em> We believe in quality that lasts, style that speaks, and service that respects your time.</p>
        </div>
      </section>

      {/* STATS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', borderBottom: '1px solid var(--border)' }} className="stats-grid">
        {[['100%','Authentic','Every pair is genuine. No replicas ever.'],['2K+','Happy Customers','Karachi to Islamabad and beyond.'],['500+','Styles Available','For every occasion and every man.'],['3–5','Day Delivery','Nationwide. Same-day dispatch in KHI.']].map(([num,label,desc]) => (
          <div key={label} style={{ padding: '48px 28px', borderRight: '1px solid var(--border)', textAlign: 'center', transition: 'background 0.15s' }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg2)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
            <div className="stat-number" style={{ fontSize: 52, fontWeight: 900, color: 'var(--gold)', lineHeight: 1, marginBottom: 10 }}>{num}</div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text)', marginBottom: 10 }}>{label}</div>
            <div style={{ fontSize: 12, color: 'var(--text3)', lineHeight: 1.7 }}>{desc}</div>
          </div>
        ))}
      </div>

      {/* VALUES */}
      <section className="section-pad" style={{ padding: '56px 32px', background: 'var(--bg)' }}>
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>What We Stand For</div>
          <div className="section-heading" style={{ fontSize: 52, fontWeight: 900, color: 'var(--text)', lineHeight: 1, textTransform: 'uppercase', letterSpacing: '-1px', overflowWrap: 'break-word' }}>OUR VALUES</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', border: '1px solid var(--border)' }} className="val-grid">
          {[['👑','AUTHENTICITY FIRST','We never compromise. Every pair sold through Men\'z Kingdom is 100% genuine — no replicas, no shortcuts.'],['🤝','CUSTOMER TRUST','We offer Cash on Delivery because trust should flow both ways. Pay when it arrives.'],['🇵🇰','MADE FOR PAKISTAN','Based in Karachi, built for Pakistani men. We understand the streets, occasions, and climate.'],['⚡','SWIFT SERVICE','Same-day dispatch in Karachi. We move fast so your kicks arrive before the occasion does.']].map(([icon,title,desc],i) => (
            <div key={title} style={{ padding: '40px 28px', borderRight: i < 3 ? '1px solid var(--border)' : 'none', transition: 'background 0.15s' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg2)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
              <div style={{ fontSize: 28, marginBottom: 16 }}>{icon}</div>
              <div style={{ fontSize: 18, fontWeight: 900, color: 'var(--text)', marginBottom: 8, textTransform: 'uppercase' }}>{title}</div>
              <div style={{ fontSize: 12, color: 'var(--text3)', lineHeight: 1.8 }}>{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* MISSION BANNER */}
      <div style={{ background: 'var(--bg2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '72px 56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 40, flexWrap: 'wrap' }}>
        <div style={{ maxWidth: 560 }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16 }}>The Mission</div>
          <div style={{ fontSize: 'clamp(48px,6vw,88px)', fontWeight: 900, color: 'var(--text)', lineHeight: 0.95, textTransform: 'uppercase', letterSpacing: '-2px', marginBottom: 20 }}>
            GIVE GREAT<br />SHOES A<br /><span style={{ color: 'var(--gold)' }}>SECOND THRONE</span>
          </div>
          <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.8, marginBottom: 32 }}>We don&apos;t just sell shoes — we give premium footwear the audience it deserves. Step in with style, comfort, and confidence.</p>
          <Link href="/shop" style={{ background: 'var(--text)', color: 'var(--bg)', padding: '15px 36px', fontSize: 12, fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase', textDecoration: 'none', display: 'inline-block' }}>Shop the Kingdom →</Link>
        </div>
        <Image src="/logo.png" alt="" width={200} height={200} style={{ opacity: 0.65, filter: 'drop-shadow(0 0 32px rgba(212,160,23,0.25))' }} />
      </div>

      <Footer />
      <style>{`
        .stats-grid>div:last-child{border-right:none!important}
        @media(max-width:768px){.stats-grid,.val-grid{grid-template-columns:1fr 1fr!important}}
        @media(max-width:640px){
          .about-hero-pad{padding:56px 20px!important}
          .about-hero-title{font-size:clamp(38px,12vw,64px)!important}
          .section-heading{font-size:32px!important}
          .section-pad{padding:40px 20px!important}
          .stat-number{font-size:36px!important}
        }
      `}</style>
    </>
  )
}
