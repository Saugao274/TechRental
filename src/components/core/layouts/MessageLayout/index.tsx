'use client'

import { Avatar, Layout, Typography, message } from 'antd'
import React, { useEffect, useState } from 'react'
import SectionCommon from '../../common/SectionCommon'
import { Search } from 'lucide-react'
import { useRouter, useSearchParams, useParams } from 'next/navigation'
import { getRequest, postRequest } from '@/request'
import { useAuth } from '@/context/AuthContext'
import { chatEndpoint } from '@/settings/endpoints'

const { Text } = Typography

export default function MessageLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { user } = useAuth()
    return user ? (
        <Layout className="mx-auto max-w-[1440px] !bg-transparent">
            <SectionCommon>
                <div className="flex flex-col gap-5 md:flex-row">
                    <PersonSideBar />
                    <div className="w-full md:w-3/4">{children}</div>
                </div>
            </SectionCommon>
        </Layout>
    ) : null
}

export const PersonSideBar = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [rooms, setRooms] = useState<any[]>([])
    const [search, setSearch] = useState('')
    const params = useParams()
    const currentRoomId = params?.roomId

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const res = await getRequest(chatEndpoint.GET_ROOMS())
                setRooms(res)

                const shopId = searchParams.get('shopId')
                if (shopId) {
                    const existed = res.find((r: any) => {
                        const roomShopId = String(r.shopId?._id || r.shopId)
                        return roomShopId === shopId
                    })
                    if (existed) {
                        router.push(`/chat/${existed._id}`)
                    } else {
                        const created = await postRequest(
                            chatEndpoint.CREATE_ROOM(),
                            { data: { shopId } },
                        )
                        router.push(`/chat/${created._id}`)
                    }
                }
            } catch (err) {
                message.error('Không thể tải danh sách phòng')
            }
        }
        fetchRooms()
    }, [])

    const filtered = rooms.filter((r) => {
        const name = (r.shopId?.name ?? '').toLowerCase()
        const idRoom = String(r._id).toLowerCase()
        const idShop = String(r.shopId?._id || r.shopId).toLowerCase()
        const kw = search.toLowerCase()

        return name.includes(kw) || idRoom.includes(kw) || idShop.includes(kw)
    })

    return (
        <div className="flex w-full flex-col gap-4 rounded-[10px] bg-white bg-opacity-80 p-5 md:w-1/4">
            <div>
                <p className="!text-2xl font-bold text-primary">RentChat</p>
                <p className="!text-[16px] font-bold">
                    Nhắn tin trong hệ thống thuê đồ
                </p>
            </div>

            <div className="flex flex-row items-center gap-2 font-semibold">
                <Search size={18} />
                <input
                    placeholder="Tìm theo tên shop hoặc ID phòng/ID shop"
                    className="w-full rounded border px-2 py-1 text-sm outline-none"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="flex flex-col gap-3">
                {filtered.length === 0 ? (
                    <Text type="secondary">Không tìm thấy phòng nào</Text>
                ) : (
                    filtered.map((item) => (
                        <AvatarMessage item={item} key={item._id} />
                    ))
                )}
            </div>
        </div>
    )
}

export const AvatarMessage = ({ item }: { item: any }) => {
    const router = useRouter()
    const shop = item.shopId

    return (
        <div
            className="flex cursor-pointer items-center gap-2 rounded p-2 transition-all hover:bg-gray-100"
            onClick={() => router.push(`/chat/${item._id}`)}
        >
            <Avatar size={50} src={shop?.avatar || '/placeholder.svg'} />
            <div className="truncate">
                <p className="truncate font-bold text-primary">
                    {shop?.name || 'Shop'}
                </p>
                <p className="truncate text-xs text-gray-500">{item._id}</p>
            </div>
        </div>
    )
}
