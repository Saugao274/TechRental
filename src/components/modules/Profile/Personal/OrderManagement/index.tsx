'use client'
import { useAuth } from '@/context/AuthContext' // ⬅️ hook lấy user
import { getRequest, postRequest, putRequest } from '@/request' // ⬅️ hàm GET wrapper
import { orderEndpoint } from '@/settings/endpoints' // ⬅️ '/orders/user/:userId'
import {
    Card,
    Tabs,
    Table,
    Input,
    Badge,
    Button,
    Dropdown,
    Grid,
    Typography,
    Spin,
    Empty,
    message,
} from 'antd'
import {
    SearchOutlined,
    FilterOutlined,
    ReloadOutlined,
} from '@ant-design/icons'
import dayjs from 'dayjs'
import 'dayjs/locale/vi'
import { useState, useEffect, useMemo } from 'react'
import currency from 'currency.js'
import { ColumnType } from 'antd/es/table'

dayjs.locale('vi')

/* ---------------------------------- types ---------------------------------- */
export type OrderStatusAPI =
    | 'completed'
    | 'pending_payment'
    | 'pending_confirmation'
    | 'in_delivery'
    | 'return_product'
    | 'canceled'
    | 'before_deadline'

export type OrderStatusVN =
    | 'Đã hoàn thành'
    | 'Chờ xác nhận'
    | 'Đang xử lý'
    | 'Đã hủy'
    | 'Đã trả'
    | 'Chờ thanh toán'

type Order = {
    id: string
    customerId: string
    production: string
    products: string[]
    date: string
    duration: string
    status: OrderStatusVN
    total: string
}

/* ------------------ mock fallback (bật QUICK DEMO = true) ------------------ */
const USE_MOCK = false // ➜ đổi thành true nếu muốn xem UI nhanh khi offline

const mockOrders: Order[] = [
    {
        id: 'ORD-001',
        customerId: 'CUS-001',
        production: 'Gói chụp ảnh chuyên nghiệp',
        products: ['Máy ảnh Canon EOS R5', 'Ống kính RF 24-70mm'],
        date: '01/01/2023',
        duration: '5 ngày',
        status: 'Đã hoàn thành',
        total: '2.500.000 ₫',
    },
    // ...
]

export const STATUS_VN: Record<OrderStatusAPI, OrderStatusVN> = {
    completed: 'Đã hoàn thành',
    pending_payment: 'Chờ thanh toán',
    pending_confirmation: 'Chờ xác nhận',
    in_delivery: 'Đang xử lý',
    return_product: 'Đã trả',
    canceled: 'Đã hủy',
    before_deadline: 'Đang xử lý',
}
const STATUS_COLOR: Record<OrderStatusVN, string> = {
    'Đã hoàn thành': 'green',
    'Chờ xác nhận': 'orange',
    'Đang xử lý': 'blue',
    'Đã hủy': 'red',
    'Đã trả': 'red',
    'Chờ thanh toán': 'orange',
}

export const STATUS_API: Record<OrderStatusVN, OrderStatusAPI> =
    Object.fromEntries(
        Object.entries(STATUS_VN).map(([api, vn]) => [vn, api]),
    ) as Record<OrderStatusVN, OrderStatusAPI>

/* -------------------------------------------------------------------------- */
const { Title, Text } = Typography
const { TabPane } = Tabs
const { useBreakpoint } = Grid

export default function OrderManagement() {
    const { user } = useAuth()
    const isOwner = user?.roles?.includes('owner')
    const screens = useBreakpoint()
    const isMobile = !screens.md

    const [orders, setOrders] = useState<Order[]>(USE_MOCK ? mockOrders : [])
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')
    const [activeTab, setActiveTab] = useState<
        'all' | 'pending' | 'processing' | 'completed' | 'cancelled'
    >('all')

    const fetchOrders = async () => {
        if (USE_MOCK || !user?._id) return
        try {
            setLoading(true)
            const { data } = await getRequest(
                orderEndpoint.GET_ORDER_BY_USER_ID.replace(':userId', user._id),
            )

            // convert
            const mapped: Order[] = data.map((o: any) => {
                const firstTitle = o.products[0]?.title ?? 'Sản phẩm'
                const more =
                    o.products.length > 1 ? ` (+${o.products.length - 1})` : ''
                return {
                    id: o._id, // ví dụ ABC2F0
                    customerId: o.customerId,
                    production: firstTitle + more,
                    products: o.products.map((p: any) => p.title),
                    date: dayjs(o.createdAt).format('DD/MM/YYYY'),
                    duration: `${o.duration} ngày`,
                    status:
                        STATUS_VN[o.status as OrderStatusAPI] ?? 'Đang xử lý',
                    total:
                        currency(o.totalPrice, {
                            symbol: '',
                            precision: 0,
                        }).format() + ' ₫',
                }
            })
            setOrders(mapped)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchOrders()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    /* --------------------------- filter logic --------------------------- */
    const searched = useMemo(
        () =>
            orders.filter(
                (o) =>
                    o.production.toLowerCase().includes(search.toLowerCase()) ||
                    o.id.toLowerCase().includes(search.toLowerCase()),
            ),
        [orders, search],
    )

    const handleApprove = async (
        orderId: string,
        customerId: string,
    ): Promise<void> => {
        try {
            setLoading(true)

            // Đơn đang ở trạng thái 'Chờ xác nhận' (pending_confirmation),
            // ta duyệt để chuyển sang 'pending_payment'.
            const nstatus: OrderStatusAPI = 'pending_payment'

            await putRequest(
                orderEndpoint.UPDATE_STATUS.replace(':id', orderId),
                {
                    data: {
                        status: nstatus,
                        toId: customerId,
                    },
                },
            )

            message.success('Đơn hàng đã được duyệt!')
            await fetchOrders() // refresh lại bảng
        } catch (error) {
            console.error(error)
            message.error('Duyệt đơn hàng thất bại!')
        } finally {
            setLoading(false)
        }
    }

    const handleChangeToInDelivery = async (
        orderId: string,
        customerId: string,
    ): Promise<void> => {
        try {
            // Đơn đang ở trạng thái 'Chờ xác nhận' (pending_confirmation),
            // ta duyệt để chuyển sang 'pending_payment'.

            await putRequest(
                orderEndpoint.UPDATE_STATUS.replace(':id', orderId),
                {
                    data: {
                        status: 'in_delivery',
                        toId: customerId,
                    },
                },
            )

            message.success('Đơn hàng đã được duyệt!')
            await fetchOrders();
        } catch (error) {
            console.error(error)
            message.error('Duyệt đơn hàng thất bại!')
        } finally {
        }
    }

    const handlePayment = async (
        total: string,
        orderId: string,
        customerId: string,
    ) => {
        try {
            const numberOnly = total.replace(/[^\d]/g, '')

            const cleanAmount = Number(numberOnly).toLocaleString('vi-VN')

            const res = await postRequest(orderEndpoint.CREATE_ORDER, {
                data: {
                    amount: cleanAmount.toString(),
                },
            })
            window.open(res?.data, '_blank')
            handleChangeToInDelivery(orderId, customerId)
        } catch (error) {
            message.error('Vui lòng thử lại sau!')
        }
    }

    const tabOrders = useMemo(() => {
        if (activeTab === 'all') return searched
        if (activeTab === 'pending')
            return searched.filter((o) => o.status === 'Chờ xác nhận')
        if (activeTab === 'processing')
            return searched.filter((o) => o.status === 'Đang xử lý')
        if (activeTab === 'completed')
            return searched.filter((o) => o.status === 'Đã hoàn thành')
        if (activeTab === 'cancelled')
            return searched.filter((o) => o.status === 'Đã hủy')
        return searched
    }, [searched, activeTab])

    const desktopCols: ColumnType<Order>[] = [
        {
            title: 'Mã đơn',
            dataIndex: 'id',
            render: (id: string) => <div>{id.slice(-6).toUpperCase()}</div>,
        },
        { title: 'Sản phẩm', dataIndex: 'production' },
        { title: 'Ngày đặt', dataIndex: 'date' },
        { title: 'Thời gian thuê', dataIndex: 'duration' },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            render: (st: OrderStatusVN) => (
                <Badge color={STATUS_COLOR[st]} text={st} />
            ),
        },
        { title: 'Tổng tiền', dataIndex: 'total' },
        {
            title: 'Chi tiết',
            render: () => <Button type="link">Chi tiết</Button>,
        },
    ]

    if (isOwner) {
        desktopCols.push({
            title: 'Duyệt đơn',
            render: (record: Order) =>
                record.status === 'Chờ xác nhận' ? (
                    <Button
                        type="primary"
                        onClick={() =>
                            handleApprove(record.id, record.customerId)
                        }
                    >
                        Duyệt
                    </Button>
                ) : (
                    <Text>Đã duyệt</Text>
                ),
        })
    }

    desktopCols.push({
        title: 'Thanh toán',
        render: (record: Order) =>
            record.status === 'Chờ thanh toán' ? (
                <Button
                    type="primary"
                    onClick={() =>
                        handlePayment(
                            record.total,
                            record.id,
                            record.customerId,
                        )
                    }
                >
                    Thanh toán
                </Button>
            ) : (
                <Text>-</Text>
            ),
    })

    const mobileCols: ColumnType<Order>[] = [
        {
            title: 'Đơn hàng',
            render: (r: Order) => (
                <div className="flex flex-col gap-1">
                    <div className="flex justify-between">
                        <Text strong>{r.id.slice(-6).toUpperCase()}</Text>
                        <Badge color={STATUS_COLOR[r.status]} text={r.status} />
                    </div>
                    <Text>{r.production}</Text>
                    <div className="flex justify-between text-gray-500">
                        <Text type="secondary">{r.date}</Text>
                        <Text type="secondary">{r.duration}</Text>
                    </div>
                    <div className="mt-1 flex justify-between">
                        <Text strong>{r.total}</Text>
                        <Button type="link" className="!p-0">
                            Chi tiết
                        </Button>
                    </div>
                </div>
            ),
        },
    ]

    if (isOwner) {
        mobileCols.push({
            title: 'Duyệt đơn',
            render: (r: Order) =>
                r.status === 'Chờ xác nhận' ? (
                    <Button
                        type="primary"
                        onClick={() => handleApprove(r.id, r.customerId)}
                    >
                        Duyệt
                    </Button>
                ) : (
                    <Text>Đã duyệt</Text>
                ),
        })
    }

    mobileCols.push({
        title: 'Thanh toán',
        render: (r: Order) =>
            r.status === 'Chờ thanh toán' ? (
                <Button
                    type="primary"
                    onClick={() => handlePayment(r.total, r.id, r.customerId)}
                >
                    Thanh toán
                </Button>
            ) : (
                <Text>-</Text>
            ),
    })

    /* ---------------------------- tab labels ---------------------------- */
    const tabItems = [
        { key: 'all', label: 'Tất cả' },
        { key: 'pending', label: 'Chờ xác nhận' },
        { key: 'processing', label: 'Đang xử lý' },
        { key: 'completed', label: 'Đã hoàn thành' },
        { key: 'cancelled', label: 'Đã hủy' },
    ]

    /* ---------------------------- render UI ---------------------------- */
    return (
        <div className="flex flex-col gap-5">
            <div className="px-4 md:px-0">
                <Title level={isMobile ? 4 : 3} className="!mb-1">
                    Quản lý đơn hàng
                </Title>
                <Text type="secondary">
                    Theo dõi và tìm kiếm đơn hàng của bạn
                </Text>
            </div>

            <Card bodyStyle={{ padding: isMobile ? 12 : 24 }}>
                {/* header */}
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
                            <Text type="secondary">
                                Danh sách các đơn hàng thuê sản phẩm
                            </Text>
                        )}
                    </div>

                    <div
                        className={`flex ${isMobile ? 'flex-col gap-2' : ''} items-center`}
                    >
                        {isMobile && (
                            <Dropdown
                                trigger={['click']}
                                menu={{
                                    items: tabItems,
                                    onClick: (e) => setActiveTab(e.key as any),
                                    selectedKeys: [activeTab],
                                }}
                            >
                                <Button icon={<FilterOutlined />}>
                                    {
                                        tabItems.find(
                                            (t) => t.key === activeTab,
                                        )?.label
                                    }
                                </Button>
                            </Dropdown>
                        )}

                        <Input
                            prefix={<SearchOutlined />}
                            placeholder="Tìm kiếm..."
                            style={{ width: isMobile ? '100%' : 300 }}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        {!isMobile && (
                            <Button
                                icon={<ReloadOutlined />}
                                onClick={fetchOrders}
                                loading={loading}
                                className="ml-2"
                            />
                        )}
                    </div>
                </div>

                {loading ? (
                    <Spin className="my-10 w-full" />
                ) : orders.length === 0 ? (
                    <Empty description="Chưa có đơn hàng" />
                ) : isMobile ? (
                    <Table
                        columns={mobileCols}
                        dataSource={tabOrders}
                        rowKey="id"
                        pagination={{
                            size: 'small',
                            pageSize: 5,
                            showTotal: (t) => `${t} đơn hàng`,
                        }}
                    />
                ) : (
                    <Tabs
                        activeKey={activeTab}
                        onChange={(k) => setActiveTab(k as any)}
                    >
                        {tabItems.map((tab) => (
                            <TabPane tab={tab.label} key={tab.key}>
                                <Table
                                    columns={desktopCols}
                                    dataSource={tabOrders}
                                    rowKey="id"
                                    sticky
                                    pagination={{
                                        showSizeChanger: true,
                                        showTotal: (t) => `Tổng ${t} đơn hàng`,
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
