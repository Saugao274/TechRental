// MessageModule.tsx – chat 1-1 giữa user và shop tại route /chat/[chat-id]
'use client'

import React, { useEffect, useRef, useState } from 'react'
import {
    Avatar,
    Button,
    Empty,
    Input,
    Typography,
    message as antMessage,
    Spin,
} from 'antd'
import { Send } from 'lucide-react'
import { useParams } from 'next/navigation'
import { getRequest, postRequest } from '@/request'
import { chatEndpoint } from '@/settings/endpoints'
import { useAuth } from '@/context/AuthContext'

const { Text } = Typography

export default function MessageModule() {
    const { user } = useAuth()
    const { 'chat-id': chatId } = useParams() as { 'chat-id': string }

    const [room, setRoom] = useState<any>(null)
    const [messages, setMessages] = useState<any[]>([])
    const [text, setText] = useState('')
    const [loading, setLoading] = useState(true)
    const bottomRef = useRef<HTMLDivElement>(null)

    // Fetch room info và messages
    useEffect(() => {
        if (!chatId) return
        ;(async () => {
            try {
                // Lấy danh sách phòng, tìm room hiện tại
                const rooms = await getRequest(chatEndpoint.GET_ROOMS())
                const r = rooms.find((r: any) => r._id === chatId)
                if (!r) {
                    antMessage.error('Không tìm thấy phòng chat')
                    setLoading(false)
                    return
                }
                setRoom(r)

                // Lấy messages của phòng
                const msgs = await getRequest(chatEndpoint.GET_MESSAGES(chatId))
                setMessages(msgs)
            } catch (err) {
                console.error(err)
                antMessage.error('Không thể tải dữ liệu phòng chat')
            } finally {
                setLoading(false)
            }
        })()
    }, [chatId])

    // Cuộn xuống cuối khi có messages mới
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    // Gửi tin nhắn mới
    const handleSend = async () => {
        if (!text.trim()) return

        try {
            const msg = await postRequest(chatEndpoint.POST_MESSAGE(chatId), {
                data: { content: text },
            })
            setMessages((prev) => [...prev, msg])
            setText('')
        } catch (err) {
            console.error(err)
            antMessage.error('Gửi tin nhắn thất bại')
        }
    }

    // Nếu đang loading hoặc chưa auth thì không render gì
    if (!user) return null
    if (loading)
        return (
            <div className="flex h-full items-center justify-center">
                <Spin tip="Đang tải..." />
            </div>
        )

    // Nếu không tìm thấy phòng
    if (!room)
        return (
            <div className="flex h-full items-center justify-center rounded-lg bg-white bg-opacity-80 p-4">
                <Text type="secondary">Không tìm thấy phòng chat</Text>
            </div>
        )

    return (
        <div className="flex h-full flex-col gap-4">
            {/* Header */}
            <div className="flex items-center gap-3 rounded-lg bg-white bg-opacity-80 p-4">
                <Avatar src={room?.shopId?.avatar} size={50} />
                <div>
                    <p className="text-lg font-bold">{room?.shopId?.name}</p>
                    <Text type="secondary" className="text-xs">
                        Hoạt động gần đây
                    </Text>
                </div>
            </div>

            {/* Danh sách tin nhắn */}
            <div className="flex-1 space-y-3 overflow-y-auto rounded-lg bg-white bg-opacity-80 p-4">
                {messages.length === 0 && (
                    <Empty description="Chưa có tin nhắn" />
                )}
                {messages.map((msg) => (
                    <MsgBubble key={msg._id} msg={msg} selfId={user._id} />
                ))}
                <div ref={bottomRef} />
            </div>

            {/* Input gửi tin */}
            <div className="flex items-center gap-2 rounded-lg bg-white p-3">
                <Input
                    placeholder="Viết tin nhắn..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onPressEnter={handleSend}
                />
                <Button
                    type="primary"
                    icon={<Send size={18} />}
                    onClick={handleSend}
                />
            </div>
        </div>
    )
}

// Chat bubble
function MsgBubble({ msg, selfId }: { msg: any; selfId: string }) {
    const isSelf = msg.senderId === selfId
    return (
        <div className={`flex ${isSelf ? 'justify-end' : 'justify-start'}`}>
            <div
                className={`max-w-[60%] rounded-lg px-3 py-2 text-sm ${
                    isSelf
                        ? 'bg-primary text-white'
                        : 'bg-white text-primary shadow'
                }`}
            >
                {msg.content}
                <span className="mt-1 block text-right text-[10px] text-gray-500">
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </span>
            </div>
        </div>
    )
}
