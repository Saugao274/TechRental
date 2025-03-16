'use client'
import SectionCommon from '@/components/core/common/SectionCommon'
import { Avatar, Button, Card, Form } from 'antd'
import React from 'react'

const UpdateProfile = () => {
    return (
        <main className="mx-auto flex min-h-screen w-full flex-col gap-5 p-6">
            <Card className="flex items-center rounded-lg p-4 text-white shadow-lg shadow-cyan-100">
                <Avatar
                    src={'/images/Intro/avt1.png'}
                    size={80}
                    className="border-2 border-white"
                />
                <span className="text-lg font-semibold">Nguyễn Văn A</span>
            </Card>

            <Form layout="vertical" className="flex flex-col gap-4">
                <Form.Item
                    label="Họ và tên"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập họ và tên',
                        },
                    ]}
                >
                    <input
                        className="w-full rounded-lg border border-gray-300 p-2 outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Nhập họ và tên"
                    />
                </Form.Item>
                <Form.Item
                    label="Số điện thoại"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập số điện thoại',
                        },
                    ]}
                >
                    <input
                        disabled
                        value="0912345678"
                        className="w-full rounded-lg border border-gray-300 bg-gray-100 p-2 outline-none"
                    />
                </Form.Item>
                <Form.Item
                    label="Email"
                    rules={[{ required: true, message: 'Vui lòng nhập email' }]}
                >
                    <input
                        className="w-full rounded-lg border border-gray-300 p-2 outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Nhập email"
                    />
                </Form.Item>
                <Form.Item
                    label="Địa chỉ"
                    rules={[
                        {
                            required: true,
                            message: 'Vui lòng nhập địa chỉ',
                        },
                    ]}
                >
                    <input
                        className="w-full rounded-lg border border-gray-300 p-2 outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Nhập địa chỉ"
                    />
                </Form.Item>
                <Form.Item className="flex justify-center">
                    <Button
                        htmlType="submit"
                        type="primary"
                        className="w-full rounded-lg bg-blue-600 px-6 py-2 text-white shadow-md transition-all hover:bg-blue-700"
                    >
                        Lưu thay đổi
                    </Button>
                </Form.Item>
            </Form>
        </main>
    )
}

export default UpdateProfile
