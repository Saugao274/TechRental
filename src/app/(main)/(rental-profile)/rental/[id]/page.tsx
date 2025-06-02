'use client'

import {
    Card,
    Input,
    Table,
    Avatar,
    Space,
    Button,
    Tabs,
    Typography,
    Badge,
    Image,
    Rate,
    Spin,
} from 'antd'
import {
    SearchOutlined,
    PlusOutlined,
    MessageOutlined,
} from '@ant-design/icons'
import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { getRequest, postRequest } from '@/request'
import {
    productEndpoint,
    storeEndpoint,
    orderEndpoint,
} from '@/settings/endpoints'
import type { ProductDetail } from '@/data/products'
import type { ordersType } from '@/data/manageProductData'

const { Title, Paragraph } = Typography
const { TabPane } = Tabs

export default function ProductManagement() {
    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [productUnits, setProductUnits] = useState<any[]>([])
    const [shop, setShop] = useState<any>(null)
    const [activeTab, setActiveTab] = useState('available')
    const [loading, setLoading] = useState(true)
    const pageSize = 5
    const router = useRouter()
    const { id } = useParams() as { id: string }

    useEffect(() => {
        if (id) localStorage.setItem('shopId', id)
    }, [id])

    useEffect(() => {
        const fetchShop = async () => {
            try {
                const res = await getRequest(storeEndpoint.GET_BY_ID(id))
                setShop(res?.metadata)
            } catch (err) {
                console.error('Lỗi lấy shop từ rental:', err)
            }
        }

        const fetchProducts = async () => {
            setLoading(true) // Start loading
            try {
                const res = await getRequest(productEndpoint.GET_BY_IDSHOP(id))
                const productsData = res?.metadata || []
                const productIds = productsData.map(
                    (product: ProductDetail) => product._id,
                )

                const orderRes = await postRequest(
                    orderEndpoint.GET_ORDER_BY_PRODUCT_ID,
                    { data: { id: productIds } },
                )

                const ordersData = orderRes?.data || []

                const unitList = []
                for (const product of productsData) {
                    if (product.adminApprovalStatus === 'pending') {
                        unitList.push({
                            ...product,
                            unitId: `${product.stock}`,
                            status: 'Chờ admin duyệt',
                        })
                        continue
                    }

                    const rentedCount = ordersData.filter(
                        (o: ordersType) =>
                            o.productId === product._id &&
                            o.productStatus === 'rented',
                    ).length
                    const availableCount = product.stock - rentedCount

                    let status = ''
                    if (rentedCount > 0) {
                        status = `Đã cho thuê`
                        unitList.push({
                            ...product,
                            unitId: `${rentedCount} / ${product.stock}`,
                            status,
                        })
                    }
                    if (availableCount > 0) {
                        status = 'Còn sản phẩm'
                        unitList.push({
                            ...product,
                            unitId: `${availableCount} / ${product.stock}`,
                            status,
                        })
                    }
                }
                setProductUnits(unitList)
            } catch (err) {
                console.error('Lỗi lấy sản phẩm hoặc đơn hàng:', err)
            } finally {
                setLoading(false) // End loading
            }
        }

        if (id) {
            fetchShop()
            fetchProducts()
        }
    }, [id])

    const columns = [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'title',
            key: 'title',
            render: (text: string, record: any) => (
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer',
                    }}
                    onClick={() => router.push(`/products/${record._id}`)}
                >
                    <Image
                        alt={record.title}
                        src={record.images?.[0] || '/placeholder.svg'}
                        preview={false}
                        style={{
                            width: '50px',
                            height: '50px',
                            marginRight: '16px',
                            objectFit: 'contain',
                        }}
                    />
                    <span
                        style={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            maxWidth: '200px',
                            color: '#1677ff',
                            textDecoration: 'underline',
                        }}
                    >
                        {text}
                    </span>
                </div>
            ),
        },

        {
            title: 'Số lượng',
            dataIndex: 'unitId',
            key: 'unitId',
            render: (unitId: string) => unitId.slice(-5),
        },
        {
            title: 'Thuê ngày',
            dataIndex: 'price',
            key: 'price',
            render: (price: number) => `${price.toLocaleString()}₫`,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
                <Badge
                    color={
                        status === 'Còn sản phẩm'
                            ? 'green'
                            : status === 'Chờ admin duyệt'
                                ? 'orange'
                                : 'red'
                    }
                    text={status}
                />
            ),
        },
        {
            title: 'Đánh giá',
            dataIndex: 'rate',
            key: 'rate',
            render: (rate: number) => (
                <div
                    style={{
                        transform: 'scale(0.8)',
                        transformOrigin: 'left center',
                    }}
                >
                    <Rate disabled allowHalf defaultValue={rate} />
                </div>
            ),
        },
    ]

    const renderTabContent = () => {
        let filteredTabProducts = productUnits.filter((unit) => {
            if (activeTab === 'available') return unit.status === 'Còn sản phẩm'
            if (activeTab === 'pending')
                return unit.status === 'Chờ admin duyệt'
            if (activeTab === 'rented') return unit.status === 'Đã cho thuê'
            return true
        })

        return (
            <Table
                columns={columns}
                dataSource={filteredTabProducts}
                rowKey={(record) => `${record.unitId}-${record._id}`}
                pagination={{
                    current: currentPage,
                    pageSize: pageSize,
                    total: filteredTabProducts.length,
                    onChange: (page) => setCurrentPage(page),
                }}
            />
        )
    }

    return (
        <Spin spinning={loading}>
            <div>
                <div style={{ marginBottom: '16px' }}>
                    <Title level={4} style={{ color: '#0052cc' }}>
                        Quản lý sản phẩm
                    </Title>
                    <Paragraph style={{ color: '#0052cc', opacity: 0.7 }}>
                        Dễ dàng quản lý sản phẩm của bạn, bao gồm sản phẩm đang
                        cho thuê, đang chờ duyệt và đã bán.
                    </Paragraph>
                </div>
                <Card>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '16px',
                        }}
                    >
                        <Input
                            prefix={<SearchOutlined />}
                            placeholder="Tìm kiếm sản phẩm"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            style={{ width: '300px' }}
                        />
                        <Space>
                            <Avatar src={shop?.avatar || '/placeholder.svg'} />
                            <span>{shop?.name || 'Tên cửa hàng'}</span>
                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                onClick={() => router.push(`${id}/new`)}
                            >
                                Thêm sản phẩm mới
                            </Button>
                            <Button
                                icon={<MessageOutlined />}
                                onClick={() => router.push('/chat?shopMode=1')}
                            >
                                Chat với khách
                            </Button>
                        </Space>
                    </div>
                    <Tabs
                        activeKey={activeTab}
                        onChange={(key) => setActiveTab(key)}
                        style={{ marginBottom: '16px' }}
                    >
                        <TabPane tab="Sản phẩm có sẵn" key="available" />
                        <TabPane tab="Sản phẩm đang chờ duyệt" key="pending" />
                        <TabPane tab="Sản phẩm đã cho thuê" key="rented" />
                    </Tabs>
                    {renderTabContent()}
                </Card>
            </div>
        </Spin>
    )
}
