'use client'
const items = [
  '🚚 FREE DELIVERY ON ALL ORDERS',
  '💵 CASH ON DELIVERY AVAILABLE NATIONWIDE',
  '✅ 100% AUTHENTIC — NO REPLICAS EVER',
  '🔄 EASY 7-DAY RETURNS',
  '👑 GIVE GREAT SHOES A SECOND THRONE',
]

export default function AnnouncementBar() {
  const repeated = [...items, ...items]
  return (
    <div style={{ background: 'var(--gold)', color: '#000', height: 36, overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
      <div className="ticker-track" style={{ display: 'flex', whiteSpace: 'nowrap', alignItems: 'center' }}>
        {repeated.map((item, i) => (
          <span key={i} style={{ padding: '0 40px', fontSize: 11, fontWeight: 800, letterSpacing: '1px', flexShrink: 0 }}>
            {item}
            <span style={{ margin: '0 20px', opacity: 0.4 }}>•</span>
          </span>
        ))}
      </div>
    </div>
  )
}
