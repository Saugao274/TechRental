'use client'
import ButtonCommon from '@/components/core/common/ButtonCommon'
import axios from '@/utils/axiosInstance'

import { Form, Input, Checkbox } from 'antd'
import { Lock, Phone, Mail } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function SignUpModule() {
    const router = useRouter()
    const [form] = Form.useForm() // Lưu trữ dữ liệu form
    const [isChecked, setIsChecked] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async () => {
        try {
            setLoading(true)
            await form.validateFields()
            const values = form.getFieldsValue()

            const response = await axios.post('/auth/register', {
                username: values.email.split('@')[0],
                email: values.email,
                password: values.password,
                phoneNumber: values.phone,
                address: 'None',
            })

            router.push(`/signUp/success?email=${values.email}`)
        } catch (error: any) {
            console.error('Đăng ký lỗi:', error)
            const msg = error.response?.data?.message || 'Có lỗi xảy ra'
            alert('Đăng ký thất bại: ' + msg)
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
                        ></Image>
                        <img
                            src="/images/auth.png"
                            className="w-2/3 md:w-full"
                        ></img>
                    </div>
                </div>
                <div className="w-full md:w-2/5">
                    <div className="w-full rounded-xl !bg-gradient-to-b from-blue-100 to-blue-200 md:border">
                        <Form
                            form={form}
                            layout="vertical"
                            className="flex flex-col !px-[20px] !pt-2"
                            onFinish={handleSubmit} // Xử lý khi nhấn Đăng ký
                        >
                            <div className="flex flex-col items-center justify-center gap-2">
                                <p className="text-[32px] font-bold text-primary">
                                    Đăng ký
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
                                        message: 'Vui lòng nhập email',
                                    },
                                    {
                                        type: 'email',
                                        message: 'Email không hợp lệ!',
                                    },
                                ]}
                            >
                                <Input
                                    prefix={<Mail />}
                                    placeholder="Nhập email của bạn"
                                    className="items-center rounded-lg"
                                />
                            </Form.Item>

                            {/* Số điện thoại */}

                            {/* Mật khẩu */}
                            <Form.Item
                                label="Mật khẩu"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập mật khẩu',
                                    },
                                    {
                                        min: 6,
                                        message: 'Mật khẩu ít nhất 6 ký tự!',
                                    },
                                ]}
                            >
                                <Input.Password
                                    prefix={<Lock />}
                                    placeholder="Nhập mật khẩu"
                                    className="items-center rounded-lg"
                                />
                            </Form.Item>

                            {/* Nhập lại mật khẩu */}
                            <Form.Item
                                label="Nhập lại mật khẩu"
                                name="confirmPassword"
                                dependencies={['password']}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập lại mật khẩu',
                                    },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (
                                                !value ||
                                                getFieldValue('password') ===
                                                    value
                                            ) {
                                                return Promise.resolve()
                                            }
                                            return Promise.reject(
                                                'Mật khẩu không khớp!',
                                            )
                                        },
                                    }),
                                ]}
                            >
                                <Input.Password
                                    prefix={<Lock />}
                                    placeholder="Nhập lại mật khẩu của bạn"
                                    className="items-center rounded-lg"
                                />
                            </Form.Item>

                            {/* Checkbox Điều khoản */}
                            <Form.Item
                                name="agreeTerms"
                                valuePropName="checked"
                                rules={[
                                    {
                                        validator: (_, value) =>
                                            value
                                                ? Promise.resolve()
                                                : Promise.reject(
                                                      'Bạn phải đồng ý với điều khoản',
                                                  ),
                                    },
                                ]}
                            >
                                <Checkbox
                                    checked={isChecked}
                                    onChange={(e) =>
                                        setIsChecked(e.target.checked)
                                    }
                                >
                                    Khi bạn nhấn vào nút đăng ký, bạn đồng ý với{' '}
                                    <a
                                        href="/privacy-policy"
                                        className="text-primary underline"
                                    >
                                        Chính sách bảo mật
                                    </a>{' '}
                                    và{' '}
                                    <a
                                        href="/terms-of-service"
                                        className="text-primary underline"
                                    >
                                        Điều khoản sử dụng
                                    </a>{' '}
                                    của TechRental.
                                </Checkbox>
                            </Form.Item>

                            {/* Nút Đăng ký */}
                            <div className="flex flex-row gap-5">
                                <ButtonCommon
                                    htmlType="submit"
                                    type="primary"
                                    className="!w-full"
                                    disabled={loading || !isChecked}
                                >
                                    {loading ? 'Đang xử lý...' : 'Đăng ký'}
                                </ButtonCommon>
                            </div>
                        </Form>

                        {/* Đăng ký với MXH */}
                        <div className="mt-5 flex flex-col items-center gap-2 pb-[20px]">
                            <div className="flex flex-row items-center gap-2">
                                <p>Hoặc đăng ký với </p>
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
                                Bạn đã có tài khoản?{' '}
                                <span
                                    className="cursor-pointer text-primary underline"
                                    onClick={() => router.push('/signIn')}
                                >
                                    Đăng nhập
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
