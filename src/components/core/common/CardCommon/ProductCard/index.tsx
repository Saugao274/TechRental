import React, { useState } from 'react'
import ButtonCommon from '../../ButtonCommon'
import { useRouter } from 'next/navigation'
import { EyeOutlined } from '@ant-design/icons'
import {
    FALLBACK_IMAGES,
    getRandomFallbackImage,
    type ProductDetail,
} from '@/data/products'
import Image from 'next/image'

export default function ProductCard({
    product,
    style,
    hiddenShortDetails,
}: {
    product: ProductDetail
    style?: string
    hiddenShortDetails?: boolean
}) {
    const router = useRouter()

    const hasImages = product.images && product.images.length > 0

    const initialImage = hasImages
        ? product.images && product.images[0]
        : getRandomFallbackImage()
    const [currentImage, setCurrentImage] = useState<string>(initialImage || '')

    const handleClick = () => {
        router.push(`/products/${product.idProduct}`)
    }

    const handleMouseEnter = () => {
        if (hasImages) {
            setCurrentImage(
                (product.images && product.images[1]) ||
                    (product.images && product.images[0]) ||
                    '',
            )
        } else {
            let newImage = getRandomFallbackImage()
            while (newImage === currentImage && FALLBACK_IMAGES.length > 1) {
                newImage = getRandomFallbackImage()
            }
            setCurrentImage(newImage)
        }
    }

    const handleMouseLeave = () => {
        setCurrentImage(
            hasImages
                ? (product.images && product.images[0]) || ' '
                : getRandomFallbackImage(),
        )
    }

    const bayesianRank =
        product.view > 0 ? (5 * product.view + 3 * 10) / (product.view + 10) : 3

    return (
        <div
            onClick={handleClick}
            className={`cursor-pointer ${style}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="flex flex-col items-center justify-center gap-3 hover:scale-105 hover:border-2 hover:shadow-md hover:shadow-blue-300">
                <div className='md:w-fit w-full'>
                    <Image
                        src={currentImage}
                        alt={product.title}
                        width={300}
                        height={200}
                        className="aspect-[4/3] h-56 w-full rounded-lg object-cover md:w-fit"
                        unoptimized
                    />
                </div>

                <div className="flex w-full flex-col items-center justify-center gap-3">
                    <h3 className="line-clamp-1 text-xl font-semibold text-blue-900">
                        {product.title}
                    </h3>
                    {!hiddenShortDetails && (
                        <p className="line-clamp-2 text-center text-base text-gray-500">
                            {product.details}
                        </p>
                    )}
                    <div className="flex flex-col items-center justify-between gap-3">
                        <span className="text text-xl font-semibold text-blue-900">
                            {product.price.toLocaleString('vi-VN')} đ
                        </span>
                        <ButtonCommon type="primary" className="!w-min">
                            THUÊ NGAY
                        </ButtonCommon>
                    </div>
                    <div className="flex w-full items-center justify-between font-semibold">
                        <div className="flex items-center">
                            <span className="line-clamp-1 text-xs">
                                {bayesianRank.toFixed(1)} ★ ({product.view} đánh
                                giá)
                            </span>
                        </div>
                        <div className="flex items-center gap-0.5">
                            <EyeOutlined />
                            <span className="line-clamp-1 text-xs">
                                {product.view} lượt xem
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
