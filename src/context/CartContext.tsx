'use client'

import { message } from 'antd'
import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from 'react'

export interface CartItem {
    id: string // idProduct
    name: string
    price: number
    image: string
    shop: string
    quantity: number
    days: number
}

interface CartCtx {
    items: CartItem[]
    addItem: (
        base: Omit<CartItem, 'quantity' | 'days'>,
        qty: number,
        days: number,
    ) => void
    updateItem: (
        id: string,
        data: Partial<Pick<CartItem, 'quantity' | 'days'>>,
    ) => void
    removeItem: (id: string) => void
    clear: () => void
}

const CartContext = createContext<CartCtx | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>(() => {
        if (typeof window === 'undefined') return [] // SSR safeguard
        try {
            return JSON.parse(localStorage.getItem('cart_items') || '[]')
        } catch {
            return []
        }
    })

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('cart_items', JSON.stringify(items))
        }
    }, [items])

    const addItem: CartCtx['addItem'] = (base, qty, days) => {
        setItems((prev) => {
            const existed = prev.find((i) => i.id === base.id)
            if (existed) {
                return prev.map((i) =>
                    i.id === base.id
                        ? { ...i, quantity: i.quantity + qty, days }
                        : i,
                )
            }
            return [...prev, { ...base, quantity: qty, days }]
        })
        message.success('Đã thêm vào giỏ hàng!')
    }

    const updateItem: CartCtx['updateItem'] = (id, data) =>
        setItems((prev) =>
            prev.map((i) => (i.id === id ? { ...i, ...data } : i)),
        )

    const removeItem = (id: string) =>
        setItems((prev) => prev.filter((i) => i.id !== id))

    const clear = () => setItems([])

    return (
        <CartContext.Provider
            value={{ items, addItem, updateItem, removeItem, clear }}
        >
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const ctx = useContext(CartContext)
    if (!ctx) throw new Error('useCart must be used within CartProvider')
    return ctx
}
