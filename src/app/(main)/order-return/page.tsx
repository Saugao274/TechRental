'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { CheckCircle, XCircle } from 'lucide-react'
import { Button, Card, message } from 'antd'
import { putRequest } from '@/request'
import { orderEndpoint } from '@/settings/endpoints'
import { stat } from 'fs'

interface VNPayResponse {
    vnp_Amount: string
    vnp_BankCode: string
    vnp_BankTranNo: string
    vnp_CardType: string
    vnp_OrderInfo: string
    vnp_PayDate: string
    vnp_ResponseCode: string
    vnp_TmnCode: string
    vnp_TransactionNo: string
    vnp_TransactionStatus: string
    vnp_TxnRef: string
    vnp_SecureHash: string
}

type PaymentStatus = 'success' | 'failed' | 'pending' | 'confirmation'

export default function VNPayReturnPage() {
    const searchParams = useSearchParams()
    const [paymentData, setPaymentData] = useState<VNPayResponse | null>(null)
    const [status, setStatus] = useState<PaymentStatus>('pending')

    const handleChangeToInDelivery = async (
        orderId: string,
        customerId: string,
    ): Promise<void> => {
        try {
            await putRequest(
                orderEndpoint.UPDATE_STATUS.replace(':id', orderId),
                {
                    data: {
                        status: 'in_delivery',
                        toId: customerId,
                    },
                },
            )
        } catch (error) {
            console.error(error)
        } finally {
        }
    }


    useEffect(() => {
        // Parse URL parameters
        const handlePaymentResponse = async () => {
            const data: VNPayResponse = {
                vnp_Amount: searchParams.get('vnp_Amount') || '',
                vnp_BankCode: searchParams.get('vnp_BankCode') || '',
                vnp_BankTranNo: searchParams.get('vnp_BankTranNo') || '',
                vnp_CardType: searchParams.get('vnp_CardType') || '',
                vnp_OrderInfo: searchParams.get('vnp_OrderInfo') || '',
                vnp_PayDate: searchParams.get('vnp_PayDate') || '',
                vnp_ResponseCode: searchParams.get('vnp_ResponseCode') || '',
                vnp_TmnCode: searchParams.get('vnp_TmnCode') || '',
                vnp_TransactionNo: searchParams.get('vnp_TransactionNo') || '',
                vnp_TransactionStatus:
                    searchParams.get('vnp_TransactionStatus') || '',
                vnp_TxnRef: searchParams.get('vnp_TxnRef') || '',
                vnp_SecureHash: searchParams.get('vnp_SecureHash') || '',
            }

            setPaymentData(data)

            // Determine status based on response code
            const responseCode = data.vnp_ResponseCode
            if (responseCode === '00') {
                setStatus('success')
                const orderInfo = decodeURIComponent(data.vnp_OrderInfo)
                const [orderId, customerId] = orderInfo.split('|')
                if (orderId && customerId) {
                    await handleChangeToInDelivery(orderId, customerId)
                }
            } else if (
                responseCode === '24' ||
                responseCode === '51' ||
                responseCode === '65'
            ) {
                setStatus('confirmation')
            } else {
                setStatus('failed')
            }
        }

        handlePaymentResponse()
    }, [searchParams])

    const formatAmount = (amount: string) => {
        const numAmount = Number.parseInt(amount) / 100
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(numAmount)
    }

    const handleGoBack = () => {
        window.history.back()
    }

    const handleContinue = () => {
        // Handle continue action - could redirect to order confirmation
        window.location.href = '/orders'
    }

    const handleClose = () => {
        // Handle close action - could redirect to home or orders page
        window.location.href = '/'
    }

    if (!paymentData) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-100">
                <div className="text-center">
                    <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600"></div>
                    <p className="mt-2 text-gray-600">Đang xử lý...</p>
                </div>
            </div>
        )
    }

    const renderStatusCard = () => {
        switch (status) {
            case 'success':
                return (
                    <Card className="mx-auto w-full max-w-md bg-white shadow-lg">
                        <div className="p-8 text-center">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                                <CheckCircle className="h-8 w-8 text-green-600" />
                            </div>
                            <h2 className="mb-2 text-xl font-semibold text-gray-800">
                                Đơn hàng đã thanh toán thành công
                            </h2>
                            <p className="mb-6 text-sm leading-relaxed text-gray-600">
                                Techrental đã nhận được thanh toán cho đơn hàng
                                của bạn. Đơn hàng sẽ được xử lý và cập nhật
                                trạng thái trong vài phút.
                            </p>
                            <Button
                                onClick={handleClose}
                                className="rounded-md bg-blue-600 px-8 py-2 text-white hover:bg-blue-700"
                            >
                                Đóng
                            </Button>
                        </div>
                    </Card>
                )

            case 'failed':
                return (
                    <Card className="mx-auto w-full max-w-md bg-white shadow-lg">
                        <div className="p-8 text-center">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                                <XCircle className="h-8 w-8 text-red-600" />
                            </div>
                            <h2 className="mb-2 text-xl font-semibold text-gray-800">
                                Đơn hàng chưa được thanh toán
                            </h2>
                            <p className="mb-6 text-sm leading-relaxed text-gray-600">
                                Chúng tôi chưa ghi nhận được khoản thanh toán
                                cho đơn hàng của bạn. Nếu bạn đã chuyển khoản,
                                vui lòng kiểm tra lại sau vài phút hoặc liên hệ
                                CSKH 1900 3003 để được hỗ trợ
                            </p>
                            <Button
                                onClick={handleClose}
                                className="rounded-md bg-blue-600 px-8 py-2 text-white hover:bg-blue-700"
                            >
                                Đóng
                            </Button>
                        </div>
                    </Card>
                )

            case 'confirmation':
                return (
                    <Card className="mx-auto w-full max-w-md bg-white shadow-lg">
                        <div className="p-8 text-center">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                                <XCircle className="h-8 w-8 text-red-600" />
                            </div>
                            <h2 className="mb-2 text-xl font-semibold text-gray-800">
                                Bạn đã chuyển khoản thành công?
                            </h2>
                            <p className="mb-6 text-sm leading-relaxed text-gray-600">
                                Sau khi nhận được chuyển khoản, hệ thống sẽ ghi
                                nhận thanh toán của bạn trong vòng 5 phút.
                            </p>
                            <div className="flex justify-center gap-3">
                                <Button
                                    variant="outlined"
                                    onClick={handleGoBack}
                                    className="border border-gray-300 px-6 py-2 text-gray-700 hover:bg-gray-50"
                                >
                                    ← Quay lại
                                </Button>
                                <Button
                                    onClick={handleContinue}
                                    className="bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
                                >
                                    Tiếp tục
                                </Button>
                            </div>
                        </div>
                    </Card>
                )

            default:
                return null
        }
    }

    return (
        <div className="flex pb-40 pt-14 items-center justify-center p-4">
            <div className="w-full max-w-md">
                {renderStatusCard()}
            </div>
        </div>
    )
}
