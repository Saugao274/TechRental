'use client'
import React, { useEffect, useState } from 'react'
import {
    Button,
    Card,
    Col,
    Row,
    Typography,
    Tabs,
    message,
} from 'antd'
import {
    BadgeCheckIcon,
    BadgeX,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import { getRequest, putRequest } from '@/request'
import { storeEndpoint } from '@/settings/endpoints'

interface RentalPackage {
    type: string
    name: string
    price: number
    duration: string
    description: string
    benefits: { value: string; isChoice: boolean }[]
}

interface InsurancePackage {
    type: string
    name: string
    insuranceFee: number
    maxCoverage: string
    description: string
}

interface PackageNewsProps {
    id: string
}

export default function PackageNews({ id }: PackageNewsProps) {
    const [isMobile, setIsMobile] = useState(false)
    const [activeTab, setActiveTab] = useState('rental')
    const router = useRouter()
    const [shop, setShop] = useState<any>(null)
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

        if (id) {
            fetchShop()
        }
    }, [id])

    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }
        checkIfMobile()
        window.addEventListener('resize', checkIfMobile)
        return () => window.removeEventListener('resize', checkIfMobile)
    }, [])

    const rentalPackages: RentalPackage[] = [
        {
            type: 'Free',
            name: 'Gói Miễn phí',
            price: 0,
            duration: '30 ngày',
            description: 'Dành cho người mới, dùng thử nền tảng',
            benefits: [
                { value: 'Đăng 1 thiết bị', isChoice: true },
                { value: 'Hiển thị trong danh mục phụ', isChoice: true },
                { value: 'Hỗ trợ hợp đồng điện tử đầu tiên', isChoice: true },
                { value: 'Không có cửa tiền hiển thị', isChoice: false },
                { value: 'Không báo cáo hiệu suất', isChoice: false },
            ],
        },
        {
            type: 'Basic',
            name: 'Gói Cơ bản',
            price: 299000,
            duration: '30 ngày',
            description: 'Dành cho cá nhân mới bắt đầu cho thuê thiết bị',
            benefits: [
                { value: 'Đăng tối đa 5 thiết bị', isChoice: true },
                { value: 'Không giới hạn lượt xem', isChoice: true },
                { value: 'Hỗ trợ qua email', isChoice: true },
                { value: 'Không có báo cáo hiệu suất', isChoice: false },
                { value: 'Không có quản lý nâng cao', isChoice: false },
            ],
        },
        {
            type: 'Advanced',
            name: 'Gói Nâng cao',
            price: 549000,
            duration: '30 ngày',
            description: 'Dành cho cá nhân bán chuyên, freelancer',
            benefits: [
                { value: 'Đăng tối đa 20 thiết bị', isChoice: true },
                { value: 'Không giới hạn danh mục', isChoice: true },
                { value: 'Báo cáo hiệu suất thuê', isChoice: true },
                { value: 'Hỗ trợ marketing cơ bản', isChoice: true },
                { value: 'Hỗ trợ qua email + chat', isChoice: true },
            ],
        },
        {
            type: 'Business',
            name: 'Gói Doanh nghiệp',
            price: 1499000,
            duration: '30 ngày',
            description: 'Dành cho Công ty/cửa hàng cho thuê thiết bị chuyên nghiệp',
            benefits: [
                { value: 'Đăng không giới hạn thiết bị', isChoice: true },
                { value: 'Hiển thị ưu tiên trang chủ', isChoice: true },
                { value: 'Báo cáo chi tiết hiệu suất', isChoice: true },
                { value: 'Hỗ trợ marketing nâng cao', isChoice: true },
                { value: 'Quản lý hợp đồng, lịch thuê', isChoice: true },
                { value: 'Hỗ trợ 24/7', isChoice: true },
            ],
        },
    ]

    const insurancePackages: InsurancePackage[] = [
        {
            type: 'Basic',
            name: 'Gói Cơ bản',
            insuranceFee: 3,
            maxCoverage: 'Tối đa 1 triệu VND/trường hợp',
            description: 'Dành cho máy ảnh cơ bản, tai nghe, điện thoại phổ thông',
        },
        {
            type: 'Standard',
            name: 'Gói Tiêu chuẩn',
            insuranceFee: 5,
            maxCoverage: 'Tối đa 5 triệu VND/trường hợp',
            description: 'Dành cho iPhone, Mirrorless, thiết bị chuyên dụng',
        },
        {
            type: 'Premium',
            name: 'Gói Toàn diện',
            insuranceFee: 10,
            maxCoverage: 'Tối đa 80% giá trị thiết bị hoặc thay thế tương đương',
            description: 'Dành cho lens đắt tiền, camera quay phim, thiết bị studio',
        },
    ]
    useEffect(() => {
        const savedTab = localStorage.getItem('activeTab')
        if (savedTab) {
            setActiveTab(savedTab)
            localStorage.removeItem('activeTab')
        }
    }, [])
    const handlePurchasePackage = async (packageType: string, price: number, packagePost: boolean) => {
        message.success(`Đã chọn ${packageType}`)

        if (packagePost) {
            router.push(`/rental/${id}/package/payment?price=${price}&type=${packageType}&packagePost=${packagePost}`)
        } else {
            await putRequest(storeEndpoint.UPDATE_PACKAGE, {
                data: { packageInsurance: [packageType] }
            })

            localStorage.setItem('activeTab', 'insurance')

            // Reload lại trang
            window.location.reload()
        }
    }


    const renderRentalPackages = () => (
        <Row gutter={[16, 24]} className="mt-8 flex justify-between">
            {rentalPackages.map((pkg, index) => {
                const isBestSeller = pkg.type === 'Advanced'
                const ownPackage =
                    shop?.packagePost && Array.isArray(shop.packagePost)
                        ? shop.packagePost.map((p: string) => p.toLowerCase()).includes(pkg.type.toLowerCase())
                        : false
                return (
                    <Col
                        key={pkg.type}
                        xs={24}
                        sm={24}
                        md={6}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <div
                            style={{
                                position: 'relative',
                                width: '100%',
                                maxWidth: isBestSeller ? '400px' : '340px',
                                zIndex: isBestSeller ? 2 : 1,
                                transform: isBestSeller ? 'scale(1.08)' : 'scale(1)',
                            }}
                        >
                            {isBestSeller && (
                                <Button className="!absolute !-top-3 !left-1/2 z-10 !-translate-x-1/2 !rounded-full !bg-white !px-4 !py-1 !font-semibold !text-blue-900 !shadow-md !text-xs"
                                    disabled
                                >
                                    Bán chạy nhất
                                </Button>
                            )}
                            <Card
                                className="w-full h-full flex flex-col justify-between relative pb-24"
                                style={{
                                    borderRadius: '12px',
                                    border: isBestSeller ? '2px solid #7892cd' : 'none',
                                    background: isBestSeller
                                        ? 'linear-gradient(135deg, #234daf 0%, #1D3D85 100%)'
                                        : 'linear-gradient(135deg, rgba(230, 250, 255, 0.7) 0%, rgba(222, 235, 249, 0.7) 100%)',
                                }}
                            >
                                <div className="flex flex-col">
                                    <Typography.Title
                                        level={4}
                                        style={{
                                            textAlign: 'center',
                                            color: isBestSeller ? '#fff' : '#1D3D85',
                                            marginBottom: '8px',
                                        }}
                                    >
                                        {pkg.name}
                                    </Typography.Title>
                                    <Typography.Paragraph
                                        style={{
                                            textAlign: 'center',
                                            color: isBestSeller ? '#fff' : '#666',
                                            fontSize: '14px',
                                            minHeight: '42px',
                                            margin: '0 0 16px 0',
                                        }}
                                    >
                                        {pkg.description}
                                    </Typography.Paragraph>
                                    <Typography.Title
                                        level={3}
                                        style={{
                                            textAlign: 'center',
                                            color: isBestSeller ? '#fff' : '#1D3D85',
                                            marginBottom: '14px',
                                        }}
                                    >
                                        {pkg.price === 0 ? (
                                            '0đ'
                                        ) : (
                                            `${pkg.price.toLocaleString('vi-VN')}đ`
                                        )}
                                        <span className="text-xs font-light"> / {pkg.duration}</span>
                                    </Typography.Title>
                                    {pkg.type !== 'Free' ? (
                                        <div className="mb-4 flex w-full items-center justify-center rounded-xl border-2 border-blue-300 bg-green-50 p-2 font-vietnam text-green-500">
                                            <p className='text-xs'>Tiết kiệm {pkg.type === 'Advanced' ? '27%' : pkg.type === 'Business' ? '20%' : '16%'} so với giá bán lẻ</p>
                                        </div>
                                    ) :
                                        (
                                            <div className="mb-4 flex w-full items-center justify-center rounded-xl border-2 border-blue-300 bg-green-50 p-2 font-vietnam text-green-500">
                                                <p className='text-xs'>Trải nghiệm miễn phí</p>
                                            </div>
                                        )}
                                    <ul className="space-y-2">
                                        {pkg.benefits.map((benefit, idx) => (
                                            <li key={idx} className="flex items-center gap-2">
                                                {benefit.isChoice ? (
                                                    <BadgeCheckIcon size={16} color="#52c41a" />
                                                ) : (
                                                    <BadgeX size={16} color="#A4A4A4" />
                                                )}
                                                <span style={{ color: isBestSeller ? '#fff' : '#666' }}>
                                                    {benefit.value}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="absolute bottom-6 left-6 right-6">
                                    {ownPackage ? (
                                        <Button
                                            block
                                            disabled
                                            className="h-12 rounded-lg !bg-gray-400 !font-bold !text-white"
                                        >
                                            Đã sở hữu
                                        </Button>
                                    ) : (
                                        <Button
                                            type="primary"
                                            block
                                            onClick={() => handlePurchasePackage(pkg.type, pkg.price, true)}
                                            className={
                                                isBestSeller
                                                    ? 'h-12 rounded-lg !bg-white !font-bold !text-blue-800 hover:!bg-blue-50'
                                                    : 'h-12 rounded-lg !bg-blue-900 !font-bold !text-white hover:!bg-blue-800'
                                            }
                                        >
                                            MUA NGAY
                                        </Button>
                                    )}
                                </div>
                            </Card>
                        </div>
                    </Col>
                )
            }
            )}
        </Row>
    )

    const renderInsurancePackages = () => (

        <Row gutter={[16, 24]} className="mt-8 flex justify-between">
            {insurancePackages.map((pkg) => {
                const ownInsurance =
                    shop?.packageInsurance && Array.isArray(shop.packageInsurance)
                        ? shop.packageInsurance.map((p: string) => p.toLowerCase()).includes(pkg.type.toLowerCase())
                        : false
                return (

                    <Col
                        key={pkg.type}
                        xs={24}
                        sm={24}
                        md={8}
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <Card
                            className="w-full h-full flex flex-col justify-between relative pb-24"
                            style={{
                                borderRadius: '12px',
                                border: 'none',
                                background: 'linear-gradient(135deg, rgba(230, 250, 255, 0.7) 0%, rgba(222, 235, 249, 0.7) 100%)',
                            }}
                        >
                            <div className="flex flex-col">
                                <Typography.Title
                                    level={4}
                                    style={{
                                        textAlign: 'center',
                                        color: '#1D3D85',
                                        marginBottom: '8px',
                                    }}
                                >
                                    {pkg.name}
                                </Typography.Title>
                                <Typography.Paragraph
                                    style={{
                                        textAlign: 'center',
                                        color: '#666',
                                        fontSize: '14px',
                                        minHeight: '42px',
                                        margin: '0 0 16px 0',
                                    }}
                                >
                                    {pkg.description}
                                </Typography.Paragraph>
                                <div className="text-center flex flex-col gap-2">
                                    <Button className="!p-4 !border-gray-50 !text-xs   !bg-blue-200 !text-blue-800 ">
                                        Phí bảo hiểm: <span className='font-bold'>{pkg.insuranceFee}% giá trị đơn thuê</span>
                                    </Button>
                                    <Button className="!px-0 !py-6 !border-gray-50 !text-xs !bg-blue-200 !text-blue-800 !whitespace-normal !break-words !items-center ">
                                        <p>
                                            Mức chi trả: <span className='font-bold'> {pkg.maxCoverage}</span>
                                        </p>
                                    </Button>
                                </div>
                            </div>
                            <div className="mt-6 bottom-6 left-6 right-6">
                                {ownInsurance ? (
                                    <Button
                                        block
                                        disabled
                                        className="h-12 rounded-lg !bg-gray-400 !font-bold !text-white"
                                    >
                                        Đã sở hữu
                                    </Button>
                                ) : (
                                    <Button
                                        type="primary"
                                        block
                                        onClick={() => handlePurchasePackage(pkg.type, 300000, false)}
                                        className="h-12 rounded-lg !bg-blue-900 !font-bold !text-white hover:!bg-blue-800"
                                    >
                                        MUA NGAY
                                    </Button>
                                )}
                            </div>
                        </Card>
                    </Col>
                )

            }

            )}
        </Row>
    )

    return (
        <div className="pt-14">
            <h1 className="mb-2 text-center text-3xl font-bold text-blue-950">
                {activeTab === 'rental' ? 'Chọn gói Đăng Tin Cho Thuê theo nhu cầu' : 'Chọn gói Bảo Hiểm theo nhu cầu'}
            </h1>
            <p className="text-center text-base italic text-gray-600">
                Lưu ý: Gói có hiệu lực trong 30 ngày kể từ ngày kích hoạt
            </p>

            <div className="mt-8 flex justify-center">
                <Tabs
                    activeKey={activeTab}
                    onChange={setActiveTab}
                    items={[
                        {
                            key: 'rental',
                            label: 'Đăng tin cho thuê',
                            children: renderRentalPackages(),
                        },
                        {
                            key: 'insurance',
                            label: 'Gói bảo hiểm',
                            children: renderInsurancePackages(),
                        },
                    ]}
                    className="w-full max-w-screen-xl"
                />
            </div>
        </div>
    )
}
