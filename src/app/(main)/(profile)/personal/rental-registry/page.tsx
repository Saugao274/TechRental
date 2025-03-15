'use client'
import React, { useState } from 'react'
import { ShieldCheck } from 'lucide-react'
import { Modal, Button, Radio } from 'antd'

export default function PersonalRentalRegistryPage() {
    const user = {
        name: 'Nguyễn Văn A',
        joinDate: '01/01/2025',
        email: 'example@example.com',
        phone: '0123456789',
        address: 'Hà Nội, Việt Nam',
        isVerified: true,
        ownedProducts: 5,
        rentingProducts: 2,
        rentedProducts: 10,
        isLandlord: false,
    }

    const [showTerms, setShowTerms] = useState(false)
    const [acceptedTerms, setAcceptedTerms] = useState(false) // đã đồng ý ?

    const [scale, setScale] = useState<'1-5' | '5-20' | '20+' | ''>('1-5') // quy mô SP
    const [operatingArea, setOperatingArea] = useState('') // khu vực hoạt động
    const [shopName, setShopName] = useState('') // tên shop
    const [businessType, setBusinessType] = useState<
        'personal' | 'household' | 'company'
    >('personal')
    const [businessAddress, setBusinessAddress] = useState('')
    const [invoiceEmail, setInvoiceEmail] = useState('')
    const [taxCode, setTaxCode] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!acceptedTerms) {
            alert('Vui lòng đồng ý điều khoản trước khi hoàn tất!')
            return
        }

        const payload = {
            scale,
            operatingArea,
            shopName,
            businessType,
            businessAddress,
            invoiceEmail,
            taxCode,
        }
        console.log('Đã gửi form:', payload)
        alert('Đã gửi thông tin đăng ký cho admin duyệt!')
    }

    return (
        <main className="mx-auto flex w-full flex-col gap-5 p-4 md:p-5">
            {/* Phần chào user */}
            <div>
                <h1 className="text-2xl font-bold text-primary">
                    Xin chào, {user.name}
                </h1>
                <p className="text-primary">
                    Chào mừng bạn đến với trang cá nhân của mình
                </p>
            </div>

            {/* Thông báo đã xác minh */}
            {user.isVerified && (
                <div className="flex items-center rounded-md border border-green-400 bg-green-50 p-4">
                    <ShieldCheck className="mr-2 hidden text-xl text-green-500 md:block" />
                    <div>
                        <h3 className="font-bold text-green-800">
                            Đã xác minh
                        </h3>
                        <p className="text-sm text-green-700">
                            Tài khoản của bạn đã được xác minh danh tính. Điều
                            này giúp tăng độ tin cậy và cho phép bạn thuê/cho
                            thuê sản phẩm.
                        </p>
                    </div>
                </div>
            )}

            {/* Tiêu đề */}
            <h2 className="text-xl font-bold">Đăng ký làm người cho thuê</h2>
            <p className="text-sm text-gray-600">
                Vui lòng điền các thông tin dưới đây để gửi yêu cầu đến quản trị
                viên duyệt.
            </p>

            {/* Form đăng ký */}
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                {/* Quy mô sản phẩm */}
                <div>
                    <label className="mb-1 block font-medium text-gray-800">
                        Quy mô sản phẩm
                    </label>
                    <select
                        value={scale}
                        onChange={(e) =>
                            setScale(e.target.value as '1-5' | '5-20' | '20+')
                        }
                        className="w-full rounded border border-gray-300 p-2"
                    >
                        <option value="1-5">1-5 sản phẩm</option>
                        <option value="5-20">5-20 sản phẩm</option>
                        <option value="20+">Trên 20 sản phẩm</option>
                    </select>
                </div>

                {/* Khu vực hoạt động */}
                <div>
                    <label className="mb-1 block font-medium text-gray-800">
                        Khu vực hoạt động
                    </label>
                    <input
                        type="text"
                        value={operatingArea}
                        onChange={(e) => setOperatingArea(e.target.value)}
                        placeholder="VD: Hà Nội, TP.HCM..."
                        className="w-full rounded border border-gray-300 p-2"
                    />
                </div>

                {/* Tên shop */}
                <div>
                    <label className="mb-1 block font-medium text-gray-800">
                        Tên shop
                    </label>
                    <input
                        type="text"
                        value={shopName}
                        onChange={(e) => setShopName(e.target.value)}
                        placeholder="Nhập tên shop/brand (nếu có)"
                        className="w-full rounded border border-gray-300 p-2"
                    />
                </div>

                {/* Loại hình kinh doanh */}
                <div>
                    <label className="mb-1 block font-medium text-gray-800">
                        Loại hình kinh doanh
                    </label>
                    <Radio.Group
                        value={businessType}
                        onChange={(e) =>
                            setBusinessType(
                                e.target.value as
                                    | 'personal'
                                    | 'household'
                                    | 'company',
                            )
                        }
                    >
                        <Radio value="personal">Cá nhân</Radio>
                        <Radio value="household">Hộ kinh doanh</Radio>
                        <Radio value="company">Công ty</Radio>
                    </Radio.Group>
                </div>

                {/* Địa chỉ đăng ký kinh doanh */}
                <div>
                    <label className="mb-1 block font-medium text-gray-800">
                        Địa chỉ đăng ký kinh doanh
                    </label>
                    <input
                        type="text"
                        value={businessAddress}
                        onChange={(e) => setBusinessAddress(e.target.value)}
                        placeholder="VD: Bình Thuận / Huyện Phú Quí / Xã Tam Thanh..."
                        className="w-full rounded border border-gray-300 p-2"
                    />
                </div>

                {/* Email nhận hóa đơn điện tử */}
                <div>
                    <label className="mb-1 block font-medium text-gray-800">
                        Email nhận hóa đơn điện tử
                    </label>
                    <input
                        type="email"
                        value={invoiceEmail}
                        onChange={(e) => setInvoiceEmail(e.target.value)}
                        placeholder="Vui lòng nhập email hợp lệ"
                        className="w-full rounded border border-gray-300 p-2"
                    />
                    <p className="mt-1 text-sm text-gray-500">
                        Hóa đơn điện tử sẽ được gửi đến địa chỉ email này
                    </p>
                </div>

                {/* Mã số thuế */}
                <div>
                    <label className="mb-1 block font-medium text-gray-800">
                        Mã số thuế
                    </label>
                    <input
                        type="text"
                        value={taxCode}
                        onChange={(e) => setTaxCode(e.target.value)}
                        placeholder="Nhập MST (nếu có)"
                        maxLength={14}
                        className="w-full rounded border border-gray-300 p-2"
                    />
                    <p className="mt-1 text-sm text-gray-500">
                        Theo Nghị định 52/2013/NĐ-CP, người bán có thể cần cung
                        cấp MST.
                    </p>
                </div>

                {/* Checkbox điều khoản dịch vụ */}
                <div className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        checked={acceptedTerms}
                        onChange={() => setAcceptedTerms(!acceptedTerms)}
                    />
                    <span className="text-gray-800">
                        Tôi đồng ý với{' '}
                        <button
                            type="button"
                            onClick={() => setShowTerms(true)}
                            className="font-semibold text-blue-600 hover:underline"
                        >
                            Điều khoản dịch vụ
                        </button>
                    </span>
                </div>

                {/* Nút hoàn tất */}
                <Button
                    type="primary"
                    htmlType="submit"
                    className="bg-blue-500 font-bold hover:bg-blue-600"
                >
                    Hoàn tất
                </Button>
            </form>

            {/* Modal điều khoản dịch vụ */}
            <Modal
                title="Điều khoản dịch vụ"
                open={showTerms}
                onCancel={() => setShowTerms(false)}
                footer={[
                    <Button key="back" onClick={() => setShowTerms(false)}>
                        Đóng
                    </Button>,
                    <Button
                        key="agree"
                        type="primary"
                        onClick={() => {
                            setAcceptedTerms(true)
                            setShowTerms(false)
                        }}
                    >
                        Tôi đồng ý
                    </Button>,
                ]}
            >
                {' '}
                {/* viết thêm nhiều zo nè */}
                <div className="max-h-96 overflow-y-auto text-sm text-gray-700">
                    <p>
                        1. Người cho thuê phải tuân thủ mọi quy định pháp luật
                        hiện hành.
                        <br />
                        2. Cung cấp thông tin trung thực, chính xác về sản phẩm.
                        <br />
                        3. Bảo đảm tính minh bạch về giá và chất lượng sản phẩm
                        cho thuê.
                        <br />
                        4. ... (và các điều khoản khác).
                    </p>
                </div>
            </Modal>
        </main>
    )
}
