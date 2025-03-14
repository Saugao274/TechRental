import React from 'react'
import ButtonCommon from '../../ButtonCommon'
import { useRouter } from 'next/navigation'
import { EyeOutlined } from '@ant-design/icons'
import type { ProductType } from '@/data/products'

export default function ProductCard({
    product,
    style,
}: {
    product: ProductType
    style?: string
}) {
    const router = useRouter()

    const handleClick = () => {
        router.push(`/products/${product.Id}`)
    }

    const bayesianRank =
        product.TotalReviews > 0
            ? (5 * product.TotalReviews + 3 * 10) / (product.TotalReviews + 10)
            : 3

    return (
        <div onClick={handleClick} className={`cursor-pointer ${style}`}>
            <div className="flex flex-col gap-3 hover:scale-105 hover:border-2 hover:shadow-md hover:shadow-blue-300">
                <img
                    src={`/images/${product.Image}`}
                    alt=""
                    className="aspect-[4/3] h-56 scale-100 rounded-lg object-cover transition-all duration-300 md:h-44"
                />
                <div className="flex w-full flex-col items-center justify-center gap-3">
                    <h3 className="line-clamp-1 text-xl font-semibold text-blue-900">
                        {product.Title}
                    </h3>
                    <p className="line-clamp-2 text-center text-base text-gray-500">
                        {product.Details}
                    </p>
                    <div className="flex flex-col items-center justify-between gap-3">
                        <span className="text text-xl font-semibold text-blue-900">
                            {product.Price.toLocaleString('vi-VN')} đ
                        </span>
                        <ButtonCommon type="primary" className="!w-min">
                            THUÊ NGAY
                        </ButtonCommon>
                    </div>

                    <div className="flex w-full items-center justify-between font-semibold">
                        <div className="flex items-center">
                            <span className="line-clamp-1 text-xs">
                                {bayesianRank.toFixed(1)} ★ (
                                {product.TotalReviews} đánh giá)
                            </span>
                        </div>
                        <div className="ju flex items-center gap-0.5">
                            <EyeOutlined />
                            <span className="line-clamp-1 text-xs">
                                {product.View} lượt xem
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
