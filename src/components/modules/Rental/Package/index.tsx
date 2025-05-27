'use client'
import React, { useEffect, useRef } from 'react'

import { useState } from 'react'
import {
    Form,
    Input,
    Select,
    Upload,
    Button,
    message,
    Switch,
    InputNumber,
    Typography,
    Collapse,
    Progress,
    Col,
    Row,
    Card,
} from 'antd'
import {
    BadgeCheckIcon,
    BadgeX,
    CheckCircle,
    ChevronDown,
    ChevronUp,
    RotateCw,
    TriangleAlert,
    UploadCloud,
    X,
} from 'lucide-react'
import SectionCommon from '@/components/core/common/SectionCommon'

interface PriorityPackage {
    type: 'Basic' | 'Premium' | 'Vip'
    name: string
    price: number
    description: string
    benefits: any
}

export default function PackageNews() {
    const [isMobile, setIsMobile] = useState(false)
    // // Check if screen is mobile
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

    type PriorityPackage = {
        type: 'Basic' | 'Professional' | 'Vip'
        name: string
        price: number
        duration: string
        description: string
        discount: number
        savingPercent: number
        benefits: { value: string; isChoice: boolean }[]
    }

    const priorityPackages: PriorityPackage[] = [
        {
            type: 'Basic',
            name: 'Gói Cơ bản',
            price: 315000,
            discount: 16,
            duration: '30 ngày',
            description: 'Dành cho cá nhân mới bắt đầu cho thuê thiết bị',
            savingPercent: 16,
            benefits: [
                { value: 'Lượt đăng thiết bị: 25', isChoice: true },
                { value: 'Không giới hạn lượt xem sản phẩm', isChoice: true },
                { value: 'Báo cáo hiệu suất thuê', isChoice: false },
                { value: 'Công cụ quản lý khách thuê', isChoice: false },
                { value: 'Ưu tiên hiển thị trên trang chủ', isChoice: false },
            ],
        },
        {
            discount: 27,
            type: 'Professional',
            name: 'Gói Chuyên nghiệp',
            price: 549000,
            duration: '30 ngày',
            description: 'Dành cho người cho thuê nhiều sản phẩm',
            savingPercent: 27,
            benefits: [
                { value: 'Lượt đăng thiết bị: 50', isChoice: true },
                { value: 'Không giới hạn lượt xem sản phẩm', isChoice: true },
                { value: 'Báo cáo hiệu suất thuê', isChoice: true },
                { value: 'Công cụ quản lý khách thuê', isChoice: false },
                { value: 'Ưu tiên hiển thị trên trang chủ', isChoice: false },
            ],
        },
        {
            discount: 20,
            type: 'Vip',
            name: 'Gói VIP',
            price: 839000,
            duration: '30 ngày',
            description:
                'Dành cho cửa hàng/công ty cho thuê chuyên nghiệp, quản lý nhiều đơn',
            savingPercent: 20,
            benefits: [
                { value: 'Lượt đăng thiết bị: 70', isChoice: true },
                { value: 'Không giới hạn lượt xem sản phẩm', isChoice: true },
                { value: 'Báo cáo hiệu suất thuê', isChoice: true },
                { value: 'Công cụ quản lý khách thuê', isChoice: true },
                { value: 'Ưu tiên hiển thị trên trang chủ', isChoice: true },
            ],
        },
    ]

    const handlePurchasePriority = (
        packageType: 'Basic' | 'Professional' | 'Vip',
    ) => {
        const packagePrice = packageType === 'Basic' ? 50000 : 10000

        message.success(
            `Đã mua gói ${packageType === 'Basic' ? 'Ưu tiên cơ bản ' : 'Ưu tiên cao cấp'} cho sản phẩm `,
        )
    }
    
    return (
        <div className="pt-14">
            <h1 className="flex items-center justify-center text-3xl font-bold text-blue-950">
                Chọn gói Đăng Tin Cho Thuê theo nhu cầu
            </h1>
            <p className="flex items-center justify-center text-base italic">
                Lưu ý: Gói có hiệu lực trong 30 ngày kể từ ngày kích hoạt
            </p>

            <Row gutter={[16, 24]} className="mt-11 flex justify-between">
                {priorityPackages.map((pkg, index) => {
                    const isBestSeller = index === 1
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
                            <div
                                style={{
                                    position: 'relative',
                                    width: '100%',
                                    maxWidth: isBestSeller ? '400px' : '340px',
                                    zIndex: isBestSeller ? 2 : 1,
                                    transform: isBestSeller
                                        ? 'scale(1.08)'
                                        : 'scale(1)',
                                    transition: 'transform 0.3s',
                                }}
                            >
                                {isBestSeller && (
                                    <div
                                        style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: '50%',
                                            transform: 'translate(-50%, -50%)',
                                            backgroundColor: '#fff',
                                            color: '#1D3D85',
                                            padding: '4px 16px',
                                            borderRadius: '999px',
                                            fontSize: '13px',
                                            fontWeight: 600,
                                            boxShadow:
                                                '0 4px 8px rgba(0, 0, 0, 0.15)',
                                            zIndex: 2,
                                            border: '1px solid #ddd',
                                        }}
                                    >
                                        Bán chạy nhất
                                    </div>
                                )}
                                <Card
                                    className="w-full"
                                    style={{
                                        // height: isBestSeller ? '400px' : '',
                                        top: !isBestSeller ? '20px' : '',
                                        borderRadius: '12px',
                                        border:
                                            pkg.type === 'Professional'
                                                ? '2px solid #7892cd'
                                                : '2px solid #2d93c2',
                                        background:
                                            pkg.type === 'Professional'
                                                ? 'linear-gradient(135deg, #234daf 0%, #1D3D85 100%)'
                                                : 'linear-gradient(135deg, #e6faffc7 0%, #deebf9c1 100%)',
                                        boxShadow: isBestSeller
                                            ? '0 6px 24px rgba(0, 0, 0, 0.25)'
                                            : '0 4px 12px rgba(0, 0, 0, 0.1)',
                                        transition: 'transform 0.3s ease',
                                    }}
                                    styles={{
                                        body: {
                                            padding: isMobile ? '16px' : '24px',
                                        },
                                    }}
                                    onMouseEnter={(e) => {
                                        if (!isMobile) {
                                            e.currentTarget.style.transform =
                                                'scale(1.03)'
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        if (!isMobile) {
                                            e.currentTarget.style.transform =
                                                'scale(1)'
                                        }
                                    }}
                                >
                                    <Typography.Title
                                        level={isMobile ? 5 : 4}
                                        style={{
                                            textAlign: 'center',
                                            color:
                                                pkg.type === 'Professional'
                                                    ? '#fff'
                                                    : '#1D3D85',
                                            fontSize: 30,
                                        }}
                                    >
                                        {pkg.name}
                                    </Typography.Title>
                                    <Typography.Paragraph
                                        style={{
                                            textAlign: 'center',
                                            fontSize: isMobile
                                                ? '12px'
                                                : '14px',
                                            color:
                                                pkg.type === 'Professional'
                                                    ? '#fff'
                                                    : '#1D3D85',
                                            flexWrap: 'wrap',
                                        }}
                                    >
                                        {pkg.description}
                                    </Typography.Paragraph>

                                    <Typography.Text
                                        strong
                                        style={{
                                            fontSize: isMobile
                                                ? '20px'
                                                : '24px',
                                            color:
                                                pkg.type === 'Professional'
                                                    ? '#fff'
                                                    : '#1D3D85',
                                            display: 'block',
                                            textAlign: 'center',
                                            marginBottom: '10px',
                                        }}
                                    >
                                        {pkg.price.toLocaleString('vi-VN')} ₫{' '}
                                        <span className="text-xs font-light">
                                            / 30 ngày
                                        </span>
                                    </Typography.Text>
                                    <div
                                        className={`mb-2 flex w-full items-center justify-center rounded-xl border-2 border-blue-300 bg-green-100 p-2 font-vietnam text-green-500`}
                                    >
                                        <p>
                                            Tiết kiệm {pkg.discount}% so với giá
                                            bán lẻ
                                        </p>
                                    </div>
                                    <ul
                                        style={{
                                            paddingLeft: '20px',
                                            marginBottom: '24px',
                                            color:
                                                pkg.type === 'Professional'
                                                    ? '#fff'
                                                    : '#1D3D85',
                                            fontSize: isMobile
                                                ? '12px'
                                                : '14px',
                                        }}
                                    >
                                        {pkg.benefits.map((benefit, idx) => (
                                            <div
                                                key={idx}
                                                className="flex items-center justify-start gap-2"
                                            >
                                                <div>
                                                    {benefit.isChoice ? (
                                                        <BadgeCheckIcon
                                                            size={16}
                                                            color="#52c41a"
                                                        />
                                                    ) : (
                                                        <BadgeX
                                                            size={16}
                                                            color="#A4A4A4"
                                                        />
                                                    )}
                                                </div>
                                                <p>{benefit.value}</p>
                                            </div>
                                        ))}
                                    </ul>

                                    <Button
                                        type="primary"
                                        block
                                        onClick={() =>
                                            handlePurchasePriority(pkg.type)
                                        }
                                        className={
                                            pkg.type === 'Professional'
                                                ? 'h-10 rounded-lg !bg-white !bg-gradient-to-r !font-bold !text-blue-800 transition hover:!from-blue-800 hover:!to-blue-500 hover:!text-white md:h-12'
                                                : 'h-10 rounded-lg !bg-blue-900 !bg-gradient-to-r !font-bold !text-white transition hover:from-blue-200 hover:to-blue-500 md:h-12'
                                        }
                                        style={{
                                            fontSize: isMobile
                                                ? '14px'
                                                : '16px',
                                            border: 'none',
                                        }}
                                    >
                                        MUA NGAY
                                    </Button>
                                </Card>
                            </div>
                        </Col>
                    )
                })}
            </Row>
        </div>
    )
}
