import { FacebookOutlined, InstagramOutlined } from '@ant-design/icons'
import Image from 'next/image'
import { Button, Input } from 'antd'

export default function Footer() {
    const supportLinks = [
        'Chính sách thuê & cho thuê',
        'Thanh toán',
        'Sử dụng nền tảng',
        'Điều khoản sử dụng',
        'Quy trình thuê',
        'Câu hỏi thường gặp (FAQ)',
    ]

    return (
        <footer className="w-full bg-gradient-to-b from-blue-50 to-white px-6 py-10">
            <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-6 sm:grid-cols-4">
                <div>
                    <h2 className="mb-3 text-lg font-bold text-gray-800">
                        GIỚI THIỆU
                    </h2>
                    <p className="text-sm text-gray-700">
                        Techrental cho thuê đa dạng thiết bị công nghệ, giúp
                        khách hàng tiếp cận công nghệ với chi phí hợp lý.
                    </p>
                </div>

                <div>
                    <h2 className="mb-3 text-lg font-bold text-gray-800">
                        HỖ TRỢ KHÁCH HÀNG
                    </h2>
                    <ul className="space-y-2 text-sm text-gray-700">
                        {supportLinks.map((link, index) => (
                            <li
                                key={index}
                                className="cursor-pointer hover:text-blue-600"
                            >
                                {link}.
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h2 className="mb-3 text-lg font-bold text-gray-800">
                        LIÊN HỆ VỚI CHÚNG TÔI
                    </h2>
                    <div className="mb-4 flex gap-4 text-2xl text-gray-800">
                        <InstagramOutlined className="cursor-pointer hover:text-pink-500" />
                        <FacebookOutlined className="cursor-pointer hover:text-blue-600" />
                    </div>
                    <p className="mb-2 font-medium text-gray-700">THANH TOÁN</p>

                    <div className="mb-2 flex items-center gap-2">
                        <Image
                            src="https://tse4.mm.bing.net/th?id=OIP.E-BinyEEwrLkG0pbmOup0AHaDE&pid=Api&P=0&h=220"
                            alt=""
                            width={40}
                            height={24}
                        />
                        <Image
                            src="https://tse3.mm.bing.net/th?id=OIP.H_XU-kpbbMS7kjHFtI9q1wHaEK&pid=Api&P=0&h=220"
                            alt=""
                            width={40}
                            height={24}
                        />
                        <Image
                            src="https://tse1.mm.bing.net/th?id=OIP.UIALrvxQUDLKhOUCebAsqAHaEF&pid=Api&P=0&h=220"
                            alt=""
                            width={40}
                            height={24}
                        />
                        <Image
                            src="https://tse1.mm.bing.net/th?id=OIP.jSBHg8o9mnpJR3MNcozHeAHaFl&pid=Api&P=0&h=220"
                            alt=""
                            width={40}
                            height={24}
                        />
                    </div>

                    <div className="flex items-center gap-2">
                        <Image
                            src="https://tse1.mm.bing.net/th?id=OIP.40hw2_fh4PnHV5pO1SGFxAAAAA&pid=Api&P=0&h=220"
                            alt=""
                            width={40}
                            height={24}
                        />
                        <Image
                            src="https://tse2.mm.bing.net/th?id=OIP.zsNbsbSltBBKRk7OqGPjaAHaHa&pid=Api&P=0&h=220"
                            alt=""
                            width={40}
                            height={24}
                        />
                    </div>
                </div>

                <div className="flex flex-col items-center">
                    <h2 className="mb-3 text-lg font-bold text-gray-800">
                        ĐĂNG KÝ ĐỂ NHẬN ƯU ĐÃI
                    </h2>
                    <p className="mb-3 text-center text-sm text-gray-700">
                        Đăng ký để nhận ngay ưu đãi từ TechRental
                    </p>
                    <div className="flex w-full overflow-hidden rounded-md border border-blue-300 bg-white">
                        <Input
                            className="h-10 flex-1 border-none px-3 text-sm text-gray-400 outline-none"
                            placeholder="EMAIL"
                        />
                        <Button
                            className="h-10 !border-none !bg-blue-600 px-4 !text-white"
                            style={{ height: '40px' }}
                        >
                            Đăng ký
                        </Button>
                    </div>
                    <div className="mt-4">
                        <Image
                            src="/images/TechRentalLogo.png"
                            alt="TechRental Logo"
                            width={120}
                            height={40}
                        />
                    </div>
                </div>
            </div>
        </footer>
    )
}
