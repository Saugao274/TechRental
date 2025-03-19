'use client'

import { useState } from 'react'
import {
    Typography,
    Card,
    Tabs,
    Select,
    Button,
    Input,
    Row,
    Col,
    Rate,
    Divider,
    Space,
    Avatar,
    Badge,
    Breadcrumb,
    Radio,
    Slider,
    Empty,
} from 'antd'
import {
    MessageCircle,
    Heart,
    Star,
    Clock,
    User,
    Package,
    MapPin,
    Phone,
    Mail,
    Calendar,
    CheckCircle,
    AlertCircle,
    Filter,
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import NotFound from '@/app/not-found'
import { getRandomFallbackImage, shopDetails } from '@/data/products'

const { Title, Text, Paragraph } = Typography
const { TabPane } = Tabs
const { Search: SearchInput } = Input

// Dữ liệu mẫu cho cửa hàng
const storeData = {
    id: 'store123',
    name: 'Tech Store',
    avatar: '/images/Intro/avt1.png',
    cover: '/images/Slider/Slider0.png',
    rating: 4.8,
    followers: 2568,
    responseRate: 98,
    responseTime: 'Trong vòng 1 giờ',
    joinedDate: '01/2020',
    productsCount: 156,
    description:
        'Chuyên cung cấp các thiết bị nhiếp ảnh chuyên nghiệp chính hãng với giá cả hợp lý. Cam kết hàng chính hãng 100%, bảo hành đầy đủ.',
    location: 'TP. Hồ Chí Minh',
    contact: {
        phone: '0987654321',
        email: 'photo.gear@example.com',
    },
    operatingHours: '08:00 - 20:00 (Thứ 2 - Chủ nhật)',
    categories: [
        'Máy ảnh',
        'Ống kính',
        'Phụ kiện',
        'Thiết bị quay phim',
        'Đèn flash',
        'Chân máy',
        'Túi máy ảnh',
    ],
}

// Dữ liệu mẫu cho sản phẩm
const productsData = [
    {
        id: 'p1',
        name: 'Máy ảnh Canon EOS 5D Mark IV',
        image: getRandomFallbackImage(),
        price: 2500000,
        originalPrice: 2800000,
        rating: 4.9,
        reviewCount: 120,
        soldCount: 89,
        discount: 10,
        isNew: false,
        category: 'Máy ảnh',
    },
    {
        id: 'p2',
        name: 'Ống kính Sony 24-70mm f/2.8 GM',
        image: getRandomFallbackImage(),
        price: 1800000,
        originalPrice: 2000000,
        rating: 4.8,
        reviewCount: 95,
        soldCount: 76,
        discount: 10,
        isNew: false,
        category: 'Ống kính',
    },
    {
        id: 'p3',
        name: 'Máy quay GoPro Hero 10 Black',
        image: getRandomFallbackImage(),
        price: 950000,
        originalPrice: 1000000,
        rating: 4.7,
        reviewCount: 85,
        soldCount: 62,
        discount: 5,
        isNew: true,
        category: 'Thiết bị quay phim',
    },
    {
        id: 'p4',
        name: 'Chân máy Manfrotto Befree Advanced',
        image: getRandomFallbackImage(),
        price: 350000,
        originalPrice: 400000,
        rating: 4.6,
        reviewCount: 72,
        soldCount: 58,
        discount: 12,
        isNew: false,
        category: 'Chân máy',
    },
    {
        id: 'p5',
        name: 'Đèn flash Godox V1',
        image: getRandomFallbackImage(),
        price: 280000,
        originalPrice: 320000,
        rating: 4.5,
        reviewCount: 65,
        soldCount: 49,
        discount: 12,
        isNew: false,
        category: 'Đèn flash',
    },
    {
        id: 'p6',
        name: 'Túi máy ảnh Peak Design Everyday Sling',
        image: getRandomFallbackImage(),
        price: 180000,
        originalPrice: 200000,
        rating: 4.7,
        reviewCount: 58,
        soldCount: 45,
        discount: 10,
        isNew: true,
        category: 'Túi máy ảnh',
    },
    {
        id: 'p7',
        name: 'Ống kính Canon 70-200mm f/2.8L IS III USM',
        image: getRandomFallbackImage(),
        price: 2200000,
        originalPrice: 2500000,
        rating: 4.9,
        reviewCount: 48,
        soldCount: 32,
        discount: 12,
        isNew: false,
        category: 'Ống kính',
    },
    {
        id: 'p8',
        name: 'Máy ảnh Sony Alpha A7 III',
        image: getRandomFallbackImage(),

        price: 2100000,
        originalPrice: 2300000,
        rating: 4.8,
        reviewCount: 42,
        soldCount: 29,
        discount: 8,
        isNew: false,
        category: 'Máy ảnh',
    },
    {
        id: 'p9',
        name: 'Microphone Rode VideoMic Pro+',
        image: getRandomFallbackImage(),

        price: 420000,
        originalPrice: 450000,
        rating: 4.6,
        reviewCount: 38,
        soldCount: 25,
        discount: 6,
        isNew: true,
        category: 'Phụ kiện',
    },
    {
        id: 'p10',
        name: 'Gimbal DJI Ronin-SC',
        image: getRandomFallbackImage(),

        price: 850000,
        originalPrice: 900000,
        rating: 4.7,
        reviewCount: 35,
        soldCount: 22,
        discount: 5,
        isNew: false,
        category: 'Phụ kiện',
    },
    {
        id: 'p11',
        name: 'Đèn LED Godox SL-60W',
        image: getRandomFallbackImage(),

        price: 320000,
        originalPrice: 350000,
        rating: 4.5,
        reviewCount: 32,
        soldCount: 20,
        discount: 8,
        isNew: false,
        category: 'Đèn flash',
    },
    {
        id: 'p12',
        name: 'Thẻ nhớ SanDisk Extreme Pro 128GB',
        image: getRandomFallbackImage(),
        price: 120000,
        originalPrice: 150000,
        rating: 4.8,
        reviewCount: 28,
        soldCount: 120,
        discount: 20,
        isNew: false,
        category: 'Phụ kiện',
    },
]

export default function StoreModule() {
    const params = useParams()
    const { id } = params

    const router = useRouter()

    const [activeCategory, setActiveCategory] = useState<string>('all')
    const [sortBy, setSortBy] = useState<string>('popular')
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000000])
    const [searchValue, setSearchValue] = useState<string>('')

    // Lọc sản phẩm theo danh mục, giá và tìm kiếm
    const filteredProducts = productsData.filter((product) => {
        const matchCategory =
            activeCategory === 'all' || product.category === activeCategory
        const matchPrice =
            product.price >= priceRange[0] && product.price <= priceRange[1]
        const matchSearch =
            searchValue === '' ||
            product.name.toLowerCase().includes(searchValue.toLowerCase())

        return matchCategory && matchPrice && matchSearch
    })

    // Sắp xếp sản phẩm
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortBy === 'popular') {
            return b.reviewCount - a.reviewCount
        } else if (sortBy === 'newest') {
            return b.isNew ? 1 : -1
        } else if (sortBy === 'bestselling') {
            return b.soldCount - a.soldCount
        } else if (sortBy === 'priceLowToHigh') {
            return a.price - b.price
        } else if (sortBy === 'priceHighToLow') {
            return b.price - a.price
        }
        return 0
    })

    // Định dạng giá tiền
    const formatPrice = (price: number) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'đ'
    }

    return (
        <div style={{ padding: '0 24px 24px' }}>
            {/* Breadcrumb */}
            {/* <Breadcrumb
                style={{ margin: '16px 0' }}
                items={[
                    { title: <Link href="/">Trang chủ</Link> },
                    { title: <Link href="/danh-muc">Danh mục</Link> },
                    { title: storeData.name },
                ]}
            /> */}

            {/* Cover image */}
            <div
                style={{
                    position: 'relative',
                    height: '200px',
                    marginBottom: '20px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                }}
            >
                <Image
                    src={storeData.cover || '/placeholder.svg'}
                    alt={storeData.name}
                    fill
                    style={{ objectFit: 'cover' }}
                />
            </div>

            {/* Store header */}
            <Card style={{ marginBottom: '24px' }}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        gap: '20px',
                    }}
                >
                    <Avatar
                        size={80}
                        src={storeData.avatar}
                        style={{ flexShrink: 0 }}
                    />

                    <div style={{ flex: '1' }}>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                                flexWrap: 'wrap',
                                gap: '10px',
                            }}
                        >
                            <div>
                                <Title level={3} style={{ margin: 0 }}>
                                    {storeData.name}
                                </Title>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        margin: '8px 0',
                                    }}
                                >
                                    <Badge status="success" />
                                    <Text type="secondary">Đang hoạt động</Text>
                                    <Divider type="vertical" />
                                    <Clock size={14} />
                                    <Text type="secondary">
                                        Tham gia từ {storeData.joinedDate}
                                    </Text>
                                </div>
                                <Space size="large">
                                    <Space>
                                        <Star size={16} color="#fadb14" />
                                        <Text>{storeData.rating}/5</Text>
                                    </Space>
                                    <Space>
                                        <User size={16} />
                                        <Text>
                                            {storeData.followers.toLocaleString()}{' '}
                                            người theo dõi
                                        </Text>
                                    </Space>
                                    <Space>
                                        <Package size={16} />
                                        <Text>
                                            {storeData.productsCount} sản phẩm
                                        </Text>
                                    </Space>
                                </Space>
                            </div>

                            <Space>
                                <Button
                                    type="primary"
                                    icon={<Heart size={16} />}
                                >
                                    Theo dõi
                                </Button>
                                <Button icon={<MessageCircle size={16} />}>
                                    Chat
                                </Button>
                            </Space>
                        </div>

                        <Divider style={{ margin: '16px 0' }} />

                        <Row gutter={[24, 16]}>
                            <Col xs={24} md={8}>
                                <Space direction="vertical" size="small">
                                    <Space>
                                        <MapPin size={16} />
                                        <Text>
                                            Địa chỉ: {storeData.location}
                                        </Text>
                                    </Space>
                                    <Space>
                                        <Phone size={16} />
                                        <Text>
                                            SĐT: {storeData.contact.phone}
                                        </Text>
                                    </Space>
                                </Space>
                            </Col>
                            <Col xs={24} md={8}>
                                <Space direction="vertical" size="small">
                                    <Space>
                                        <Mail size={16} />
                                        <Text>
                                            Email: {storeData.contact.email}
                                        </Text>
                                    </Space>
                                    <Space>
                                        <Calendar size={16} />
                                        <Text>
                                            Giờ hoạt động:{' '}
                                            {storeData.operatingHours}
                                        </Text>
                                    </Space>
                                </Space>
                            </Col>
                            <Col xs={24} md={8}>
                                <Space direction="vertical" size="small">
                                    <Space>
                                        <CheckCircle size={16} />
                                        <Text>
                                            Tỷ lệ phản hồi:{' '}
                                            {storeData.responseRate}%
                                        </Text>
                                    </Space>
                                    <Space>
                                        <AlertCircle size={16} />
                                        <Text>
                                            Thời gian phản hồi:{' '}
                                            {storeData.responseTime}
                                        </Text>
                                    </Space>
                                </Space>
                            </Col>
                        </Row>
                    </div>
                </div>
            </Card>

            {/* Store description */}
            <Card title="Giới thiệu cửa hàng" style={{ marginBottom: '24px' }}>
                <Paragraph>{storeData.description}</Paragraph>
            </Card>

            {/* Products section */}
            <Card>
                <Tabs defaultActiveKey="products">
                    <TabPane tab="Sản phẩm" key="products">
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '20px',
                            }}
                        >
                            {/* Categories */}
                            <div
                                style={{
                                    overflowX: 'auto',
                                    whiteSpace: 'nowrap',
                                    padding: '8px 0',
                                }}
                            >
                                <Radio.Group
                                    value={activeCategory}
                                    onChange={(e) =>
                                        setActiveCategory(e.target.value)
                                    }
                                    buttonStyle="solid"
                                >
                                    <Radio.Button value="all">
                                        Tất cả
                                    </Radio.Button>
                                    {storeData.categories.map((category) => (
                                        <Radio.Button
                                            key={category}
                                            value={category}
                                        >
                                            {category}
                                        </Radio.Button>
                                    ))}
                                </Radio.Group>
                            </div>

                            {/* Search and filters */}
                            <div
                                style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: '16px',
                                    alignItems: 'center',
                                }}
                            >
                                <SearchInput
                                    placeholder="Tìm kiếm trong cửa hàng"
                                    allowClear
                                    onSearch={(value) => setSearchValue(value)}
                                    style={{ width: 300 }}
                                />

                                <Space wrap>
                                    <Select
                                        defaultValue="popular"
                                        style={{ width: 150 }}
                                        onChange={(value) => setSortBy(value)}
                                        options={[
                                            {
                                                value: 'popular',
                                                label: 'Phổ biến',
                                            },
                                            {
                                                value: 'newest',
                                                label: 'Mới nhất',
                                            },
                                            {
                                                value: 'bestselling',
                                                label: 'Bán chạy',
                                            },
                                            {
                                                value: 'priceLowToHigh',
                                                label: 'Giá thấp đến cao',
                                            },
                                            {
                                                value: 'priceHighToLow',
                                                label: 'Giá cao đến thấp',
                                            },
                                        ]}
                                    />

                                    <Popover
                                        title="Lọc theo giá"
                                        content={
                                            <div
                                                style={{
                                                    width: 300,
                                                    padding: '12px 0',
                                                }}
                                            >
                                                <Slider
                                                    range
                                                    min={0}
                                                    max={3000000}
                                                    step={100000}
                                                    defaultValue={priceRange}
                                                    onChange={(value) =>
                                                        setPriceRange(
                                                            value as [
                                                                number,
                                                                number,
                                                            ],
                                                        )
                                                    }
                                                    tipFormatter={(value) =>
                                                        formatPrice(value || 0)
                                                    }
                                                />
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent:
                                                            'space-between',
                                                        marginTop: 16,
                                                    }}
                                                >
                                                    <Text>
                                                        {formatPrice(
                                                            priceRange[0],
                                                        )}
                                                    </Text>
                                                    <Text>
                                                        {formatPrice(
                                                            priceRange[1],
                                                        )}
                                                    </Text>
                                                </div>
                                            </div>
                                        }
                                        trigger="click"
                                    >
                                        <Button icon={<Filter size={16} />}>
                                            Lọc giá
                                        </Button>
                                    </Popover>
                                </Space>
                            </div>

                            {/* Products grid */}
                            {sortedProducts.length > 0 ? (
                                <Row gutter={[16, 16]}>
                                    {sortedProducts.map((product) => (
                                        <Col
                                            xs={24}
                                            sm={12}
                                            md={8}
                                            lg={6}
                                            key={product.id}
                                        >
                                            <Link
                                                href={`/products/${product.id}`}
                                                style={{
                                                    textDecoration: 'none',
                                                }}
                                            >
                                                <Card
                                                    hoverable
                                                    cover={
                                                        <div
                                                            style={{
                                                                position:
                                                                    'relative',
                                                                height: 200,
                                                            }}
                                                        >
                                                            <Image
                                                                src={
                                                                    product.image ||
                                                                    '/placeholder.svg'
                                                                }
                                                                alt={
                                                                    product.name
                                                                }
                                                                fill
                                                                style={{
                                                                    objectFit:
                                                                        'cover',
                                                                }}
                                                            />
                                                            {product.discount >
                                                                0 && (
                                                                <div
                                                                    style={{
                                                                        position:
                                                                            'absolute',
                                                                        top: 10,
                                                                        right: 10,
                                                                        background:
                                                                            '#ff4d4f',
                                                                        color: 'white',
                                                                        padding:
                                                                            '2px 8px',
                                                                        borderRadius:
                                                                            '4px',
                                                                        fontSize:
                                                                            '12px',
                                                                    }}
                                                                >
                                                                    -
                                                                    {
                                                                        product.discount
                                                                    }
                                                                    %
                                                                </div>
                                                            )}
                                                            {product.isNew && (
                                                                <div
                                                                    style={{
                                                                        position:
                                                                            'absolute',
                                                                        top: 10,
                                                                        left: 10,
                                                                        background:
                                                                            '#1D3D85',
                                                                        color: 'white',
                                                                        padding:
                                                                            '2px 8px',
                                                                        borderRadius:
                                                                            '4px',
                                                                        fontSize:
                                                                            '12px',
                                                                    }}
                                                                >
                                                                    Mới
                                                                </div>
                                                            )}
                                                        </div>
                                                    }
                                                    bodyStyle={{
                                                        padding: '12px',
                                                    }}
                                                >
                                                    <div
                                                        style={{
                                                            height: '48px',
                                                            overflow: 'hidden',
                                                            marginBottom: '8px',
                                                        }}
                                                    >
                                                        <Text
                                                            style={{
                                                                display:
                                                                    '-webkit-box',
                                                                WebkitLineClamp: 2,
                                                                WebkitBoxOrient:
                                                                    'vertical',
                                                                overflow:
                                                                    'hidden',
                                                                textOverflow:
                                                                    'ellipsis',
                                                            }}
                                                        >
                                                            {product.name}
                                                        </Text>
                                                    </div>

                                                    <div>
                                                        <Text
                                                            strong
                                                            style={{
                                                                color: '#ff4d4f',
                                                                fontSize:
                                                                    '16px',
                                                            }}
                                                        >
                                                            {formatPrice(
                                                                product.price,
                                                            )}
                                                        </Text>
                                                        {product.discount >
                                                            0 && (
                                                            <Text
                                                                delete
                                                                type="secondary"
                                                                style={{
                                                                    marginLeft:
                                                                        '8px',
                                                                    fontSize:
                                                                        '14px',
                                                                }}
                                                            >
                                                                {formatPrice(
                                                                    product.originalPrice,
                                                                )}
                                                            </Text>
                                                        )}
                                                    </div>

                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            justifyContent:
                                                                'space-between',
                                                            marginTop: '8px',
                                                        }}
                                                    >
                                                        <Space>
                                                            <Rate
                                                                disabled
                                                                defaultValue={
                                                                    product.rating
                                                                }
                                                                style={{
                                                                    fontSize:
                                                                        '12px',
                                                                }}
                                                            />
                                                            <Text
                                                                type="secondary"
                                                                style={{
                                                                    fontSize:
                                                                        '12px',
                                                                }}
                                                            >
                                                                {product.rating}
                                                            </Text>
                                                        </Space>
                                                        <Text
                                                            type="secondary"
                                                            style={{
                                                                fontSize:
                                                                    '12px',
                                                            }}
                                                        >
                                                            Đã thuê{' '}
                                                            {product.soldCount}{' '}
                                                            lần
                                                        </Text>
                                                    </div>
                                                </Card>
                                            </Link>
                                        </Col>
                                    ))}
                                </Row>
                            ) : (
                                <Empty description="Không tìm thấy sản phẩm nào" />
                            )}
                        </div>
                    </TabPane>

                    <TabPane tab="Đánh giá cửa hàng" key="reviews">
                        <Empty description="Chưa có đánh giá nào" />
                    </TabPane>

                    <TabPane tab="Thông tin cửa hàng" key="info">
                        <div style={{ maxWidth: '800px' }}>
                            <Paragraph>
                                <Title level={4}>Giới thiệu</Title>
                                <Text>{storeData.description}</Text>
                            </Paragraph>

                            <Divider />

                            <Paragraph>
                                <Title level={4}>Thông tin liên hệ</Title>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    <li style={{ marginBottom: '12px' }}>
                                        <Space>
                                            <MapPin size={16} />
                                            <Text strong>Địa chỉ:</Text>
                                            <Text>{storeData.location}</Text>
                                        </Space>
                                    </li>
                                    <li style={{ marginBottom: '12px' }}>
                                        <Space>
                                            <Phone size={16} />
                                            <Text strong>Số điện thoại:</Text>
                                            <Text>
                                                {storeData.contact.phone}
                                            </Text>
                                        </Space>
                                    </li>
                                    <li style={{ marginBottom: '12px' }}>
                                        <Space>
                                            <Mail size={16} />
                                            <Text strong>Email:</Text>
                                            <Text>
                                                {storeData.contact.email}
                                            </Text>
                                        </Space>
                                    </li>
                                    <li style={{ marginBottom: '12px' }}>
                                        <Space>
                                            <Calendar size={16} />
                                            <Text strong>Giờ hoạt động:</Text>
                                            <Text>
                                                {storeData.operatingHours}
                                            </Text>
                                        </Space>
                                    </li>
                                </ul>
                            </Paragraph>

                            <Divider />

                            <Paragraph>
                                <Title level={4}>Chính sách cửa hàng</Title>
                                <ul>
                                    <li>
                                        <Text>
                                            Đảm bảo sản phẩm chính hãng 100%
                                        </Text>
                                    </li>
                                    <li>
                                        <Text>
                                            Bảo hành theo chính sách của nhà sản
                                            xuất
                                        </Text>
                                    </li>
                                    <li>
                                        <Text>
                                            Hỗ trợ đổi trả trong vòng 7 ngày nếu
                                            sản phẩm lỗi
                                        </Text>
                                    </li>
                                    <li>
                                        <Text>Giao hàng toàn quốc</Text>
                                    </li>
                                    <li>
                                        <Text>Tư vấn miễn phí 24/7</Text>
                                    </li>
                                </ul>
                            </Paragraph>
                        </div>
                    </TabPane>
                </Tabs>
            </Card>
        </div>
    )
}

// Component Popover cho lọc giá
function Popover({
    children,
    title,
    content,
    trigger,
}: {
    children: React.ReactNode
    title?: string
    content: React.ReactNode
    trigger?: 'hover' | 'click'
}) {
    const [visible, setVisible] = useState(false)

    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <div onClick={() => trigger === 'click' && setVisible(!visible)}>
                {children}
            </div>

            {visible && (
                <div
                    style={{
                        position: 'absolute',
                        top: '100%',
                        left: 0,
                        zIndex: 1000,
                        backgroundColor: 'white',
                        boxShadow:
                            '0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
                        borderRadius: '2px',
                        padding: '12px',
                        marginTop: '4px',
                        minWidth: '200px',
                    }}
                >
                    {title && (
                        <div
                            style={{
                                borderBottom: '1px solid #f0f0f0',
                                padding: '5px 12px 12px',
                                fontWeight: 500,
                            }}
                        >
                            {title}
                        </div>
                    )}
                    <div style={{ padding: '12px' }}>{content}</div>
                </div>
            )}
        </div>
    )
}
