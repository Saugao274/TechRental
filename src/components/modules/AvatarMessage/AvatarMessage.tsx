'use client'

import { Avatar } from 'antd'
import { useRouter, useSearchParams } from 'next/navigation'

export const AvatarMessage = ({ item }: { item: any }) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const isOwner = !!searchParams.get('owner')

    const handleClick = () => {
        router.push(`/chat/${item._id}`)
    }

    return (
        <div
            className="flex cursor-pointer items-center gap-2 rounded p-2 hover:bg-gray-100"
            onClick={handleClick}
        >
            <Avatar
                size={50}
                src={
                    item.userId?.avatar ||
                    item.shopId?.avatar ||
                    '/placeholder.svg'
                }
            />
            <div className="truncate">
                <p className="truncate font-bold text-primary">
                    {item.userId?.name || item.shopId?.name}
                </p>
                <p className="truncate text-xs text-gray-500">{item._id}</p>
            </div>
        </div>
    )
}
