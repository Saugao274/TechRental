'use client'

import { Button, Input } from 'antd'
import React, { useState } from 'react'
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
        const numValue = Math.max(1, parseInt(value) || 1)
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
        <div className="product-item flex items-center justify-between border-b border-gray-200 bg-transparent px-6 py-4">
            <div className="product-info flex items-center gap-4">
                <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => handleSelectProduct(product.id)}
                    className="h-5 w-5"
                />
                <button
                    onClick={() => handleSelectProduct(product.id)}
                    className="text-gray-400 hover:text-red-500"
                >
                    ✕
                </button>
                <div className="h-20 w-20">
                    <img
                        className="h-full w-full object-contain"
                        alt={product.name}
                        src={product.image}
                    />
                </div>
                <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-800">
                        {product.name}
                    </h3>
                    <p className="line-clamp-2 text-xs text-gray-500">
                        {product.description}
                    </p>
                </div>
            </div>
            <div className="product-details flex items-center gap-4">
                <span className="price w-24 text-center text-sm font-medium text-gray-800">
                    {product.priceDisplay}
                </span>
                <div className="quantity flex items-center gap-2">
                    <Input
                        value={product.quantity}
                        onChange={(e) =>
                            handleInputChange(
                                product.id,
                                'quantity',
                                e.target.value,
                            )
                        }
                        className="h-10 w-16 rounded-none border-gray-300 text-center text-sm"
                    />
                </div>
                <div className="days flex items-center gap-2">
                    <Input
                        value={product.days}
                        onChange={(e) =>
                            handleInputChange(
                                product.id,
                                'days',
                                e.target.value,
                            )
                        }
                        className="h-10 w-16 rounded-none border-gray-300 text-center text-sm"
                    />
                    <span className="text-sm text-gray-600">ngày</span>
                </div>
                <span className="total w-24 text-center text-sm font-medium text-gray-800">
                    {(
                        product.price *
                        product.quantity *
                        product.days
                    ).toLocaleString('vi-VN')}
                    đ
                </span>
            </div>
        </div>
    )

    const ShopSection = ({ shopName }: { shopName: string }) => (
        <div className="shop-section mb-6 rounded-lg border border-gray-200 bg-transparent shadow-sm">
            <div className="shop-header flex h-12 items-center gap-2 border-b border-gray-200 bg-transparent px-6">
                <input
                    type="checkbox"
                    checked={products
                        .filter((p) => p.shop === shopName)
                        .every((p) => selectedProducts.includes(p.id))}
                    onChange={(e) =>
                        handleSelectShop(shopName, e.target.checked)
                    }
                    className="h-5 w-5"
                />
                <span className="text-sm font-medium text-gray-800">
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
            <div className="min-h-screen py-8">
                <div className="main-content mx-auto max-w-6xl px-4">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8 text-center text-3xl font-bold text-gray-800"
                    >
                        Giỏ hàng
                    </motion.h1>

                    <div className="content-wrapper flex flex-col gap-8">
                        <div className="flex-1 rounded-lg bg-transparent shadow-sm">
                            <div className="product-header flex items-center justify-between border-b border-gray-200 bg-transparent px-6 py-4 text-sm font-semibold text-gray-600">
                                <span>Chọn tất cả</span>
                                <span>Sản phẩm</span>
                                <span>Đơn giá</span>
                                <span>Số lượng</span>
                                <span>Thời gian thuê</span>
                                <span>Thành tiền</span>
                            </div>
                            {uniqueShops.map((shopName) => (
                                <ShopSection
                                    key={shopName}
                                    shopName={shopName}
                                />
                            ))}

                            <div
                                style={{ justifyContent: 'center' }}
                                className="coupon-section mb-6 flex items-center gap-3 border-t border-gray-200 bg-transparent px-6 py-4"
                            >
                                <span className="text-sm text-gray-600">
                                    Mã giảm giá cho Shop
                                </span>
                                <Input
                                    style={{ width: '25%' }}
                                    placeholder="Nhập mã"
                                    value={couponCode}
                                    onChange={(e) =>
                                        setCouponCode(e.target.value)
                                    }
                                    className="h-50 w-300 rounded-none border-gray-300"
                                />
                                <Button
                                    className="h-10 w-32 rounded-none bg-blue-500 text-white hover:bg-blue-600"
                                    onClick={() =>
                                        alert('Đã áp dụng mã giảm giá!')
                                    }
                                >
                                    Áp dụng
                                </Button>
                                <Button
                                    className="h-10 w-32 rounded-none border border-gray-300 text-gray-800 hover:bg-gray-100"
                                    onClick={() => setProducts([])}
                                >
                                    ✕ Xóa giỏ hàng
                                </Button>
                            </div>

                            {shouldPaginate && (
                                <div className="pagination mt-4 flex justify-center gap-2">
                                    <Button
                                        disabled={currentPage === 1}
                                        onClick={() =>
                                            setCurrentPage((prev) => prev - 1)
                                        }
                                        className="h-10 w-32 rounded-none border border-gray-300 text-sm"
                                    >
                                        Trang trước
                                    </Button>
                                    <span className="text-sm text-gray-600">
                                        Trang {currentPage} của {totalPages}
                                    </span>
                                    <Button
                                        disabled={currentPage === totalPages}
                                        onClick={() =>
                                            setCurrentPage((prev) => prev + 1)
                                        }
                                        className="h-10 w-32 rounded-none border border-gray-300 text-sm"
                                    >
                                        Trang sau
                                    </Button>
                                </div>
                            )}
                        </div>

                        <div className="cart-total mx-auto w-[400px] rounded-lg bg-transparent p-6 shadow-sm">
                            <h2 className="mb-4 text-lg font-semibold text-gray-800">
                                Tổng giỏ hàng
                            </h2>
                            <div className="mb-4 flex justify-between">
                                <span className="text-sm text-gray-600">
                                    Tổng phụ
                                </span>
                                <span className="text-sm font-medium text-gray-800">
                                    {total.toLocaleString('vi-VN')}đ
                                </span>
                            </div>
                            <div className="mb-6 flex justify-between">
                                <span className="text-sm text-gray-600">
                                    Tổng cộng ({selectedProductCount} sản phẩm)
                                </span>
                                <span className="text-lg font-semibold text-red-600">
                                    {total.toLocaleString('vi-VN')}đ
                                </span>
                            </div>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="flex w-full animate-pulse items-center justify-center gap-2 rounded-none bg-green-500 py-3 text-sm font-semibold text-white hover:bg-green-600"
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

            <style jsx>{`
                .min-h-screen {
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                }
                .main-content {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                }
                .content-wrapper {
                    flex: 1;
                }

                @media (max-width: 768px) {
                    /* Điều chỉnh container chính */
                    .min-h-screen {
                        padding: 1rem;
                        min-height: 100vh;
                        height: auto; /* Để chiều cao tự động theo nội dung */
                    }
                    .mx-auto.max-w-6xl {
                        max-width: 100%;
                        padding: 0 1rem;
                    }

                    /* Tiêu đề giỏ hàng */
                    .text-3xl {
                        font-size: 1.5rem;
                        text-align: left;
                    }

                    /* Product Item */
                    .product-item {
                        flex-direction: column;
                        align-items: flex-start;
                        padding: 1rem;
                        gap: 1rem;
                    }
                    .product-info {
                        width: 100%;
                        flex-direction: row;
                        align-items: center;
                        margin-bottom: 0.5rem;
                    }
                    .h-20.w-20 {
                        width: 48px;
                        height: 48px;
                    }
                    .flex-1 {
                        width: 100%;
                    }
                    .text-sm.font-medium {
                        font-size: 0.875rem;
                    }
                    .line-clamp-2.text-xs {
                        font-size: 0.75rem;
                        line-clamp: 1;
                    }
                    .product-details {
                        flex-direction: column;
                        align-items: flex-start;
                        width: 100%;
                        gap: 0.5rem;
                    }
                    .price,
                    .quantity,
                    .days {
                        width: 100%;
                        display: flex;
                        justify-content: space-between;
                        font-size: 0.875rem;
                    }
                    .total {
                        width: 100%;
                        display: block; /* Giá tiền tổng xuống hàng */
                        font-size: 0.875rem;
                        text-align: left;
                        margin-top: 0.5rem;
                    }
                    .h-10.w-16 {
                        width: 40px;
                        height: 32px;
                        font-size: 0.75rem;
                    }
                    .text-sm.text-gray-600 {
                        font-size: 0.75rem;
                    }

                    /* Header danh sách sản phẩm */
                    .product-header {
                        display: none; /* Ẩn header trên mobile */
                    }

                    /* Shop Section */
                    .shop-section {
                        margin-bottom: 1rem;
                    }
                    .shop-header {
                        padding: 0.5rem 1rem;
                    }
                    .text-sm.font-medium.text-gray-800 {
                        font-size: 0.875rem;
                    }

                    /* Coupon Section */
                    .coupon-section {
                        flex-direction: column;
                        align-items: stretch;
                        padding: 1rem;
                        gap: 0.5rem;
                        margin-bottom: 0;
                    }
                    .w-300,
                    input[style*='width: 25%'] {
                        width: 100% !important;
                        height: 32px !important;
                    }
                    .h-10.w-32 {
                        width: 100%;
                        height: 32px;
                        margin-top: 0.5rem;
                        font-size: 0.875rem;
                    }

                    /* Pagination */
                    .pagination {
                        flex-direction: row;
                        align-items: center;
                        gap: 0.5rem;
                        margin-bottom: 0;
                    }
                    .h-10.w-32 {
                        width: 100px;
                        height: 32px;
                        font-size: 0.75rem;
                    }
                    .text-sm.text-gray-600 {
                        font-size: 0.75rem;
                    }

                    /* Tổng giỏ hàng */
                    .cart-total {
                        width: 100%;
                        padding: 1rem;
                        margin-bottom: 1rem; /* Thêm margin để tạo khoảng cách ở cuối trang */
                    }
                    .text-lg {
                        font-size: 1rem;
                    }
                    .text-sm {
                        font-size: 0.75rem;
                    }
                    .flex.w-full {
                        height: 40px;
                        font-size: 0.875rem;
                    }
                }
            `}</style>
        </>
    ) : (
        <SignIn />
    )
}
