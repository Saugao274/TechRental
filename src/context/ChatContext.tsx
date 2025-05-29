'use client'

import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback,
    ReactNode,
    useMemo,
} from 'react'
import { getRequest, postRequest } from '@/request'
import { chatEndpoint } from '@/settings/endpoints'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

interface ChatContextType {
    userRooms: any[]
    ownerRooms: any[]
    loading: boolean
    createOrOpenRoom: (shopId: string) => Promise<void>
    refreshRooms: () => void
}

const ChatContext = createContext<ChatContextType | undefined>(undefined)

export const ChatProvider = ({ children }: { children: ReactNode }) => {
    const { user } = useAuth()
    const [userRooms, setUserRooms] = useState<any[]>([])
    const [ownerRooms, setOwnerRooms] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const fetchUserRooms = useCallback(async () => {
        setLoading(true)
        try {
            const data = await getRequest(chatEndpoint.GET_ROOMS())
            setUserRooms(Array.isArray(data) ? data : [])
        } catch (err) {
            console.error('❌ Lỗi lấy rooms user:', err)
        } finally {
            setLoading(false)
        }
    }, [user?._id])

    const fetchOwnerRooms = useCallback(async () => {
        const shopId = localStorage.getItem('shopId')
        if (!shopId) return
        setLoading(true)
        try {
            const data = await getRequest(chatEndpoint.GET_SHOP_ROOMS(shopId))
            setOwnerRooms(Array.isArray(data) ? data : [])
        } catch (err) {
            console.error('❌ Lỗi lấy rooms shop:', err)
        } finally {
            setLoading(false)
        }
    }, [user?._id])

    const refreshRooms = useCallback(() => {
        fetchUserRooms()
        fetchOwnerRooms()
    }, [fetchUserRooms, fetchOwnerRooms])

    const createOrOpenRoom = useCallback(
        async (shopId: string) => {
            const existed = userRooms.find(
                (r) => String(r.shopId?._id || r.shopId) === shopId,
            )
            if (existed) {
                router.push(`/chat/${existed._id}`)
                return
            }

            try {
                const created = await postRequest(chatEndpoint.CREATE_ROOM(), {
                    data: { shopId },
                })
                await fetchUserRooms()
                router.push(`/chat/${created._id}`)
            } catch (err) {
                console.error('❌ Lỗi tạo phòng:', err)
            }
        },
        [userRooms],
    )

    useEffect(() => {
        if (!user) return
        refreshRooms()
    }, [user])

    const value = useMemo(
        () => ({
            userRooms,
            ownerRooms,
            loading,
            createOrOpenRoom,
            refreshRooms,
        }),
        [userRooms, ownerRooms, loading, createOrOpenRoom, refreshRooms],
    )

    return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>
}

export const useChat = () => {
    const ctx = useContext(ChatContext)
    if (!ctx) throw new Error('useChat must be used within ChatProvider')
    return ctx
}
