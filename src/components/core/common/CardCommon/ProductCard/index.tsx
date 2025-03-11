import React from 'react'
import ButtonCommon from '../../ButtonCommon'
import { useRouter } from 'next/navigation'
import {
    EyeOutlined,
    StarFilled,
    StarOutlined,
    StarTwoTone,
} from '@ant-design/icons'

export default function ProductCard({
    Image,
    Title,
    Details,
    Price,
    totalReviews, // Thêm totalReviews
    view,
    id,
}: {
    Image: string
    Title: string
    Details?: string
    Price: number
    totalReviews: number
    view: number
    id: string
}) {
    const router = useRouter()

    const handleClick = () => {
        // router.push(`/products/${id}`)
    }

    const bayesianRank =
        totalReviews > 0 ? (5 * totalReviews + 3 * 10) / (totalReviews + 10) : 3

    return (
        <div onClick={handleClick} className="cursor-pointer">
            <div className="flex flex-col gap-3">
                <img
                    // src={`/images/${Image}`}
                    src="/images/Default_Images.webp"
                    alt=""
                    className="aspect-[4/3] h-44 scale-100 rounded-lg object-cover brightness-50 transition-all duration-300 hover:scale-105 hover:brightness-100"
                />
                <div className="flex w-72 flex-col gap-3">
                    <h3 className="line-clamp-1 text-xl font-semibold text-blue-900">
                        {Title}
                    </h3>
                    <p className="line-clamp-2 text-base text-gray-500">
                        {Details}
                    </p>
                    <div className="flex flex-col items-center justify-between gap-3">
                        <span className="text text-xl font-semibold text-blue-900">
                            {Price.toLocaleString('vi-VN')} đ
                        </span>
                        <ButtonCommon type="primary" className="!w-min">
                            THUÊ NGAY
                        </ButtonCommon>
                    </div>

                    <div className="flex items-center justify-around gap-5 font-semibold">
                        <div className="mt-2 flex items-center gap-2">
                            <span className="text-xs">
                                {bayesianRank.toFixed(1)} ★ ({totalReviews} đánh
                                giá)
                            </span>
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                            <EyeOutlined />
                            <span className="text-xs">{view} lượt xem</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
