'use client'
import { Button, Input, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { CheckCircleFilled } from '@ant-design/icons'
import { useAuth } from '@/context/AuthContext'
import { postRequest } from '@/request'
import { orderEndpoint } from '@/settings/endpoints'
import { OrderPayload } from '@/types/payload'

// Define the CartItem interface
interface CartItem {
    id: string
    name: string
    price: number
    quantity: number
    image: string
    shop: string
    days: number
}
const PaymentPage = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const { user } = useAuth()

    const [cartItems, setCartItems] = useState<CartItem[]>([])

    useEffect(() => {
        const productsParam = searchParams.get('products')
        if (productsParam) {
            try {
                const parsedItems = JSON.parse(
                    decodeURIComponent(productsParam),
                )
                setCartItems(parsedItems)
            } catch (error) {
                console.error('Failed to parse products from URL', error)
            }
        }
    }, [searchParams])
    const [isModalVisible, setIsModalVisible] = useState(false)

    // Calculate total price
    const totalPrice = cartItems.reduce(
        (total: number, item: CartItem) => total + item.price * item.quantity,
        0,
    )

    // Handle quantity change
    const handleQuantityChange = (id: string, delta: number) => {
        setCartItems(
            cartItems.map((item) =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                    : item,
            ),
        )
    }

    // Handle order confirmation
    const handleConfirmOrder = async () => {
        try {
            const payload: OrderPayload = {
                customerId: user?._id!,
                products: cartItems.map((item) => item.id),
                totalPrice: totalPrice,
                status: 'pending_payment',
                duration: cartItems.reduce(
                    (total: number, item: CartItem) => total + item.days,
                    0,
                ),
                deliveryDate: new Date().toISOString(),
            }
            // Make API request to confirm the order
            const res = await postRequest(orderEndpoint.POST_ORDER, {
                data: payload,
            })
            console.log(res)
            setIsModalVisible(true)
        } catch (error) {
            console.error('Failed to confirm order', error)
        }
    }

    const handleModalOk = () => {
        setIsModalVisible(false)
        router.push('http://localhost:3000/')
    }

    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="mb-4 flex items-center space-x-2 rounded-lg bg-green-50 p-3">
                <CheckCircleFilled className="text-lg text-green-500" />
                <p className="text-sm text-gray-700">
                    Đã xác minh: Địa chỉ của bạn được xác minh. Đơn hàng sẽ được
                    giao đến địa chỉ này. Nếu bạn muốn thay đổi địa chỉ, vui
                    lòng chọn địa chỉ khác.
                </p>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-6 rounded-lg bg-white p-4 shadow-md"
            >
                <h2 className="mb-2 text-lg font-semibold text-blue-600">
                    Địa chỉ nhận hàng
                </h2>
                <p className="text-gray-700">
                    Nguyễn Văn A (+84)934061583 47A đường K20, phường Khế Mỹ,
                    quận Ngũ Hành Sơn, Đà Nẵng
                </p>
                <div className="mt-2 flex justify-between">
                    <span className="font-semibold text-green-500">
                        Mặc định
                    </span>
                    <Button type="link" className="text-blue-500">
                        Thay đổi
                    </Button>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-6 rounded-lg bg-white p-4 shadow-md"
            >
                <h2 className="mb-4 text-lg font-semibold">Shop: mayanhvn</h2>
                {cartItems.map((item) => (
                    <div
                        key={item.id}
                        className="flex flex-col items-center justify-between border-b py-4 md:flex-row"
                    >
                        <div className="flex items-center space-x-4">
                            <Image
                                src={item.image}
                                alt={item.name}
                                width={80}
                                height={80}
                                className="rounded object-cover"
                            />
                            <div>
                                <h3 className="text-base font-medium">
                                    {item.name}
                                </h3>
                                <p className="text-gray-500">
                                    {item.price.toLocaleString()}đ
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-row items-center gap-2">
                            <div className="mt-2 flex items-center space-x-2 md:mt-0">
                                <Button
                                    onClick={() =>
                                        handleQuantityChange(item.id, -1)
                                    }
                                    disabled={item.quantity === 1}
                                >
                                    -
                                </Button>
                                <Input
                                    value={item.quantity}
                                    className="w-12 text-center"
                                    readOnly
                                />
                                <Button
                                    onClick={() =>
                                        handleQuantityChange(item.id, 1)
                                    }
                                >
                                    +
                                </Button>
                            </div>

                            <p className="mt-2 font-semibold text-red-500 md:mt-0">
                                {(item.price * item.quantity).toLocaleString()}đ
                            </p>
                        </div>
                    </div>
                ))}
            </motion.div>

            {/* Summary and Confirm Button */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex flex-col items-center justify-between rounded-lg bg-white p-4 shadow-md md:flex-row"
            >
                <div className="mb-4 md:mb-0">
                    <p className="text-gray-500">Miễn phí giao hàng</p>
                    <p className="text-gray-500">Nhập mã</p>
                    <p className="text-gray-500">Áp dụng</p>
                    <p className="text-lg font-semibold">
                        Tổng số tiền:{' '}
                        <span className="text-red-500">
                            {totalPrice.toLocaleString()}đ
                        </span>
                    </p>
                </div>
                <Button
                    type="primary"
                    className="bg-blue-500 hover:bg-blue-600"
                    onClick={handleConfirmOrder}
                >
                    XÁC NHẬN & ĐẶT HÀNG
                </Button>
            </motion.div>

            {/* Updated Confirmation Modal */}
            <Modal
                title={null}
                open={isModalVisible}
                onOk={handleModalOk}
                okText="Tiếp tục mua hàng"
                footer={null}
                closable={false}
                centered
            >
                <div className="flex flex-col items-center py-6 text-center">
                    <CheckCircleFilled className="mb-4 text-4xl text-green-500" />
                    <h2 className="mb-2 text-xl font-semibold text-blue-600">
                        Đặt hàng thành công!
                    </h2>
                    <p className="mb-6 text-gray-600">
                        Chúng tôi đã gửi link ký hợp đồng điện tử đến email của
                        bạn. Vui lòng kiểm tra email để hoàn tất hợp đồng và
                        nhận đơn hàng nhé!
                    </p>
                    <Button
                        type="primary"
                        className="w-48 bg-blue-500 hover:bg-blue-600"
                        onClick={handleModalOk}
                    >
                        Tiếp tục mua hàng
                    </Button>
                </div>
            </Modal>
        </div>
    )
}

export default PaymentPage
