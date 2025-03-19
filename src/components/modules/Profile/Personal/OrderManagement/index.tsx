'use client'
import { Card, Tabs, Table, Input, Badge, Button, Typography } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { useState } from 'react'

const { Title, Text } = Typography
const { TabPane } = Tabs

const orders = [
    {
        id: 'ORD-001',
        product: 'Máy ảnh Canon EOS R5',
        date: '01/01/2023',
        duration: '5 ngày',
        status: 'Đã hoàn thành',
        total: '2.500.000 ₫',
    },
    {
        id: 'ORD-002',
        product: 'Laptop MacBook Pro',
        date: '15/02/2023',
        duration: '7 ngày',
        status: 'Đã hoàn thành',
        total: '3.200.000 ₫',
    },
    {
        id: 'ORD-004',
        product: 'Drone DJI Mini 3',
        date: '05/04/2023',
        duration: '3 ngày',
        status: 'Chờ xác nhận',
        total: '1.500.000 ₫',
    },
    {
        id: 'ORD-005',
        product: 'Máy quay Sony FX3',
        date: '10/04/2023',
        duration: '10 ngày',
        status: 'Đang xử lý',
        total: '5.000.000 ₫',
    },
]

const statusColors = {
    'Đã hoàn thành': 'green',
    'Chờ xác nhận': 'orange',
    'Đang xử lý': 'blue',
    'Đã hủy': 'red',
}

export default function OrderManagement() {
    const [search, setSearch] = useState('')

    const filteredOrders = orders.filter(
        (order) =>
            order.product.toLowerCase().includes(search.toLowerCase()) ||
            order.id.toLowerCase().includes(search.toLowerCase()),
    )

    const columns = [
        { title: 'Mã đơn hàng', dataIndex: 'id', key: 'id' },
        { title: 'Sản phẩm', dataIndex: 'product', key: 'product' },
        { title: 'Ngày đặt', dataIndex: 'date', key: 'date' },
        { title: 'Thời gian thuê', dataIndex: 'duration', key: 'duration' },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
                <Badge
                    color={statusColors[status as keyof typeof statusColors]}
                    text={status}
                />
            ),
        },
        { title: 'Tổng tiền', dataIndex: 'total', key: 'total' },
        {
            title: '',
            key: 'action',
            render: () => (
                <Button type="link" className="!text-primary">
                    Chi tiết
                </Button>
            ),
        },
    ]

    return (
        <div className="flex flex-col gap-5">
            <div>
                <Title level={3} className="!text-primary">
                    Quản lý đơn hàng
                </Title>
                <Text type="secondary" className="!text-primary">
                    Quản lý các đơn hàng thuê sản phẩm của bạn
                </Text>
            </div>
            <Card>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: 16,
                    }}
                >
                    <div>
                        <Title level={4}>Đơn hàng của bạn</Title>
                        <Text>Danh sách các đơn hàng thuê sản phẩm</Text>
                    </div>
                    <Input
                        prefix={<SearchOutlined />}
                        placeholder="Tìm kiếm đơn hàng..."
                        style={{ width: 300 }}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <Tabs defaultActiveKey="all">
                    <TabPane tab="Tất cả" key="all">
                        <Table
                            columns={columns}
                            dataSource={filteredOrders}
                            rowKey="id"
                        />
                    </TabPane>
                    <TabPane tab="Chờ xác nhận" key="pending">
                        <Table
                            columns={columns}
                            dataSource={filteredOrders.filter(
                                (o) => o.status === 'Chờ xác nhận',
                            )}
                            rowKey="id"
                        />
                    </TabPane>
                    <TabPane tab="Đang xử lý" key="processing">
                        <Table
                            columns={columns}
                            dataSource={filteredOrders.filter(
                                (o) => o.status === 'Đang xử lý',
                            )}
                            rowKey="id"
                        />
                    </TabPane>
                    <TabPane tab="Đã hoàn thành" key="completed">
                        <Table
                            columns={columns}
                            dataSource={filteredOrders.filter(
                                (o) => o.status === 'Đã hoàn thành',
                            )}
                            rowKey="id"
                        />
                    </TabPane>
                    <TabPane tab="Đã hủy" key="cancelled">
                        <Table
                            columns={columns}
                            dataSource={filteredOrders.filter(
                                (o) => o.status === 'Đã hủy',
                            )}
                            rowKey="id"
                        />
                    </TabPane>
                </Tabs>
            </Card>
        </div>
    )
}
