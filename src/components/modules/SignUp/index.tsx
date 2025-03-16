'use client'
import ButtonCommon from '@/components/core/common/ButtonCommon'
import { Form } from 'antd'
import { Lock, Phone } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

export default function SignUpModule() {
    return (
        <div className="h-screen w-full">
            <div className="mx-auto flex h-full w-full flex-col items-center md:flex-row md:px-[120px]">
                <div className="flex w-full flex-col items-center justify-center md:w-2/5">
                    <div className="mx-auto flex flex-col items-center justify-center">
                        <Image
                            src={'/icons/logo_full.png'}
                            height={200}
                            width={300}
                            alt="logo"
                            className="!w-[200px] md:h-[200px] md:w-[300px]"
                        ></Image>
                        <img
                            src="/images/auth.png"
                            className="w-2/3 md:w-full"
                        ></img>
                    </div>
                </div>
                <div className="w-full md:w-3/5">
                    <div className="w-full rounded-xl md:border p-2 md:p-5">
                        <Form
                            layout="vertical"
                            className="flex flex-col gap-2 !p-[20px] md:!p-[60px] !pb-0"
                        >
                            <div className="flex1 flex-col gap-2">
                                <p className="text-[32px] font-bold text-primary">
                                    Đăng ký
                                </p>
                                <p className="italic">
                                    Trải nghiệm công nghệ theo cách mới!
                                </p>
                            </div>
                            <Form.Item
                                label="Email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Nhập email của bạn',
                                    },
                                ]}
                                name={'phone'}
                            >
                                <div className="flex flex-row gap-5 rounded-lg border bg-white px-5 py-2">
                                    <Phone />
                                    <input
                                        placeholder="Nhập email của bạn"
                                        className="w-full !bg-transparent outline-none"
                                    ></input>
                                </div>
                            </Form.Item>
                            <Form.Item
                                label="Số điện thoại"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập số điện thoại',
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
                            <Form.Item
                                label="Mật khẩu"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập mật khẩu',
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
                            <Form.Item
                                label="Nhập lại mật khẩu"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập lại mật khẩu',
                                    },
                                ]}
                                name={'password'}
                            >
                                <div className="flex flex-row gap-5 rounded-lg border bg-white px-5 py-2">
                                    <Lock />
                                    <input
                                        placeholder="Nhập lại mật khẩu của bạn"
                                        className="w-full !bg-transparent outline-none"
                                    ></input>
                                </div>
                            </Form.Item>
                            <div className="flex flex-row gap-5">
                                <ButtonCommon
                                    type="default"
                                    className="!w-full"
                                >
                                    Đăng nhập
                                </ButtonCommon>

                                <ButtonCommon
                                    htmlType="submit"
                                    type="primary"
                                    className="!w-full"
                                >
                                    Đăng ký
                                </ButtonCommon>
                            </div>
                        </Form>
                        <div className="mt-5 flex flex-col items-center gap-2 pb-[60px]">
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
