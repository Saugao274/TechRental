// components/MessageModule.tsx
'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Avatar, Button, Empty, Input, Spin, Typography, message } from 'antd'
import { Send } from 'lucide-react'
import socket from '@/utils/socket'
import { getRequest, postRequest } from '@/request'
import { chatEndpoint } from '@/settings/endpoints'
import { useAuth } from '@/context/AuthContext'
import { useParams, useSearchParams, useRouter } from 'next/navigation'
import { useChat } from '@/context/ChatContext'
import webStorageClient from '@/utils/webStorageClient'
import constants from '@/settings/constants'

const { Text } = Typography

// Component to display list of chat rooms
function ChatRoomList() {
    const { user } = useAuth()
    const { userRooms, ownerRooms, loading } = useChat()
    const searchParams = useSearchParams()
    const isShopMode = searchParams.get('shopMode') === '1'
    const router = useRouter()

    const rooms = isShopMode ? ownerRooms : userRooms

    if (loading) {
        return (
            <div className="flex h-full items-center justify-center">
                <Spin tip="Đang tải..." />
            </div>
        )
    }

    if (rooms.length === 0) {
        return (
            <div className="flex h-full items-center justify-center">
                <Empty 
                    description={isShopMode ? "Chưa có khách hàng nào chat với shop của bạn" : "Chưa có cuộc trò chuyện nào"} 
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
            </div>
        )
    }

    return (
        <div className="flex h-full flex-col">
            <div className="rounded-t bg-white p-4 shadow-sm border-b">
                <h2 className="text-lg font-bold">
                    {isShopMode ? 'Chat với khách hàng' : 'Tin nhắn của bạn'}
                </h2>
            </div>
            <div className="flex-1 overflow-y-auto">
                {rooms.map((room) => {
                    const peer = isShopMode ? room.userId : room.shopId
                    const peerName = peer?.name || (isShopMode ? 'Khách hàng' : 'Shop')
                    const peerAvatar = peer?.avatar || '/placeholder.svg'
                    
                    return (
                        <div
                            key={room._id}
                            className="flex items-center gap-3 p-4 hover:bg-gray-50 cursor-pointer border-b transition-colors"
                            onClick={() => router.push(`/chat/${room._id}`)}
                        >
                            <Avatar src={peerAvatar} size={50} />
                            <div className="flex-1">
                                <p className="font-medium">{peerName}</p>
                                <Text type="secondary" className="text-xs">
                                    {room.lastMessageTime ? new Date(room.lastMessageTime).toLocaleTimeString([], {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    }) : 'Chưa có tin nhắn'}
                                </Text>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

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

    // Nếu chưa chọn phòng chat, chỉ hiện thông báo
    if (!chatId) {
        return (
            <div className="flex h-full items-center justify-center">
                <Text type="secondary">Vui lòng chọn phòng chat</Text>
            </div>
        )
    }

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

    // 2) Realtime newMessage
    useEffect(() => {
        socket.on('newMessage', (msg) => {
            if (msg.roomId === chatId) setMessages((prev) => [...prev, msg.data])
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

    const isShop = user.roles?.includes('owner');
    const peer = isShop ? room.userId : room.shopId;
    const peerName = peer?.name || (isShop ? 'Khách hàng' : 'Shop');
    const peerAvatar = peer?.avatar || '/placeholder.svg';
    return (
        <div className="flex h-full flex-col">
            {/* Header */}
            <div className="flex items-center gap-3 rounded-t bg-white p-4 shadow-sm border-b">
                <Avatar src={peerAvatar} size={50} />
                <div>
                    <p className="text-lg font-bold">{peerName}</p>
                    <Text type="secondary" className="text-xs">
                        Hoạt động gần đây
                    </Text>
                </div>
            </div>
            {/* Messages */}
            <div className="message-list custom-scrollbar flex-1 space-y-3 overflow-y-auto bg-gradient-to-b from-blue-50 to-white p-4">
                {messages.length === 0 ? (
                    <Empty description="Chưa có tin nhắn" />
                ) : (
                    messages.map((m, idx) => {
                        const isMe = m.senderId === user._id
                        // Lấy thông tin avatar và tên người gửi
                        let senderAvatar = ''
                        let senderName = ''
                        if (isMe) {
                            senderAvatar = user.avatar || '/icons/avatar-default.png'
                            senderName = user.name || 'Bạn'
                        } else if (room.shopId && m.senderType === 'shop') {
                            senderAvatar = room.shopId.avatar || '/icons/avatar-default.png'
                            senderName = room.shopId.name || 'Shop'
                        } else if (room.userId && m.senderType === 'user') {
                            senderAvatar = room.userId.avatar || '/icons/avatar-default.png'
                            senderName = room.userId.name || 'Người dùng'
                        } else {
                            senderAvatar = '/icons/avatar-default.png'
                            senderName = 'Người dùng'
                        }
                        return (
                            <div
                                key={m._id || idx}
                                className={`flex items-end gap-2 ${isMe ? 'justify-end' : 'justify-start'} animate-fadeIn`}
                            >
                                {!isMe && (
                                    <Avatar src={senderAvatar} size={36} className="shadow" />
                                )}
                                <div className={`flex flex-col max-w-[70%] ${isMe ? 'items-end' : 'items-start'}`}>
                                    <span className={`text-xs font-semibold mb-1 ${isMe ? 'text-blue-700' : 'text-gray-700'}`}>{senderName}</span>
                                    <div
                                        className={`message-bubble break-words rounded-2xl px-4 py-2 shadow-md transition-all duration-200 ${isMe ? 'bg-gradient-to-r from-indigo-500 to-blue-500 text-white' : 'bg-white text-gray-900 border'} `}
                                    >
                                        {m.content}
                                    </div>
                                    <span className="mt-1 text-xs text-gray-400">
                                        {new Date(m.createdAt).toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </span>
                                </div>
                                {isMe && (
                                    <Avatar src={senderAvatar} size={36} className="shadow" />
                                )}
                            </div>
                        )
                    })
                )}
                <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="flex items-center gap-2 rounded-b bg-white p-3 border-t shadow-inner">
                <Input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onPressEnter={handleSend}
                    placeholder="Viết tin nhắn..."
                    className="rounded-full px-4 py-2 border-2 border-blue-200 focus:border-blue-500 transition-all"
                />
                <Button icon={<Send />} onClick={handleSend} type="primary" className="rounded-full shadow-lg hover:scale-110 transition-transform duration-150" />
            </div>

            {/* Custom Scrollbar & Animation Styles */}
            <style jsx>{`
                .custom-scrollbar {
                    scrollbar-width: auto;
                    scrollbar-color: #4f46e5 #e5e7eb;
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 12px;
                    background: #e5e7eb;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #e5e7eb;
                    border-radius: 6px;
                    margin: 4px 0;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #4f46e5;
                    border-radius: 6px;
                    cursor: pointer;
                    border: 2px solid #e5e7eb;
                    min-height: 20px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #3730a3;
                    border: 2px solid #d1d5db;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:active {
                    background: #312e81;
                }
                .custom-scrollbar::-webkit-scrollbar-corner {
                    background: #e5e7eb;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.4s cubic-bezier(0.4,0,0.2,1);
                }
            `}</style>
        </div>
    )
}
