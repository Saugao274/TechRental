'use client'

import { useState } from 'react'

export default function RegistrationForm() {
    const [gender, setGender] = useState('')
    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 py-10">
            <div className="mx-4 w-full max-w-[548px] rounded-lg bg-white p-6 shadow-lg sm:p-8">
                <h2 className="mb-6 text-center text-2xl font-bold text-blue-800 sm:text-3xl">
                    Đăng Ký Định Danh
                </h2>

                <form className="space-y-5">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Họ và Tên
                        </label>
                        <input
                            type="text"
                            placeholder="Họ và Tên"
                            className="w-full rounded-md border border-gray-300 px-4 py-2 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Địa chỉ
                        </label>
                        <input
                            type="text"
                            placeholder="Địa chỉ"
                            className="w-full rounded-md border border-gray-300 px-4 py-2 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Quốc tịch
                        </label>
                        <input
                            type="text"
                            placeholder="Quốc tịch"
                            className="w-full rounded-md border border-gray-300 px-4 py-2 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Nơi cấp chứng từ
                        </label>
                        <input
                            type="text"
                            placeholder="Nơi cấp chứng từ"
                            className="w-full rounded-md border border-gray-300 px-4 py-2 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Giới Tính
                        </label>
                        <select
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            className="w-full rounded-md border border-gray-300 px-4 py-2 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Chọn giới tính</option>
                            <option value="Nam">Nam</option>
                            <option value="Nữ">Nữ</option>
                            <option value="Khác">Khác</option>
                        </select>
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Ngày, tháng, năm sinh
                        </label>
                        <input
                            type="date"
                            placeholder="mm/dd/yyyy"
                            className="w-full rounded-md border border-gray-300 px-4 py-2 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            CCCD/CMND
                        </label>
                        <input
                            type="text"
                            placeholder="CCCD/CMND"
                            className="w-full rounded-md border border-gray-300 px-4 py-2 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mt-6 flex flex-col justify-between gap-4 sm:flex-row">
                        <div className="flex-1">
                            <label className="mb-2 block text-center text-sm font-medium text-gray-700">
                                Tải lên mặt trước CCCD/CMND
                            </label>
                            <button
                                type="button"
                                className="flex w-full items-center justify-center gap-2 rounded-md bg-blue-100 px-4 py-2 text-blue-700 transition duration-200 hover:bg-blue-200"
                            >
                                <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                    ></path>
                                </svg>
                                Tải lên
                            </button>
                        </div>
                        <div className="flex-1">
                            <label className="mb-2 block text-center text-sm font-medium text-gray-700">
                                Tải lên mặt sau CCCD/CMND
                            </label>
                            <button
                                type="button"
                                className="flex w-full items-center justify-center gap-2 rounded-md bg-blue-100 px-4 py-2 text-blue-700 transition duration-200 hover:bg-blue-200"
                            >
                                <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                    ></path>
                                </svg>
                                Tải lên
                            </button>
                        </div>
                    </div>

                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full rounded-md bg-green-600 px-4 py-2 text-white transition duration-200 hover:bg-green-700"
                        >
                            Hoàn tất
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
