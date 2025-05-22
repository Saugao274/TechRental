'use client'

import { Button, Input } from 'antd'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import SignIn from '../SignIn'
import { useAuth } from '@/context/AuthContext'

interface Product {
    id: number
    shop: string
    name: string
    description: string
    quantity: number
    availableQuantity: number
    price: number
    priceDisplay: string
    image: string
    days: number
}

export default function CartPage(): JSX.Element {
    const initialProducts: Product[] = [
        {
            id: 1,
            shop: 'Shop_mayanhvn',
            name: 'ĐÈN FLASH GODOX V860III',
            description: 'Godox V860III là phiên bản nâng cấp của V850II.',
            quantity: 2,
            availableQuantity: 30,
            price: 150000,
            priceDisplay: '150.000đ',
            image: 'https://tse3.mm.bing.net/th?id=OIP.Tk-zyaMmnDTvKU4WjhHkAQHaHa&pid=Api&P=0&h=220',
            days: 1,
        },
        {
            id: 2,
            shop: 'Shop_mayanhvn',
            name: 'OSMO POCKET 3',
            description: 'Gimbal giá rẻ, quay 4K/120fps, cảm biến 1 inch.',
            quantity: 1,
            availableQuantity: 252,
            price: 700000,
            priceDisplay: '700.000đ',
            image: 'https://tse1.mm.bing.net/th?id=OIP.J9bna2G4uiIGIGcaPzYI-wHaD4&pid=Api&P=0&h=220',
            days: 1,
        },
        {
            id: 3,
            shop: 'Shop_maytinhvn',
            name: 'MacBook Pro 14 M4 Max',
            description:
                'Chip M4 Max mạnh mẽ, đen lịch lãm, hiệu năng đỉnh cao.',
            quantity: 2,
            availableQuantity: 5,
            price: 2000000,
            priceDisplay: '2.000.000đ',
            image: 'https://tse4.mm.bing.net/th?id=OIF.3nGmzTmWnd8MyHWGVJUKiQ&pid=Api&P=0&h=220',
            days: 1,
        },
        {
            id: 4,
            shop: 'Shop_maytinhvn',
            name: 'Laptop MSI Modern 14 C12MO-660VN',
            description:
                'CPU Intel Core i5-1235U, ổ cứng SSD 512GB, màn hình 14 inch.',
            quantity: 1,
            availableQuantity: 56,
            price: 700000,
            priceDisplay: '700.000đ',
            image: 'https://tse4.mm.bing.net/th?id=OIP.yH03xmDauFTCSZjxeqC1OAHaHa&pid=Api&P=0&h=220',
            days: 1,
        },
        {
            id: 5,
            shop: 'Shop_tivi.hanoi',
            name: 'SMART TIVI NanoCell LG 4K 55 INCH',
            description:
                'Màn hình 55 inch tinh tế, hình ảnh chân thực, màu sắc sống động.',
            quantity: 2,
            availableQuantity: 1,
            price: 100000,
            priceDisplay: '100.000đ',
            image: 'https://tse1.mm.bing.net/th?id=OIP.OiZfALhavRQwVM91AWs_ZwHaHa&pid=Api&P=0&h=220',
            days: 1,
        },
    ]

    const [selectedProducts, setSelectedProducts] = useState<number[]>([])
    const [products, setProducts] = useState<Product[]>(initialProducts)
    const [currentPage, setCurrentPage] = useState(1)
    const [couponCode, setCouponCode] = useState<string>('')
    const productsPerPage = 6
    const router = useRouter()

    const shouldPaginate = products.length > productsPerPage
    const totalPages = Math.ceil(products.length / productsPerPage)
    const indexOfLastProduct = currentPage * productsPerPage
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage
    const currentProducts = shouldPaginate
        ? products.slice(indexOfFirstProduct, indexOfLastProduct)
        : products

    const uniqueShops = Array.from(new Set(currentProducts.map((p) => p.shop)))

    const handleSelectProduct = (productId: number) => {
        setSelectedProducts((prev) => {
            if (prev.includes(productId)) {
                return prev.filter((id) => id !== productId)
            } else {
                return [...prev, productId]
            }
        })
    }

    const handleSelectShop = (shopName: string, isChecked: boolean) => {
        const shopProductIds = products
            .filter((p) => p.shop === shopName)
            .map((p) => p.id)
        setSelectedProducts((prev) =>
            isChecked
                ? Array.from(new Set([...prev, ...shopProductIds]))
                : prev.filter((id) => !shopProductIds.includes(id)),
        )
    }

    const handleInputChange = (
        id: number,
        field: 'quantity' | 'days',
        value: string,
    ) => {
        const numValue = Math.max(1, Number.parseInt(value) || 1)
        setProducts((prev) =>
            prev.map((p) => (p.id === id ? { ...p, [field]: numValue } : p)),
        )
    }

    const total = selectedProducts.reduce((sum, id) => {
        const product = products.find((p) => p.id === id)
        return product
            ? sum + product.price * product.quantity * product.days
            : sum
    }, 0)

    const selectedProductCount = selectedProducts.length

    const ProductItem = ({ product }: { product: Product }) => (
        <div className="product-item flex flex-col items-start justify-between border-b border-gray-200 bg-transparent px-4 py-4 md:flex-row md:items-center md:px-6">
            <div className="product-info mb-3 flex w-full items-center gap-2 md:mb-0 md:w-auto md:gap-4">
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={selectedProducts.includes(product.id)}
                        onChange={() => handleSelectProduct(product.id)}
                        className="h-4 w-4 md:h-5 md:w-5"
                    />
                    <button
                        onClick={() => handleSelectProduct(product.id)}
                        className="text-sm text-gray-400 hover:text-red-500"
                    >
                        ✕
                    </button>
                </div>
                <div className="h-16 w-16 flex-shrink-0 md:h-20 md:w-20">
                    <img
                        className="h-full w-full object-contain"
                        alt={product.name}
                        src={product.image || '/placeholder.svg'}
                    />
                </div>
                <div className="min-w-0 flex-1">
                    <h3 className="line-clamp-1 text-xs font-medium text-gray-800 md:text-sm">
                        {product.name}
                    </h3>
                    <p className="line-clamp-1 text-xs text-gray-500 md:line-clamp-2">
                        {product.description}
                    </p>
                </div>
            </div>
            <div className="product-details grid w-full grid-cols-2 items-start gap-3 md:flex md:w-auto md:items-center md:gap-4">
                <div className="flex flex-col md:block">
                    <span className="text-xs font-medium text-gray-600 md:hidden">
                        Đơn giá:
                    </span>
                    <span className="price text-xs font-medium text-gray-800 md:w-24 md:text-center md:text-sm">
                        {product.priceDisplay}
                    </span>
                </div>
                <div className="quantity flex flex-col items-start gap-1 md:flex-row md:items-center md:gap-2">
                    <span className="text-xs font-medium text-gray-600 md:hidden">
                        Số lượng:
                    </span>
                    <Input
                        value={product.quantity}
                        onChange={(e) =>
                            handleInputChange(
                                product.id,
                                'quantity',
                                e.target.value,
                            )
                        }
                        className="h-8 w-16 rounded-none border-gray-300 text-center text-xs md:h-10 md:text-sm"
                    />
                </div>
                <div className="days flex flex-col items-start gap-1 md:flex-row md:items-center md:gap-2">
                    <span className="text-xs font-medium text-gray-600 md:hidden">
                        Thời gian thuê:
                    </span>
                    <div className="flex items-center gap-1">
                        <Input
                            value={product.days}
                            onChange={(e) =>
                                handleInputChange(
                                    product.id,
                                    'days',
                                    e.target.value,
                                )
                            }
                            className="h-8 w-16 rounded-none border-gray-300 text-center text-xs md:h-10 md:text-sm"
                        />
                        <span className="text-xs text-gray-600 md:text-sm">
                            ngày
                        </span>
                    </div>
                </div>
                <div className="flex flex-col md:block">
                    <span className="text-xs font-medium text-gray-600 md:hidden">
                        Thành tiền:
                    </span>
                    <span className="total text-xs font-medium text-gray-800 md:w-24 md:text-center md:text-sm">
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

    const ShopSection = ({ shopName }: { shopName: string }) => (
        <div className="shop-section mb-4 rounded-lg border border-gray-200 bg-transparent shadow-sm md:mb-6">
            <div className="shop-header flex h-10 items-center gap-2 border-b border-gray-200 bg-transparent px-4 md:h-12 md:px-6">
                <input
                    type="checkbox"
                    checked={products
                        .filter((p) => p.shop === shopName)
                        .every((p) => selectedProducts.includes(p.id))}
                    onChange={(e) =>
                        handleSelectShop(shopName, e.target.checked)
                    }
                    className="h-4 w-4 md:h-5 md:w-5"
                />
                <span className="text-xs font-medium text-gray-800 md:text-sm">
                    {shopName} <span className="text-blue-500">⨯</span>
                </span>
            </div>
            {currentProducts
                .filter((p) => p.shop === shopName)
                .map((product) => (
                    <ProductItem key={product.id} product={product} />
                ))}
        </div>
    )

    const { user } = useAuth()

    return user ? (
        <>
            <div className="min-h-screen py-4 md:py-8">
                <div className="main-content mx-auto max-w-6xl px-4">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-4 text-center text-xl font-bold text-gray-800 md:mb-8 md:text-center md:text-3xl"
                    >
                        Giỏ hàng
                    </motion.h1>

                    <div className="content-wrapper flex flex-col gap-4 md:gap-8">
                        <div className="flex-1 rounded-lg bg-transparent shadow-sm">
                            <div className="product-header hidden items-center justify-between border-b border-gray-200 bg-transparent px-6 py-4 text-sm font-semibold text-gray-600 md:flex">
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
                            {uniqueShops.map((shopName) => (
                                <ShopSection
                                    key={shopName}
                                    shopName={shopName}
                                />
                            ))}

                            <div className="coupon-section items- mb-4 flex flex-col justify-center gap-2 border-t border-gray-200 bg-transparent px-4 py-4 md:mb-6 md:flex-row md:items-center md:gap-3 md:px-6">
                                <span className="text-xs text-gray-600 md:text-sm">
                                    Mã giảm giá cho Shop
                                </span>
                                <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row">
                                    <Input
                                        placeholder="Nhập mã"
                                        value={couponCode}
                                        onChange={(e) =>
                                            setCouponCode(e.target.value)
                                        }
                                        className="h-8 w-full rounded-none border-gray-300 md:h-10 md:w-48"
                                    />
                                    <Button
                                        className="h-8 w-full rounded-none bg-blue-500 text-xs text-white hover:bg-blue-600 md:h-10 md:w-32 md:text-sm"
                                        onClick={() =>
                                            alert('Đã áp dụng mã giảm giá!')
                                        }
                                    >
                                        Áp dụng
                                    </Button>
                                </div>
                                <div className="mt-2 w-full md:mt-0 md:w-auto">
                                    <Button
                                        className="h-8 w-full rounded-none border border-gray-300 text-xs text-gray-800 hover:bg-gray-100 md:h-10 md:w-32 md:text-sm"
                                        onClick={() => setProducts([])}
                                    >
                                        ✕ Xóa giỏ hàng
                                    </Button>
                                </div>
                            </div>

                            {shouldPaginate && (
                                <div className="pagination mt-4 flex justify-center gap-2">
                                    <Button
                                        disabled={currentPage === 1}
                                        onClick={() =>
                                            setCurrentPage((prev) => prev - 1)
                                        }
                                        className="h-8 w-24 rounded-none border border-gray-300 text-xs md:h-10 md:w-32 md:text-sm"
                                    >
                                        Trang trước
                                    </Button>
                                    <span className="flex items-center text-xs text-gray-600 md:text-sm">
                                        Trang {currentPage} của {totalPages}
                                    </span>
                                    <Button
                                        disabled={currentPage === totalPages}
                                        onClick={() =>
                                            setCurrentPage((prev) => prev + 1)
                                        }
                                        className="h-8 w-24 rounded-none border border-gray-300 text-xs md:h-10 md:w-32 md:text-sm"
                                    >
                                        Trang sau
                                    </Button>
                                </div>
                            )}
                        </div>

                        <div className="cart-total mx-auto w-full rounded-lg bg-transparent p-4 shadow-sm md:w-[400px] md:p-6">
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
                                    Tổng cộng ({selectedProductCount} sản phẩm)
                                </span>
                                <span className="text-base font-semibold text-red-600 md:text-lg">
                                    {total.toLocaleString('vi-VN')}đ
                                </span>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex h-10 w-full animate-pulse items-center justify-center gap-2 rounded-none bg-green-500 py-2 text-xs font-semibold text-white hover:bg-green-600 md:h-12 md:py-3 md:text-sm"
                                onClick={() =>
                                    router.push(
                                        `/personal/payment?total=${total}&products=${JSON.stringify(
                                            selectedProducts.map((id) =>
                                                products.find(
                                                    (p) => p.id === id,
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
                </div>
            </div>
        </>
    ) : (
        <SignIn />
    )
}
