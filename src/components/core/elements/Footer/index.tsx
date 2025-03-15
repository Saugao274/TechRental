import { FacebookOutlined, InstagramOutlined } from '@ant-design/icons'
import Image from 'next/image'
import { Button, Input } from 'antd'

export default function Footer() {
    const supportLinks = [
        'Chính sách thuê & cho thuê.',
        'Hướng dẫn thanh toán.',
        'Hướng dẫn sử dụng nền tảng.',
        'Điều khoản sử dụng.',
        'Quy trình thuê.',
        'Câu hỏi thường gặp (FAQ).',
    ]

    return (
        <footer className="w-full items-center justify-between border-t bg-white px-6 py-10">
            <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-6 sm:grid-cols-4">
                {/* Logo and Social Media */}
                <div>
                    <div className="mb-4 w-[180px]">
                        <Image
                            src="/images/TechRentalLogo.png"
                            alt="TechRental Logo"
                            width={200}
                            height={60}
                        />
                    </div>
                    <p className="mb-2 font-medium text-gray-700">
                        Liên hệ với chúng tôi
                    </p>
                    <div className="flex gap-2 text-xl text-gray-800">
                        <FacebookOutlined />
                        <InstagramOutlined />
                    </div>
                    <p className="mt-4 font-medium text-gray-700">
                        Phương thức thanh toán
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                        <Image
                            src="/images/logo_pttt.jpg"
                            alt="payment-method"
                            width={234}
                            height={176}
                        />
                    </div>
                </div>

                {/* Introduction */}
                <div style={{ paddingTop: 50 }}>
                    <h2 className="mb-3 text-lg font-bold">GIỚI THIỆU</h2>
                    <p className="text-sm text-gray-700">
                        Techrental cho thuê đa dạng thiết bị công nghệ, giúp
                        khách hàng tiếp cận công nghệ với chi phí hợp lý.
                    </p>
                </div>

                {/* Customer Support */}
                <div style={{ paddingTop: 50 }}>
                    <h2 className="mb-3 text-lg font-bold">
                        HỖ TRỢ KHÁCH HÀNG
                    </h2>
                    <ul className="space-y-2 text-sm text-gray-700">
                        {supportLinks.map((link, index) => (
                            <li
                                key={index}
                                className="cursor-pointer hover:text-blue-600"
                            >
                                {link}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Newsletter Subscription */}
                <div style={{ paddingTop: 50 }}>
                    <h2 className="mb-3 text-lg font-bold">
                        ĐĂNG KÝ NHẬN BẢN TIN KHUYẾN MÃI
                    </h2>
                    <div className="rounded-md bg-blue-100 p-2">
                        <div className="flex w-full overflow-hidden rounded-md border border-blue-300">
                            <Input
                                className="h-12 w-2/3 border-none px-3 text-sm text-gray-700 outline-none"
                                placeholder="Nhập email bạn tại đây..."
                                style={{ height: 40, color: 'white' }}
                            />
                            <Button
                                className="flex h-12 items-center justify-center !border-none !bg-blue-600 px-6 !text-white"
                                style={{ height: 40 }}
                            >
                                Gửi
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="mt-8 border-t pt-4 text-center text-sm text-gray-600">
                <p>Copyright © 2018 • Lift Media Inc.</p>
            </div>
        </footer>
    )
}
