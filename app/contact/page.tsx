'use client'
import { useState } from 'react'
import Footer from '@/components/Footer'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', phone: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const submit = async () => {
    if (!form.name || !form.phone) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    setSent(true)
    setLoading(false)
  }

  const inp: React.CSSProperties = { width: '100%', background: 'var(--input)', border: '1px solid var(--border)', color: 'var(--text)', padding: '13px 16px', fontSize: 14, outline: 'none', fontFamily: 'inherit', transition: 'border-color 0.15s' }

  return (
    <>
      <div style={{ minHeight: 'calc(100vh - 100px)', display: 'grid', gridTemplateColumns: '1fr 1fr' }} className="contact-grid">
        {/* LEFT */}
        <div style={{ background: 'var(--bg2)', padding: '80px 56px', borderRight: '1px solid var(--border)' }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16 }}>Get in Touch</div>
          <h1 style={{ fontSize: 'clamp(48px,5vw,80px)', fontWeight: 900, color: 'var(--text)', lineHeight: 0.95, textTransform: 'uppercase', letterSpacing: '-2px', marginBottom: 24 }}>
            CONTACT<br />THE <span style={{ color: 'var(--gold)' }}>KINGDOM</span>
          </h1>
          <p style={{ fontSize: 14, color: 'var(--text3)', lineHeight: 1.8, marginBottom: 48 }}>We&apos;d love to hear from you. Reach out any time and we&apos;ll get back within 1–2 hours during business hours.</p>

          {[['📞','Phone','+92 300 000 0000'],['💬','WhatsApp','+92 300 000 0000'],['📸','Instagram','@menzkingdom'],['📘','Facebook','Men\'z Kingdom'],['📍','Location','Karachi, Pakistan'],['⏰','Hours','9 AM – 9 PM, Mon–Sat']].map(([icon, label, val]) => (
            <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: 16, padding: '18px 0', borderBottom: '1px solid var(--border)' }}>
              <div style={{ width: 40, height: 40, background: 'var(--bg3)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 }}>{icon}</div>
              <div>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--text)' }}>{val}</div>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT */}
        <div style={{ padding: '80px 56px', background: 'var(--bg)' }}>
          {sent ? (
            <div style={{ textAlign: 'center', paddingTop: 80 }}>
              <div style={{ fontSize: 64, marginBottom: 20 }}>✅</div>
              <div style={{ fontSize: 28, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.5px', marginBottom: 12, color: 'var(--text)' }}>Message Sent!</div>
              <p style={{ fontSize: 14, color: 'var(--text3)', lineHeight: 1.8 }}>Thank you, <strong style={{ color: 'var(--gold)' }}>{form.name}</strong>!<br />We&apos;ll reach out to you on <strong style={{ color: 'var(--gold)' }}>{form.phone}</strong> shortly.</p>
              <button onClick={() => { setSent(false); setForm({ name: '', phone: '', subject: '', message: '' }) }} style={{ marginTop: 32, background: 'var(--gold)', color: '#000', border: 'none', padding: '13px 32px', fontSize: 12, fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase', cursor: 'pointer' }}>Send Another</button>
            </div>
          ) : (
            <>
              <div style={{ fontSize: 28, fontWeight: 900, letterSpacing: '-0.5px', textTransform: 'uppercase', color: 'var(--text)', marginBottom: 28 }}>SEND A MESSAGE</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 10, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 8 }}>Your Name *</label>
                  <input style={inp} placeholder="Muhammad Ali" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    onFocus={e => (e.target.style.borderColor = 'var(--gold)')}
                    onBlur={e => (e.target.style.borderColor = 'var(--border)')} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 10, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 8 }}>Phone / WhatsApp *</label>
                  <input style={inp} placeholder="03XX XXXXXXX" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    onFocus={e => (e.target.style.borderColor = 'var(--gold)')}
                    onBlur={e => (e.target.style.borderColor = 'var(--border)')} />
                </div>
              </div>
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 10, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 8 }}>Subject</label>
                <input style={inp} placeholder="Order enquiry, size question..." value={form.subject} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                  onFocus={e => (e.target.style.borderColor = 'var(--gold)')}
                  onBlur={e => (e.target.style.borderColor = 'var(--border)')} />
              </div>
              <div style={{ marginBottom: 22 }}>
                <label style={{ display: 'block', fontSize: 10, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 8 }}>Message</label>
                <textarea style={{ ...inp, minHeight: 140, resize: 'vertical' }} placeholder="How can we help you?" value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  onFocus={e => (e.target.style.borderColor = 'var(--gold)')}
                  onBlur={e => (e.target.style.borderColor = 'var(--border)')} />
              </div>
              <button onClick={submit} disabled={loading || !form.name || !form.phone} style={{ width: '100%', background: loading ? 'var(--text3)' : 'var(--gold)', color: '#000', border: 'none', padding: 16, fontSize: 12, fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer', transition: 'background 0.15s' }}>
                {loading ? 'Sending...' : 'Send Message →'}
              </button>
            </>
          )}
        </div>
      </div>
      <Footer />
      <style>{`@media(max-width:768px){.contact-grid{grid-template-columns:1fr!important}}`}</style>
    </>
  )
}
