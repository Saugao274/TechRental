import { FacebookOutlined, InstagramOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { Button, Input } from 'antd';

export default function Footer() {
  const supportLinks = [
    'Chính sách thuê & cho thuê.',
    'Hướng dẫn thanh toán.',
    'Hướng dẫn sử dụng nền tảng.',
    'Điều khoản sử dụng.',
    'Quy trình thuê.',
    'Câu hỏi thường gặp (FAQ).',
  ];

  return (
    <footer className="w-full items-center justify-between bg-white py-10 px-6 border-t">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-4 gap-6">
        {/* Logo and Social Media */}
        <div>
          <div className="w-[180px] mb-4">
            <Image src="/images/TechRentalLogo.png" alt="TechRental Logo" width={200} height={60} />
          </div>
          <p className="text-gray-700 mb-2 font-medium">Liên hệ với chúng tôi</p>
          <div className="flex gap-2 text-xl text-gray-800">
            <FacebookOutlined />
            <InstagramOutlined />
          </div>
          <p className="mt-4 text-gray-700 font-medium">Phương thức thanh toán</p>
          <div className="flex items-center gap-2 mt-2">
            <Image src="/images/logo_pttt.jpg" alt="payment-method" width={234} height={176} />
            
          </div>
        </div>

        {/* Introduction */}
        <div style={{paddingTop:50 }}>
          <h2 className="font-bold  text-lg mb-3">GIỚI THIỆU</h2>
          <p className="text-gray-700 text-sm">
            Techrental cho thuê đa dạng thiết bị công nghệ, giúp khách hàng tiếp cận công nghệ với chi phí hợp lý.
          </p>
        </div>

        {/* Customer Support */}
        <div style={{paddingTop:50 }}>
          <h2 className="font-bold text-lg mb-3">HỖ TRỢ KHÁCH HÀNG</h2>
          <ul className="text-gray-700 text-sm space-y-2">
            {supportLinks.map((link, index) => (
              <li  key={index} className="hover:text-blue-600 cursor-pointer">{link}</li>
            ))}
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div style={{paddingTop:50 }}>
          <h2 className="font-bold text-lg mb-3">ĐĂNG KÝ NHẬN BẢN TIN KHUYẾN MÃI</h2>
          <div className="bg-blue-100 p-2 rounded-md">
          <div className="flex border border-blue-300 rounded-md overflow-hidden w-full">
            <Input className="w-2/3 border-none px-3 h-12 text-gray-700 text-sm outline-none"
              placeholder="Nhập email bạn tại đây..." style={{  height:40, color: 'white' }} />
    <Button
      className="bg-blue-600 text-white px-6 h-12 border-none flex items-center justify-center !important"
      style={{ backgroundColor: '#2563eb', color: 'white',height:40 }}
    >
      Gửi
    </Button>
  </div>
</div>

        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center text-gray-600 text-sm mt-8 border-t pt-4">
        <p>Copyright © 2018 • Lift Media Inc.</p>
      </div>
    </footer>
  );
}
