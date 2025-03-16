'use client'
import {
    Card,
    Table,
    Button,
    Modal,
    message,
    Space,
    Tag,
    Row,
    Col,
    Typography,
} from 'antd'
import { DollarOutlined } from '@ant-design/icons'
import { useState } from 'react'

// Define the product interface
interface Product {
    id: string
    name: string
    image: string
    rentDaily: string
    rentWeekly: string
    rentMonthly: string
    status: 'Sẵn phẩm' | 'Đã cho thuê'
    rating: number
    priority?: 'Basic' | 'Premium' | null
}

// Mock product data (shared with ProductManagement)
const products: Product[] = [
    {
        id: 'PROD-001',
        name: 'Osmo Pocket 3',
        image: 'https://tse2.mm.bing.net/th?id=OIP.5hLDtL7nBZlLotjnt_O0bwHaHB&pid=Api&P=0&h=220',
        rentDaily: '1.800.000 ₫',
        rentWeekly: '6.000.000 ₫',
        rentMonthly: '20.000.000 ₫',
        status: 'Sẵn phẩm',
        rating: 4.5,
        priority: 'Basic',
    },
    {
        id: 'PROD-002',
        name: 'Sony ZV-1',
        image: 'https://tse4.mm.bing.net/th?id=OIP.Srmo4fBjCKCypHkXwFlAgAHaEK&pid=Api&P=0&h=220',
        rentDaily: '2.000.000 ₫',
        rentWeekly: '10.000.000 ₫',
        rentMonthly: '25.000.000 ₫',
        status: 'Đã cho thuê',
        rating: 4.7,
        priority: 'Premium',
    },
    {
        id: 'PROD-003',
        name: 'GoPro Hero 12 Black',
        image: 'https://tse3.mm.bing.net/th?id=OIP.xEIm6Vk4yTA8G9YaGuoN6wHaHa&pid=Api&P=0&h=220',
        rentDaily: '1.000.000 ₫',
        rentWeekly: '6.000.000 ₫',
        rentMonthly: '15.000.000 ₫',
        status: 'Đã cho thuê',
        rating: 4.6,
        priority: null,
    },
]

// Define the priority package interface
interface PriorityPackage {
    type: 'Basic' | 'Premium'
    name: string
    price: number
    description: string
    benefits: string[]
}

const priorityPackages: PriorityPackage[] = [
    {
        type: 'Basic',
        name: 'Gói cơ bản',
        price: 10000,
        description: 'Đề xuất nhiều hơn cho khách hàng',
        benefits: [
            'Hiển thị sản phẩm ở vị trí cao hơn',
            'Tăng khả năng tiếp cận khách hàng',
            'Hỗ trợ quảng bá cơ bản',
        ],
    },
    {
        type: 'Premium',
        name: 'Gói cao cấp',
        price: 50000,
        description: 'Ưu tiên hiển thị cao nhất trên trang',
        benefits: [
            'Hiển thị sản phẩm ở đầu danh sách',
            'Gắn nhãn "Đề xuất" nổi bật',
            'Hỗ trợ quảng bá nâng cao',
            'Ưu tiên hiển thị trong tìm kiếm',
        ],
    },
]

export default function RentalPolicyPage() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

    const columns = [
        {
            title: 'Sản phẩm',
            dataIndex: 'name',
            key: 'name',
            render: (text: string, record: Product) => (
                <Space>
                    <img
                        src={record.image}
                        alt={record.name}
                        style={{
                            width: '50px',
                            height: '50px',
                            objectFit: 'contain',
                            marginRight: '16px',
                        }}
                    />
                    {text}
                </Space>
            ),
        },
        {
            title: 'Thuê ngày',
            dataIndex: 'rentDaily',
            key: 'rentDaily',
        },
        {
            title: 'Thuê tuần',
            dataIndex: 'rentWeekly',
            key: 'rentWeekly',
        },
        {
            title: 'Thuê tháng',
            dataIndex: 'rentMonthly',
            key: 'rentMonthly',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status: Product['status']) => (
                <Tag color={status === 'Sẵn phẩm' ? 'green' : 'red'}>
                    {status}
                </Tag>
            ),
        },
        {
            title: 'Ưu tiên hiện tại',
            dataIndex: 'priority',
            key: 'priority',
            render: (priority: Product['priority']) =>
                priority ? (
                    <Tag color={priority === 'Premium' ? 'gold' : 'blue'}>
                        {priority === 'Premium'
                            ? 'Ưu tiên cao cấp'
                            : 'Ưu tiên cơ bản'}
                    </Tag>
                ) : (
                    'Không ưu tiên'
                ),
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_: any, record: Product) => (
                <Button
                    type="primary"
                    icon={<DollarOutlined />}
                    onClick={() => {
                        setSelectedProduct(record)
                        setIsModalOpen(true)
                    }}
                    disabled={record.status === 'Đã cho thuê'} // Vô hiệu hóa nếu sản phẩm đang được thuê
                >
                    Mua gói ưu tiên
                </Button>
            ),
        },
    ]

    const handlePurchasePriority = (packageType: 'Basic' | 'Premium') => {
        if (!selectedProduct) return

        const packagePrice = packageType === 'Premium' ? 50000 : 10000

        // Cập nhật trạng thái ưu tiên của sản phẩm
        const updatedProducts = products.map((product) =>
            product.id === selectedProduct.id
                ? { ...product, priority: packageType }
                : product,
        )

        message.success(
            `Đã mua gói ${packageType === 'Premium' ? 'Ưu tiên cao cấp' : 'Ưu tiên cơ bản'} cho sản phẩm ${selectedProduct.name}`,
        )
        setIsModalOpen(false)
        setSelectedProduct(null)
    }

    return (
        <div style={{ padding: '16px' }}>
            <div style={{ marginBottom: '16px' }}>
                <h2
                    style={{
                        fontSize: '24px',
                        fontWeight: 'bold',
                        color: '#0052cc',
                    }}
                >
                    Chính sách cho thuê
                </h2>
                <p style={{ color: '#0052cc', opacity: 0.7 }}>
                    Mua gói ưu tiên để sản phẩm của bạn được hiển thị nổi bật
                    hơn tới khách hàng.
                </p>
            </div>
            <Card>
                <Table
                    columns={columns}
                    dataSource={products}
                    rowKey="id"
                    pagination={false}
                    style={{ marginBottom: '24px' }}
                />
            </Card>

            {/* Modal để mua gói ưu tiên */}
            <Modal
                title={
                    <Typography.Title
                        level={3}
                        style={{ color: '#0052cc', textAlign: 'center' }}
                    >
                        {`Mua gói ưu tiên cho sản phẩm ${selectedProduct?.name}`}
                    </Typography.Title>
                }
                open={isModalOpen}
                footer={null}
                onCancel={() => {
                    setIsModalOpen(false)
                    setSelectedProduct(null)
                }}
                centered
                width="80%"
                style={{
                    maxWidth: '900px',
                    minHeight: '500px',
                }}
                bodyStyle={{
                    background:
                        'linear-gradient(135deg, #f0faff 0%, #e6f0ff 100%)',
                    borderRadius: '12px',
                    padding: '24px',
                }}
            >
                <Row gutter={[24, 24]} style={{ marginTop: '16px' }}>
                    {priorityPackages.map((pkg) => (
                        <Col xs={24} sm={12} key={pkg.type}>
                            <Card
                                hoverable
                                style={{
                                    borderRadius: '12px',
                                    border:
                                        pkg.type === 'Premium'
                                            ? '2px solid #ffd700'
                                            : '2px solid #40c4ff',
                                    background:
                                        pkg.type === 'Premium'
                                            ? 'linear-gradient(135deg, #fff9e6 0%, #fff3c2 100%)'
                                            : 'linear-gradient(135deg, #e6faff 0%, #d6eaff 100%)',
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                    transition:
                                        'transform 0.3s ease, box-shadow 0.3s ease',
                                    position: 'relative',
                                    overflow: 'hidden',
                                }}
                                styles={{
                                    body: {
                                        padding: '24px',
                                    },
                                }}
                                onMouseEnter={(e) => {
                                    ;(
                                        e.currentTarget as HTMLElement
                                    ).style.transform = 'scale(1.03)'
                                    ;(
                                        e.currentTarget as HTMLElement
                                    ).style.boxShadow =
                                        '0 6px 18px rgba(0, 0, 0, 0.15)'
                                }}
                                onMouseLeave={(e) => {
                                    ;(
                                        e.currentTarget as HTMLElement
                                    ).style.transform = 'scale(1)'
                                    ;(
                                        e.currentTarget as HTMLElement
                                    ).style.boxShadow =
                                        '0 4px 12px rgba(0, 0, 0, 0.1)'
                                }}
                            >
                                {/* Gắn nhãn "Đề xuất" cho gói Premium */}
                                {pkg.type === 'Premium' && (
                                    <div
                                        style={{
                                            position: 'absolute',
                                            top: '10px',
                                            right: '10px',
                                            background: '#ffd700',
                                            color: '#fff',
                                            padding: '4px 12px',
                                            borderRadius: '12px',
                                            fontSize: '12px',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        Đề xuất
                                    </div>
                                )}
                                <Typography.Title
                                    level={4}
                                    style={{
                                        marginBottom: '12px',
                                        color:
                                            pkg.type === 'Premium'
                                                ? '#d4a017'
                                                : '#1890ff',
                                        textAlign: 'center',
                                    }}
                                >
                                    {pkg.name}
                                </Typography.Title>
                                <Typography.Text
                                    strong
                                    style={{
                                        fontSize: '24px',
                                        color:
                                            pkg.type === 'Premium'
                                                ? '#d4a017'
                                                : '#1890ff',
                                        display: 'block',
                                        textAlign: 'center',
                                        marginBottom: '12px',
                                    }}
                                >
                                    {pkg.price.toLocaleString()} ₫
                                </Typography.Text>
                                <Typography.Paragraph
                                    style={{
                                        margin: '12px 0',
                                        color: '#595959',
                                        textAlign: 'center',
                                        fontSize: '16px',
                                    }}
                                >
                                    {pkg.description}
                                </Typography.Paragraph>
                                <ul
                                    style={{
                                        paddingLeft: '20px',
                                        marginBottom: '24px',
                                        color: '#595959',
                                        fontSize: '14px',
                                    }}
                                >
                                    {pkg.benefits.map((benefit, index) => (
                                        <li
                                            key={index}
                                            style={{ marginBottom: '8px' }}
                                        >
                                            {benefit}
                                        </li>
                                    ))}
                                </ul>
                                <Button
                                    type="primary"
                                    block
                                    onClick={() =>
                                        handlePurchasePriority(pkg.type)
                                    }
                                    style={{
                                        borderRadius: '8px',
                                        height: '48px',
                                        fontSize: '16px',
                                        background:
                                            pkg.type === 'Premium'
                                                ? 'linear-gradient(90deg, #ffd700 0%, #d4a017 100%)'
                                                : 'linear-gradient(90deg, #40c4ff 0%, #1890ff 100%)',
                                        border: 'none',
                                        color: '#fff',
                                        transition: 'background 0.3s ease',
                                    }}
                                    onMouseEnter={(e) => {
                                        ;(
                                            e.currentTarget as HTMLElement
                                        ).style.background =
                                            pkg.type === 'Premium'
                                                ? 'linear-gradient(90deg, #d4a017 0%, #ffd700 100%)'
                                                : 'linear-gradient(90deg, #1890ff 0%, #40c4ff 100%)'
                                    }}
                                    onMouseLeave={(e) => {
                                        ;(
                                            e.currentTarget as HTMLElement
                                        ).style.background =
                                            pkg.type === 'Premium'
                                                ? 'linear-gradient(90deg, #ffd700 0%, #d4a017 100%)'
                                                : 'linear-gradient(90deg, #40c4ff 0%, #1890ff 100%)'
                                    }}
                                >
                                    Chọn gói
                                </Button>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Modal>
        </div>
    )
}
