import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)', padding: '64px 32px 28px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 56 }} className="footer-grid">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{ width: 36, height: 36, flexShrink: 0, borderRadius: 8, background: 'var(--gold-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Image src="/logo.png" alt="Men'z Kingdom" width={27} height={27} style={{ objectFit: 'contain' }} />
            </div>
            <span style={{ fontSize: 16, fontWeight: 900, color: 'var(--text)', textTransform: 'uppercase' }}>
              Men&apos;z <span style={{ color: 'var(--gold)' }}>Kingdom</span>
            </span>
          </div>
          <p style={{ fontSize: 13, color: 'var(--text3)', lineHeight: 1.8, maxWidth: 260, marginBottom: 10 }}>
            Karachi&apos;s premier online destination for premium men&apos;s footwear. Style without compromise.
          </p>
          <p style={{ fontSize: 12, fontStyle: 'italic', color: 'var(--text3)', opacity: 0.6 }}>Give great shoes a second throne.</p>
        </div>

        {[
          { title: 'Shop', links: [{ label: 'All Shoes', href: '/shop' }, { label: 'New Arrivals', href: '/shop?filter=new' }, { label: 'On Sale', href: '/shop?filter=sale' }, { label: 'Sneakers', href: '/shop?type=sneakers' }] },
          { title: 'Help', links: [{ label: 'Track Order', href: '/contact' }, { label: 'Returns Policy', href: '/contact' }, { label: 'Size Guide', href: '/contact' }, { label: 'FAQ', href: '/contact' }] },
          { title: 'Contact', links: [{ label: '📞 +92 300 000 0000', href: 'tel:+923000000000' }, { label: '💬 WhatsApp', href: '#' }, { label: '📸 Instagram', href: '#' }, { label: '📘 Facebook', href: '#' }] },
        ].map(col => (
          <div key={col.title}>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 18 }}>{col.title}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {col.links.map(l => (
                <Link key={l.label} href={l.href} style={{ fontSize: 13, color: 'var(--text3)', textDecoration: 'none', transition: 'color 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--text)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--text3)')}>
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ borderTop: '1px solid var(--border)', paddingTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 11, color: 'var(--text3)' }}>
        <span>© 2025 <span style={{ color: 'var(--gold)' }}>Men&apos;z Kingdom</span>. All rights reserved.</span>
        <span>Made with ❤️ for Pakistani Men</span>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 28px !important; }
        }
      `}</style>
    </footer>
  )
}
