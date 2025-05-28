// components/MessageModule.tsx
'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Avatar, Button, Empty, Input, Spin, Typography, message } from 'antd'
import { Send } from 'lucide-react'
import socket from '@/utils/socket'
import { getRequest, postRequest } from '@/request'
import { chatEndpoint } from '@/settings/endpoints'
import { useAuth } from '@/context/AuthContext'
import { useParams } from 'next/navigation'
import { useChat } from '@/context/ChatContext'
import webStorageClient from '@/utils/webStorageClient'
import constants from '@/settings/constants'

const { Text } = Typography

export default function MessageModule() {
    const { user } = useAuth()
    const { 'chat-id': chatId } = useParams() as { 'chat-id': string }
    const { userRooms, ownerRooms } = useChat()
    const allRooms = [...userRooms, ...ownerRooms]
    const room = allRooms.find((r) => r._id === chatId)

    const [messages, setMessages] = useState<any[]>([])
    const [text, setText] = useState('')
    const [loading, setLoading] = useState(true)
    const bottomRef = useRef<HTMLDivElement>(null)

    // 1) Load history
    useEffect(() => {
        if (!room) {
            setLoading(false)
            return
        }
        ;(async () => {
            try {
                const msgs = await getRequest(chatEndpoint.GET_MESSAGES(chatId))
                setMessages(msgs)
                socket.connect()
                socket.emit('joinRoom', chatId)
            } catch {
                message.error('Không thể tải tin nhắn')
            } finally {
                setLoading(false)
            }
        })()
        return () => {
            socket.disconnect()
        }
    }, [chatId, room])

    useEffect(() => {
        socket.on('newMessage', (msg) => {
            if (msg.roomId === chatId) setMessages((prev) => [...prev, msg])
        })
        return () => {
            socket.off('newMessage')
        }
    }, [chatId])

    // 3) Auto-scroll
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const handleSend = async () => {
        const trimmed = text.trim()
        if (!trimmed) return

        setText('')
        console.log('🔥 thử fetch POST…')
        const token = webStorageClient.get(constants.ACCESS_TOKEN)

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVICE_API_SERVER || 'http://localhost:5000'}/api/chatrooms/${chatId}/messages`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && { Authorization: `Bearer ${token}` }),
                },
                credentials: 'include',
                body: JSON.stringify({ content: trimmed }),
            },
        )
        console.log('→ fetch status:', res.status)
        const newMsg = await res.json()
        console.log('→ fetch payload:', newMsg)
        setMessages((prev) => [...prev, newMsg])
    }

    if (!user) return null
    if (loading)
        return (
            <div className="flex h-full items-center justify-center">
                <Spin tip="Đang tải..." />
            </div>
        )
    if (!room) return <Text type="secondary">Vui lòng chọn phòng chat</Text>

    const isSelf = room.userId?._id === user._id
    const peer = isSelf ? room.shopId : room.userId

    return (
        <div className="flex h-full flex-col">
            {/* Header */}
            <div className="flex items-center gap-3 rounded-t bg-white p-4">
                <Avatar src={peer.avatar} size={50} />
                <div>
                    <p className="text-lg font-bold">{peer.name}</p>
                    <Text type="secondary" className="text-xs">
                        Hoạt động gần đây
                    </Text>
                </div>
            </div>

            {/* Messages */}
            <div className="message-list custom-scrollbar flex-1 space-y-3 overflow-y-auto bg-gray-50 p-4">
                {messages.length === 0 ? (
                    <Empty description="Chưa có tin nhắn" />
                ) : (
                    messages.map((m) => {
                        const isMe = m.senderId === user._id
                        return (
                            <div
                                key={m._id}
                                className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`message-bubble max-w-[60%] break-words rounded-lg p-3 ${isMe ? 'bg-primary text-white' : 'bg-white shadow'} `}
                                >
                                    <div>{m.content}</div>
                                    <div className="mt-1 text-right text-xs text-gray-500">
                                        {new Date(
                                            m.createdAt,
                                        ).toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </div>
                                </div>
                            </div>
                        )
                    })
                )}
                <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="flex items-center gap-2 rounded-b bg-white p-3">
                <Input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onPressEnter={handleSend}
                    placeholder="Viết tin nhắn..."
                />
                <Button icon={<Send />} onClick={handleSend} type="primary" />
            </div>

            <style jsx>{`
                .custom-scrollbar {
                    scrollbar-width: thin;
                    scrollbar-color: #888 #f1f1f1;
                }

                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }

                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 10px;
                }

                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #888;
                    border-radius: 10px;
                    cursor: pointer;
                }

                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #555;
                }

                .custom-scrollbar::-webkit-scrollbar-thumb:active {
                    background: #333;
                }
            `}</style>
        </div>
    )
}
