'use client'

import { Table, Input, Button, Card } from 'antd'
import { Search, Eye } from 'lucide-react'
import React, { useState } from 'react'
import { statusColors } from '@/data/manageProductData'

interface RentalItem {
    key: string
    product: string
    orderDate: string
    dueDate: string
    status: string
    total: string
    isPaid: boolean
}

export default function RentalHistoryPage() {
    const [dataSource, setDataSource] = useState<RentalItem[]>([
        {
            key: 'ORD-001',
            product: 'Máy ảnh Canon EOS R5',
            orderDate: '01/01/2023',
            dueDate: '5 ngày',
            status: 'Đã hoàn thành',
            total: '2.500.000 đ',
            isPaid: true,
        },
        {
            key: 'ORD-002',
            product: 'MacBook Pro',
            orderDate: '15/02/2023',
            dueDate: '7 ngày',
            status: 'Đã hoàn thành',
            total: '3.200.000 đ',
            isPaid: true,
        },
        {
            key: 'ORD-003',
            product: 'Drone DJI Mini 3',
            orderDate: '05/04/2023',
            dueDate: '3 ngày',
            status: 'Cần xác nhận',
            total: '1.500.000 đ',
            isPaid: false,
        },
        {
            key: 'ORD-004',
            product: 'Máy quay Sony FX3',
            orderDate: '10/04/2023',
            dueDate: '10 ngày',
            status: 'Đang giao hàng',
            total: '5.000.000 đ',
            isPaid: false,
        },
    ])

    const [searchText, setSearchText] = useState<string>('')
    const [currentPage, setCurrentPage] = useState<number>(1)
    const pageSize = 5

    const filteredData = dataSource.filter(
        (item: RentalItem) =>
            item.key.toLowerCase().includes(searchText.toLowerCase()) ||
            item.product.toLowerCase().includes(searchText.toLowerCase()),
    )

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    const paginatedData = filteredData.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize,
    )

    const columns = [
        {
            title: 'Mã đơn',
            dataIndex: 'key',
            key: 'key',
            width: 60,
            className: 'min-w-[60px] text-center',
        },
        {
            title: 'Sản phẩm',
            dataIndex: 'product',
            key: 'product',
            width: 100,
            className: 'min-w-[100px] truncate text-center',
            render: (text: string) => <span className="truncate">{text}</span>,
        },
        {
            title: 'Ngày đặt',
            dataIndex: 'orderDate',
            key: 'orderDate',
            width: 70,
            className: 'min-w-[70px] text-center',
        },
        {
            title: 'Thời gian',
            dataIndex: 'dueDate',
            key: 'dueDate',
            width: 70,
            className: 'min-w-[70px] text-center',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            width: 80,
            render: (text: string) => {
                const color =
                    statusColors[text as keyof typeof statusColors] || 'gray'
                return (
                    <div className="flex items-center gap-2">
                        <span
                            className={`h-3 w-3 rounded-full bg-${color}-500`}
                        ></span>
                        <span className={`rounded-full px-2 py-0.5 text-xs`}>
                            {text}
                        </span>
                    </div>
                )
            },
            className: 'min-w-[80px] text-center',
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'total',
            key: 'total',
            width: 80,
            ellipsis: true,
            render: (text: string) => (
                <span className="whitespace-nowrap text-xs">{text}</span>
            ),
            className: 'min-w-[80px] text-center',
        },
        {
            title: 'Hành động',
            key: 'action',
            width: 80,
            render: (_: any, record: RentalItem) => (
                <Button
                    type="primary"
                    icon={<Eye className="h-3 w-3" />}
                    className="h-7 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 px-1 py-1 text-xs text-white"
                    onClick={() => {
                        console.log('Xem chi tiết đơn hàng:', record.key)
                    }}
                >
                    Xem
                </Button>
            ),
            className: 'min-w-[80px] text-center',
        },
    ]

    return (
        <main className="mx-auto w-full max-w-7xl bg-gray-50 p-4">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-blue-800">
                    Lịch Sử Thuê
                </h1>
                <p className="text-sm text-gray-600">
                    Danh sách các đơn thuê, bao gồm thông tin chi tiết.
                </p>
            </div>

            <div className="mb-6">
                <Input
                    placeholder="Tìm kiếm mã đơn hoặc sản phẩm..."
                    prefix={<Search className="h-4 w-4 text-gray-400" />}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="w-full rounded-md border-gray-300 p-2 text-sm focus:border-blue-500 focus:ring focus:ring-blue-200 md:w-1/3"
                />
            </div>

            <div className="hidden md:block">
                <Card className="max-w-full rounded-lg border p-1 shadow-md sm:p-2">
                    <div className="w-full">
                        <Table
                            columns={columns}
                            dataSource={paginatedData}
                            pagination={false}
                            className="w-full rounded-lg"
                            size="small"
                        />

                        <div className="mt-4 flex w-full justify-center">
                            <div className="flex items-center gap-2">
                                <Button
                                    onClick={() =>
                                        handlePageChange(currentPage - 1)
                                    }
                                    disabled={currentPage === 1}
                                    className="rounded-md bg-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-300"
                                >
                                    Trước
                                </Button>
                                <span className="flex items-center px-4 py-2 text-sm">
                                    {currentPage}
                                </span>
                                <Button
                                    onClick={() =>
                                        handlePageChange(currentPage + 1)
                                    }
                                    disabled={
                                        currentPage * pageSize >=
                                        filteredData.length
                                    }
                                    className="rounded-md bg-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-300"
                                >
                                    Sau
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>
            </div>

            <div className="block md:hidden">
                <div className="grid grid-cols-1 gap-4">
                    {paginatedData.map((item) => {
                        const color =
                            statusColors[
                                item.status as keyof typeof statusColors
                            ] || 'gray'
                        return (
                            <Card
                                key={item.key}
                                className="shadow-sm transition-shadow hover:shadow-md"
                            >
                                <div className="flex flex-col gap-2">
                                    <div className="flex-1">
                                        <h3 className="font-medium text-gray-700">
                                            Mã đơn: {item.key}
                                        </h3>
                                        <p className="truncate text-sm text-gray-500">
                                            Sản phẩm: {item.product}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="flex items-center gap-2">
                                            <span
                                                className={`h-3 w-3 rounded-full bg-${color}-500`}
                                            ></span>
                                            <span
                                                className={`inline-flex items-center rounded-full px-2 py-1 text-xs bg-${color}-100`}
                                            >
                                                {item.status}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600">
                                            Tổng: {item.total}
                                        </p>
                                        <Button
                                            type="primary"
                                            icon={<Eye className="h-4 w-4" />}
                                            className="h-9 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
                                            onClick={() =>
                                                console.log(
                                                    'Xem chi tiết đơn hàng:',
                                                    item.key,
                                                )
                                            }
                                        >
                                            Xem
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        )
                    })}
                </div>

                <div className="mt-6 flex justify-center gap-2">
                    <Button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="rounded-md bg-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-300"
                    >
                        Trước
                    </Button>
                    <span className="flex items-center px-4 py-2 text-sm">
                        {currentPage}
                    </span>
                    <Button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage * pageSize >= filteredData.length}
                        className="rounded-md bg-gray-200 px-4 py-2 text-sm text-gray-700 hover:bg-gray-300"
                    >
                        Sau
                    </Button>
                </div>
            </div>
        </main>
    )
}
