'use client'

import { useEffect, useMemo, useState } from 'react'
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
    Radio,
    Slider,
    Empty,
    message,
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
import { useParams } from 'next/navigation'
import { type ProductDetail, type ShopDetail } from '@/data/products'
import { getRequest, postRequest } from '@/request'
import { productEndpoint, storeEndpoint } from '@/settings/endpoints'
import { useRouter } from 'next/navigation'
import { useChat } from '@/context/ChatContext'
const { Title, Text, Paragraph } = Typography
const { TabPane } = Tabs
const { Search: SearchInput } = Input
type StoreModuleProps = {
    id?: string
}

export function StoreModule({ id }: StoreModuleProps) {
    const [productsData, setProductsData] = useState<ProductDetail[]>([])
    const [storeData, setStoreData] = useState<ShopDetail>()
    const router = useRouter()
    const { createOrOpenRoom } = useChat()
    console.log('shopId sẽ gửi lên BE:', id)
    const handleChatClick = async () => {
        try {
            if (!id) return
            const roomId = await createOrOpenRoom(id)
            router.push(`/chat/${roomId}`)
        } catch (err) {
            message.error('Không thể mở phòng chat')
        }
    }

    useEffect(() => {
        if (!id) return
        ;(async () => {
            try {
                const respStore = await getRequest(storeEndpoint.GET_BY_ID(id))
                const respProducts = await getRequest(
                    productEndpoint.GET_BY_IDSHOP(id),
                )
                setStoreData(respStore.metadata)
                setProductsData(respProducts.metadata)
            } catch (e) {
                console.error(e)
            }
        })()
    }, [id])
    const [activeCategory, setActiveCategory] = useState<string>('all')
    const [sortBy, setSortBy] = useState<string>('popular')
    const [priceRange, setPriceRange] = useState<[number, number]>([
        0, 30000000,
    ])
    const [searchValue, setSearchValue] = useState<string>('')

    const filteredProducts = useMemo(() => {
        const normalizedCategory = (activeCategory ?? 'all')
            .toLowerCase()
            .trim()
        return (productsData ?? []).filter((product) => {
            const matchCategory =
                normalizedCategory === 'all' ||
                product?.category?.name?.toLowerCase() === normalizedCategory

            const matchPrice = (() => {
                console.log('product.price.pricece', product.price)

                return (
                    product.price >= priceRange[0] &&
                    product.price <= priceRange[1]
                )
            })()
            const matchSearch =
                searchValue === '' ||
                (product.title ?? '')
                    .toLowerCase()
                    .includes(searchValue.toLowerCase())

            return matchPrice && matchSearch && matchCategory
        })
    }, [productsData, activeCategory, priceRange, searchValue])

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortBy === 'popular') {
            return (b.reviews?.length || 0) - (a.reviews?.length || 0)
        } else if (sortBy === 'newest') {
            return (
                (Number(b?.isNewProduct) || 0) - (Number(a?.isNewProduct) || 0)
            )
        } else if (sortBy === 'bestselling') {
            return (b.soldCount || 0) - (a.soldCount || 0)
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

    const [isMobile, setIsMobile] = useState(false)

    // Check if screen is mobile
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }

        // Initial check
        checkIfMobile()

        // Add event listener
        window.addEventListener('resize', checkIfMobile)

        // Cleanup
        return () => window.removeEventListener('resize', checkIfMobile)
    }, [])

    return (
        <div>
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
                    src={storeData?.avatar || '/placeholder.svg'}
                    alt={storeData?.name || ''}
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
                        src={storeData?.avatar}
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
                                    {storeData?.name}
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
                                        Tham gia từ{' '}
                                        {storeData?.createdAt
                                            ?.getDay?.()
                                            .toString()}
                                    </Text>
                                </div>
                                <Space size="large">
                                    <Space>
                                        <Star size={16} color="#fadb14" />
                                        <Text>{storeData?.rating}/5</Text>
                                    </Space>
                                    <Space>
                                        <User size={16} />
                                        <Text>
                                            {storeData?.followers} người theo
                                            dõi
                                        </Text>
                                    </Space>
                                    <Space>
                                        <Package size={16} />
                                        <Text>
                                            {storeData?.productsCount} sản phẩm
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
                                <Button onClick={handleChatClick}>Chat</Button>
                            </Space>
                        </div>

                        <Divider style={{ margin: '16px 0' }} />

                        <Row gutter={[24, 16]}>
                            <Col xs={24} md={8}>
                                <Space direction="vertical" size="small">
                                    <Space>
                                        <MapPin size={16} />
                                        <Text>
                                            Địa chỉ: {storeData?.location}
                                        </Text>
                                    </Space>
                                    {storeData?.contact?.phone && (
                                        <Space>
                                            <Phone size={16} />
                                            <Text>
                                                SĐT: {storeData?.contact?.phone}
                                            </Text>
                                        </Space>
                                    )}
                                </Space>
                            </Col>
                            <Col xs={24} md={8}>
                                <Space direction="vertical" size="small">
                                    {storeData?.contact?.email && (
                                        <Space>
                                            <Mail size={16} />
                                            <Text>
                                                Email:{' '}
                                                {storeData?.contact?.email}
                                            </Text>
                                        </Space>
                                    )}
                                    <Space>
                                        <Calendar size={16} />
                                        <Text>
                                            Giờ hoạt động:{' '}
                                            {storeData?.operatingHours}
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
                                            {storeData?.responseRate}%
                                        </Text>
                                    </Space>
                                    <Space>
                                        <AlertCircle size={16} />
                                        <Text>
                                            Thời gian phản hồi:{' '}
                                            {storeData?.responseTime}
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
                <Paragraph>{storeData?.description}</Paragraph>
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
                            {isMobile ? (
                                <div>
                                    <Select
                                        value={activeCategory}
                                        onChange={(value) => {
                                            console.log('first', value)
                                            setActiveCategory(value)
                                        }}
                                        className="w-full"
                                    >
                                        <Select.Option value="all">
                                            {' '}
                                            Tất cả
                                        </Select.Option>
                                        {Array.from(
                                            new Set(
                                                productsData
                                                    .map(
                                                        (p) =>
                                                            p?.category?.name,
                                                    )
                                                    .filter(
                                                        (name) =>
                                                            name != undefined,
                                                    ),
                                            ),
                                        ).map((name) => (
                                            <Select.Option
                                                key={name}
                                                value={name}
                                            >
                                                {name}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </div>
                            ) : (
                                <div
                                    style={{
                                        overflowX: 'auto',
                                        whiteSpace: 'nowrap',
                                        padding: '8px 0',
                                    }}
                                >
                                    <Radio.Group
                                        value={activeCategory}
                                        onChange={(e) => {
                                            console.log('first', e)
                                            setActiveCategory(e.target.value)
                                        }}
                                        buttonStyle="solid"
                                    >
                                        <Radio.Button value="all">
                                            Tất cả
                                        </Radio.Button>
                                        {Array.from(
                                            new Set(
                                                productsData
                                                    ?.map(
                                                        (p) =>
                                                            p?.category?.name,
                                                    )
                                                    .filter(
                                                        (name) =>
                                                            name != undefined,
                                                    ),
                                            ),
                                        ).map((name) => (
                                            <Radio.Button
                                                key={name}
                                                value={name}
                                            >
                                                {name}
                                            </Radio.Button>
                                        ))}
                                    </Radio.Group>
                                </div>
                            )}

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
                                    className="w-full md:w-[300px]"
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
                                                    max={30000000}
                                                    step={100000}
                                                    value={priceRange}
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
                                            key={product._id}
                                        >
                                            <Link
                                                href={`/products/${product._id}`}
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
                                                                    product
                                                                        ?.images?.[0] ||
                                                                    '/placeholder.svg'
                                                                }
                                                                alt={
                                                                    product.title
                                                                }
                                                                fill
                                                                style={{
                                                                    objectFit:
                                                                        'cover',
                                                                }}
                                                            />

                                                            {product?.discount >
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
                                                                        product?.discount
                                                                    }
                                                                    %
                                                                </div>
                                                            )}
                                                            {product.isNewProduct && (
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
                                                            {product.title}
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
                                                                    product.price,
                                                                )}
                                                            </Text>
                                                        )}
                                                    </div>

                                                    <div
                                                        style={{
                                                            display: 'flex',
                                                            justifyContent:
                                                                'space-between',
                                                            alignItems:
                                                                'center',
                                                            marginTop: 8,
                                                            flexWrap: 'nowrap',
                                                            width: '100%',
                                                        }}
                                                    >
                                                        {product.reviews
                                                            .length > 0 &&
                                                            (() => {
                                                                const avgRating =
                                                                    product.reviews.reduce(
                                                                        (
                                                                            acc,
                                                                            cur,
                                                                        ) =>
                                                                            acc +
                                                                            cur.rating,
                                                                        0,
                                                                    ) /
                                                                    product
                                                                        .reviews
                                                                        .length
                                                                const avgRatingFixed =
                                                                    Number(
                                                                        avgRating.toFixed(
                                                                            1,
                                                                        ),
                                                                    )
                                                                const reviewCount =
                                                                    product
                                                                        .reviews
                                                                        .length

                                                                return (
                                                                    <div
                                                                        style={{
                                                                            display:
                                                                                'flex',

                                                                            flexDirection:
                                                                                'column',
                                                                            justifyContent:
                                                                                'center',
                                                                            alignItems:
                                                                                'center',
                                                                        }}
                                                                    >
                                                                        <Rate
                                                                            disabled
                                                                            allowHalf
                                                                            defaultValue={
                                                                                avgRatingFixed
                                                                            }
                                                                            style={{
                                                                                fontSize: 10,
                                                                            }}
                                                                        />
                                                                        <Text
                                                                            type="secondary"
                                                                            style={{
                                                                                fontSize: 10,
                                                                                whiteSpace:
                                                                                    'nowrap',
                                                                            }}
                                                                        >
                                                                            {
                                                                                avgRatingFixed
                                                                            }{' '}
                                                                            (
                                                                            {
                                                                                reviewCount
                                                                            }{' '}
                                                                            đánh
                                                                            giá)
                                                                        </Text>
                                                                    </div>
                                                                )
                                                            })()}

                                                        <Text
                                                            type="secondary"
                                                            style={{
                                                                fontSize: 10,
                                                                marginLeft: 8,
                                                                whiteSpace:
                                                                    'nowrap',
                                                                flexShrink: 0,
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
                                <Text>{storeData?.description}</Text>
                            </Paragraph>

                            <Divider />

                            <Paragraph>
                                <Title level={4}>Thông tin liên hệ</Title>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    <li style={{ marginBottom: '12px' }}>
                                        <Space>
                                            <MapPin size={16} />
                                            <Text strong>Địa chỉ:</Text>
                                            <Text>{storeData?.location}</Text>
                                        </Space>
                                    </li>
                                    {storeData?.contact?.phone && (
                                        <li style={{ marginBottom: '12px' }}>
                                            <Space>
                                                <Phone size={16} />
                                                <Text strong>
                                                    Số điện thoại:
                                                </Text>
                                                <Text>
                                                    {storeData?.contact?.phone}
                                                </Text>
                                            </Space>
                                        </li>
                                    )}
                                    {storeData?.contact?.email && (
                                        <li style={{ marginBottom: '12px' }}>
                                            <Space>
                                                <Mail size={16} />
                                                <Text strong>Email:</Text>
                                                <Text>
                                                    {storeData.contact.email}
                                                </Text>
                                            </Space>
                                        </li>
                                    )}
                                    <li style={{ marginBottom: '12px' }}>
                                        <Space>
                                            <Calendar size={16} />
                                            <Text strong>Giờ hoạt động:</Text>
                                            <Text>
                                                {storeData?.operatingHours}
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
