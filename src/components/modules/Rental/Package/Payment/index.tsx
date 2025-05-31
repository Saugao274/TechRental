'use client'

import { useState, useEffect } from 'react'
import { Card, Tabs, Button, Typography, Divider, message } from 'antd'
import { AlertCircle, ArrowLeft, ChevronLeft, QrCode } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { postRequest } from '@/request'
import { orderEndpoint } from '@/settings/endpoints'

const { Title, Text } = Typography

const PaymentPackage = () => {
    const [timeLeft, setTimeLeft] = useState(300) // 5 minutes in seconds

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
        }, 1000)

        return () => clearInterval(timer)
    }, [])
    const router = useRouter()
    const searchParams = useSearchParams()

    const price = searchParams.get('price')
    const type = searchParams.get('type')
    useEffect(() => {
        if (!price || !type) {
            router.push('/rental/package')
        }
    }, [price, type, router])
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
    }

    const handlePayment = async () => {
        try {
            const price = searchParams.get('price')
            const res = await postRequest(orderEndpoint.CREATE_ORDER, {
                data: {
                    amount: price,
                },
            })
            window.open(res?.data, '_blank')
        } catch (error) {
            message.error('Vui lòng thử lại sau!')
        }
    }

    const qrCodeTab = (
        <div className="flex flex-col items-center space-y-6 p-6">
            <div className="flex h-80 w-80 flex-col items-center justify-center rounded-lg bg-white">
                <div className="mb-4 flex items-center justify-center bg-gray-100">
                    <img
                        src="/images/paymentqr.png"
                        alt="VPBank QR Code"
                        className="h-full w-full object-cover"
                    />
                </div>
            </div>

            <div className="text-center">
                <Title level={4} className="mb-2 !text-white">
                    CÔNG TY TNHH TECHRENTAL
                </Title>
                <Text className="text-lg !text-white">0422 0300 2945</Text>
            </div>

            <div className="text-center !text-white">
                <Text className="mb-2 block !text-white">
                    Sử dụng ứng dụng ngân hàng
                </Text>
                <Text className="flex !text-white">
                    có chức năng{' '}
                    <span className="mx-2 flex items-center text-green-400">
                        <QrCode size={16} /> QR Code
                    </span>{' '}
                    để thanh toán
                </Text>
            </div>
        </div>
    )

    const bankTransferTab = (
        <div className="space-y-4 p-6">
            <div className="rounded-lg bg-white p-4">
                <div className="mb-4 flex items-center space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600">
                        <img
                            src="/images/vpbank.png"
                            alt="logo"
                            className="rounded-full object-cover"
                        />
                    </div>
                    <div>
                        <Text className="font-semibold">VP BANK</Text>
                        <br />
                        <Text className="text-sm text-gray-600">
                            Ngân hàng TMCP Việt Nam Thịnh Vượng
                        </Text>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="border-b border-b-primary/40">
                        <Text className="mb-1 block !text-[14px] text-sm !font-semibold !text-gray-600">
                            TÊN TÀI KHOẢN
                        </Text>
                        <Text className="!font-bold">
                            CÔNG TY TNHH TECHRENTAL
                        </Text>
                    </div>

                    <div className="flex items-center justify-between border-b border-b-primary/40">
                        <div>
                            <Text className="mb-1 block !text-[14px] text-sm !font-semibold !text-gray-600">
                                SỐ TÀI KHOẢN
                            </Text>
                            <Text className="!font-bold">0422 0300 2945</Text>
                        </div>
                        <Button
                            type="link"
                            size="small"
                            onClick={() => copyToClipboard('0422 0300 2945')}
                            className="!font-bold !text-primary/90"
                        >
                            Sao chép
                        </Button>
                    </div>

                    <div className="flex items-center justify-between border-b border-b-primary/40">
                        <div>
                            <Text className="mb-1 block !text-[14px] text-sm !font-semibold !text-gray-600">
                                SỐ TIỀN (VNĐ)
                            </Text>
                            <Text className="!font-bold">315.000</Text>
                        </div>
                        <Button
                            type="link"
                            size="small"
                            onClick={() => copyToClipboard('315000')}
                            className="!font-bold !text-primary/90"
                        >
                            Sao chép
                        </Button>
                    </div>

                    <div className="flex items-center justify-between border-b border-b-primary/40">
                        <div>
                            <Text className="mb-1 block !text-[14px] text-sm !font-semibold !text-gray-600">
                                NỘI DUNG CHUYỂN KHOẢN
                            </Text>
                            <Text className="!font-bold">5PP030</Text>
                        </div>
                        <Button
                            type="link"
                            size="small"
                            onClick={() => copyToClipboard('5PP030')}
                            className="!font-bold !text-primary/90"
                        >
                            Sao chép
                        </Button>
                    </div>
                    <div className="flex items-start space-x-2 rounded-lg border border-red-200 bg-red-50 p-3">
                        <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" />
                        <Text className="text-sm text-red-700">
                            Để đảm bảo giao dịch được xử lý thành công vui lòng
                            nhập đúng nội dung chuyển khoản
                        </Text>
                    </div>
                </div>
            </div>
        </div>
    )

    const tabItems = [
        {
            key: 'qr',
            label: 'Quét mã QR',
            children: qrCodeTab,
        },
        {
            key: 'transfer',
            label: 'Chuyển khoản',
            children: bankTransferTab,
        },
    ]

    return (
        <div className="p-4">
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Left Panel - Payment Info */}
                <div className="space-y-4">
                    <Card className="!bg-white/60 backdrop-blur-sm">
                        <Title
                            level={4}
                            className="mb-4 font-bold text-primary"
                        >
                            Thông tin thanh toán
                        </Title>

                        <div className="mt-5 space-y-3">
                            <div>
                                <Text className="mb-1 block text-sm font-bold text-gray-600">
                                    MÃ ĐƠN HÀNG
                                </Text>
                                <Text className="text-lg font-semibold">
                                    5PP030
                                </Text>
                            </div>

                            <Divider className="my-3" />

                            <div className="flex items-center justify-between">
                                <Text className="font-medium text-gray-700">
                                    Thành tiền
                                </Text>
                                <Text className="text-xl font-bold text-blue-600">
                                    {price} đ
                                </Text>
                            </div>
                        </div>

                        <Button
                            type="primary"
                            size="large"
                            className="!hover:bg-blue-200 mt-16 w-full border-blue-200 !bg-white/50 !font-bold !text-primary"
                            onClick={handlePayment}
                        >
                            Xác nhận thanh toán
                        </Button>
                    </Card>

                    <div className="rounded-lg border border-red-300 bg-red-50 !px-[25px] py-[6px]">
                        <div className="flex items-center justify-between">
                            <Text className="font-bold !text-red-600">
                                Đơn hàng sẽ hết hạn sau:
                            </Text>
                            <Text className="text-lg !font-bold text-red-600">
                                {formatTime(timeLeft)}
                            </Text>
                        </div>
                    </div>

                    <div className="space-y-3 text-sm text-gray-600">
                        <Text className="block">
                            <span className="font-medium">(*)</span>{' '}
                            <span className="font-semibold">
                                Techrental không hoàn tiền
                            </span>{' '}
                            cho các giao dịch chuyển khoản phát sinh do lỗi hoặc
                            nhầm lẫn từ phía khách hàng.
                        </Text>
                        <Text className="block">
                            <span className="font-medium">(**)</span> Nếu cần
                            <span className="font-semibold"> xuất hoá đơn</span>
                            , vui lòng điền thông tin và gửi yêu cầu trong ngày
                            chuyển khoản tại mục "Lịch sử giao dịch" hoặc liên
                            hệ bộ phận hỗ trợ khách hàng.
                        </Text>
                        <Text className="block">
                            <span className="font-medium">(***)</span> Các giao
                            dịch{' '}
                            <span className="font-semibold">
                                chuyển khoản sai thông tin hoặc quá hạn thanh
                                toán
                            </span>{' '}
                            sẽ không được hỗ trợ ghi nhận. Vui lòng kiểm tra kỹ
                            thông tin trước khi thực hiện thanh toán.
                        </Text>
                    </div>

                    <div className="flex w-full justify-center">
                        <Button
                            type="link"
                            icon={<ChevronLeft className="h-4 w-4" />}
                            className="p-0 !text-gray-600"
                        >
                            Quay lại
                        </Button>
                    </div>
                </div>

                {/* Right Panel - Payment Methods */}
                <Card className="!bg-primary text-white">
                    <Tabs
                        defaultActiveKey="qr"
                        items={tabItems}
                        className="payment-tabs"
                        tabBarStyle={{
                            marginBottom: 0,
                            borderBottom: 'none',
                            borderBottomColor: 'transparent',
                        }}
                    />
                </Card>
            </div>

            <style jsx global>{`
                .payment-tabs .ant-tabs-nav {
                    margin-bottom: 24px !important;
                }

                .payment-tabs .ant-tabs-nav-wrap {
                    justify-content: center !important;
                }

                .payment-tabs .ant-tabs-nav-list {
                    background: rgba(255, 255, 255, 0.2) !important;
                    border-radius: 10px !important;
                    padding: 4px !important;
                    display: flex !important;
                    gap: 0 !important;
                }

                .payment-tabs .ant-tabs-tab {
                    background: transparent !important;
                    border: none !important;
                    color: white !important;
                    margin: 0 !important;
                    padding: 8px 20px !important;
                    border-radius: 10px !important;
                    transition: all 0.3s ease !important;
                    font-weight: 500 !important;
                }

                .payment-tabs .ant-tabs-tab-active {
                    background: white !important;
                    color: #1f2937 !important;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
                }

                .payment-tabs .ant-tabs-tab:hover:not(.ant-tabs-tab-active) {
                    background: rgba(255, 255, 255, 0.1) !important;
                    color: white !important;
                }

                /* Hide all tab indicator lines */
                .payment-tabs .ant-tabs-ink-bar {
                    display: none !important;
                }

                .payment-tabs .ant-tabs-nav::before {
                    display: none !important;
                }

                .payment-tabs .ant-tabs-nav-wrap::before {
                    display: none !important;
                }

                .payment-tabs .ant-tabs-nav-list::before {
                    display: none !important;
                }

                .payment-tabs .ant-tabs-content-holder {
                    background: transparent !important;
                }

                .payment-tabs .ant-tabs-tab-btn {
                    color: inherit !important;
                }
            `}</style>
        </div>
    )
}

export default PaymentPackage
