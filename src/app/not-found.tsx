import Link from "next/link"
import { Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md p-8 mx-auto text-center">
        <div className="mb-8">
          <div className="relative mx-auto w-32 h-32 mb-4">
            <div className="absolute inset-0 bg-[#1D3D85] opacity-10 rounded-full animate-ping"></div>
            <div className="relative flex items-center justify-center w-32 h-32 bg-[#1D3D85] rounded-full">
              <span className="text-white text-5xl font-bold">404</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Không tìm thấy trang</h1>
          <p className="text-gray-600 mb-8">Trang bạn đang truy cập không được tìm thấy hoặc đã bị xóa!</p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-[#1D3D85] text-white rounded-md hover:bg-[#152d63] transition-colors"
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
            <span className="px-3 bg-white text-sm text-gray-500">hoặc kiểm tra đường dẫn</span>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 text-sm">
          <Link href="/about" className="text-[#1D3D85] hover:underline">
            Về chúng tôi
          </Link>
          <Link href="/contact" className="text-[#1D3D85] hover:underline">
            Liên hệ
          </Link>
          <Link href="/blog" className="text-[#1D3D85] hover:underline">
            Tin tức
          </Link>
          <Link href="/help" className="text-[#1D3D85] hover:underline">
            Hỗ trợ
          </Link>
        </div>
      </div>
    </div>
  )
}

