'use client'
import ButtonCommon from '@/components/core/common/ButtonCommon'
import { Avatar, Card, Input, Button } from 'antd'
import { User, Lock } from 'lucide-react'
import React, { useState } from 'react'
import { useAuth } from '@/context/AuthContext'

export default function UpdateProfilePage() {
    const { user } = useAuth()
    const [isEditing, setIsEditing] = useState(false)
    const [firstName, setFirstName] = useState(user?.name?.split(' ')[0] || '')
    const [lastName, setLastName] = useState(
        user?.name?.split(' ').slice(1).join(' ') || '',
    )
    const [phone, setPhone] = useState(user?.phone || '')
    const [email, setEmail] = useState(user?.email || '')
    const [address, setAddress] = useState(user?.address || '')
    const [bio, setBio] = useState('')

    const handleSave = () => {
        const fullName = `${firstName} ${lastName}`.trim()
        console.log('Saved:', { fullName, phone, email, address, bio })
        setIsEditing(false)
    }

    const handleEdit = () => {
        setIsEditing(true)
    }

    const handleChangePassword = () => {
        console.log('Mở form thay đổi mật khẩu')
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-6 sm:p-8">
            <div className="mx-auto max-w-3xl">
                <Card className="border-gradient-to-r rounded-2xl border bg-white/95 from-blue-300 to-purple-400 p-8 shadow-2xl backdrop-blur-md">
                    <div className="mb-8 flex flex-col items-start justify-between sm:flex-row">
                        <div>
                            <h2 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-3xl font-bold text-transparent">
                                Thông Tin Cá Nhân
                            </h2>
                            <p className="mt-2 text-sm text-gray-600">
                                Xem và cập nhật thông tin cá nhân của bạn với
                                phong cách mới
                            </p>
                        </div>
                        {!isEditing && (
                            <ButtonCommon
                                type="primary"
                                className="mt-4 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 px-8 text-white shadow-md transition-all duration-300 hover:from-blue-600 hover:to-purple-700 sm:mt-0"
                                onClick={handleEdit}
                            >
                                Cập nhật thông tin
                            </ButtonCommon>
                        )}
                    </div>

                    <div className="space-y-8">
                        <div className="flex items-center gap-6">
                            <label className="block w-32 text-base font-semibold text-gray-700">
                                Avatar
                            </label>
                            <div className="relative">
                                <Avatar
                                    size={100}
                                    src={
                                        'https://i.pinimg.com/originals/4e/c2/9f/4ec29f1091a5d871956681d02143ab88.jpg'
                                    }
                                    className="border-gradient-to-r transform rounded-full border-4 from-pink-500 via-purple-500 to-blue-500 shadow-lg transition-all duration-300 hover:scale-110"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div>
                                <label className="block text-base font-semibold text-gray-700">
                                    Họ
                                </label>
                                {isEditing ? (
                                    <Input
                                        value={firstName}
                                        onChange={(e) =>
                                            setFirstName(e.target.value)
                                        }
                                        placeholder="Nhập họ"
                                        className="mt-2 w-full rounded-lg border-gray-300 p-3 text-gray-800 transition-all duration-300 focus:border-purple-500 focus:ring focus:ring-purple-200"
                                    />
                                ) : (
                                    <p className="mt-2 rounded-lg bg-gray-100 p-3 text-lg text-gray-900">
                                        {firstName || 'Chưa cập nhật'}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block text-base font-semibold text-gray-700">
                                    Tên
                                </label>
                                {isEditing ? (
                                    <Input
                                        value={lastName}
                                        onChange={(e) =>
                                            setLastName(e.target.value)
                                        }
                                        placeholder="Nhập tên"
                                        className="mt-2 w-full rounded-lg border-gray-300 p-3 text-gray-800 transition-all duration-300 focus:border-purple-500 focus:ring focus:ring-purple-200"
                                    />
                                ) : (
                                    <p className="mt-2 rounded-lg bg-gray-100 p-3 text-lg text-gray-900">
                                        {lastName || 'Chưa cập nhật'}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-base font-semibold text-gray-700">
                                Email
                            </label>
                            {isEditing ? (
                                <Input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Nhập email"
                                    className="mt-2 w-full rounded-lg border-gray-300 p-3 text-gray-800 transition-all duration-300 focus:border-purple-500 focus:ring focus:ring-purple-200"
                                />
                            ) : (
                                <p className="mt-2 rounded-lg bg-gray-100 p-3 text-lg text-gray-900">
                                    {email || 'Chưa cập nhật'}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-base font-semibold text-gray-700">
                                Số Điện Thoại
                            </label>
                            {isEditing ? (
                                <Input
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="Nhập số điện thoại"
                                    className="mt-2 w-full rounded-lg border-gray-300 p-3 text-gray-800 transition-all duration-300 focus:border-purple-500 focus:ring focus:ring-purple-200"
                                />
                            ) : (
                                <p className="mt-2 rounded-lg bg-gray-100 p-3 text-lg text-gray-900">
                                    {phone || 'Chưa cập nhật'}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-base font-semibold text-gray-700">
                                Địa Chỉ
                            </label>
                            {isEditing ? (
                                <Input
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="Nhập địa chỉ"
                                    className="mt-2 w-full rounded-lg border-gray-300 p-3 text-gray-800 transition-all duration-300 focus:border-purple-500 focus:ring focus:ring-purple-200"
                                />
                            ) : (
                                <p className="mt-2 rounded-lg bg-gray-100 p-3 text-lg text-gray-900">
                                    {address || 'Chưa cập nhật'}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-base font-semibold text-gray-700">
                                Tiểu Sử
                            </label>
                            {isEditing ? (
                                <Input.TextArea
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    placeholder="Mô tả ngắn về bạn (URLs có thể được hyperlink)"
                                    className="mt-2 h-32 w-full rounded-lg border-gray-300 p-3 text-gray-800 transition-all duration-300 focus:border-purple-500 focus:ring focus:ring-purple-200"
                                />
                            ) : (
                                <p className="mt-2 rounded-lg bg-gray-100 p-3 text-lg text-gray-900">
                                    {bio || 'Chưa cập nhật'}
                                </p>
                            )}
                        </div>

                        {!isEditing && (
                            <div className="flex items-center gap-4">
                                <label className="block text-base font-semibold text-gray-700">
                                    Mật khẩu
                                </label>
                                <Button
                                    icon={<Lock className="h-5 w-5" />}
                                    className="rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 px-4 py-2 text-white shadow-md transition-all duration-300 hover:from-blue-500 hover:to-purple-600"
                                    onClick={handleChangePassword}
                                >
                                    Thay đổi mật khẩu
                                </Button>
                            </div>
                        )}

                        {isEditing && (
                            <div className="flex justify-end gap-6">
                                <Button
                                    onClick={() => setIsEditing(false)}
                                    className="rounded-lg border-gray-300 px-6 py-2 text-gray-600 transition-all duration-200 hover:border-gray-400 hover:text-gray-700"
                                >
                                    Hủy
                                </Button>
                                <Button
                                    type="primary"
                                    className="h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 px-8 text-white shadow-md transition-all duration-300 hover:from-blue-600 hover:to-purple-700"
                                    onClick={handleSave}
                                >
                                    Lưu Thông Tin
                                </Button>
                            </div>
                        )}
                    </div>
                </Card>
            </div>
        </main>
    )
}
