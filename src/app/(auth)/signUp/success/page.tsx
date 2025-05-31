'use client'
import { useSearchParams, useRouter } from 'next/navigation'
import { Button, Typography } from 'antd'
const { Title, Paragraph } = Typography

export default function SignUpSuccess() {
    const email = useSearchParams().get('email') || 'hộp thư của bạn'
    const router = useRouter()

    return (
        <div className="flex h-screen flex-col items-center justify-center gap-4">
            <Title level={2}>Đăng ký thành công 🎉</Title>
            <Paragraph>
                Chúng tôi đã gửi một email xác minh tới <b>{email}</b>. Hãy mở
                mail và nhấn vào liên kết để hoàn tất đăng ký.
            </Paragraph>

            <Button type="primary" onClick={() => router.push('/signIn')}>
                Đăng nhập
            </Button>
            <Button
                type="link"
                href="https://mail.google.com"
                target="_blank"
                rel="noreferrer"
            >
                Mở Gmail
            </Button>
        </div>
    )
}
