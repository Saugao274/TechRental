'use client'
import ButtonCommon from '@/components/core/common/ButtonCommon'
import PageHader from '@/components/core/common/PageHeader'
import SectionCommon from '@/components/core/common/SectionCommon'
import { ProductDetail, ReviewsType } from '@/data/products'
import { Avatar, Card, Col, Rate, Row } from 'antd'
import {
    Backpack,
    Calendar,
    MapPin,
    RefreshCw,
    ShieldCheck,
    Star,
    ThumbsUp,
    Trophy,
    Users,
} from 'lucide-react'
import React, { useState } from 'react'
import CountUp from 'react-countup'

export default function ProductUserView() {
    const [productDetail, setProductDetail] = useState<ProductDetail>({
        reviews: [
            {
                id: 'r1',
                author: 'Alice Nguyen',
                avatar: 'https://i.pravatar.cc/150?img=1',
                content:
                    'Hồng Nguyên rất đúng giờ và sử dụng thiết bị cẩn thận. Rất vui khi làm việc với bạn!',
                date: '2024-09-10',
                rating: 5,
            },
            {
                id: 'r2',
                author: 'John Trần',
                avatar: 'https://i.pravatar.cc/150?img=2',
                content:
                    'Người thuê uy tín, hoàn trả thiết bị đúng hạn, tình trạng như mới. Sẽ ưu tiên cho thuê lần sau',
                date: '2024-09-12',
                rating: 4,
            },
            {
                id: 'r3',
                author: 'Linh Phạm',
                avatar: 'https://i.pravatar.cc/150?img=3',
                content:
                    'Thiết bị được trả về sạch sẽ, nguyên vẹn, cực kỳ hài lòng!',
                date: '2024-09-14',
                rating: 2,
            },
        ],
    } as unknown as ProductDetail)

    return (
        <SectionCommon className="mx-auto flex flex-col gap-24 !pb-4 md:max-w-[1440px]">
            <div className="mx-auto flex w-full flex-col gap-8 rounded-lg">
                <div className="w-full px-[140px]">
                    <Row gutter={16}>
                        <Col span={12}>
                            <div className="flex w-full justify-between gap-4 rounded-[20px] bg-white/60 py-10 pl-10">
                                <div className="flex flex-col items-center">
                                    <div>
                                        <Avatar
                                            src={'/images/Intro/avt2.png'}
                                            size={118}
                                            className="!border-[2px] !border-white"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-primary">
                                            Hồng Nguyên
                                        </p>
                                    </div>
                                    <div className="max-w-[150px]">
                                        <p className="text-center">
                                            Thành phố Đà Nẵng, Việt Nam
                                        </p>
                                    </div>
                                </div>
                                <div className="max-w-[160px]">
                                    <div className="border-b border-b-primary/40">
                                        <div className="text-[28px] font-bold text-primary">
                                            33
                                            <p className="text-[12px] font-normal text-black">
                                                Lần thuê
                                            </p>
                                        </div>
                                    </div>
                                    <div className="border-b border-b-primary/40">
                                        {' '}
                                        <div className="text-[28px] font-bold text-primary">
                                            28
                                            <p className="text-[12px] font-normal text-black">
                                                Đánh giá
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        {' '}
                                        <div className="text-[28px] font-bold text-primary">
                                            22
                                            <p className="text-[12px] font-normal text-black">
                                                Năm hoạt động trên Techrental
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className="flex h-full flex-col items-start justify-center gap-5 px-3">
                                <p className="text-[36px] font-bold text-primary">
                                    Thông tin về Hồng Nguyên
                                </p>
                                <div className="flex flex-col">
                                    <div className="flex flex-row items-center gap-2">
                                        <Backpack
                                            size={16}
                                            className="text-primary"
                                        />
                                        <div>
                                            <p className="font-medium text-primary">
                                                Công việc:{' '}
                                                <span className="font-normal text-black">
                                                    Freelancer chụp ảnh sự kiện
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-row items-center gap-2">
                                        <MapPin
                                            size={16}
                                            className="text-primary"
                                        />
                                        <div>
                                            <p className="font-medium text-primary">
                                                Sống tại:{' '}
                                                <span className="font-normal text-black">
                                                    Đà Nẵng, Việt Nam
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-row items-center gap-2">
                                        <Calendar
                                            size={16}
                                            className="text-primary"
                                        />
                                        <div>
                                            <p className="font-medium text-primary">
                                                Ngày tham gia Techrental{' '}
                                                <span className="font-normal text-black">
                                                    Tháng 5, 2025
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-row items-center gap-2">
                                        <Star
                                            size={16}
                                            className="text-primary"
                                        />
                                        <div>
                                            <p className="font-medium text-primary">
                                                Điểm đánh giá uy tín:{' '}
                                                <span className="font-normal text-black">
                                                    5/5
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-row items-center gap-2">
                                        <ShieldCheck
                                            size={16}
                                            className="text-primary"
                                        />
                                        <div>
                                            <p className="font-medium text-primary">
                                                Đã xác minh danh tính
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <ButtonCommon
                                    type="primary"
                                    className="w-fit !px-[60px]"
                                >
                                    LIÊN HỆ NGƯỜI THUÊ
                                </ButtonCommon>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div>
                    <Static />
                </div>
                <div className="px-24">
                    <div className="mt-20 flex flex-col gap-8">
                        <PageHader
                            title={'Đánh giá từ người cho thuê'}
                            unDivider
                        />

                        <div className="rounded-lg p-5">
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                {productDetail?.reviews?.map(
                                    (review: ReviewsType) => (
                                        <Card
                                            key={review.id}
                                            variant="borderless"
                                            className="!overflow-hidden !bg-transparent !shadow-none"
                                        >
                                            <div className="flex flex-col gap-2">
                                                <div className="flex min-w-0 items-center gap-4">
                                                    <Avatar
                                                        src={review.avatar}
                                                        size={40}
                                                    />
                                                    <div className="flex min-w-0 flex-col">
                                                        <div className="flex flex-wrap items-center gap-2">
                                                            <span className="truncate font-semibold">
                                                                {review.author}
                                                            </span>
                                                            <Rate
                                                                disabled
                                                                defaultValue={
                                                                    review.rating
                                                                }
                                                                className="text-sm"
                                                            />
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {new Date(
                                                                review.date,
                                                            ).toLocaleDateString(
                                                                'vi-VN',
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                <p className="rounded-2xl bg-[#E3EDF7] px-4 py-2 text-primary shadow-md shadow-cyan-50">
                                                    {review.content}
                                                </p>
                                            </div>
                                        </Card>
                                    ),
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SectionCommon>
    )
}

type StatsType = {
    success: number
    users: number
    positive: number
    daily: number
}
const Static = () => {
    const [stats, setStats] = useState<StatsType>({
        success: 1287,
        users: 1078,
        positive: 340,
        daily: 37,
    })

    const handleHover = (key: keyof StatsType) => {
        setStats((prevStats) => ({ ...prevStats, [key]: 0 }))
        setTimeout(() => {
            setStats({
                success: 1287,
                users: 1078,
                positive: 340,
                daily: 37,
            })
        }, 100)
    }

    return (
        <div className="w-full px-4 py-8 md:px-8 lg:px-20">
            <Card className="overflow-hidden bg-white p-4 shadow-xl">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <StatItem
                        value={stats.success}
                        label="Giao dịch thành công"
                        onMouseEnter={() => handleHover('success')}
                    />

                    <StatItem
                        value={stats.users}
                        label="Tổng ngày thuê"
                        onMouseEnter={() => handleHover('users')}
                    />

                    <StatItem
                        value={stats.positive}
                        label="Trả hàng đúng hạn"
                        onMouseEnter={() => handleHover('positive')}
                    />

                    <StatItem
                        value={stats.daily}
                        label="Đánh giá tích cực"
                        onMouseEnter={() => handleHover('daily')}
                    />
                </div>
            </Card>
        </div>
    )
}

interface StatItemProps {
    value: number
    label: string
    icon?: React.ReactNode
    onMouseEnter: () => void
}

function StatItem({ value, label, icon, onMouseEnter }: StatItemProps) {
    return (
        <div
            className="flex flex-col items-center justify-center p-2 text-center transition-all hover:scale-105"
            onMouseEnter={onMouseEnter}
        >
            <div className="mb-2">{icon}</div>
            <div className="text-2xl font-bold text-[#1D3D85] md:text-3xl">
                <CountUp end={value} separator="," duration={2.5} suffix="+" />
            </div>
            <div className="mt-1 text-base font-semibold text-blue-800 md:text-lg">
                {label}
            </div>
        </div>
    )
}
