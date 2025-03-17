'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
    LeftOutlined,
    RightOutlined,
    ShoppingCartOutlined,
} from '@ant-design/icons'
import { Button, Rate, Card, Table, Avatar, Checkbox, Radio } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import ButtonCommon from '@/components/core/common/ButtonCommon'
import PageHader from '@/components/core/common/PageHeader'
import SectionCommon from '@/components/core/common/SectionCommon'
import { useParams } from 'next/navigation'
import {
    getRandomFallbackImageArray,
    productsData,
    shopDetails,
    type SpecificationType,
} from '@/data/products'
import NotFound from '@/app/not-found'
import ProductCard from '@/components/core/common/CardCommon/ProductCard'
import { motion } from 'framer-motion'

export default function ProductDetail() {
    const params = useParams()
    const { id } = params

    const [currentImage, setCurrentImage] = useState(0)
    const [quantity, setQuantity] = useState(1)
    const [productDetail, setProductDetail] = useState(
        productsData.filter((item) => id === item.idProduct)[0],
    )
    if (!productDetail) {
        return <NotFound />
    }
    const relatedProducts = productsData.filter(
        (item) => item.category == productDetail.category,
    )
    const shopInfor = shopDetails.filter(
        (item) => productDetail.idShop === item.idShop,
    )[0]
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

    const columns: ColumnsType<SpecificationType> = [
        {
            title: 'Thông số',
            dataIndex: 'label',
            key: 'label',
            width: '30%',
            className: 'bg-[#E7E7E7]',
        },
        { title: 'Chi tiết', dataIndex: 'value', key: 'value' },
    ]

    const discountRates = [
        { days: '1', value: 5 },
        { days: '2', value: 10 },
        { days: '3', value: 25 },
        { days: '4', value: 30 },
        { days: '5', value: 35 },
        { days: '6', value: 35 },
        { days: '7', value: 40 },
        { days: '10', value: 65 },
        { days: '14', value: 80 },
        { days: '30', value: 80 },
    ]
    const [selectedDays, setSelectedDays] = useState<string>('1')
    const [basePrice] = useState<number>(productDetail.price)
    const [discountNumber, setDiscountNumber] = useState<number>(5)

    const calculateDiscountedPrice = (selectedDays: number) => {
        const discount = discountRates.find(
            (item) => item.days === selectedDays.toString(),
        )
        if (!discount) return basePrice * selectedDays

        const discountValue = discount.value
        const discountedPrice =
            (basePrice * selectedDays * (100 - discountValue)) / 100
        return discountedPrice
    }

    const onChange = (e: any) => {
        const selectedValue = e.target.value
        console.log('Ngày đã chọn:', selectedValue)

        const discount = discountRates.find(
            (item) => item.days === selectedValue,
        )
        if (discount) {
            setDiscountNumber(discount.value)
        }
        setSelectedDays(selectedValue)
    }

    const totalPrice =
        calculateDiscountedPrice(parseInt(selectedDays)) * quantity

    const buttonData = [
        'Sản phẩm này còn không?',
        'Tình trạng thiết bị như thế nào?',
        'Có phụ kiện gì đi kèm?',
        'Chế độ bảo hành ra sao?',
        'Có thể thuê ngắn hạn không?',
        'Giá thuê đã bao gồm phí vận chuyển chưa?',
        'Có hỗ trợ đổi trả không?',
        'Sản phẩm có bị trầy xước không?',
        'Có thể đến xem trực tiếp không?',
        'Có thể giảm giá khi thuê dài hạn không?',
        'Có cần đặt cọc không?',
        'Thời gian giao hàng là bao lâu?',
        'Có hỗ trợ kỹ thuật trong quá trình thuê không?',
        'Có hướng dẫn sử dụng đi kèm không?',
        'Sản phẩm có tương thích với thiết bị của tôi không?',
    ]
    const currentImageTemp = productDetail.images
        ? productDetail.images
        : getRandomFallbackImageArray(5)
    return (
        <SectionCommon className="mx-auto flex flex-col gap-24 !pb-4 md:max-w-[1440px]">
            <div className="mx-auto grid grid-cols-1 gap-8 rounded-lg md:grid-cols-2">
                {/* Image Gallery */}
                <div className="space-y-4">
                    <div className="relative aspect-square rounded-lg bg-white">
                        <Image
                            src={currentImageTemp[currentImage]}
                            alt={productDetail.title}
                            fill
                            className="object-cover"
                        />
                        <button
                            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow"
                            onClick={() =>
                                setCurrentImage((prev) =>
                                    prev > 0
                                        ? prev - 1
                                        : productDetail.images.length - 1,
                                )
                            }
                        >
                            <LeftOutlined />
                        </button>
                        <button
                            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow"
                            onClick={() =>
                                setCurrentImage((prev) =>
                                    prev < currentImageTemp.length - 1
                                        ? prev + 1
                                        : 0,
                                )
                            }
                        >
                            <RightOutlined />
                        </button>
                    </div>
                    <div className="hidden gap-2 overflow-x-auto md:flex">
                        {currentImageTemp.map((src, index) => (
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
                        Trang chủ / {productDetail.category}
                    </div>
                    <div>
                        <div className="flex items-center gap-5">
                            <h1 className="text-2xl font-bold">
                                {productDetail.title}
                            </h1>
                        </div>
                        <div className="mt-1 flex w-full flex-col items-start justify-start gap-2">
                            <span className="text-gray-500">
                                <span className="font-bold">Thương hiệu:</span>{' '}
                                {productDetail.brand}
                            </span>

                            <span className="text-gray-500">
                                <span className="font-bold">
                                    Loại sản phẩm:
                                </span>{' '}
                                {productDetail.category}
                            </span>
                        </div>
                        <div className="mt-2 flex items-center gap-3">
                            <span className="rounded bg-white px-2 py-1 text-sm font-bold text-red-500">
                                {discountNumber}%
                            </span>
                            <span className="text-xl font-bold text-red-500">
                                {totalPrice.toLocaleString('vi-VN')}
                            </span>
                            <span className="ml-2 text-gray-500 line-through">
                                {(
                                    basePrice * parseInt(selectedDays)
                                ).toLocaleString('vi-VN')}
                            </span>
                        </div>
                    </div>
                    <div>
                        <p className="mb-2 text-base font-bold">
                            Số ngày thuê:
                        </p>
                        <Radio.Group
                            options={rentalOptions}
                            value={selectedDays}
                            onChange={onChange}
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
                    <div className="flex flex-col items-center justify-between gap-4 rounded-lg bg-gray-50 p-4 md:flex-row">
                        <div className="flex min-w-0 items-center justify-center gap-3">
                            <Image
                                src={shopInfor.avatar || ''}
                                alt="Seller avatar"
                                width={56}
                                height={56}
                                className="h-14 w-14 flex-shrink-0 rounded-full object-cover"
                            />
                            <div className="flex min-w-0 flex-col">
                                <div className="truncate text-lg font-semibold text-[#1D3D85]">
                                    {shopInfor.nameShop}
                                </div>
                                <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                                    <span className="text-[#1D3D85]">
                                        Phản hồi {shopInfor.response}%
                                    </span>
                                    <span className="text-[#1D3D85]">
                                        {shopInfor.rentered} đã thuê
                                    </span>
                                </div>
                                <div className="text-sm text-gray-500">
                                    Hoạt động 3 giờ trước
                                </div>
                            </div>
                        </div>

                        {/* Đánh giá */}
                        <div className="flex flex-col items-center gap-1 text-center">
                            <span className="text-xl font-semibold text-yellow-400">
                                ★{' '}
                                <span className="text-black">
                                    {shopInfor.rate}/5
                                </span>
                            </span>
                            <span className="text-base text-[#1D3D85]">
                                {shopInfor.totalReviews} đánh giá
                            </span>
                        </div>
                    </div>

                    {/* Additional Info */}
                    <div className="w-full overflow-hidden">
                        <motion.div
                            className="flex gap-4"
                            animate={{ x: ['0%', '-100%'] }}
                            transition={{
                                repeat: Infinity,
                                duration: 10,
                                ease: 'linear',
                            }}
                        >
                            {buttonData
                                .concat(buttonData)
                                .map((text, index) => (
                                    <ButtonCommon
                                        key={index}
                                        className="!h-11 min-w-[250px] !rounded-3xl !bg-[#E7E7E7]"
                                    >
                                        <span className="text-[#1D3D85]">
                                            {text}
                                        </span>
                                    </ButtonCommon>
                                ))}
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="mx-auto flex flex-col gap-8">
                <PageHader title={'Mô tả chi tiết'} unDivider />
                <div className="space-y-4 rounded-3xl bg-white p-8">
                    <h6 className="text-[16px] font-bold">
                        {' '}
                        Thông tin nổi bật:
                    </h6>
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
                <Card bodyStyle={{ padding: 0 }}>
                    <Table
                        className="!rounded-3x overflow-hidden"
                        columns={columns}
                        dataSource={productDetail.parameter}
                        pagination={false}
                        showHeader={false}
                    />
                </Card>
            </div>
            <div className="flex flex-col gap-8">
                <PageHader title={'Đánh giá sản phẩm'} unDivider />
                <div className="space-y-6 p-4">
                    <div className="flex flex-col gap-5 rounded-lg bg-white p-4">
                        <div className="flex items-center justify-center gap-4">
                            <span className="text-3xl font-bold">4.3</span>
                            <Rate disabled defaultValue={4.3} />
                            <span className="text-gray-500">(12 đánh giá)</span>
                        </div>
                        <div className="flex flex-wrap justify-center gap-5">
                            <div className="rounded-[20px] bg-[#E7E7E7] px-[14px] py-[12px]">
                                <p className="font-semibold text-primary">
                                    Giao tiếp lịch sự thân thiện
                                </p>
                            </div>
                            <div className="rounded-[20px] bg-[#E7E7E7] px-[14px] py-[12px]">
                                <p className="font-semibold text-primary">
                                    Đáng tin cậy
                                </p>
                            </div>
                            <div className="rounded-[20px] bg-[#E7E7E7] px-[14px] py-[12px]">
                                <p className="font-semibold text-primary">
                                    Sản phẩm tốt
                                </p>
                            </div>
                            <div className="rounded-[20px] bg-[#E7E7E7] px-[14px] py-[12px]">
                                <p className="font-semibold text-primary">
                                    Mô tả đúng sản phẩm
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-lg bg-white p-5">
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            {productDetail.reviews.map((review) => (
                                <Card
                                    key={review.id}
                                    variant="borderless"
                                    className="!overflow-hidden"
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
                                                    {review.date}
                                                </div>
                                            </div>
                                        </div>

                                        <p className="rounded-2xl bg-[#E3EDF7] px-4 py-2 text-primary shadow-md shadow-cyan-50">
                                            {review.content}
                                        </p>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Related Products */}
            <div className="border-t p-6">
                <h2 className="mb-4 text-lg font-bold">SẢN PHẨM LIÊN QUAN</h2>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
                    {relatedProducts.slice(0, 4).map((product, index) => (
                        <ProductCard
                            product={product}
                            key={index}
                            hiddenShortDetails={true}
                        />
                    ))}
                </div>
            </div>
        </SectionCommon>
    )
}
