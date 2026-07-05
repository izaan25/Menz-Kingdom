'use client'
import { createContext, useContext, useState, useCallback } from 'react'

type ToastCtx = { show: (msg: string, icon?: string) => void }
const Ctx = createContext<ToastCtx>({ show: () => {} })
export const useToast = () => useContext(Ctx)

export default function Toast() {
  const [toasts, setToasts] = useState<{ id: number; msg: string; icon: string }[]>([])

  const show = useCallback((msg: string, icon = '✅') => {
    const id = Date.now()
    setToasts(p => [...p, { id, msg, icon }])
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3000)
  }, [])

  return (
    <Ctx.Provider value={{ show }}>
      <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {toasts.map(t => (
          <div key={t.id} style={{
            background: 'var(--bg3)',
            border: '1px solid var(--border2)',
            borderLeft: '3px solid var(--gold)',
            padding: '14px 20px',
            fontSize: 13,
            color: 'var(--text)',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            maxWidth: 300,
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            animation: 'fadeUp 0.3s ease',
          }}>
            <span>{t.icon}</span>
            <span>{t.msg}</span>
          </div>
        ))}
      </div>
      <style>{`@keyframes fadeUp { from { opacity:0; transform:translateY(16px) } to { opacity:1; transform:translateY(0) } }`}</style>
    </Ctx.Provider>
  )
}
