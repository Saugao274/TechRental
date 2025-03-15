import { Avatar, message } from 'antd'
import { EllipsisVertical, PhoneCall, Send } from 'lucide-react'
import React from 'react'

export default function MessageModule() {
    return (
        <div className="flex h-full flex-col gap-5">
            <div className="h-fit">
                <MessageStatus />
            </div>
            <div className="h-full">
                <MessageBoxContent />
            </div>
        </div>
    )
}

export const MessageStatus = () => {
    return (
        <div className="flex flex-row items-center justify-between rounded-[10px] bg-white px-6 py-2 opacity-80">
            <div className="flex flex-row items-center gap-2">
                <Avatar src="/images/Message/image5.png" size={50}></Avatar>
                <div className="flex flex-col gap-1">
                    <p className="text-[16px] font-bold text-primary">
                        Phạm Hồng Nguyên
                    </p>
                    <p>Hoạt động 1 giờ trước</p>
                </div>
            </div>
            <div className="flex flex-row gap-5">
                <div>
                    <PhoneCall />
                </div>
                <div>
                    <EllipsisVertical />
                </div>
            </div>
        </div>
    )
}

export const MessageBoxContent = () => {
    const messageUserData = [
        {
            messageId: 1,
            message:
                'Chào anh, bên mình đang thuê máy ảnh Sony A7 III đúng không ạ?',
            time: '10:00',
            type: 'right',
        },
        {
            messageId: 2,
            message:
                'Chào chị Nguyên! Bên em có Sony A7 III cho thuê ạ. Chị cần thuê trong bao lâu ạ?',
            time: '10:02',
            type: 'left',
        },
        {
            messageId: 3,
            message: 'Mình thuê 2 ngày, có kèm lens 24-70mm F2.8 không anh?',
            time: '10:04',
            type: 'right',
        },
        {
            messageId: 4,
            message:
                'Dạ có chị nhé. Giá thuê trọn bộ máy và lens là 600k/ngày, tổng 2 ngày là 1,2 triệu ạ',
            time: '10:05',
            type: 'left',
        },
        {
            messageId: 5,
            message: 'Ok. Thủ tục thế nào anh?',
            time: '10:05',
            type: 'right',
        },
        {
            messageId: 6,
            message:
                'Bên em không cần cọc, không giữ giấy tờ. Chị qua điểm hẹn kiểm tra máy ạ',
            time: '10:06',
            type: 'left',
        },
    ]

    return (
        <div className="flex h-full w-full flex-col rounded-lg bg-white bg-opacity-80 p-5">
            <div className="flex h-full flex-col gap-6">
                {/* message */}
                {messageUserData.map((item) => {
                    return (
                        <>
                            {item.type === 'right' && (
                                <div
                                    key={item.messageId}
                                    className="flex flex-row gap-5"
                                >
                                    <Avatar
                                        src="/images/Message/image5.png"
                                        size={50}
                                    ></Avatar>
                                    <div className="relative flex max-w-[340px] flex-row items-center gap-2">
                                        <p className="rounded-lg bg-white px-3 py-2 font-semibold text-primary">
                                            {' '}
                                            {item?.message}
                                        </p>
                                        <EllipsisVertical size={26} />
                                        <p className="absolute bottom-[-20px] text-xs text-gray-500">
                                            {item?.time}
                                        </p>
                                    </div>
                                </div>
                            )}
                            {item.type === 'left' && (
                                <div
                                    key={item.messageId}
                                    className="flex w-full flex-row items-end justify-end gap-5"
                                >
                                    <div className="relative flex max-w-[340px] flex-row-reverse items-center gap-2">
                                        <p className="rounded-lg bg-primary px-3 py-2 font-semibold text-white">
                                            {' '}
                                            {item?.message}
                                        </p>
                                        <EllipsisVertical size={26} />
                                        <p className="absolute bottom-[-20px] text-xs text-gray-500">
                                            {item.time}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </>
                    )
                })}
            </div>
            <div>
                <div className="flex flex-row justify-between gap-5 rounded-xl bg-white px-5 py-2">
                    <input
                        type="text"
                        className="w-full outline-none"
                        placeholder="Viết tin nhắn"
                    />
                    <div className="cursor-pointer rounded-md p-2 transition-all hover:bg-gray-200">
                        <Send />
                    </div>
                </div>
            </div>
        </div>
    )
}
