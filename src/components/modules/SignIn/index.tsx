'use client'
import ButtonCommon from '@/components/core/common/ButtonCommon'
import { Button, Form, Input } from 'antd'
import { Lock, Phone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
const SignIn = () => {
    const onSubmit = async (value: any) => {
        try {
            console.log(value)
        } catch (error) {}
    }
    const router = useRouter()

    return (
        <div className="h-screen w-full">
            <div className="mx-auto flex h-full w-full flex-col items-center md:flex-row md:px-[120px]">
                <div className="flex w-full md:w-2/5 flex-col items-center justify-center">
                    <div className="mx-auto flex flex-col items-center justify-center">
                        <Image
                            src={'/icons/logo_full.png'}
                            height={200}
                            width={300}
                            alt="logo"
                            className='md:w-[300px] md:h-[200px] !w-[200px]'
                        ></Image>
                        <img src="/images/auth.png" className= " w-2/3 md:w-full"></img>
                    </div>
                </div>
                <div className="w-full md:w-3/5 ">
                    <div className="w-full rounded-xl md:border p-2 md:p-5">
                        <Form
                            layout="vertical"
                            className="flex flex-col gap-2  !p-[20px] md:!p-[60px] !pb-0"
                            onFinish={onSubmit}
                        >
                            <div className="flex1 flex-col gap-2">
                                <p className="text-[32px] font-bold text-primary">
                                    Đăng nhập
                                </p>
                                <p className="italic">
                                    Trải nghiệm công nghệ theo cách mới!
                                </p>
                            </div>
                            <Form.Item
                                label="Số điện thoại"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập số điện thoại',
                                    },
                                ]}
                                name={'phone'}
                            >
                                <div className="flex flex-row gap-5 rounded-lg border bg-white px-5 py-2">
                                    <Phone />
                                    <input
                                        placeholder="Nhập số điện thoại"
                                        className="w-full !bg-transparent outline-none"
                                    ></input>
                                </div>
                            </Form.Item>
                            <Form.Item
                                label="Mật khẩu"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập mật khẩukhẩu',
                                    },
                                ]}
                                name={'password'}
                            >
                                <div className="flex flex-row gap-5 rounded-lg border bg-white px-5 py-2">
                                    <Lock />
                                    <input
                                        placeholder="Nhập mật khẩu"
                                        className="w-full !bg-transparent outline-none"
                                    ></input>
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
                            >
                                Đăng nhập
                            </ButtonCommon>
                        </Form>
                        <div className="mt-5 flex flex-col items-center gap-2 pb-[60px]">
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
                                    onClick={() => router.push('/sign-up')}
                                >
                                    Đăng ký
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn
