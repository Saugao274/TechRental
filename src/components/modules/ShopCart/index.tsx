'use client'

import { useEffect, useState, useMemo } from 'react'
import { Button, Input, Skeleton } from 'antd'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

import { useAuth } from '@/context/AuthContext'
import { useCart } from '@/context/CartContext'
import type { CartItem } from '@/context/CartContext'

export default function CartPage() {
    const { items, updateItem, removeItem, clear } = useCart()
    const { user, loading } = useAuth()
    const router = useRouter()

    const [mounted, setMounted] = useState(false)
    useEffect(() => setMounted(true), [])

    const [selectedIds, setSelectedIds] = useState<string[]>([])
    const [currentPage, setCurrentPage] = useState(1)
    const productsPerPage = 6
    const [couponCode, setCouponCode] = useState('')

    const shouldPaginate = items.length > productsPerPage
    const totalPages = Math.ceil(items.length / productsPerPage)

    const currentProducts = useMemo(
        () =>
            shouldPaginate
                ? items.slice(
                      (currentPage - 1) * productsPerPage,
                      currentPage * productsPerPage,
                  )
                : items,
        [items, currentPage, shouldPaginate],
    )

    const uniqueShops = useMemo(
        () => Array.from(new Set(currentProducts.map((p) => p.shop))),
        [currentProducts],
    )

    const total = useMemo(
        () =>
            selectedIds.reduce((sum, id) => {
                const p = items.find((i) => i.id === id)
                return p ? sum + p.price * p.quantity * p.days : sum
            }, 0),
        [selectedIds, items],
    )

    /* ----------- handlers ----------- */
    const toggleSelect = (id: string) =>
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
        )

    const toggleShop = (shop: string, checked: boolean) => {
        const idsInShop = items.filter((p) => p.shop === shop).map((p) => p.id)
        setSelectedIds((prev) =>
            checked
                ? Array.from(new Set([...prev, ...idsInShop]))
                : prev.filter((id) => !idsInShop.includes(id)),
        )
    }

    const handleInput = (
        id: string,
        field: 'quantity' | 'days',
        value: string,
    ) => {
        const num = Math.max(1, parseInt(value) || 1)
        updateItem(id, { [field]: num })
    }

    useEffect(() => {
        if (mounted && !loading && !user) router.replace('/signIn')
    }, [mounted, loading, user, router])

    const ProductItem = ({ product }: { product: CartItem }) => (
        <div className="product-item flex flex-col items-start justify-between border-b border-gray-200 bg-transparent px-4 py-4 md:flex-row md:items-center md:px-6">
            <div className="mb-3 flex w-full items-center gap-2 md:mb-0 md:w-auto md:gap-4">
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={selectedIds.includes(product.id)}
                        onChange={() => toggleSelect(product.id)}
                        className="h-4 w-4 md:h-5 md:w-5"
                    />
                    <button
                        onClick={() => removeItem(product.id)}
                        className="text-sm text-gray-400 hover:text-red-500"
                        aria-label="Xóa sản phẩm"
                    >
                        ✕
                    </button>
                </div>
                <div className="h-16 w-16 flex-shrink-0 md:h-20 md:w-20">
                    <img
                        className="h-full w-full object-contain"
                        src={product.image || '/placeholder.svg'}
                        alt={product.name}
                    />
                </div>
                <div className="min-w-0 flex-1">
                    <h3 className="line-clamp-1 text-xs font-medium text-gray-800 md:text-sm">
                        {product.name}
                    </h3>
                    <p className="line-clamp-1 text-xs text-gray-500 md:line-clamp-2">
                        {product.shop}
                    </p>
                </div>
            </div>

            <div className="grid w-full grid-cols-2 items-start gap-3 md:flex md:w-auto md:items-center md:gap-4">
                <div className="flex flex-col md:block">
                    <span className="text-xs font-medium text-gray-600 md:hidden">
                        Đơn giá:
                    </span>
                    <span className="text-xs font-medium text-gray-800 md:w-24 md:text-center md:text-sm">
                        {product.price.toLocaleString('vi-VN')}đ
                    </span>
                </div>

                <div className="flex flex-col items-start gap-1 md:flex-row md:items-center md:gap-2">
                    <span className="text-xs font-medium text-gray-600 md:hidden">
                        Số lượng:
                    </span>
                    <Input
                        value={product.quantity}
                        onChange={(e) =>
                            handleInput(product.id, 'quantity', e.target.value)
                        }
                        className="h-8 w-10 rounded-none border-gray-300 text-center text-xs md:h-10 md:text-sm"
                    />
                </div>

                <div className="flex flex-col items-start gap-1 md:flex-row md:items-center md:gap-2">
                    <span className="text-xs font-medium text-gray-600 md:hidden">
                        Thời gian thuê:
                    </span>
                    <div className="flex items-center gap-1">
                        <div>
                            <Input
                                value={product.days}
                                onChange={(e) =>
                                    handleInput(
                                        product.id,
                                        'days',
                                        e.target.value,
                                    )
                                }
                                className="h-8 w-10 rounded-none border-gray-300 text-center text-xs md:h-10 md:text-sm"
                            />
                        </div>

                        <span className="text-xs text-gray-600 md:text-sm">
                            ngày
                        </span>
                    </div>
                </div>

                <div className="flex flex-col md:block">
                    <span className="text-xs font-medium text-gray-600 md:hidden">
                        Thành tiền:
                    </span>
                    <span className="text-xs font-medium text-gray-800 md:w-24 md:text-center md:text-sm">
                        {(
                            product.price *
                            product.quantity *
                            product.days
                        ).toLocaleString('vi-VN')}
                        đ
                    </span>
                </div>
            </div>
        </div>
    )

    const ShopSection = ({ shop }: { shop: string }) => (
        <div className="shop-section mb-4 bg-white/80 shadow-sm md:mb-6">
            <div className="flex h-10 items-center gap-2 border-b bg-transparent px-4 md:h-12 md:px-6">
                <input
                    type="checkbox"
                    checked={items
                        .filter((p) => p.shop === shop)
                        .every((p) => selectedIds.includes(p.id))}
                    onChange={(e) => toggleShop(shop, e.target.checked)}
                    className="h-4 w-4 md:h-5 md:w-5"
                />
                <span className="text-xs font-medium text-gray-800 md:text-sm">
                    {shop} <span className="text-blue-500">⨯</span>
                </span>
            </div>

            {currentProducts
                .filter((p) => p.shop === shop)
                .map((p) => (
                    <ProductItem key={p.id} product={p} />
                ))}
        </div>
    )

    if (!mounted || loading)
        return (
            <div className="p-10">
                <Skeleton active />
            </div>
        )

    if (!user) return null

    return (
        <div className="min-h-screen py-4 md:py-8">
            <div className="mx-auto max-w-6xl px-4">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 text-center text-xl font-bold text-gray-800 md:mb-8 md:text-3xl"
                >
                    Giỏ hàng
                </motion.h1>

                {items.length === 0 ? (
                    <p className="text-center text-gray-500">Giỏ hàng trống.</p>
                ) : (
                    <div className="flex flex-col gap-4 md:gap-8">
                        <div className="rounded-lg shadow-sm bg-white/80">
                            <div className="hidden items-center justify-between border-b bg-white/80 rounded-t-lg border-gray-200 px-6 py-4 text-sm font-semibold text-gray-600 md:flex">
                                <span className="w-1/3">Sản phẩm</span>
                                <div className="flex w-2/3 justify-between">
                                    <span className="w-24 text-center">
                                        Đơn giá
                                    </span>
                                    <span className="w-24 text-center">
                                        Số lượng
                                    </span>
                                    <span className="w-24 text-center">
                                        Thời gian thuê
                                    </span>
                                    <span className="w-24 text-center">
                                        Thành tiền
                                    </span>
                                </div>
                            </div>

                            {uniqueShops.map((shop) => (
                                <ShopSection key={shop} shop={shop} />
                            ))}

                            <div className="flex flex-col items-center gap-2 border-t border-gray-200 px-4 py-4 md:flex-row md:justify-between md:px-6">
                                <div className="flex w-full flex-col items-center gap-2 md:w-auto md:flex-row">
                                    <span className="text-xs text-gray-600 md:text-sm">
                                        Mã giảm giá cho Shop
                                    </span>
                                    <Input
                                        placeholder="Nhập mã"
                                        value={couponCode}
                                        onChange={(e) =>
                                            setCouponCode(e.target.value)
                                        }
                                        className="h-8 w-full rounded-none border-gray-300 md:h-10 md:w-48"
                                    />
                                    <Button
                                        onClick={() =>
                                            alert('Đã áp dụng mã giảm giá!')
                                        }
                                        className="h-8 w-full rounded-none bg-blue-500 text-xs text-white hover:bg-blue-600 md:h-10 md:w-32 md:text-sm"
                                    >
                                        Áp dụng
                                    </Button>
                                </div>

                                <Button
                                    danger
                                    onClick={clear}
                                    className="h-8 w-full rounded-none border border-gray-300 text-xs md:h-10 md:w-32 md:text-sm"
                                >
                                    ✕ Xóa giỏ hàng
                                </Button>
                            </div>

                            {shouldPaginate && (
                                <div className="mt-4 flex justify-center gap-2">
                                    <Button
                                        disabled={currentPage === 1}
                                        onClick={() =>
                                            setCurrentPage((p) => p - 1)
                                        }
                                        className="h-8 w-24 rounded-none border border-gray-300 text-xs md:h-10 md:w-32 md:text-sm"
                                    >
                                        Trang trước
                                    </Button>
                                    <span className="flex items-center text-xs text-gray-600 md:text-sm">
                                        Trang {currentPage} / {totalPages}
                                    </span>
                                    <Button
                                        disabled={currentPage === totalPages}
                                        onClick={() =>
                                            setCurrentPage((p) => p + 1)
                                        }
                                        className="h-8 w-24 rounded-none border border-gray-300 text-xs md:h-10 md:w-32 md:text-sm"
                                    >
                                        Trang sau
                                    </Button>
                                </div>
                            )}
                        </div>

                        <div className="mx-auto bg-white/80 w-full rounded-lg p-4 shadow-sm md:w-[400px] md:p-6">
                            <h2 className="mb-3 text-base font-semibold text-gray-800 md:mb-4 md:text-lg">
                                Tổng giỏ hàng
                            </h2>
                            <div className="mb-3 flex justify-between md:mb-4">
                                <span className="text-xs text-gray-600 md:text-sm">
                                    Tổng phụ
                                </span>
                                <span className="text-xs font-medium text-gray-800 md:text-sm">
                                    {total.toLocaleString('vi-VN')}đ
                                </span>
                            </div>
                            <div className="mb-4 flex justify-between md:mb-6">
                                <span className="text-xs text-gray-600 md:text-sm">
                                    Tổng cộng ({selectedIds.length} sản phẩm)
                                </span>
                                <span className="text-base font-semibold text-red-600 md:text-lg">
                                    {total.toLocaleString('vi-VN')}đ
                                </span>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                disabled={total === 0}
                                className="flex h-10 w-full items-center justify-center gap-2 rounded-none bg-green-600 py-2 text-xs font-semibold text-white disabled:opacity-60 md:h-12 md:py-3 md:text-sm"
                                onClick={() =>
                                    router.push(
                                        `/personal/${user._id}/payment?total=${total}&products=${encodeURIComponent(
                                            JSON.stringify(
                                                items.filter((i) =>
                                                    selectedIds.includes(i.id),
                                                ),
                                            ),
                                        )}`,
                                    )
                                }
                            >
                                <span>✓</span> Tiến hành thanh toán
                            </motion.button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
