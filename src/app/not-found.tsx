import Link from 'next/link'
import { Home } from 'lucide-react'

export default function NotFound() {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="mx-auto w-full max-w-md p-8 text-center">
                <div className="mb-8">
                    <div className="relative mx-auto mb-4 h-32 w-32">
                        <div className="absolute inset-0 animate-ping rounded-full bg-[#1D3D85] opacity-10"></div>
                        <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-[#1D3D85]">
                            <span className="text-5xl font-bold text-white">
                                404
                            </span>
                        </div>
                    </div>
                    <h1 className="mb-2 text-3xl font-bold text-gray-900">
                        Không tìm thấy trang
                    </h1>
                    <p className="mb-8 text-gray-600">
                        Trang bạn đang truy cập không được tìm thấy hoặc đã bị
                        xóa!
                    </p>
                    <Link
                        href="/"
                        className="inline-flex items-center rounded-md bg-[#1D3D85] px-6 py-3 text-white transition-colors hover:bg-[#152d63]"
                    >
                        <Home className="mr-2 h-5 w-5" />
                        Quay lại Trang chủ
                    </Link>
                </div>
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center">
                        <span className="px-3 text-sm text-gray-500">
                            hoặc kiểm tra đường dẫn
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
