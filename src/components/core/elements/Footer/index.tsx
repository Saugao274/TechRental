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
        <footer className="w-full bg-gradient-to-b from-blue-50 to-white px-4 py-10">
            <div className="mx-auto grid max-w-[calc(100%-100px)] grid-cols-1 gap-6 sm:grid-cols-4">
                <div style={{ maxWidth: '250px' }}>
                    <h2
                        className="mb-3 text-lg font-bold"
                        style={{ color: '#22448F' }}
                    >
                        GIỚI THIỆU
                    </h2>
                    <p className="text-sm" style={{ color: '#22448F' }}>
                        Techrental cho thuê đa dạng thiết bị công nghệ, giúp
                        khách hàng tiếp cận công nghệ với chi phí hợp lý.
                    </p>
                </div>

                <div>
                    <h2
                        className="mb-3 text-lg font-bold"
                        style={{ color: '#22448F' }}
                    >
                        HỖ TRỢ KHÁCH HÀNG
                    </h2>
                    <ul
                        className="space-y-2 text-sm"
                        style={{ color: '#22448F' }}
                    >
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
                    <h2
                        className="mb-3 text-lg font-bold"
                        style={{ color: '#22448F' }}
                    >
                        LIÊN HỆ VỚI CHÚNG TÔI
                    </h2>
                    <div
                        className="mb-4 flex gap-4 text-2xl"
                        style={{ color: '#22448F' }}
                    >
                        <a
                            href="https://www.instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Image
                                src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                                alt="Instagram"
                                width={24}
                                height={24}
                                className="cursor-pointer hover:opacity-80"
                            />
                        </a>
                        <a
                            href="https://www.facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Image
                                src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                                alt="Facebook"
                                width={24}
                                height={24}
                                className="cursor-pointer hover:opacity-80"
                            />
                        </a>
                    </div>
                    <p
                        className="mb-2 font-medium"
                        style={{ color: '#22448F' }}
                    >
                        THANH TOÁN
                    </p>

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

                <div className="flex flex-col items-start sm:items-center">
                    <h2
                        className="mb-3 text-lg font-bold"
                        style={{ color: '#22448F' }}
                    >
                        ĐĂNG KÝ ĐỂ NHẬN ƯU ĐÃI
                    </h2>
                    <p
                        className="mb-3 text-sm sm:text-center"
                        style={{ color: '#22448F' }}
                    >
                        Đăng ký để nhận ngay ưu đãi từ{' '}
                        <span style={{ color: '#22448F' }}>TechRental</span>
                    </p>
                    <div
                        className="flex w-full max-w-xs overflow-hidden rounded-md border border-gray-300 bg-[#E7E7E7]"
                        style={{ backgroundColor: '#E7E7E7' }}
                    >
                        <Input
                            className="h-10 flex-1 border-none bg-[#E7E7E7] px-3 text-sm outline-none"
                            placeholder="EMAIL"
                            style={{
                                backgroundColor: '#E7E7E7',
                                height: '40px',
                                color: '#22448F',
                            }}
                        />
                        <Button
                            className="h-10 !border-none bg-white px-4 text-sm"
                            style={{
                                backgroundColor: '#FFFFFF',
                                height: '40px',
                                lineHeight: 'normal',
                                color: '#22448F',
                            }}
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
