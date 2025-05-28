'use client'

import React from 'react'
import { Avatar, Typography } from 'antd'
import { useChat } from '@/context/ChatContext'
import { useRouter } from 'next/navigation'

const { Text } = Typography

export default function ShopSideBar() {
    const { ownerRooms } = useChat()
    const router = useRouter()

    return (
        <div className="w-1/4 space-y-4 rounded bg-white p-4 shadow">
            <h2 className="text-xl font-bold">ShopChat</h2>
            {ownerRooms.length === 0 ? (
                <Text type="secondary">Không có phòng nào</Text>
            ) : (
                ownerRooms.map((room) => (
                    <div
                        key={room._id}
                        className="flex cursor-pointer items-center gap-3 rounded p-2 hover:bg-gray-100"
                        onClick={() => router.push(`/chat/${room._id}`)}
                    >
                        <Avatar src={room.userId?.avatar} size={40} />
                        <div>
                            <p className="font-medium">{room.userId?.name}</p>
                            <Text type="secondary" className="text-xs">
                                {new Date(
                                    room.lastMessageTime,
                                ).toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            </Text>
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}
