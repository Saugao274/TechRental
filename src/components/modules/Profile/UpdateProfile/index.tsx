'use client'
import {
    Avatar,
    Button,
    Card,
    Form,
    Input,
    message,
    Typography,
    Upload,
} from 'antd'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { UploadOutlined } from '@ant-design/icons'
import {
    FacebookOutlined,
    TwitterOutlined,
    LinkedinOutlined,
} from '@ant-design/icons'
import { useAuth } from '@/context/AuthContext'

const { Text } = Typography

const UpdateProfile = () => {
    const [form] = Form.useForm()
    const [avatar, setAvatar] = useState('/images/Intro/avt1.png')
    const { user, updateUser } = useAuth()

    useEffect(() => {
        form.setFieldsValue(user)
    }, [form])

    const handleSubmit = (values: any) => {
        console.log('Success:', values)
        message.success('Cập nhật thông tin thành công!')

        updateUser()
    }

    const handleAvatarChange = (info: any) => {
        if (info.file.status === 'done') {
            const newAvatarUrl = URL.createObjectURL(info.file.originFileObj)
            setAvatar(newAvatarUrl)
            message.success('Đổi ảnh đại diện thành công!')
        }
    }

    return (
        <main className="flex w-full justify-center bg-transparent">
            <Card className="relative w-full max-w-3xl overflow-hidden rounded-2xl p-8 shadow-xl">
                <motion.div
                    className="absolute right-3 z-30 opacity-40 md:right-10 md:top-0"
                    initial={{ x: 50, opacity: 0.5 }}
                    animate={{ x: [40, 60, 40], opacity: [0.4, 0.6, 0.4] }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                >
                    <img
                        src="/images/clound.png"
                        alt="Cloud"
                        className="w-36 opacity-60"
                    />
                </motion.div>
                <motion.div
                    className="absolute -left-16 z-30 opacity-40 md:hidden"
                    initial={{ x: 50, opacity: 0.5 }}
                    animate={{ x: [40, 60, 40], opacity: [0.4, 0.6, 0.4] }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                >
                    <img
                        src="/images/clound.png"
                        alt="Cloud"
                        className="w-36 opacity-60"
                    />
                </motion.div>
                {/* Avatar & Thông tin chính */}
                <div className="relative grid justify-center gap-6 border-b pb-6 md:flex md:items-start md:justify-start">
                    <Avatar
                        src={avatar}
                        size={100}
                        className="!mx-auto border-4 !border-indigo-500 shadow-xl shadow-indigo-300 md:!mx-0"
                        onClick={handleAvatarChange}
                    />
                    <div className="flex flex-col gap-2">
                        <h2 className="text-2xl font-bold text-[#1D3D85]">
                            {user?.name}
                        </h2>
                        <Text className="mx-auto text-gray-500 md:mx-0">
                            Thành viên từ 2024
                        </Text>
                        <div className="mx-auto flex items-center md:mx-0">
                            {user?.isVerified ? (
                                <Text type="success">✅ Đã xác thực</Text>
                            ) : (
                                <Text type="danger">⚠️ Chưa xác thực</Text>
                            )}
                        </div>
                    </div>
                </div>

                {/* Form cập nhật */}
                <Form
                    form={form}
                    layout="vertical"
                    className="mt-6"
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        label="Họ và tên"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập họ và tên',
                            },
                        ]}
                    >
                        <Input
                            placeholder="Nhập họ và tên"
                            className="rounded-lg border-gray-300 p-2"
                        />
                    </Form.Item>
                    <Form.Item label="Số điện thoại" name="phone">
                        <Input
                            readOnly
                            className="cursor-not-allowed rounded-lg border-gray-300 !bg-gray-200 p-2"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: 'Vui lòng nhập email' },
                        ]}
                    >
                        <Input
                            placeholder="Nhập email"
                            className="rounded-lg border-gray-300 p-2"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Địa chỉ"
                        name="address"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập địa chỉ',
                            },
                        ]}
                    >
                        <Input
                            placeholder="Nhập địa chỉ"
                            className="rounded-lg border-gray-300 p-2"
                        />
                    </Form.Item>
                    {/* Nút Lưu */}
                    <div className="mt-4 flex justify-center">
                        <Button
                            htmlType="submit"
                            type="primary"
                            className="rounded-lg bg-indigo-600 px-6 py-2 text-lg font-semibold shadow-md transition hover:bg-indigo-700"
                        >
                            Lưu thay đổi
                        </Button>
                    </div>
                </Form>

                <div className="mt-6 flex justify-center gap-4">
                    <FacebookOutlined className="cursor-pointer text-2xl text-blue-600 hover:text-blue-700" />
                    <TwitterOutlined className="cursor-pointer text-2xl text-sky-500 hover:text-sky-600" />
                    <LinkedinOutlined className="cursor-pointer text-2xl text-blue-800 hover:text-blue-900" />
                </div>
            </Card>
        </main>
    )
}

export default UpdateProfile
