"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { CheckCircle, XCircle } from "lucide-react"
import { Button, Card } from "antd"

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

type PaymentStatus = "success" | "failed" | "pending" | "confirmation"

export default function VNPayReturnPage() {
  const searchParams = useSearchParams()
  const [paymentData, setPaymentData] = useState<VNPayResponse | null>(null)
  const [status, setStatus] = useState<PaymentStatus>("pending")

  useEffect(() => {
    // Parse URL parameters
    const data: VNPayResponse = {
      vnp_Amount: searchParams.get("vnp_Amount") || "",
      vnp_BankCode: searchParams.get("vnp_BankCode") || "",
      vnp_BankTranNo: searchParams.get("vnp_BankTranNo") || "",
      vnp_CardType: searchParams.get("vnp_CardType") || "",
      vnp_OrderInfo: searchParams.get("vnp_OrderInfo") || "",
      vnp_PayDate: searchParams.get("vnp_PayDate") || "",
      vnp_ResponseCode: searchParams.get("vnp_ResponseCode") || "",
      vnp_TmnCode: searchParams.get("vnp_TmnCode") || "",
      vnp_TransactionNo: searchParams.get("vnp_TransactionNo") || "",
      vnp_TransactionStatus: searchParams.get("vnp_TransactionStatus") || "",
      vnp_TxnRef: searchParams.get("vnp_TxnRef") || "",
      vnp_SecureHash: searchParams.get("vnp_SecureHash") || "",
    }

    setPaymentData(data)

    // Determine status based on response code
    const responseCode = data.vnp_ResponseCode
    if (responseCode === "00") {
      setStatus("success")
    } else if (responseCode === "24" || responseCode === "51" || responseCode === "65") {
      setStatus("confirmation")
    } else {
      setStatus("failed")
    }
  }, [searchParams])

  const formatAmount = (amount: string) => {
    const numAmount = Number.parseInt(amount) / 100
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(numAmount)
  }

  const handleGoBack = () => {
    window.history.back()
  }

  const handleContinue = () => {
    // Handle continue action - could redirect to order confirmation
    window.location.href = "/orders"
  }

  const handleClose = () => {
    // Handle close action - could redirect to home or orders page
    window.location.href = "/"
  }

  if (!paymentData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Đang xử lý...</p>
        </div>
      </div>
    )
  }

  const renderStatusCard = () => {
    switch (status) {
      case "success":
        return (
          <Card className="w-full max-w-md mx-auto bg-white shadow-lg">
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Đơn hàng đã thanh toán thành công</h2>
              <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                Techrental đã nhận được thanh toán cho đơn hàng của bạn. Đơn hàng sẽ được xử lý và cập nhật trạng thái
                trong vài phút.
              </p>
              <Button onClick={handleClose} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-md">
                Đóng
              </Button>
            </div>
          </Card>
        )

      case "failed":
        return (
          <Card className="w-full max-w-md mx-auto bg-white shadow-lg">
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Đơn hàng chưa được thanh toán</h2>
              <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                Chúng tôi chưa ghi nhận được khoản thanh toán cho đơn hàng của bạn. Nếu bạn đã chuyển khoản, vui lòng
                kiểm tra lại sau vài phút hoặc liên hệ CSKH 1900 3003 để được hỗ trợ
              </p>
              <Button onClick={handleClose} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-md">
                Đóng
              </Button>
            </div>
          </Card>
        )

      case "confirmation":
        return (
          <Card className="w-full max-w-md mx-auto bg-white shadow-lg">
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Bạn đã chuyển khoản thành công?</h2>
              <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                Sau khi nhận được chuyển khoản, hệ thống sẽ ghi nhận thanh toán của bạn trong vòng 5 phút.
              </p>
              <div className="flex gap-3 justify-center">
                <Button
                  variant="outlined"
                  onClick={handleGoBack}
                  className="px-6 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  ← Quay lại
                </Button>
                <Button onClick={handleContinue} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2">
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {renderStatusCard()}

        {process.env.NODE_ENV === "development" && (
          <Card className="mt-4 bg-gray-50">
            <div className="p-4">
              <h3 className="font-semibold mb-2">Debug Info:</h3>
              <div className="text-xs space-y-1">
                <p>
                  <strong>Response Code:</strong> {paymentData.vnp_ResponseCode}
                </p>
                <p>
                  <strong>Transaction Status:</strong> {paymentData.vnp_TransactionStatus}
                </p>
                <p>
                  <strong>Amount:</strong> {formatAmount(paymentData.vnp_Amount)}
                </p>
                <p>
                  <strong>Order Info:</strong> {decodeURIComponent(paymentData.vnp_OrderInfo)}
                </p>
                <p>
                  <strong>Transaction Ref:</strong> {paymentData.vnp_TxnRef}
                </p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  )
}
