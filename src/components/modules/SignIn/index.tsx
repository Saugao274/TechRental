'use client'
import ButtonCommon from '@/components/core/common/ButtonCommon'
import { Button, Form, Input } from 'antd'
import { Lock, Phone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import './style.css'
const SignIn = () => {
    return (
        <div className="h-screen w-full">
            <div className="mx-auto flex h-full w-full items-center px-[120px]">
                <div className="flex w-2/5 flex-col items-center justify-center">
                    <div className="mx-auto flex flex-col items-center justify-center">
                        <Image
                            src={'/icons/logo_full.png'}
                            height={200}
                            width={300}
                            alt="logo"
                        ></Image>
                        <img src="/images/auth.png" className="w-full"></img>
                    </div>
                </div>
                <div className="w-3/5">
                    <div className="w-full rounded-xl border  p-5">
                        <Form
                            layout="vertical"
                            className="flex flex-col gap-2 !pb-0 !p-[60px]"
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
                            >
                                <div className="flex flex-row bg-white gap-5 rounded-lg border px-5 py-2">
                                    <Phone />
                                    <input
                                        placeholder="Nhập số điện thoại"
                                        className="!bg-transparent w-full outline-none"
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
                            >
                                <div className="flex flex-row bg-white gap-5 rounded-lg border px-5 py-2">
                                    <Lock />
                                    <input
                                        placeholder="Nhập mật khẩu"
                                        className="!bg-transparent w-full outline-none"
                                    ></input>
                                </div>
                            </Form.Item>
                            <Form.Item>
                                <div className="flex flex-row justify-between">
                                    <div className="flex flex-row gap-2">
                                        <input type="checkbox" />
                                        <p>Ghi nhớ mật khẩu</p>
                                    </div>
                                    <Link href="/forgot-password">
                                        Quên mật khẩu
                                    </Link>
                                </div>
                            </Form.Item>
                            <Form.Item className="flex !w-full justify-center">
                                <Button
                                    htmlType="submit"
                                    type="primary"
                                    className="!w-full !px-[80px]"
                                >
                                    Đăng nhập
                                </Button>
                            </Form.Item>
                        </Form>
                        <div className="flex flex-col gap-2 items-center pb-[60px]">
                            <div className='flex flex-row gap-2 items-center'>
                                <p>Hoặc đăng nhập với </p>
                                <div className='flex gap-5'>
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
                                Bạn đã có tài khoản chưa? <span>Đăng ký</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn
