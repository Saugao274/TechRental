'use client'

import { Button, Input } from 'antd'
import React, { useState } from 'react'
import { motion } from 'framer-motion'

// Định nghĩa interface cho sản phẩm
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
    // Dữ liệu sản phẩm
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
            image: 'https://picsum.photos/200/200?random=1',
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
            image: 'https://picsum.photos/200/200?random=2',
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
            image: 'https://picsum.photos/200/200?random=3',
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
            image: 'https://picsum.photos/200/200?random=4',
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
            image: 'https://picsum.photos/200/200?random=5',
            days: 1,
        },
    ]

    // State
    const [selectedProducts, setSelectedProducts] = useState<number[]>([])
    const [products, setProducts] = useState<Product[]>(initialProducts)
    const [currentPage, setCurrentPage] = useState(1)
    const [couponCode, setCouponCode] = useState<string>('')
    const productsPerPage = 6

    // Logic phân trang
    const shouldPaginate = products.length > productsPerPage
    const totalPages = Math.ceil(products.length / productsPerPage)
    const indexOfLastProduct = currentPage * productsPerPage
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage
    const currentProducts = shouldPaginate
        ? products.slice(indexOfFirstProduct, indexOfLastProduct)
        : products

    // Lấy danh sách các shop duy nhất có sản phẩm trong currentProducts
    const uniqueShops = Array.from(new Set(currentProducts.map((p) => p.shop)))

    // Xử lý chọn sản phẩm
    const handleSelectProduct = (productId: number) => {
        setSelectedProducts((prev) => {
            if (prev.includes(productId)) {
                return prev.filter((id) => id !== productId)
            } else {
                return [...prev, productId]
            }
        })
    }

    // Xử lý chọn toàn bộ shop
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

    // Xử lý thay đổi số lượng và ngày
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

    // Tính tổng tiền
    const total = selectedProducts.reduce((sum, id) => {
        const product = products.find((p) => p.id === id)
        return product
            ? sum + product.price * product.quantity * product.days
            : sum
    }, 0)

    // Component hiển thị sản phẩm
    const ProductItem = ({ product }: { product: Product }) => (
        <div className="flex flex-col items-center justify-between border-b border-gray-200 px-6 py-4 md:flex-row">
            <div className="mb-4 flex items-center gap-6 md:mb-0">
                <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => handleSelectProduct(product.id)}
                    className="h-5 w-5"
                />
                <button
                    onClick={() => handleSelectProduct(product.id)}
                    className="text-gray-400 hover:text-gray-600"
                >
                    ✕
                </button>
                <div className="h-24 w-24">
                    <img
                        className="h-full w-full object-contain"
                        alt={product.name}
                        src={product.image}
                    />
                </div>
                <div className="flex flex-col">
                    <h3 className="text-sm font-medium text-gray-800">
                        {product.name}
                    </h3>
                    <p className="line-clamp-2 text-xs text-gray-500">
                        {product.description}
                    </p>
                </div>
            </div>
            <div className="flex flex-col items-center gap-6 md:flex-row">
                <span className="w-24 text-center text-sm font-medium text-gray-800">
                    {product.priceDisplay}
                </span>
                <div className="flex items-center gap-2">
                    <Input
                        value={product.quantity}
                        onChange={(e) =>
                            handleInputChange(
                                product.id,
                                'quantity',
                                e.target.value,
                            )
                        }
                        className="h-10 w-16 rounded-none border-gray-300 p-0 text-center text-sm"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Input
                        value={product.days}
                        onChange={(e) =>
                            handleInputChange(
                                product.id,
                                'days',
                                e.target.value,
                            )
                        }
                        className="h-10 w-16 rounded-none border-gray-300 p-0 text-center text-sm"
                    />
                    <span className="text-sm text-gray-600">ngày</span>
                </div>
                <span className="w-24 text-center text-sm font-medium text-gray-800">
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

    // Component hiển thị shop
    const ShopSection = ({ shopName }: { shopName: string }) => (
        <div className="mb-6 rounded-lg border border-gray-200 bg-white shadow-sm">
            <div className="flex h-12 items-center gap-2 border-b border-gray-200 bg-gray-50 px-6">
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
                    {shopName}
                </span>
            </div>
            <div className="hidden items-center border-b border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-600 md:grid md:grid-cols-[1fr_auto_auto_auto_auto]">
                <span className="text-left">Sản phẩm</span>
                <span className="w-24 text-center">Giá</span>
                <span className="w-24 text-center">Số lượng</span>
                <span className="w-24 text-center">Số ngày</span>
                <span className="w-24 text-center">Tổng phụ</span>
            </div>
            {currentProducts
                .filter((p) => p.shop === shopName)
                .map((product) => (
                    <ProductItem key={product.id} product={product} />
                ))}
        </div>
    )

    return (
        <div className="min-h-screen bg-white py-8">
            <div className="mx-auto max-w-6xl px-4">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 text-center text-3xl font-bold text-gray-800"
                >
                    Giỏ hàng
                </motion.h1>

                <div className="flex flex-col gap-8 md:flex-row">
                    {/* Danh sách sản phẩm */}
                    <div className="order-1 flex-1">
                        {uniqueShops.map((shopName) => (
                            <ShopSection key={shopName} shopName={shopName} />
                        ))}

                        {/* Phần mã giảm giá */}
                        <div className="mb-6 flex flex-col items-center gap-3 md:flex-row">
                            <span className="text-sm text-gray-600">Mã:</span>
                            <Input
                                placeholder="Nhập mã giảm giá"
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value)}
                                className="h-10 w-full rounded-none border-gray-300 md:w-40"
                            />
                            <Button
                                className="h-10 w-full rounded-none bg-gray-800 text-white hover:bg-gray-700 md:w-auto"
                                onClick={() => alert('Đã áp dụng mã giảm giá!')}
                            >
                                Áp dụng mã giảm giá
                            </Button>
                            <Button
                                className="h-10 w-full rounded-none border-gray-300 text-gray-800 hover:bg-gray-100 md:w-auto"
                                onClick={() => setProducts([])}
                            >
                                ✕ Xóa giỏ hàng
                            </Button>
                        </div>

                        {/* Phân trang */}
                        {shouldPaginate && (
                            <div className="mt-4 flex justify-center gap-2">
                                <Button
                                    disabled={currentPage === 1}
                                    onClick={() =>
                                        setCurrentPage((prev) => prev - 1)
                                    }
                                    className="h-10 w-full rounded-none border-gray-300 px-3 text-sm md:w-auto"
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
                                    className="h-10 w-full rounded-none border-gray-300 px-3 text-sm md:w-auto"
                                >
                                    Trang sau
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Tổng giỏ hàng */}
                    <div className="order-2 w-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm md:w-96">
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
                                Tổng cộng
                            </span>
                            <span className="text-lg font-semibold text-gray-800">
                                {total.toLocaleString('vi-VN')}đ
                            </span>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex w-full items-center justify-center gap-2 rounded-none bg-[#28a745] py-3 text-sm font-semibold text-white hover:bg-[#218838]"
                            onClick={() => alert('Đặt thuê thành công!')}
                        >
                            <span>✓</span> Tiến hành thanh toán
                        </motion.button>
                    </div>
                </div>
            </div>
        </div>
    )
}
