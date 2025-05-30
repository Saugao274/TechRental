'use client'
import {
    Card,
    Tabs,
    Table,
    Input,
    Badge,
    Button,
    Typography,
    Modal,
} from 'antd'
import {
    CheckCircleOutlined,
    SearchOutlined,
    FileTextOutlined,
} from '@ant-design/icons'
import { use, useEffect, useState } from 'react'
import { orders, statusColors, type ordersType } from '@/data/manageProductData'
import { useRouter } from 'next/navigation'
import { useMediaQuery } from 'react-responsive'
import { getRequest } from '@/request'
import { productEndpoint } from '@/settings/endpoints'

const { Title, Text } = Typography
const { TabPane } = Tabs

export default function ManageProducts() {
    const router = useRouter()
    const isMobile = useMediaQuery({ maxWidth: 768 })
    const getFooterButtons = (status: string | undefined) => {
        switch (status) {
            case 'Cần xác nhậlon':
                return [
                    <Button key="confirm" type="primary">
                        Xác nhận
                    </Button>,
                    <Button key="cancel" danger>
                        Hủy đơn
                    </Button>,
                ]
            case 'Đang giao hàng':
                return [
                    <Button
                        key="viewTenant"
                        type="dashed"
                        onClick={() => showTenantInfo()}
                    >
                        Xem thông tin người thuê
                    </Button>,
                    <Button key="delivered" type="primary">
                        Xác nhận đã giao hàng
                    </Button>,
                ]
            default:
                return []
        }
    }
    const [productsData, setProductsData] = useState<any[]>([])
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const responseAllProduct = await getRequest(
                    productEndpoint.GET_ALL,
                )
                setProductsData(responseAllProduct.metadata)
            } catch (error) {
                console.error('Error fetching products:', error)
            }
        }

        fetchProducts()
    }, [])
    const [search, setSearch] = useState('')
    const findProductById = (_id: string) => {
        return productsData.find((product) => product._id === _id)
    }

    const filteredOrders = orders.filter(
        (order) =>
            order.idProduct?.length > 0 &&
            order.idProduct.some(
                (_id) =>
                    findProductById(_id)
                        ?.title.toLowerCase()
                        .includes(search.toLowerCase()) ||
                    _id.toLowerCase().includes(search.toLowerCase()),
            ),
    )

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState<ordersType>()

    const showModal = (order: ordersType) => {
        setSelectedOrder(order)
        setIsModalOpen(true)
    }

    const handleClose = () => {
        setIsModalOpen(false)
        setSelectedOrder(undefined)
    }

    const columns: any = [
        {
            title: 'Mã đơn hàng',
            dataIndex: 'idOrder',
            key: 'idOrder',
        },

        {
            title: 'Tên khách hàng',
            dataIndex: 'idCustomer',
            key: 'idCustomer',
            responsive: ['md', 'lg', 'xl'],
        },
        {
            title: 'Sản phẩm',
            dataIndex: 'idProduct',
            key: 'product',
            responsive: ['md', 'lg', 'xl'],
            render: (idProducts: string[]) =>
                idProducts.length > 0
                    ? idProducts
                          .map(
                              (idProduct) =>
                                  findProductById(idProduct)?.title ||
                                  'Không tìm thấy',
                          )
                          .join(', ')
                    : 'Không có sản phẩm',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            responsive: ['md', 'lg', 'xl'],
            render: (status: string) => (
                <Badge
                    color={statusColors[status as keyof typeof statusColors]}
                    text={status}
                />
            ),
        },
        {
            title: 'Xem chi tiết',
            key: 'action',
            render: (_: any, record: any) => (
                <Button
                    type="link"
                    className="!text-primary"
                    onClick={() => showModal(record)}
                    icon={<FileTextOutlined />}
                />
            ),
        },
    ]
    const [isTenantModalOpen, setIsTenantModalOpen] = useState(false)

    const showTenantInfo = () => {
        setIsTenantModalOpen(true)
    }

    const closeTenantModal = () => {
        setIsTenantModalOpen(false)
    }

    return (
        <div className="flex flex-col gap-5 !bg-transparent">
            <Modal
                title="Thông tin người thuê"
                open={isTenantModalOpen}
                onCancel={closeTenantModal}
                footer={[
                    <Button key="close" onClick={closeTenantModal}>
                        Đóng
                    </Button>,
                ]}
            >
                {selectedOrder && (
                    <div>
                        <p>
                            <strong>Tên người thuê:</strong>{' '}
                            {selectedOrder?.idCustomer}
                        </p>
                        <p>
                            <strong>Địa chỉ:</strong>{' '}
                            {/* {selectedOrder.address || 'Chưa cập nhật'} */}
                            Khu đại học FPT Đà Nẵng
                        </p>
                        <p>
                            <strong>Số điện thoại:</strong>{' '}
                            {/* {selectedOrder.phone || 'Chưa cập nhật'} */}{' '}
                            09123456789
                        </p>
                    </div>
                )}
            </Modal>

            <Modal
                title={
                    <div className="flex items-center space-x-2">
                        <CheckCircleOutlined className="text-xl text-green-500" />
                        <span>Chi tiết đơn hàng</span>
                    </div>
                }
                open={isModalOpen}
                onCancel={handleClose}
                footer={[
                    ...getFooterButtons(selectedOrder?.status),
                    <Button key="close" onClick={handleClose}>
                        Đóng
                    </Button>,
                ]}
            >
                {selectedOrder && (
                    <Card bordered={false} className="p-4 shadow-md">
                        <p>
                            <strong>Mã đơn hàng:</strong>{' '}
                            {selectedOrder.idProduct}
                        </p>
                        <p>
                            <strong>Khách hàng:</strong>{' '}
                            <span
                                className="cursor-pointer text-blue-500 underline"
                                // onClick={() =>
                                //     showCustomerModal(
                                //         selectedOrder.idCustomer,
                                //     )
                                // }
                            >
                                {selectedOrder.idCustomer}
                            </span>
                        </p>
                        <p>
                            <strong>Tên sản phẩm:</strong>
                            {selectedOrder.idProduct.map((_id, index) => {
                                const product = findProductById(_id)
                                return (
                                    <span
                                        key={_id}
                                        className="flex cursor-pointer flex-col text-blue-500 underline"
                                        onClick={() =>
                                            router.push(`/products/${_id}`)
                                        }
                                    >
                                        {product?.title || 'Không tìm thấy'}
                                        {index !== selectedOrder._id.length - 1}
                                    </span>
                                )
                            })}
                        </p>

                        <p>
                            <strong>Thời gian thuê:</strong>{' '}
                            {selectedOrder.duration}
                        </p>
                        <p>
                            <strong>Trạng thái:</strong>{' '}
                            <Badge
                                color={statusColors[selectedOrder.status]}
                                text={selectedOrder.status}
                            />
                        </p>
                        <p>
                            <strong>Tổng tiền:</strong>{' '}
                            {selectedOrder.total.toLocaleString()} VND
                        </p>
                    </Card>
                )}
            </Modal>

            <>
                <Card>
                    <div className="mb-4 flex justify-between">
                        <Title className="w-2/3 !text-primary" level={4}>
                            Quản lý đơn hàng
                        </Title>
                        <Input
                            prefix={<SearchOutlined />}
                            placeholder="Tìm kiếm đơn hàng..."
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-1/3"
                        />
                    </div>
                    {!isMobile ? (
                        <Tabs
                            defaultActiveKey="all"
                            tabBarStyle={{
                                minWidth: 'max-content',
                                display: 'flex',
                            }}
                        >
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
                                        (o) =>
                                            o.status ===
                                                'Chờ người thuê thanh toán' ||
                                            o.status === 'Cần xác nhận',
                                    )}
                                    rowKey="id"
                                />
                            </TabPane>
                            <TabPane tab="Đang xử lý" key="processing">
                                <Table
                                    columns={columns}
                                    dataSource={filteredOrders.filter(
                                        (o) =>
                                            o.status === 'Đã giao hàng' ||
                                            o.status === 'Đang giao hàng' ||
                                            o.status === 'Đã nhận hàng',
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
                                        (o) =>
                                            o.status === 'Người thuê đã hủy' ||
                                            o.status === 'Người bán đã hủy',
                                    )}
                                    rowKey="id"
                                />
                            </TabPane>
                        </Tabs>
                    ) : (
                        <Tabs
                            defaultActiveKey="all"
                            tabBarStyle={{
                                minWidth: 'max-content',
                                display: 'flex',
                            }}
                        >
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
                                        (o) =>
                                            o.status ===
                                                'Chờ người thuê thanh toán' ||
                                            o.status === 'Cần xác nhận',
                                    )}
                                    rowKey="id"
                                />
                            </TabPane>
                            <TabPane tab="Đang xử lý" key="processing">
                                <Table
                                    columns={columns}
                                    dataSource={filteredOrders.filter(
                                        (o) =>
                                            o.status === 'Đã giao hàng' ||
                                            o.status === 'Đang giao hàng' ||
                                            o.status === 'Đã nhận hàng',
                                    )}
                                    rowKey="id"
                                />
                            </TabPane>
                        </Tabs>
                    )}
                </Card>
            </>
        </div>
    )
}
