'use client'
import React from 'react'
import ButtonCommon from '../../ButtonCommon'
import { useRouter } from 'next/navigation'

export default function NewArrivalCard({
    Title,
    Details,
    Background,
    itemImg,
    id,
    itemStyle,
}: {
    Title: string
    Details?: string
    Background: string
    itemImg: string
    id?: string
    itemStyle?: string
}) {
    const router = useRouter()

    const handleClick = () => {
        if (id) {
            router.push(`/products/${id}`)
        }
    }

    return (
        <div
            onClick={handleClick}
            className="group relative aspect-[3/4] h-60 cursor-pointer overflow-visible rounded-lg"
        >
            <img
                src={`/images/${Background}`}
                alt="background"
                className="absolute left-0 top-0 h-full rounded-lg object-fill"
            />

            <div
                className={`absolute left-1/2 top-0 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center ${itemStyle}`}
            >
                <img
                    src={`/images/${itemImg}`}
                    alt="product"
                    className="h-auto object-contain drop-shadow-xl transition-transform duration-300 group-hover:scale-105"
                />
            </div>

            <div className="absolute bottom-4 left-0 w-full text-center text-white">
                <h3 className="text-xl font-extrabold">{Title}</h3>
                {Details && <p className="text-md font-light">{Details}</p>}
                <ButtonCommon className="opacity-80 transition-opacity duration-300 group-hover:opacity-100">
                    Xem thêm
                </ButtonCommon>
            </div>
        </div>
    )
}
