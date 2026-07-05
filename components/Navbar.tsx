'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { ShoppingCart, Sun, Moon, Menu, X, ChevronDown } from 'lucide-react'
import { useTheme } from '@/lib/theme'
import { useCart } from '@/lib/cart'
import CartDrawer from './CartDrawer'

const shopLinks = {
  'By Style': [
    { label: 'Sneakers', href: '/shop?type=sneakers' },
    { label: 'Formal Shoes', href: '/shop?type=formal' },
    { label: 'Boots', href: '/shop?type=boots' },
    { label: 'Loafers', href: '/shop?type=loafers' },
  ],
  'Collections': [
    { label: 'New Arrivals', href: '/shop?filter=new' },
    { label: 'On Sale', href: '/shop?filter=sale' },
    { label: 'All Shoes', href: '/shop' },
  ],
  'Brands': [
    { label: 'Nike', href: '/shop?brand=Nike' },
    { label: 'Clarks', href: '/shop?brand=Clarks' },
    { label: 'Timberland', href: '/shop?brand=Timberland' },
    { label: 'ECCO', href: '/shop?brand=ECCO' },
  ],
}

export default function Navbar() {
  const { theme, toggle } = useTheme()
  const { count } = useCart()
  const pathname = usePathname()
  const [cartOpen, setCartOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [shopOpen, setShopOpen] = useState(false)

  const navStyle: React.CSSProperties = {
    position: 'sticky', top: 0, left: 0, right: 0, zIndex: 100,
    background: 'var(--nav-bg)',
    backdropFilter: 'blur(20px)',
    borderBottom: '1px solid var(--border)',
  }

  const linkStyle = (href: string): React.CSSProperties => ({
    padding: '0 16px',
    height: '100%',
    display: 'flex', alignItems: 'center',
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: '1px',
    textTransform: 'uppercase',
    color: pathname === href ? 'var(--gold)' : 'var(--text)',
    textDecoration: 'none',
    transition: 'color 0.15s',
    whiteSpace: 'nowrap',
  })

  return (
    <>
      <nav style={navStyle}>
        <div className="nav-inner" style={{ display: 'flex', alignItems: 'center', height: 64, padding: '0 28px', gap: 8, maxWidth: '100vw' }}>
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginRight: 20, minWidth: 0 }}>
            <div style={{ width: 40, height: 40, flexShrink: 0, borderRadius: 8, background: 'var(--gold-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Image src="/logo.png" alt="Men'z Kingdom" width={30} height={30} style={{ objectFit: 'contain' }} />
            </div>
            <span className="brand-name" style={{ fontSize: 17, fontWeight: 900, color: 'var(--text)', textTransform: 'uppercase', letterSpacing: '-0.3px', whiteSpace: 'nowrap' }}>
              Men&apos;z <span style={{ color: 'var(--gold)' }}>Kingdom</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div style={{ display: 'flex', alignItems: 'center', height: '100%', flex: 1 }} className="hidden-mobile">
            <Link href="/" style={linkStyle('/')}>Home</Link>

            {/* Shop mega dropdown */}
            <div style={{ position: 'relative', height: '100%' }}
              onMouseEnter={() => setShopOpen(true)}
              onMouseLeave={() => setShopOpen(false)}>
              <button style={{ ...linkStyle('/shop'), background: 'none', border: 'none', cursor: 'pointer', gap: 4 }}>
                Shop <ChevronDown size={12} style={{ transition: 'transform 0.2s', transform: shopOpen ? 'rotate(180deg)' : 'rotate(0)' }} />
              </button>
              {shopOpen && (
                <div style={{
                  position: 'absolute', top: '100%', left: 0,
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  borderTop: '2px solid var(--gold)',
                  padding: '24px 28px',
                  display: 'flex', gap: 32,
                  minWidth: 560,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                  zIndex: 200,
                }}>
                  {Object.entries(shopLinks).map(([col, links]) => (
                    <div key={col} style={{ flex: 1 }}>
                      <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--text3)', marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid var(--border)' }}>{col}</div>
                      {links.map(l => (
                        <Link key={l.href} href={l.href} onClick={() => setShopOpen(false)} style={{ display: 'block', fontSize: 13, color: 'var(--text2)', padding: '6px 0', textDecoration: 'none', transition: 'color 0.15s, padding-left 0.15s' }}
                          onMouseEnter={e => { (e.target as HTMLElement).style.color = 'var(--gold)'; (e.target as HTMLElement).style.paddingLeft = '6px'; }}
                          onMouseLeave={e => { (e.target as HTMLElement).style.color = 'var(--text2)'; (e.target as HTMLElement).style.paddingLeft = '0'; }}>
                          {l.label}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Link href="/about" style={linkStyle('/about')}>About</Link>
            <Link href="/contact" style={linkStyle('/contact')}>Contact</Link>
          </div>

          {/* Right actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginLeft: 'auto' }}>
            {/* Theme toggle */}
            <button onClick={toggle} style={{ background: 'var(--bg3)', border: '1px solid var(--border)', color: 'var(--text)', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'border-color 0.15s' }}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
              {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            {/* Cart */}
            <button className="cart-btn" onClick={() => setCartOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--gold)', color: '#000', border: 'none', padding: '9px 18px', fontSize: 11, fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase', cursor: 'pointer', whiteSpace: 'nowrap' }}>
              <ShoppingCart size={14} />
              <span className="cart-label">Cart</span>
              {count > 0 && (
                <span style={{ background: '#000', color: 'var(--gold)', width: 18, height: 18, borderRadius: '50%', fontSize: 10, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{count}</span>
              )}
            </button>

            {/* Hamburger */}
            <button onClick={() => setMobileOpen(!mobileOpen)} style={{ background: 'none', border: 'none', color: 'var(--text)', cursor: 'pointer', display: 'none' }} className="show-mobile">
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div style={{ borderTop: '1px solid var(--border)', padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 0, background: 'var(--bg)' }}>
            {[{ label: 'Home', href: '/' }, { label: 'Shop', href: '/shop' }, { label: 'About', href: '/about' }, { label: 'Contact', href: '/contact' }].map(l => (
              <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)} style={{ padding: '14px 0', fontSize: 14, fontWeight: 600, color: 'var(--text)', textDecoration: 'none', borderBottom: '1px solid var(--border)', letterSpacing: '0.5px' }}>
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </nav>

      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
          .nav-inner { padding: 0 14px !important; gap: 6px !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
        @media (max-width: 400px) {
          .brand-name { font-size: 14px !important; }
        }
        @media (max-width: 340px) {
          .cart-label { display: none !important; }
          .cart-btn { padding: 9px 12px !important; }
        }
      `}</style>
    </>
  )
}
