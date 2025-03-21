'use client'
import ButtonCommon from '@/components/core/common/ButtonCommon'
import { useAuth } from '@/context/AuthContext'
import { user } from '@/data/authData'
import { Form, Input, message, Skeleton } from 'antd'
import { Lock, Phone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const SignIn = () => {
    const router = useRouter()
    const { login } = useAuth()
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 1000)

        return () => clearTimeout(timer)
    }, [])

    const onSubmit = async (value: any) => {
        try {
            await form.validateFields()
            message.success('Đăng nhập thành công!')

            login(user)
            setTimeout(() => {
                router.push('/')
            }, 1000)
        } catch (error) {
            message.error('Đăng nhập thất bại!')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full">
            <div className="mx-auto flex h-full w-full flex-col items-center justify-center md:flex-row md:px-[20px]">
                <div className="flex w-full flex-col items-center justify-center md:w-2/5">
                    <div className="mx-auto flex flex-col items-center justify-center">
                        <Image
                            src={'/icons/logo_full.png'}
                            height={200}
                            width={300}
                            alt="logo"
                        />
                        <img
                            src="/images/auth.png"
                            className="w-2/3 md:w-full"
                        />
                    </div>
                </div>
                <div className="w-full md:w-2/5">
                    {loading ? (
                        <div className="flex h-screen items-center justify-center">
                            <Skeleton active round avatar title />
                        </div>
                    ) : (
                        <div className="w-full rounded-xl !bg-gradient-to-b from-blue-100 to-blue-200 p-2 md:border">
                            <Form
                                layout="vertical"
                                className="flex flex-col !p-[20px] !pt-2"
                                onFinish={onSubmit}
                            >
                                <div className="flex flex-col items-center justify-center gap-2">
                                    <p className="text-[32px] font-bold text-primary">
                                        Đăng nhập
                                    </p>
                                    <p className="pb-3 italic">
                                        Trải nghiệm công nghệ theo cách mới!
                                    </p>
                                </div>
                                <Form.Item
                                    label="Số điện thoại"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Vui lòng nhập số điện thoại',
                                        },
                                        {
                                            pattern: /^[0-9]{10,11}$/,
                                            message:
                                                'Số điện thoại không hợp lệ!',
                                        },
                                    ]}
                                    name="phone"
                                >
                                    <div className="flex flex-row items-center gap-5 rounded-lg border bg-white px-5 py-2">
                                        <Phone />
                                        <Input
                                            placeholder="Nhập số điện thoại"
                                            className="w-full !bg-transparent outline-none"
                                        />
                                    </div>
                                </Form.Item>
                                <Form.Item
                                    label="Mật khẩu"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập mật khẩu',
                                        },
                                    ]}
                                    name="password"
                                >
                                    <div className="flex flex-row items-center gap-5 rounded-lg border bg-white px-5 py-2">
                                        <Lock />
                                        <Input.Password
                                            placeholder="Nhập mật khẩu"
                                            className="w-full !bg-transparent outline-none"
                                        />
                                    </div>
                                </Form.Item>
                                <Form.Item>
                                    <div className="flex flex-row justify-between">
                                        <div className="flex flex-row gap-2">
                                            <input
                                                type="checkbox"
                                                name="isRemember"
                                            />
                                            <p>Ghi nhớ mật khẩu</p>
                                        </div>
                                        <Link href="/forgot-password">
                                            Quên mật khẩu
                                        </Link>
                                    </div>
                                </Form.Item>
                                <ButtonCommon
                                    htmlType="submit"
                                    type="primary"
                                    className="!w-full"
                                    loading={loading}
                                >
                                    Đăng nhập
                                </ButtonCommon>
                            </Form>
                            <div className="mt-5 flex flex-col items-center gap-2 pb-[20px]">
                                <div className="flex flex-row items-center gap-2">
                                    <p>Hoặc đăng nhập với </p>
                                    <div className="flex gap-5">
                                        <img
                                            src="/social/google.png"
                                            alt="gg"
                                            className="h-[30px] w-[30px]"
                                        />
                                        <img
                                            src="/social/facebook.png"
                                            alt="fb"
                                            className="h-[30px] w-[30px]"
                                        />
                                    </div>
                                </div>
                                <div>
                                    Bạn đã có tài khoản chưa?{' '}
                                    <span
                                        className="cursor-pointer text-primary underline"
                                        onClick={() => router.push('/signUp')}
                                    >
                                        Đăng ký
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SignIn
