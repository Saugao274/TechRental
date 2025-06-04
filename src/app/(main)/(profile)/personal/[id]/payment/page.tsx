'use client'
import { Button, Form, Input, message, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { CheckCircleFilled } from '@ant-design/icons'
import { useAuth } from '@/context/AuthContext'
import { getRequest, patchRequest, postRequest } from '@/request'
import { orderEndpoint } from '@/settings/endpoints'
import { OrderPayload } from '@/types/payload'
import { useCart } from '@/context/CartContext'

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
    const { user, updateUser } = useAuth()
    const [loading, setLoading] = useState(false)
    const [isAddressModalVisible, setIsAddressModalVisible] = useState(false)
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const groupedCartItems = cartItems.reduce((acc, item) => {
        if (!acc[item.shop]) {
            acc[item.shop] = []
        }
        acc[item.shop].push(item)
        return acc
    }, {} as Record<string, CartItem[]>)
    const { removeItem } = useCart()
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
            if (!user?.isVerified) {
                message.warning(
                    'Bạn phải xác minh danh tính mới tiến hành đặt hàng',
                )
                return
            }
            if (!user?.address) {
                message.warning(
                    'Bạn phải thêm địa chỉ để có thể đặt hàng',
                )
                return
            }
            const dataProduct = {
                products: cartItems.map((item) => item.id),
            }
            const checkProduct = await postRequest(orderEndpoint.CHECK_ORDER, {
                data: dataProduct,
            })
            console.log("checkProduct", checkProduct)
            if (checkProduct.success != true) {
                message.warning('Có một số sản phẩm hiện tại đang cho thuê, vui lòng liên hệ shop hoặc chọn sản phẩm tương tự ở shop khác')
                return
            }
            const payload: OrderPayload = {
                customerId: user?._id!,
                products: cartItems.map((item) => item.id),
                totalPrice: totalPrice,
                status: 'pending_confirmation',
                duration: cartItems.reduce(
                    (total: number, item: CartItem) => total + item.days,
                    0,
                ),
                deliveryDate: new Date().toISOString(),
            }
            // Make API request to confirm the order
            await postRequest(orderEndpoint.POST_ORDER, {
                data: payload,
            })
            cartItems.forEach((item) => {
                removeItem(item.id)
            })
            setIsModalVisible(true)
        } catch (error) {
            console.error('Failed to confirm order', error)
        }
    }

    const handleModalOk = () => {
        setIsModalVisible(false)
        router.push('/')
    }
    const handleUpdateAddress = async (values: {
        currentAddress: string
        ward: string
        district: string
        province: string
    }) => {
        try {
            setLoading(true)
            const payload = {
                // Only updating the address field here; add any other fields as needed
                'identityVerification.address': `${values.currentAddress}, ${values.ward}, ${values.district}, ${values.province}`,
            }

            const response: any = await patchRequest(
                '/api/users/me',
                { data: payload },
                false,
            )

            if (!response || !response.user) {
                throw new Error('Dữ liệu phản hồi không hợp lệ từ máy chủ.')
            }

            updateUser(response.user)
            message.success('Cập nhật thông tin thành công!')
        } catch (error) {
            message.error('Cập nhật thất bại. Vui lòng thử lại sau.')
            console.error(error)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className="min-h-screen p-4 md:p-8">
            <div className="mb-4 flex items-center space-x-2 rounded-lg bg-green-50 p-3">
                <CheckCircleFilled className="text-lg text-green-500" />
                {user?.address ? (
                    <p className="text-sm text-gray-700">
                        Đã xác minh: Tài khoản của bạn được xác minh. Đơn hàng sẽ được giao đến địa chỉ này. Nếu bạn muốn thay đổi địa chỉ, vui lòng chọn địa chỉ khác.
                    </p>
                ) : (
                    <p className="text-sm text-gray-700">
                        Bạn chưa có địa chỉ nhận hàng. Vui lòng nhập địa chỉ để tiến hành đặt hàng.
                    </p>
                )}
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
                {user?.address ? (
                    <p className="text-gray-700">
                        {user.address}
                    </p>
                ) : (
                    <></>
                )}
                <div className="mt-2 flex justify-between">
                    {user?.address ?
                        <>
                            <span className="font-semibold text-green-500">Mặc định</span>
                            <Button
                                type="link"
                                className="text-blue-500"
                                onClick={() => setIsAddressModalVisible(true)}
                            >
                                Thay đổi

                            </Button>
                        </> : <>
                            <span className="font-semibold text-orange-500">Chưa có địa chỉ</span>
                            <Button
                                type="link"
                                className="text-blue-500"
                                onClick={() => setIsAddressModalVisible(true)}
                            >
                                Thêm địa chỉ

                            </Button>
                        </>
                    }

                </div>
            </motion.div>

            {/* Cart Sections Grouped by Shop */}
            {Object.keys(groupedCartItems).map((shop) => {
                const shopItems = groupedCartItems[shop]
                const shopTotal = shopItems.reduce(
                    (sum, item) => sum + item.price * item.quantity,
                    0,
                )
                return (
                    <motion.div
                        key={shop}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="mb-6 rounded-lg bg-white p-4 shadow-md"
                    >
                        <h2 className="mb-4 text-lg font-semibold">Shop: {shop}</h2>
                        {shopItems.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center justify-between border-b py-4"
                            >
                                <div className="flex items-center space-x-4">
                                    <Button
                                        type="link"
                                        className="!p-0"
                                        onClick={() => router.push(`/products/${item.id}`)}
                                    >
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            width={80}
                                            height={80}
                                            className="rounded object-cover"
                                        />
                                    </Button>
                                    <div>
                                        <h3 className="text-base font-medium line-clamp-1 !text-blue-500">
                                            {item.name}
                                        </h3>
                                        <p className="text-gray-500">
                                            {item.price.toLocaleString()}đ
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
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
                                        className="!w-14 text-center"
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
                            </div>
                        ))}
                        {/* Summary for this shop */}
                        <div className="flex flex-col items-center justify-between rounded-lg bg-white p-4 shadow-md md:flex-row mt-4">
                            <span className="text-sm font-semibold">
                                Tổng số tiền

                            </span>
                            <span className="text-red-500">
                                {shopTotal.toLocaleString()}đ
                            </span>
                        </div>
                    </motion.div>
                )
            })}
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

                </div>
                <div className='flex items-center flex-col gap-2'>
                    <p className="text-lg font-semibold">
                        Tổng cộng:{' '}
                        <span className="text-red-500">
                            {totalPrice.toLocaleString()}đ
                        </span>
                    </p>
                    <Button
                        type="primary"
                        className="bg-blue-500 hover:bg-blue-600"
                        onClick={handleConfirmOrder}
                    >
                        XÁC NHẬN & ĐẶT HÀNG
                    </Button>

                </div>
            </motion.div>
            <Modal
                visible={isAddressModalVisible}
                title="Cập nhật địa chỉ nhận hàng"
                onCancel={() => setIsAddressModalVisible(false)}
                footer={null}
                centered
            >
                <Form layout="vertical" onFinish={handleUpdateAddress}>
                    <Form.Item
                        name="currentAddress"
                        label="Địa chỉ"
                        rules={[
                            { required: true, message: 'Vui lòng nhập địa chỉ' },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="ward"
                        label="Phường/Xã"
                        rules={[
                            { required: true, message: 'Vui lòng nhập phường' },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="district"
                        label="Quận/Huyện"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập quận/huyện',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="province"
                        label="Tỉnh/Thành phố"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tỉnh/thành phố',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                        >
                            Lưu thay đổi
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
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
                        Chúng tôi đã gửi yêu cầu xác nhận đến người cho thuê.
                        Kết quả xác nhận sẽ được hiển thị trên website. Sau khi được xác nhận, bạn sẽ nhận được email hướng dẫn thanh toán.
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
