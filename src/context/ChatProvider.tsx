// context/ChatSocketContext.tsx
'use client'

import React, { createContext, useEffect } from 'react'
import socket from '@/utils/socket'
import { useAuth } from '@/context/AuthContext'
import { useChat } from '@/context/ChatContext'

export const ChatSocketContext = createContext({})

export const ChatSocketProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const { user } = useAuth()
    const { refreshRooms } = useChat()

    useEffect(() => {
        if (!user?._id) return

        socket.auth = { userId: user._id }
        socket.connect()

        const handler = (msg: any) => {
            console.log('📩 New message via Socket:', msg)
            // đây sẽ fetch lại rooms để cập nhật unread count & lastMessage
            refreshRooms()
        }

        socket.on('newMessage', handler)

        return () => {
            socket.off('newMessage', handler)
            socket.disconnect()
        }
    }, [user?._id])

    return (
        <ChatSocketContext.Provider value={{}}>
            {children}
        </ChatSocketContext.Provider>
    )
}
