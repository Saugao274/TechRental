import React from 'react'
import { CalendarOutlined } from '@ant-design/icons'
import ButtonCommon from '../../ButtonCommon'
import { Navigation } from 'lucide-react'
import { useRouter } from 'next/navigation'

type typeCard = 'horizontal' | 'vertical' | 'mini'
export default function NewsCard({
    Image,
    Title,
    Details,
    Date,
    type,
    id,
}: {
    Image: string
    Title: string
    Details?: string
    Date?: string
    type: typeCard
    id: string
}) {
    const router = useRouter()

    const handleClick = () => {
        router.push(`/news/${id}`)
    }
    return (
        <div onClick={handleClick} className="cursor-pointer">
            {type === 'horizontal' ? (
                <div className="flex items-center justify-between">
                    <div className="flex flex-col items-center gap-4 md:flex-row">
                        <img
                            src={`/images/${Image}`}
                            alt=""
                            className="aspect-[4/3] h-44 w-full scale-100 rounded-lg object-cover brightness-50 transition-all duration-300 hover:scale-105 hover:brightness-100 md:w-72"
                        />

                        <div className="flex h-44 w-full flex-col justify-between">
                            <div className="flex items-center space-x-2">
                                <CalendarOutlined />
                                <div className="text-sm text-gray-500">
                                    {Date}
                                </div>
                            </div>
                            <h3 className="line-clamp-2 text-lg font-semibold text-blue-900">
                                {Title}
                            </h3>
                            <p className="line-clamp-3 text-sm text-gray-500">
                                {Details}
                            </p>
                            <ButtonCommon
                                type="default"
                                className="!w-20 !text-[16px] !text-blue-900"
                            >
                                Đọc thêm
                            </ButtonCommon>
                        </div>
                    </div>
                </div>
            ) : type === 'vertical' ? (
                <div className="flex flex-col items-center">
                    <img
                        src={`/images/${Image}`}
                        alt=""
                        className="aspect-[4/3] h-44 w-full scale-100 rounded-lg object-cover brightness-50 transition-all duration-300 hover:scale-105 hover:brightness-100"
                    />
                    <div className="mt-4 flex w-full flex-col">
                        <h3 className="line-clamp-1 text-start text-lg font-semibold text-blue-900">
                            {Title}
                        </h3>
                        <p className="line-clamp-3 text-sm text-gray-500">
                            {Details}
                        </p>
                    </div>
                </div>
            ) : (
                <div className="flex items-center space-x-4">
                    <img
                        src={`/images/${Image}`}
                        alt=""
                        className="h-24 w-20 scale-100 rounded-lg object-cover brightness-50 transition-all duration-300 hover:scale-105 hover:brightness-100"
                    />
                    <div className="flex h-24 w-full flex-col">
                        <h3 className="line-clamp-2 text-lg font-semibold text-blue-900">
                            {Title}
                        </h3>
                        <div className="flex items-center space-x-2">
                            <CalendarOutlined />
                            <div className="text-sm text-gray-500">{Date}</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
