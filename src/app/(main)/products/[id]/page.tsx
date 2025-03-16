'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
    LeftOutlined,
    RightOutlined,
    ShoppingCartOutlined,
} from '@ant-design/icons'
import {
    Button,
    Radio,
    Rate,
    Card,
    Table,
    Tabs,
    Avatar,
    InputNumber,
    Checkbox,
} from 'antd'
import type { ColumnsType } from 'antd/es/table'
import type { TabsProps } from 'antd'
import type { CheckboxValueType } from 'antd/es/checkbox/Group'
import ButtonCommon from '@/components/core/common/ButtonCommon'
import PageHader from '@/components/core/common/PageHeader'
import SectionCommon from '@/components/core/common/SectionCommon'

interface SpecificationType {
    key: string
    label: string
    value: string
}

interface ReviewType {
    id: number
    author: string
    avatar: string
    rating: number
    date: string
    content: string
}

export default function ProductDetail() {
    const [currentImage, setCurrentImage] = useState(0)
    const [quantity, setQuantity] = useState(1)
    const [selectedDays, setSelectedDays] = useState<CheckboxValueType[]>([])

    const images = [
        '/placeholder.svg?height=500&width=500',
        '/placeholder.svg?height=100&width=100',
        '/placeholder.svg?height=100&width=100',
        '/placeholder.svg?height=100&width=100',
    ]

    const rentalOptions = [
        { label: '1 ngày', value: '1' },
        { label: '2 ngày', value: '2' },
        { label: '3 ngày', value: '3' },
        { label: '4 ngày', value: '4' },
        { label: '5 ngày', value: '5' },
        { label: '6 ngày', value: '6' },
        { label: '7 ngày', value: '7' },
        { label: '10 ngày', value: '10' },
        { label: '14 ngày', value: '14' },
        { label: '30 ngày', value: '30' },
    ]

    const specifications: SpecificationType[] = [
        { key: '1', label: 'Trọng lượng', value: 'Dưới 10 kg (DJI 3)' },
        { key: '2', label: 'Thuộc về', value: 'Trong nước' },
        { key: '3', label: 'Xuất xứ', value: 'Trung Quốc' },
        { key: '4', label: 'Dung lượng pin', value: '4/5 mAh' },
        { key: '5', label: 'Độ cao tối đa', value: '120m' },
        { key: '6', label: 'Phụ kiện đi kèm', value: 'Pin, 2|3" x4' },
        { key: '7', label: 'Thời gian bay', value: '34 phút' },
        { key: '8', label: 'Khoảng cách điều khiển', value: '15km' },
        { key: '9', label: 'Camera', value: '4K Ultra HD' },
        { key: '10', label: 'Cảm biến', value: 'Tránh vật cản đa hướng' },
    ]

    const reviews: ReviewType[] = [
        {
            id: 1,
            author: 'Thanh Thúy',
            avatar: '/placeholder.svg?height=40&width=40',
            rating: 4.8,
            date: '1 tháng trước',
            content:
                'Sản phẩm tốt, đóng gói cẩn thận, giao hàng nhanh. Chất lượng camera rất tốt, pin trâu.',
        },
        {
            id: 2,
            author: 'Minh Tuấn',
            avatar: '/placeholder.svg?height=40&width=40',
            rating: 5,
            date: '2 tháng trước',
            content:
                'Rất hài lòng với sản phẩm. Bay ổn định, dễ điều khiển, chụp ảnh đẹp.',
        },
        {
            id: 3,
            author: 'Hồng Anh',
            avatar: '/placeholder.svg?height=40&width=40',
            rating: 4,
            date: '3 tháng trước',
            content: 'Thời lượng pin tốt, camera chụp đẹp. Giao hàng hơi lâu.',
        },
        {
            id: 4,
            author: 'Văn Đức',
            avatar: '/placeholder.svg?height=40&width=40',
            rating: 4.5,
            date: '3 tháng trước',
            content:
                'Chất lượng sản phẩm tương xứng với giá tiền. Rất hài lòng.',
        },
    ]

    const columns: ColumnsType<SpecificationType> = [
        { title: 'Thông số', dataIndex: 'label', key: 'label', width: '30%' },
        { title: 'Chi tiết', dataIndex: 'value', key: 'value' },
    ]

    const relatedProducts = [
        {
            id: 1,
            name: 'Phantom DJI Mini 3',
            price: '4,990,000₫',
            image: '/placeholder.svg?height=200&width=200',
        },
        {
            id: 2,
            name: 'Phantom DJI Mini',
            price: '5,990,000₫',
            image: '/placeholder.svg?height=200&width=200',
        },
        {
            id: 3,
            name: 'DJI Air Power',
            price: '6,990,000₫',
            image: '/placeholder.svg?height=200&width=200',
        },
        {
            id: 4,
            name: 'Phantom DJI Power 3',
            price: '7,990,000₫',
            image: '/placeholder.svg?height=200&width=200',
        },
    ]

    return (
        <SectionCommon className="flex flex-col gap-24 !pb-4">
            {/* Product Section */}

            <div className="mx-auto grid gap-8 rounded-lg md:grid-cols-2">
                {/* Image Gallery */}
                <div className="space-y-4">
                    <div className="relative aspect-square rounded-lg bg-white">
                        <Image
                            src={images[currentImage] || '/placeholder.svg'}
                            alt="DJI Air 3"
                            fill
                            className="object-contain"
                        />
                        <button
                            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow"
                            onClick={() =>
                                setCurrentImage((prev) =>
                                    prev > 0 ? prev - 1 : images.length - 1,
                                )
                            }
                        >
                            <LeftOutlined />
                        </button>
                        <button
                            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow"
                            onClick={() =>
                                setCurrentImage((prev) =>
                                    prev < images.length - 1 ? prev + 1 : 0,
                                )
                            }
                        >
                            <RightOutlined />
                        </button>
                    </div>
                    <div className="flex gap-2 overflow-x-auto">
                        {images.map((src, index) => (
                            <button
                                key={index}
                                className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 ${currentImage === index ? 'border-blue-500' : 'border-transparent'}`}
                                onClick={() => setCurrentImage(index)}
                            >
                                <Image
                                    src={src || '/placeholder.svg'}
                                    alt={`Thumbnail ${index + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product Info */}
                <div className="space-y-4">
                    {/* Breadcrumb */}
                    <div className="mb-4 text-sm text-gray-500">
                        Trang chủ / Flycam
                    </div>
                    <div>
                        <div className="flex items-center gap-5">
                            <h1 className="text-2xl font-bold">DJI Air 3</h1>
                            <p className="text-[#717276]">
                                Cập nhật 6 giờ trước
                            </p>
                        </div>
                        <div className="mt-1 flex flex-col items-center justify-start gap-2">
                            <span className="text-gray-500">
                                Thương hiệu: DJI
                            </span>
                            <span className="text-gray-500">SKU: SP008035</span>
                            <span className="text-gray-500">
                                Loại sản phẩm: Flycam
                            </span>
                        </div>
                        <div className="mt-2 flex items-center gap-3">
                            <span className="rounded bg-white px-2 py-1 text-sm font-bold text-red-500">
                                -5%
                            </span>
                            <span className="text-xl font-bold text-red-500">
                                500.000đ
                            </span>
                            <span className="ml-2 text-gray-500 line-through">
                                526.000đ
                            </span>
                        </div>
                    </div>
                    <div>
                        <p className="mb-2 text-base font-bold">
                            Số ngày thuê:
                        </p>
                        <Checkbox.Group
                            options={rentalOptions}
                            value={selectedDays}
                            onChange={setSelectedDays}
                            className="grid grid-cols-5 gap-2"
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center rounded border bg-white">
                            <Button
                                onClick={() =>
                                    setQuantity(Math.max(1, quantity - 1))
                                }
                                className="border-0"
                            >
                                -
                            </Button>
                            <span className="px-4">{quantity}</span>
                            <Button
                                onClick={() => setQuantity(quantity + 1)}
                                className="border-0"
                            >
                                +
                            </Button>
                        </div>
                        <Button
                            type="primary"
                            size="large"
                            icon={<ShoppingCartOutlined />}
                            className="h-12 w-full bg-blue-700 text-lg"
                        >
                            THÊM VÀO GIỎ HÀNG
                        </Button>
                    </div>
                    {/* Seller Info */}
                    <div className="flex items-center gap-4 rounded-lg bg-gray-50 p-4">
                        <Image
                            src="/placeholder.svg?height=40&width=40"
                            alt="Seller avatar"
                            width={40}
                            height={40}
                            className="rounded-full"
                        />
                        <div>
                            <div className="text-xl font-semibold text-[#1D3D85]">
                                Thanh Thủy
                            </div>
                            <div className="mb-4 flex gap-3 text-sm text-gray-500">
                                <span className="text-[#1D3D85]">
                                    Phản hồi: 87%
                                </span>
                                <span className="text-[#1D3D85]">
                                    17 đã thuê
                                </span>
                            </div>
                            <div className="text-sm text-gray-500">
                                Hoạt động 3 giờ trước
                            </div>
                        </div>
                        <div className="ml-auto flex flex-col items-center gap-1">
                            <span className="text-xl font-semibold text-yellow-400">
                                ★<span className="text-black">4.8/5</span>
                            </span>
                            <span className="text-base text-[#1D3D85]">
                                4 đánh giá
                            </span>
                        </div>
                    </div>
                    {/* Additional Info */}

                    <div className="flex items-center gap-4 text-sm">
                        <ButtonCommon className="!h-11 !rounded-3xl !bg-[#E7E7E7]">
                            <span className="text-[#1D3D85]">
                                Sản phẩm này còn không?
                            </span>
                        </ButtonCommon>
                        <ButtonCommon className="!h-11 !rounded-3xl !bg-[#E7E7E7]">
                            <span className="text-[#1D3D85]">
                                Tình trạng thiết bị như thế nào?
                            </span>
                        </ButtonCommon>
                        <ButtonCommon className="!h-11 !rounded-3xl !bg-[#E7E7E7]">
                            <span className="text-[#1D3D85]">
                                Có phụ kiện gì đi kèm?
                            </span>
                        </ButtonCommon>
                    </div>
                </div>
            </div>

            <div className="mx-auto flex flex-col gap-8">
                <PageHader title={'Mô tả chi tiết'} unDivider />
                <div className="space-y-4 rounded-3xl bg-white p-8">
                    <h6> Thông tin nổi bật:</h6>
                    <p>
                        DJI Air 3 là phiên bản mới nhất trong các dòng flycam
                        Air Series, sở hữu hệ thống camera kép cùng ống kính góc
                        rộng và telephoto 3x. Với khả năng chụp ảnh 48MP và quay
                        video HDR 4K/60fps, DJI Mavic Air 3 mang lại những bức
                        ảnh chi tiết, sắc nét. Được trang bị thời gian bay lên
                        đến 46 phút, cảm biến vật cản đa hướng và hệ thống
                        truyền tải video O4 HD, dòng flycam mới nhất của DJI là
                        người bạn hoàn hảo cho các chuyến phiêu lưu ngoài trời
                        và mang đến khả năng chụp ảnh không gian chuyên nghiệp.
                        Thời gian bay được lên đến 43 phút.
                    </p>
                </div>
            </div>
            <div className="rounded-3x flex flex-col gap-8">
                <PageHader title={'Thông số chi tiết'} unDivider />
                <Table
                    className="!rounded-3x"
                    columns={columns}
                    dataSource={specifications}
                    pagination={false}
                    bordered
                />
            </div>
            <div className="flex flex-col gap-8">
                <PageHader title={'Đánh giá sản phẩm'} unDivider />
                <div className="space-y-6 p-4">
                    <div className="rounded-lg bg-gray-50 p-4">
                        <div className="flex items-center gap-4">
                            <span className="text-3xl font-bold">4.3</span>
                            <Rate disabled defaultValue={4.3} />
                            <span className="text-gray-500">(12 đánh giá)</span>
                        </div>
                    </div>
                    <div className="space-y-4">
                        {reviews.map((review) => (
                            <Card key={review.id} className="border-gray-200">
                                <div className="flex items-start gap-4">
                                    <Avatar src={review.avatar} size={40} />
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold">
                                                {review.author}
                                            </span>
                                            <Rate
                                                disabled
                                                defaultValue={review.rating}
                                                className="text-sm"
                                            />
                                        </div>
                                        <div className="mb-2 text-sm text-gray-500">
                                            {review.date}
                                        </div>
                                        <p className="text-gray-600">
                                            {review.content}
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>

            {/* Related Products */}
            <div className="border-t p-6">
                <h2 className="mb-4 text-lg font-bold">SẢN PHẨM LIÊN QUAN</h2>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    {relatedProducts.map((product) => (
                        <Card
                            key={product.id}
                            hoverable
                            cover={
                                <div className="relative h-48">
                                    <Image
                                        src={
                                            product.image || '/placeholder.svg'
                                        }
                                        alt={product.name}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            }
                            className="text-center"
                        >
                            <h3 className="font-semibold">{product.name}</h3>
                            <p className="mt-2 font-bold text-red-500">
                                {product.price}
                            </p>
                            <Button type="primary" className="mt-2 w-full">
                                Xem chi tiết
                            </Button>
                        </Card>
                    ))}
                </div>
            </div>
            {/* Review Products */}
        </SectionCommon>
    )
}
