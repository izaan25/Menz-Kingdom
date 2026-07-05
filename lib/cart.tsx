'use client'
import { createContext, useContext, useState, useEffect } from 'react'
import type { Product } from './supabase'

export type CartItem = {
  product: Product
  size: number
  qty: number
}

type CartCtx = {
  items: CartItem[]
  count: number
  total: number
  add: (product: Product, size: number) => void
  remove: (productId: string, size: number) => void
  clear: () => void
}

const CartContext = createContext<CartCtx>({
  items: [], count: 0, total: 0,
  add: () => {}, remove: () => {}, clear: () => {},
})

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('mk-cart')
    if (saved) setItems(JSON.parse(saved))
  }, [])

  useEffect(() => {
    localStorage.setItem('mk-cart', JSON.stringify(items))
  }, [items])

  const add = (product: Product, size: number) => {
    setItems(prev => {
      const ex = prev.find(i => i.product.id === product.id && i.size === size)
      if (ex) return prev.map(i => i.product.id === product.id && i.size === size ? { ...i, qty: i.qty + 1 } : i)
      return [...prev, { product, size, qty: 1 }]
    })
  }

  const remove = (productId: string, size: number) => {
    setItems(prev => prev.filter(i => !(i.product.id === productId && i.size === size)))
  }

  const clear = () => setItems([])

  const count = items.reduce((s, i) => s + i.qty, 0)
  const total = items.reduce((s, i) => s + i.product.price * i.qty, 0)

  return (
    <CartContext.Provider value={{ items, count, total, add, remove, clear }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
