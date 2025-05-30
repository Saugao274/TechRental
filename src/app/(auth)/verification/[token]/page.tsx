'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { message, Typography, Button, Image } from 'antd'
import Link from 'next/link'

const { Title, Text } = Typography

const Welcome = () => {
    const params = useParams()
    const { token } = params
    const [countdown, setCountdown] = useState<number>(4)
    const intervalRef = useRef<NodeJS.Timeout | null>(null)
    const router = useRouter()
    const startCountdown = () => {
        intervalRef.current = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(intervalRef.current!)
                    router.push('/signIn')
                    return 0
                }
                message.info(`Trang sẽ đóng trong ${prev - 1} giây.`)
                return prev - 1
            })
        }, 1000)
    }

    const handleVerify = async () => {
        console.log('token', token)
        if (!token) return

        try {
            // thêm api check token => thêm user
            message.success('Xác thực thành công')
        } catch (error) {
            message.error('Xác thực thất bại')
        } finally {
            startCountdown()
        }
    }

    useEffect(() => {
        handleVerify()
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current)
        }
    }, [])

    return (
        <div className="w-full">
            <div className="mx-auto flex h-full w-full flex-col items-center justify-center md:flex-row md:px-[20px]">
                <div className="flex w-full flex-col items-center justify-center md:w-2/5">
                    <div className="mx-auto flex flex-col items-center justify-center object-cover">
                        <Image
                            src={'/icons/logo_full.png'}
                            height={100}
                            width={200}
                            alt="logo"
                        ></Image>
                        <img
                            src="/images/auth.png"
                            className="w-2/3 md:w-full"
                        ></img>
                    </div>
                </div>
                <div className="mt-20 flex w-full flex-col items-center gap-4 text-center md:w-2/5">
                    <Title className="!text-blue-900" level={2}>
                        Xin chào, đây là trang xác thực
                    </Title>
                    <Text>
                        Nếu trình duyệt không tự đóng, bạn có thể quay lại đăng
                        nhập bằng cách thủ công.
                    </Text>
                    <Link href="/signIn">
                        <Button type="link" className="underline">
                            Quay lại trang đăng nhập
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Welcome
