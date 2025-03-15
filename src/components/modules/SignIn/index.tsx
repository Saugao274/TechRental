'use client'
import { Form, Input } from 'antd'
import { Phone } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const SignIn = () => {
    return (
        <div className="h-screen w-full">
            <div className="mx-auto flex h-full w-full items-center bg-red-200 px-[120px]">
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
                    <div className="w-full rounded-lg bg-white p-5">
                        <Form
                            layout="vertical"
                            className="flex flex-col gap-5 !px-[80px]"
                        >
                            <div className="flex1 flex-col gap-2">
                                <p className="text-[32px] font-bold text-primary">
                                    Đăng nhập
                                </p>
                                <p className="italic">
                                    Trải nghiệm công nghệ theo cách mới!
                                </p>
                            </div>
                            <Form.Item label="Số điện thoại">
                                <div className='flex flex-row gap-5 border rounded-lg border-none px-5 py-2'>
                                    <Phone/>
                                    <input placeholder='Nhập số điện thoại' className='w-full outline-none' ></input>
                                </div>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignIn
