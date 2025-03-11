'use client'
import ButtonCommon from '@/components/core/common/ButtonCommon'
import { Avatar, Badge, Button, Card, Divider, Modal } from 'antd'
import { Clock, ShieldCheck, ShieldUser, Star, User } from 'lucide-react'
import React, { useState } from 'react'

export default function PersonalProfile() {
    const [isModalOpen, setIsModalOpen] = useState(false)

    // Mock user data
    const user = {
        name: 'Nguyễn Văn A',
        joinDate: '01/01/2025',
        email: 'example@example.com',
        phone: '0123456789',
        address: 'Hà Nội, Việt Nam',
        isVerified: true,
        ownedProducts: 5,
        rentingProducts: 2,
        rentedProducts: 10,
        isLandlord: false,
    }

    return (
        <main className="mx-auto flex w-full flex-col gap-5">
            {/* Greeting Header */}
            <div className="">
                <h1 className="text-2xl font-bold text-primary">
                    Xin chào, {user.name}
                </h1>
                <p className="text-primary">
                    Chào mừng bạn đến với trang cá nhân của mình
                </p>
            </div>

            {/* Verification Status */}
            {user.isVerified && (
                <div className="flex items-center rounded-md border border-green-100 bg-green-50 p-4">
                    <ShieldCheck className="mr-2 text-xl text-green-500" />
                    <div>
                        <h3 className="font-bold text-green-800">
                            Đã xác minh
                        </h3>
                        <p className="text-sm text-green-700">
                            Tài khoản của bạn đã được xác minh danh tính. Điều
                            này giúp tăng độ tin cậy và có thể thuê được sản
                            phẩm.
                        </p>
                    </div>
                </div>
            )}

            {/* User Profile Card */}
            <Card className="shadow-sm">
                <div className="flex flex-col gap-2 md:flex-col">
                    <div className="mb-4 flex items-center md:mb-0 md:mr-6">
                        <Avatar
                            size={64}
                            icon={<User />}
                            className="bg-gray-300"
                        />
                        <div className="ml-4">
                            <h2 className="text-lg font-bold">{user.name}</h2>
                            <p className="text-sm text-gray-500">
                                Thành viên · Tham gia từ: {user.joinDate}
                            </p>
                        </div>
                    </div>

                    <Divider
                        type="vertical"
                        className="hidden h-auto md:block"
                    />

                    <div className="grid flex-grow grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <h3 className="text-sm text-gray-500">Email</h3>
                            <p>{user.email}</p>
                        </div>
                        <div>
                            <h3 className="text-sm text-gray-500">Địa chỉ</h3>
                            <p>{user.address}</p>
                        </div>
                        <div>
                            <h3 className="text-sm text-gray-500">
                                Số điện thoại
                            </h3>
                            <p>{user.phone}</p>
                        </div>
                        <div>
                            <h3 className="text-sm text-gray-500">
                                Trạng thái
                            </h3>
                            <Badge status="success" text="Đã xác thực" />
                        </div>
                    </div>
                </div>
                <div className="mt-4 flex justify-end">
                    <ButtonCommon type="primary" className="bg-blue-500">
                        Cập nhật thông tin
                    </ButtonCommon>
                </div>
            </Card>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {/* Owned Products */}
                <Card className="shadow-sm">
                    <div className="mb-2 flex flex-row-reverse items-center justify-between">
                        <Star className="mr-2 text-blue-500" />
                        <h3 className="font-medium">Danh giá sản phẩm</h3>
                    </div>
                    <h2 className="text-xl font-bold text-blue-800">
                        {user.ownedProducts} sản phẩm
                    </h2>
                    <p className="text-sm text-gray-500">đã đăng bán</p>
                    <ButtonCommon
                        variant="outlined"
                        className="mt-2 w-full p-0 text-primary"
                    >
                        Xem chi tiết
                    </ButtonCommon>
                </Card>

                {/* Renting Products */}
                <Card className="shadow-sm">
                    <div className="mb-2 flex flex-row-reverse items-center justify-between">
                        <Clock className="mr-2 text-blue-500" />
                        <h3 className="font-medium">Thời gian thuê hàng</h3>
                    </div>
                    <h2 className="text-xl font-bold text-blue-800">
                        {user.rentingProducts} sản phẩm
                    </h2>
                    <p className="text-sm text-gray-500">đang thuê</p>
                    <ButtonCommon
                        variant="outlined"
                        className="mt-2 w-full p-0 text-primary"
                    >
                        Xem chi tiết
                    </ButtonCommon>
                </Card>

                {/* Rented Products */}
                <Card className="shadow-sm">
                    <div className="mb-2 flex flex-row-reverse items-center justify-between">
                        <Clock className="mr-2 text-blue-500" />
                        <h3 className="font-medium">Lịch sử thuê</h3>
                    </div>
                    <h2 className="text-xl font-bold text-blue-800">
                        {user.rentedProducts} sản phẩm
                    </h2>
                    <p className="text-sm text-gray-500">đã thuê</p>
                    <ButtonCommon
                        variant="outlined"
                        className="mt-2 w-full p-0 text-primary"
                    >
                        Xem chi tiết
                    </ButtonCommon>
                </Card>
            </div>

            {/* Landlord Information */}
            <div className="">
                <h2 className="mb-4 text-lg font-bold">
                    Thông tin người cho thuê
                </h2>
                {!user.isLandlord ? (
                    <Card className="flex items-center">
                        <div className="flex flex-row items-center gap-5">
                            <Avatar
                                size={48}
                                icon={<User />}
                                className="mr-4 bg-gray-300"
                            />
                            <div>
                                <h3 className="font-medium">
                                    Bạn chưa đăng ký làm người cho thuê
                                </h3>
                                <p className="mb-2 text-sm text-gray-500">
                                    Đăng ký ngay để bắt đầu cho thuê sản phẩm
                                    của bạn
                                </p>
                                <ButtonCommon
                                    type="primary"
                                >
                                    Đăng ký ngay
                                </ButtonCommon>
                            </div>
                        </div>
                    </Card>
                ) : (
                    <Card>
                        <p>Bạn đã đăng ký làm người cho thuê</p>
                    </Card>
                )}
            </div>
        </main>
    )
}
