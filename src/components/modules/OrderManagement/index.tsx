'use client'
import {
    Card,
    Tabs,
    Table,
    Input,
    Badge,
    Button,
    Typography,
    Grid,
    Dropdown,
} from 'antd'
import { SearchOutlined, FilterOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react'
import { orders, statusColors } from '@/data/manageProductData'

const { Title, Text } = Typography
const { TabPane } = Tabs

interface OrderManagementProps {
    type: 'personal' | 'rental' // Define the type of orders
}

export default function OrderManagement({ type }: OrderManagementProps) {
    const [search, setSearch] = useState('')
    const [activeTab, setActiveTab] = useState('all')
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768)
        }

        handleResize()
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const filteredOrders = orders.filter(
        (order) =>
            order.products.some((product) =>
                product.productId.toLowerCase().includes(search.toLowerCase()),
            ) || order._id.toLowerCase().includes(search.toLowerCase()),
    )

    // Filter orders based on active tab and type
    const tabFilteredOrders =
        activeTab === 'all'
            ? filteredOrders
            : filteredOrders.filter((order) => {
                  switch (activeTab) {
                      case 'pending':
                          return order.status === 'pending_confirmation'
                      case 'processing':
                          return (
                              order.status === 'in_delivery' ||
                              order.status === 'before_deadline'
                          )
                      case 'completed':
                          return order.status === 'completed'
                      case 'cancelled':
                          return order.status === 'canceled'
                      default:
                          return true
                  }
              })

    // Define columns dynamically based on type
    const desktopColumns = [
        { title: 'Mã đơn hàng', dataIndex: '_id', key: '_id' },
        {
            title: 'Sản phẩm',
            key: 'products',
            render: (record: any) =>
                record.products.map((product: any) => (
                    <div key={product.unitId}>{product.productId}</div>
                )),
        },
        {
            title: 'Ngày đặt',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (createdAt: string) =>
                new Intl.DateTimeFormat('vi-VN', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                }).format(new Date(createdAt)),
        },
        { title: 'Thời gian thuê', dataIndex: 'duration', key: 'duration' },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
                <Badge
                    color={statusColors[status as keyof typeof statusColors]}
                    text={
                        type === 'personal'
                            ? returnStatusCustomer(status)
                            : returnStatusRenter(status)
                    }
                />
            ),
        },
        { title: 'Tổng tiền', dataIndex: 'totalPrice', key: 'totalPrice' },
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

    const mobileColumns = [
        {
            title: 'Đơn hàng',
            key: 'order',
            render: (record: any) => (
                <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                        <Text strong>{record._id}</Text>
                        <Badge
                            color={
                                statusColors[
                                    record.status as keyof typeof statusColors
                                ]
                            }
                            text={
                                type === 'personal'
                                    ? returnStatusCustomer(record.status)
                                    : returnStatusRenter(record.status)
                            }
                        />
                    </div>
                    <div>
                        {record.products.map((product: any) => (
                            <Text key={product.unitId}>
                                {product.productId}
                            </Text>
                        ))}
                    </div>
                    <div className="flex items-center justify-between text-gray-500">
                        <Text type="secondary">
                            {new Intl.DateTimeFormat('vi-VN', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                            }).format(new Date(record.createdAt))}
                        </Text>
                        <Text type="secondary">{record.duration} ngày</Text>
                    </div>
                    <div className="mt-1 flex items-center justify-between">
                        <Text strong>
                            {record.totalPrice.toLocaleString()}₫
                        </Text>
                        <Button type="link" className="!p-0 !text-primary">
                            Chi tiết
                        </Button>
                    </div>
                </div>
            ),
        },
    ]

    const tabItems = [
        { key: 'all', label: 'Tất cả' },
        { key: 'pending', label: 'Chờ xác nhận' },
        { key: 'processing', label: 'Đang xử lý' },
        { key: 'completed', label: 'Đã hoàn thành' },
        { key: 'cancelled', label: 'Đã hủy' },
    ]

    const returnStatusCustomer = (status: string): string => {
        switch (status) {
            case 'canceled':
                return 'Đã hủy'
            case 'pending_payment':
                return 'Cần thanh toán'
            case 'pending_confirmation':
                return 'Đang chờ xác nhận'
            case 'in_delivery':
                return 'Chờ giao hàng'
            case 'before_deadline':
                return 'Đã nhận được hàng'
            case 'return_product':
                return 'Cần trả hàng'
            default:
                return 'Hoàn thành'
        }
    }

    const returnStatusRenter = (status: string): string => {
        switch (status) {
            case 'pending_payment':
                return 'Chờ người thuê thanh toán'
            case 'canceled':
                return 'Đã hủy'
            case 'pending_confirmation':
                return 'Cần xác nhận'
            case 'in_delivery':
                return 'Đang giao hàng'
            case 'before_deadline':
                return 'Đã giao hàng'
            case 'return_product':
                return 'Chờ trả hàng'
            default:
                return 'Hoàn thành'
        }
    }

    return (
        <div className="flex flex-col gap-5">
            <div className="px-4 md:px-0">
                <Title level={isMobile ? 4 : 3} className="!mb-1 !text-primary">
                    {type === 'personal'
                        ? 'Quản lý đơn hàng cá nhân'
                        : 'Quản lý đơn hàng cho thuê'}
                </Title>
                <Text type="secondary" className="!text-primary">
                    {type === 'personal'
                        ? 'Quản lý các đơn hàng thuê sản phẩm của bạn'
                        : 'Quản lý các đơn hàng cho thuê sản phẩm của bạn'}
                </Text>
            </div>

            <Card bodyStyle={{ padding: isMobile ? 12 : 24 }}>
                <div
                    className={`flex ${
                        isMobile
                            ? 'flex-col gap-3'
                            : 'items-center justify-between'
                    } mb-4`}
                >
                    <div>
                        <Title level={isMobile ? 5 : 4} className="!mb-0">
                            Đơn hàng của bạn
                        </Title>
                        {!isMobile && (
                            <Text>Danh sách các đơn hàng thuê sản phẩm</Text>
                        )}
                    </div>

                    <div
                        className={`flex ${
                            isMobile ? 'flex-col gap-2' : ''
                        } items-center`}
                    >
                        {isMobile && (
                            <div className="flex w-full justify-between">
                                <Text>
                                    Danh sách các đơn hàng thuê sản phẩm
                                </Text>
                                <Dropdown
                                    menu={{
                                        items: tabItems,
                                        onClick: (e) => setActiveTab(e.key),
                                        selectedKeys: [activeTab],
                                    }}
                                    trigger={['click']}
                                >
                                    <Button icon={<FilterOutlined />}>
                                        {
                                            tabItems.find(
                                                (item) =>
                                                    item.key === activeTab,
                                            )?.label
                                        }
                                    </Button>
                                </Dropdown>
                            </div>
                        )}

                        <Input
                            prefix={<SearchOutlined />}
                            placeholder="Tìm kiếm đơn hàng..."
                            style={{ width: isMobile ? '100%' : 300 }}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                {isMobile ? (
                    <div className="mt-4">
                        <Table
                            columns={mobileColumns}
                            dataSource={tabFilteredOrders}
                            rowKey="_id"
                            pagination={{
                                size: 'small',
                                pageSize: 5,
                                showSizeChanger: false,
                                showTotal: (total) => `${total} đơn hàng`,
                            }}
                        />
                    </div>
                ) : (
                    <Tabs
                        defaultActiveKey="all"
                        onChange={setActiveTab}
                        className="order-tabs"
                    >
                        {tabItems.map((tab) => (
                            <TabPane tab={tab.label} key={tab.key}>
                                <Table
                                    columns={desktopColumns}
                                    dataSource={tabFilteredOrders.filter(
                                        (order) => {
                                            switch (tab.key) {
                                                case 'pending':
                                                    return (
                                                        order.status ===
                                                        'pending_confirmation'
                                                    )
                                                case 'processing':
                                                    return (
                                                        order.status ===
                                                            'in_delivery' ||
                                                        order.status ===
                                                            'before_deadline'
                                                    )
                                                case 'completed':
                                                    return (
                                                        order.status ===
                                                        'completed'
                                                    )
                                                case 'cancelled':
                                                    return (
                                                        order.status ===
                                                        'canceled'
                                                    )
                                                default:
                                                    return true
                                            }
                                        },
                                    )}
                                    rowKey="_id"
                                    pagination={{
                                        showSizeChanger: true,
                                        showTotal: (total) =>
                                            `Tổng ${total} đơn hàng`,
                                    }}
                                />
                            </TabPane>
                        ))}
                    </Tabs>
                )}
            </Card>
        </div>
    )
}
