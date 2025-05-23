'use client'

import ButtonCommon from '@/components/core/common/ButtonCommon'
import { useAuth } from '@/context/AuthContext'
import { Form, Input, message, Skeleton } from 'antd'
import { Lock, Mail } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { postRequest } from '@/request'
import constants from '@/settings/constants'

const SignIn = () => {
    const router = useRouter()
    const { login } = useAuth()
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)

    const onSubmit = async (values: { email: string; password: string }) => {
        try {
            setLoading(true)
            console.log('[FORM VALUE]', values)

            const response: any = await postRequest(
                '/api/auth/login',
                {
                    data: {
                        usernameOrEmail: values.email,
                        password: values.password,
                    },
                },
                false,
            )

            console.log('[RESPONSE]', response)
            console.log('USER payload', response.user)

            if (!response || !response.user) {
                throw new Error('Dữ liệu phản hồi không hợp lệ từ máy chủ.')
            }

            const user = response.user
            const token = response.token
            const role = user.roles?.[0] ?? 'guest'

            login(user)

            localStorage.setItem(constants.ACCESS_TOKEN, token)
            localStorage.setItem('role', role)
            localStorage.setItem('userId', user._id)

            const redirectUrl = role === 'admin' ? '/admin/dashboard' : `/`
            console.log('→ Redirecting to:', redirectUrl)
            router.push(redirectUrl)

            message.success('Đăng nhập thành công!')
        } catch (error: any) {
            console.error('[LOGIN ERROR]', error)
            const msg =
                error?.response?.data?.message ||
                error?.message ||
                'Đăng nhập thất bại, vui lòng thử lại.'
            message.error(msg)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full">
            <div className="mx-auto flex h-full w-full flex-col items-center justify-center md:flex-row md:px-[20px]">
                {/* Hình minh hoạ */}
                <div className="flex w-full flex-col items-center justify-center md:w-2/5">
                    <div className="mx-auto flex flex-col items-center justify-center">
                        <Image
                            src="/icons/logo_full.png"
                            height={200}
                            width={300}
                            alt="logo"
                        />
                        <img
                            src="/images/auth.png"
                            className="w-2/3 md:w-full"
                            alt="auth visual"
                        />
                    </div>
                </div>

                {/* Form đăng nhập */}
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
                                form={form}
                            >
                                <div className="flex flex-col items-center justify-center gap-2">
                                    <p className="text-[32px] font-bold text-primary">
                                        Đăng nhập
                                    </p>
                                    <p className="pb-3 italic">
                                        Trải nghiệm công nghệ theo cách mới!
                                    </p>
                                </div>

                                {/* Email */}
                                <Form.Item
                                    label="Email"
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập Email',
                                        },
                                        {
                                            type: 'email',
                                            message: 'Email không hợp lệ!',
                                        },
                                    ]}
                                >
                                    <div className="flex flex-row items-center gap-5 rounded-lg border bg-white px-5 py-2">
                                        <Mail />
                                        <Input
                                            placeholder="Nhập email của bạn"
                                            className="w-full !bg-transparent outline-none"
                                        />
                                    </div>
                                </Form.Item>

                                {/* Mật khẩu */}
                                <Form.Item
                                    label="Mật khẩu"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập mật khẩu',
                                        },
                                    ]}
                                >
                                    <div className="flex flex-row items-center gap-5 rounded-lg border bg-white px-5 py-2">
                                        <Lock />
                                        <Input.Password
                                            placeholder="Nhập mật khẩu"
                                            className="w-full !bg-transparent outline-none"
                                        />
                                    </div>
                                </Form.Item>

                                {/* Tuỳ chọn khác */}
                                <Form.Item>
                                    <div className="flex flex-row justify-between text-sm">
                                        <label className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                name="isRemember"
                                                className="h-4 w-4"
                                            />
                                            Ghi nhớ mật khẩu
                                        </label>
                                        <Link href="/forgot-password">
                                            Quên mật khẩu
                                        </Link>
                                    </div>
                                </Form.Item>

                                {/* Nút submit */}
                                <ButtonCommon
                                    htmlType="submit"
                                    type="primary"
                                    className="!w-full"
                                    loading={loading}
                                >
                                    Đăng nhập
                                </ButtonCommon>
                            </Form>

                            {/* Đăng nhập xã hội & chuyển trang đăng ký */}
                            <div className="mt-5 flex flex-col items-center gap-2 pb-[20px]">
                                <div className="flex flex-row items-center gap-2">
                                    <p>Hoặc đăng nhập với</p>
                                    <div className="flex gap-5">
                                        <img
                                            src="/social/google.png"
                                            alt="google"
                                            className="h-[30px] w-[30px]"
                                        />
                                        <img
                                            src="/social/facebook.png"
                                            alt="facebook"
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
