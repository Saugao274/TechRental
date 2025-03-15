'use client'
import { Avatar, Image, Layout, Typography } from 'antd'
import React from 'react'
import SectionCommon from '../../common/SectionCommon'
import { Contact, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function MessageLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <Layout className="mx-auto max-w-[1440px] !bg-transparent">
            <SectionCommon>
                <div className="flex flex-row gap-5">
                    <PersonSideBar />
                    <div className="w-3/4">{children}</div>
                </div>
            </SectionCommon>
        </Layout>
    )
}

export const PersonSideBar = () => {
    const messageUserData = [
        {
            chatId: 1,
            avatar: '/images/Message/image1.png',
            name: 'Thanh Thủy',
            title: 'Freelancer chụp ảnh sự kiện',
            time: 'Hoạt động 3 giờ trước',
        },
        {
            chatId: 2,
            avatar: '/images/Message/image2.png',
            name: 'Viết Thông',
            title: 'Doanh nhân',
            time: 'Hoạt động 2 giờ trước',
        },
        {
            chatId: 3,
            avatar: '/images/Message/image3.png',
            name: 'Thế Anh',
            title: 'Nhà thiết kế đồ họa',
            time: 'Hoạt động 4 giờ trước',
        },
        {
            chatId: 4,
            avatar: '/images/Message/image4.png',
            name: 'Dương Đức Anh',
            title: 'Người lập trình',
            time: 'Hoạt động 3 giờ trước',
        },
        {
            chatId: 5,
            avatar: '/images/Message/image5.png',
            name: 'Phạm Hồng Nguyên',
            title: 'Nhiếp ảnh gia',
            time: 'Hoạt động 3 giờ trước',
        },
        {
            chatId: 6,
            avatar: '/images/Message/image6.png',
            name: 'Trần lê Mỹ Duyên',
            title: 'Nhiếp ảnh gia',
            time: 'Hoạt động 3 giờ trước',
        },
        {
            chatId: 7,
            avatar: '/images/Message/image7.png',
            name: 'Trần Trung Kiên',
            title: 'Sinh Viên',
            time: 'Hoạt động 3 giờ trước',
        },
    ]
    return (
        <div className="flex w-1/4 flex-col gap-5 rounded-[10px] bg-white bg-opacity-80 p-5">
            <div>
                <p className="!text-2xl font-bold text-primary">RentChat</p>
                <p className="!text-[16px] font-bold">
                    Nhắn tin trong hệ thống thuê đồ
                </p>
            </div>

            <div className="flex flex-row items-center gap-2 font-semibold">
                <Contact />
                <p>Người liên hệ gần nhất</p>
            </div>
            <div>
                <div className="flex flex-row items-center gap-2 rounded-lg border border-gray-300 bg-white p-2">
                    <Search size={16} />
                    <input
                        placeholder="Tìm kiếm bạn bè"
                        className="bg-transparent outline-none"
                    />
                </div>
            </div>
            <div className="flex flex-col gap-2">
                {messageUserData.map((item) => (
                    <AvatarMessage item={item} key={item.chatId} />
                ))}
            </div>
        </div>
    )
}

export const AvatarMessage = ({ item }: any) => {
    const router = useRouter()
    return (
        <div
            className="flex cursor-pointer flex-row items-center gap-2 rounded transition-all hover:bg-gray-100"
            onClick={() => {
                router.push(`/chat/${item?.chatId}`)
            }}
        >
            <Avatar
                size={60}
                src={item?.avatar}
                className="object-cover"
            ></Avatar>
            <div>
                <p className="text-[16px] font-bold text-primary">
                    {item?.name}
                </p>
                <p className="font-semibold">{item?.title}</p>
                <p className="text-gray-500">{item?.time}</p>
            </div>
        </div>
    )
}
