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
    Checkbox,
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
import TermsModal from '@/components/core/elements/TermsModal'
import PrivacyModal from '@/components/core/elements/PrivacyModal'

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
    | 'Đã hủy'
    | 'Chờ thanh toán'
    | 'Cần xác nhận'
    | 'Cần giao hàng'
    | 'Đã giao hàng'
    | 'Chờ trả hàng'

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
    pending_confirmation: 'Cần xác nhận',
    in_delivery: 'Cần giao hàng',
    return_product: 'Chờ trả hàng',
    canceled: 'Đã hủy',
    before_deadline: 'Đã giao hàng',
}
const STATUS_COLOR: Record<OrderStatusVN, string> = {
    'Đã hoàn thành': 'green',
    'Cần xác nhận': 'orange',
    'Cần giao hàng': 'blue',
    'Chờ trả hàng': 'blue',
    'Đã hủy': 'red',
    'Đã giao hàng': 'green',
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

export default function OrderManagementRental() {

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
                orderEndpoint.GET_ORDER_BY_RENTER_ID.replace(
                    ':renterId',
                    user._id,
                ),
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
    const [evidenceMap, setEvidenceMap] = useState<Record<string, boolean>>({});

    // When orders change, fetch evidence for orders in "Chờ giao hàng" status
    useEffect(() => {
        const fetchEvidenceForOrders = async () => {
            const newEvidenceMap: Record<string, boolean> = {};
            // Filter orders with status "Chờ giao hàng"
            const awaitingEvidence = orders.filter(
                (o) => o.status === "Cần giao hàng"
            );
            await Promise.all(
                awaitingEvidence.map(async (order) => {
                    try {
                        const res = await getRequest(
                            orderEndpoint.GET_ORDER_EVIDENCE_BY_ORDERID(order.id)
                        );
                        // Update evidenceMap: set to true if evidence exists and submittedBy is "renter"
                        newEvidenceMap[order.id] = res?.data?.[0]?.submittedBy === "owner";
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
    const [approveModalVisible, setApproveModalVisible] = useState(false)
    const [selectedRecord, setSelectedRecord] = useState<Order | null>(null)
    const [termsModalVisible, setTermsModalVisible] = useState(false)
    const [privacyModalVisible, setPrivacyModalVisible] = useState(false)

    // Existing functions, fetchOrders, handleApprove, etc.
    const handleApprove = async (orderId: string, customerId: string): Promise<void> => {
        try {
            setLoading(true)
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
            message.success('Đơn hàng đã được xác nhận!')
            await fetchOrders()
        } catch (error) {
            console.error(error)
            message.error('Xác nhận đơn hàng thất bại!')
        } finally {
            setLoading(false)
        }
    }

    const tabOrders = useMemo(() => {
        if (activeTab === 'all') return searched
        if (activeTab === 'pending')
            return searched.filter(
                (o) =>
                    o.status === 'Cần xác nhận' ||
                    o.status === 'Chờ thanh toán',
            )
        if (activeTab === 'processing')
            return searched.filter(
                (o) =>
                    o.status === 'Cần giao hàng' ||
                    o.status === 'Chờ trả hàng' ||
                    o.status === 'Đã giao hàng',
            )
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
            title: 'Hành động',
            render: (record: Order) => {
                switch (record.status) {
                    case 'Cần xác nhận':
                        return (
                            <Button
                                type="text"
                                onClick={() => {
                                    setSelectedRecord(record)
                                    setApproveModalVisible(true)
                                }}
                            >
                                Xác nhận
                            </Button>
                        )
                    case 'Chờ trả hàng':
                        return (
                            <div className="flex flex-col gap-2">
                                <Button
                                    type="link"
                                    onClick={() =>
                                        router.push(
                                            `/manage-orders/${record.id}/return-info`,
                                        )
                                    }
                                >
                                    Báo cáo
                                </Button>
                                <Button
                                    type="link"
                                    onClick={() =>
                                        router.push(
                                            `/manage-orders/${record.id}/return-info`,
                                        )
                                    }
                                >
                                    Hoàn tất đơn hàng?
                                </Button>
                            </div>
                        )
                    // case 'Cần giao hàng':
                    //     return (
                    //         <Button
                    //             type="link"
                    //             onClick={() =>
                    //                 router.push(
                    //                     `/manage-orders/${record.id}/before`,
                    //                 )
                    //             }
                    //         >
                    //             Đã giao hàng?
                    //         </Button>
                    //     )
                    case 'Cần giao hàng': {
                        // Kiểm tra trạng thái evidence đã được lưu trong evidenceMap
                        console.log('Record:', record.id, record.status);
                        const hasEvidence = evidenceMap[record.id];
                        console.log('Record:', record.id, hasEvidence);

                        if (hasEvidence) {
                            return (
                                <span className="text-sm text-gray-500">
                                    Người thuê đang cập nhật minh chứng
                                </span>
                            );
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
                            );
                        }
                    }
                    default:
                        return <Button type="default">_</Button>
                }
            },
        },
    ]

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

    mobileCols.push({
        title: 'Hành động',
        render: (record: Order) => {
            if (record.status === 'Cần giao hàng') {
                return (
                    <Button type="primary" onClick={() => { }}>
                        Giao hàng
                    </Button>
                )
            }
        }
    })


    if (isOwner) {
        mobileCols.push({
            title: 'Duyệt đơn',
            render: (r: Order) =>
                r.status === 'Cần xác nhận' ? (
                    <Button
                        type="primary"
                        onClick={() => {
                            setSelectedRecord(r)
                            setApproveModalVisible(true)
                        }}
                    >
                        Duyệt
                    </Button>
                ) : (
                    <Text>Đã duyệt</Text>
                ),
        })
    }

    /* ---------------------------- tab labels ---------------------------- */
    const tabItems = [
        { key: 'all', label: 'Tất cả' },
        { key: 'pending', label: 'Cần xác nhận' },
        { key: 'processing', label: 'Đang xử lý' },
        { key: 'completed', label: 'Đã hoàn thành' },
        { key: 'cancelled', label: 'Đã hủy' },
    ]
    const router = useRouter()
    const [agreed, setAgreed] = useState(false) // new state for checkbox

    /* ---------------------------- render UI ---------------------------- */
    return (
        <div className="flex flex-col gap-5">
            <TermsModal
                open={termsModalVisible}
                onClose={() => setTermsModalVisible(false)}
            />
            <PrivacyModal
                open={privacyModalVisible}
                onClose={() => setPrivacyModalVisible(false)}
            />
            {approveModalVisible && selectedRecord && (
                <Modal
                    open={approveModalVisible}
                    title="Đợi một chút..."
                    onCancel={() => {
                        setApproveModalVisible(false)
                        setAgreed(false)
                    }}

                    footer={[
                        <Button key="cancel" onClick={() => {
                            setApproveModalVisible(false)
                            setAgreed(false)
                        }}>
                            Hủy
                        </Button>,
                        <Button
                            key="agree"
                            type="primary"
                            onClick={async () => {
                                await handleApprove(selectedRecord.id, selectedRecord.customerId)
                                setApproveModalVisible(false)
                                setAgreed(false)
                            }}
                            disabled={!agreed}
                        >
                            Xác nhận
                        </Button>,
                    ]}
                    centered
                >
                    <div className='flex gap-2 mb-6 mt-4'>
                        <img
                            src="/images/Products/Recomment/robotNoti.png"
                            width={50}
                            height={50}
                            className="animate-bounce"
                        />
                        <p>
                            Việc xác nhận đơn hàng đồng nghĩa với bạn đồng ý với{' '}
                            <a
                                onClick={() => setTermsModalVisible(true)}
                                className="underline cursor-pointer"
                            >
                                chính sách
                            </a>{' '}
                            của TechRental
                        </p>

                    </div>

                    <Checkbox
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        className="mt-4 "
                    >
                        Tôi đã nhận được thông tin và đồng ý
                    </Checkbox>
                </Modal>
            )}
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
        </div>
    )
}
