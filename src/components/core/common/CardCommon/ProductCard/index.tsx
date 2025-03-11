import React from 'react'
import ButtonCommon from '../../ButtonCommon'
import { useRouter } from 'next/navigation'
import { EyeOutlined, StarFilled, StarOutlined } from '@ant-design/icons'

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
        router.push(`/news/${id}`)
    }

    // Tính rank theo Bayesian Rating
    const bayesianRank =
        totalReviews > 0 ? (5 * totalReviews + 3 * 10) / (totalReviews + 10) : 3

    // Giới hạn số sao hiển thị từ 0-5
    const stars = Math.max(0, Math.min(5, Math.round(bayesianRank)))

    return (
        <div onClick={handleClick} className="cursor-pointer">
            <div className="flex flex-col items-center">
                <img
                    src={`/images/${Image}`}
                    alt=""
                    className="aspect-[4/3] h-44 w-72 scale-100 rounded-lg object-cover brightness-50 transition-all duration-300 hover:scale-105 hover:brightness-100"
                />
                <div className="mt-4 flex w-full flex-col items-center">
                    <h3 className="line-clamp-1 text-lg font-semibold text-blue-900">
                        {Title}
                    </h3>
                    <p className="line-clamp-3 text-sm text-gray-500">
                        {Details}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                        <span className="text-sm text-gray-500">{Price}</span>
                        <span className="text-sm text-gray-500">VND</span>
                    </div>
                    <ButtonCommon type="default">THUÊ NGAY</ButtonCommon>
                </div>
                <div className="mt-2 flex items-center gap-2">
                    <div className="mt-2 flex items-center gap-2">
                        <span className="text-sm text-gray-500">
                            {bayesianRank.toFixed(1)} ★ ({totalReviews} đánh
                            giá)
                        </span>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                        <EyeOutlined />
                        <span className="text-sm text-gray-500">
                            {view} lượt xem
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
