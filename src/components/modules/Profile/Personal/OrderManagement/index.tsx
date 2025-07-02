'use client'
import { useAuth } from '@/context/AuthContext'
import { getRequest, postRequest, putRequest } from '@/request'
import { orderEndpoint } from '@/settings/endpoints'
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
    Modal,
    List,
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
import { useRouter } from 'next/navigation'
import ButtonCommon from '@/components/core/common/ButtonCommon'

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
    | 'Đã hủy'
    | 'Cần thanh toán'
    | 'Đã hoàn thành'
    | 'Chờ xác nhận'
    | 'Chờ giao hàng'
    | 'Cần trả hàng'
    | 'Đã giao hàng'

type Order = {
    id: string
    customerId: string
    production: string
    products: string[]  // list of product titles
    rawProducts?: any[] // full details from API response
    date: string
    duration: string
    status: OrderStatusVN
    total: string
    image: string
}

/* ------------------ mock fallback (bật QUICK DEMO = true) ------------------ */
const USE_MOCK = false
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
        image: ""
    },
    // ...
]

export const STATUS_VN: Record<OrderStatusAPI, OrderStatusVN> = {
    completed: 'Đã hoàn thành',
    pending_payment: 'Cần thanh toán',
    pending_confirmation: 'Chờ xác nhận',
    in_delivery: 'Chờ giao hàng',
    return_product: 'Cần trả hàng',
    canceled: 'Đã hủy',
    before_deadline: 'Đã giao hàng',
}
const STATUS_COLOR: Record<OrderStatusVN, string> = {
    'Đã hủy': 'red',
    'Cần thanh toán': 'orange',
    'Đã hoàn thành': 'green',
    'Chờ xác nhận': 'orange',
    'Chờ giao hàng': 'blue',
    'Cần trả hàng': 'orange',
    'Đã giao hàng': 'purple',
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
    const router = useRouter()

    const [orders, setOrders] = useState<Order[]>(USE_MOCK ? mockOrders : [])
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')
    const [activeTab, setActiveTab] = useState<
        'all' | 'pending' | 'processing' | 'completed' | 'cancelled'
    >('all')

    // State for displaying order details
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

    const fetchOrders = async () => {
        if (USE_MOCK || !user?._id) return
        try {
            setLoading(true)
            const { data } = await getRequest(
                orderEndpoint.GET_ORDER_BY_USER_ID.replace(':userId', user._id),
            )

            // convert data and save full products details as rawProducts for later use
            const mapped: Order[] = data.map((o: any) => {
                const firstTitle = o.products[0]?.productId?.title ?? 'Sản phẩm'
                const more =
                    o.products.length > 1 ? ` (+${o.products.length - 1})` : ''
                return {
                    id: o._id,
                    customerId: o.customerId,
                    production: firstTitle + more,
                    products: o.products.map((p: any) => p.productId.title),
                    rawProducts: o.products,
                    date: dayjs(o.createdAt).format('DD/MM/YYYY'),
                    duration: `${o.duration} ngày`,
                    image: o.products.map((p: any) => p.productId.images[0]),
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

    const [evidenceMap, setEvidenceMap] = useState<Record<string, boolean>>({});

    // When orders change, fetch evidence for orders in "Chờ giao hàng" status
    useEffect(() => {
        const fetchEvidenceForOrders = async () => {
            const newEvidenceMap: Record<string, boolean> = {};
            const awaitingEvidence = orders.filter(
                (o) => o.status === "Chờ giao hàng"
            );
            await Promise.all(
                awaitingEvidence.map(async (order) => {
                    try {
                        const res = await getRequest(
                            orderEndpoint.GET_ORDER_EVIDENCE_BY_ORDERID(order.id)
                        );
                        newEvidenceMap[order.id] = res?.data?.[0]?.submittedBy === "renter";
                    } catch (error) {
                        console.error("Error fetching evidence for order", order.id, error);
                    }
                })
            );
            setEvidenceMap((prev) => ({ ...prev, ...newEvidenceMap }));
        };

        if (orders.length > 0) {
            fetchEvidenceForOrders();
        }
    }, [orders]);

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
                    orderId,
                    customerId,
                },
            })
            window.open(res?.data, '_blank')
        } catch (error) {
            message.error('Vui lòng thử lại sau!')
        }
    }

    const handleCancelOrder = async (orderId: string, customerId: string) => {
        try {
            setLoading(true)
            await putRequest(
                orderEndpoint.UPDATE_STATUS.replace(':id', orderId),
                {
                    data: {
                        status: 'canceled',
                        toId: customerId,
                    },
                },
            )
            message.success('Đơn hàng đã được hủy thành công!')
            await fetchOrders()
        } catch (error) {
            console.error(error)
            message.error('Hủy đơn hàng thất bại!')
        } finally {
            setLoading(false)
        }
    }

    const tabOrders = useMemo(() => {
        if (activeTab === 'all') return searched
        if (activeTab === 'pending')
            return searched.filter(
                (o) =>
                    o.status === 'Chờ xác nhận' ||
                    o.status === 'Cần thanh toán',
            )
        if (activeTab === 'processing')
            return searched.filter(
                (o) =>
                    o.status === 'Chờ giao hàng' ||
                    o.status === 'Đã giao hàng' ||
                    o.status === 'Cần trả hàng',
            )
        if (activeTab === 'completed')
            return searched.filter((o) => o.status === 'Đã hoàn thành')
        if (activeTab === 'cancelled')
            return searched.filter((o) => o.status === 'Đã hủy')
        return searched
    }, [searched, activeTab])

    // Desktop Table columns
    const desktopCols: ColumnType<Order>[] = [
        {
            title: 'Mã đơn',
            dataIndex: 'id',
            render: (id: string) => <div>{id.slice(-6).toUpperCase()}</div>,
        },
        {
            title: 'Hình ảnh sản phẩm',
            dataIndex: 'image',
            render: (image: string) => (
                <img
                    src={image}
                    alt="Hình ảnh sản phẩm"
                    style={{ width: 60, height: 60, objectFit: 'cover' }}
                />
            )
        },
        {
            title: 'Sản phẩm', dataIndex: 'production',
            render: (production: string) => (
                <p className='line-clamp-2'>
                    {production}
                </p>
            )
        },
        // { title: 'Ngày đặt', dataIndex: 'date' },
        // { title: 'Thời gian thuê', dataIndex: 'duration' },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            render: (st: OrderStatusVN) => (
                <Badge color={STATUS_COLOR[st]} text={st} />
            ),
        },
        // { title: 'Tổng tiền', dataIndex: 'total' },
        {
            title: 'Chi tiết sản phẩm',
            render: (record: Order) => {
                return <Button type="text"
                    onClick={() => setSelectedOrder(record)}
                >Xem</Button>
            }
        },
        {
            title: 'Hành động',
            render: (record: Order) => {
                switch (record.status) {
                    case 'Cần thanh toán':
                        return (
                            <div className="flex flex-col gap-1">
                                <Button
                                    type="link"
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
                                <Button
                                    type="link"
                                    danger
                                    onClick={() =>
                                        handleCancelOrder(
                                            record.id,
                                            record.customerId,
                                        )
                                    }
                                >
                                    Hủy đơn
                                </Button>
                            </div>
                        )
                    case 'Chờ xác nhận':
                        return (
                            <div className="flex flex-col gap-1">
                                <Button
                                    type="link"
                                    onClick={() => window.open('/chat', '_blank')}
                                >
                                    Liên hệ shop
                                </Button>
                                <Button
                                    type="link"
                                    danger
                                    onClick={() =>
                                        handleCancelOrder(
                                            record.id,
                                            record.customerId,
                                        )
                                    }
                                >
                                    Hủy đơn
                                </Button>
                            </div>
                        )
                    case 'Cần trả hàng':
                        return (
                            <>
                                <Button type="link">
                                    Đã hoàn tất?
                                </Button>
                            </>
                        )
                    case 'Chờ giao hàng': {
                        const hasEvidence = evidenceMap[record.id]
                        if (hasEvidence) {
                            return (
                                <span className="text-sm text-gray-500">
                                    Người cho thuê đang cập nhật minh chứng
                                </span>
                            )
                        } else {
                            return (
                                <Button
                                    type="link"
                                    onClick={() =>
                                        router.push(
                                            `/personal/${record.customerId}/orders/${record.id}/confirm`
                                        )
                                    }
                                >
                                    Đã nhận hàng?
                                </Button>
                            )
                        }
                    }
                    default:
                        return <>_</>
                }
            },
        },
    ]

    // Mobile Table columns
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
                        {r.status === 'Cần thanh toán' ? (
                            <div className="flex gap-1">
                                <Button
                                    type="primary"
                                    className="!bg-orange-800"
                                    onClick={() =>
                                        handlePayment(r.total, r.id, r.customerId)
                                    }
                                >
                                    Thanh toán
                                </Button>
                                <Button
                                    danger
                                    onClick={() =>
                                        handleCancelOrder(r.id, r.customerId)
                                    }
                                >
                                    Hủy
                                </Button>
                            </div>
                        ) : r.status === 'Chờ giao hàng' ? (
                            <Button
                                type="primary"
                                className="!bg-blue-800"
                                onClick={() =>
                                    router.push(`/manage-orders/${r.id}/before`)
                                }
                            >
                                Đã nhận hàng?
                            </Button>
                        ) : r.status === 'Cần trả hàng' ? (
                            <Button
                                type="primary"
                                className="!bg-green-800"
                                onClick={() =>
                                    router.push(
                                        `/manage-orders/${r.id}/return-info`,
                                    )
                                }
                            >
                                Xem thông tin trả hàng
                            </Button>
                        ) : r.status === 'Chờ xác nhận' ? (
                            <div className="flex gap-1">
                                <Button
                                    type="primary"
                                    className="!bg-blue-800"
                                    onClick={() => window.open('/chat', '_blank')}
                                >
                                    Liên hệ shop
                                </Button>
                                <Button
                                    danger
                                    onClick={() =>
                                        handleCancelOrder(r.id, r.customerId)
                                    }
                                >
                                    Hủy
                                </Button>
                            </div>
                        ) : (
                            <Button type="link">Chi tiết</Button>
                        )}
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
                    className={`flex ${isMobile
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

            {/* Modal to show order product details */}
            <Modal
                visible={!!selectedOrder}
                title="Chi tiết đơn hàng"
                onCancel={() => setSelectedOrder(null)}
                footer={[
                    <Button key="close" onClick={() => setSelectedOrder(null)}>
                        Đóng
                    </Button>,
                ]}
                centered
            >
                {selectedOrder?.rawProducts && (
                    <List
                        itemLayout="horizontal"
                        dataSource={selectedOrder.rawProducts}
                        renderItem={(item: any) => {
                            const prod = item.productId
                            return (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={
                                            <img
                                                src={prod.images[0]}
                                                alt={prod.title}
                                                style={{ width: 60, height: 60, objectFit: 'cover' }}
                                            />
                                        }
                                        title={<Button className='!p-0' type='link' onClick={() => router.push(`/products/${prod._id}`)}>{prod.title}</Button>}
                                        description={
                                            <>
                                                <div>Thời gian thuê: {selectedOrder.duration}</div>
                                                <div>Trạng thái: {selectedOrder.status}</div>
                                                <div>Ngày đặt: {selectedOrder.date}</div>
                                                <div> Tổng tiền: <span className='font-bold'>
                                                    {selectedOrder.total}                                                    </span></div>

                                            </>
                                        }
                                    />
                                </List.Item>
                            )
                        }}
                    />
                )}
            </Modal>
        </div>
    )
}