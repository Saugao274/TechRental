import { useState } from 'react'
import { List, Avatar, Skeleton, Button, Divider } from 'antd'
import { CheckOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { notiData } from '@/data/notiData'

const AllNotification = ({ onClose }: any) => {
    const [loading, setLoading] = useState(false)

    const [allNoti, setAllNoti] = useState(notiData)

    const notificationLink: { [key: string]: (noti: any) => JSX.Element } = {
        transaction: (noti: any) => <TransactionItem src={noti} />,
        contract: (noti: any) => <ContractItem src={noti} />,
    }

    const TransactionItem = ({ src }: any) => (
        <Link
            href={`/?txId=${src?.payload?.transactionId}`}
            onClick={handleClick}
        >
            <List.Item
                key={src?._id}
                className={`mb-2 rounded !p-3 shadow-sm transition-all hover:!bg-blue-200 ${src?.isRead ? 'bg-transparent' : 'bg-gray-200 font-bold'}`}
            >
                <List.Item.Meta
                    avatar={<Avatar src={src?.image[0]} />}
                    title={<span className="text-base">{src?.title}</span>}
                    description={
                        <div className="flex flex-col gap-2">
                            <span className="text-[14px]">
                                {src?.description}
                            </span>
                            <span className="text-[10px]">{src?.time}</span>
                        </div>
                    }
                />
            </List.Item>
        </Link>
    )

    const ContractItem = ({ src }: any) => (
        <Link
            href={`/?contractId=${src?.payload?.contractId}`}
            onClick={handleClick}
        >
            <List.Item
                key={src?._id}
                className={`mb-2 rounded !p-3 shadow-sm transition-all hover:!bg-blue-200 ${src?.isRead ? 'bg-transparent' : 'bg-gray-200 font-bold'}`}
            >
                <List.Item.Meta
                    avatar={<Avatar src={src?.image[0]} />}
                    title={<span className="text-base">{src?.title}</span>}
                    description={
                        <div className="flex flex-col gap-2">
                            <span className="text-[14px]">
                                {src?.description}
                            </span>
                            <span className="text-[10px]">{src?.time}</span>
                        </div>
                    }
                />
            </List.Item>
        </Link>
    )

    const generateLink = (noti: any) => {
        const type = noti?.type
        return notificationLink[type](noti)
    }

    function handleClick() {
        onClose()
    }

    return loading ? (
        <Loading />
    ) : (
        <div className="">
            <div className="flex justify-end">
                <Button
                    type="primary"
                    icon={<CheckOutlined />}
                    onClick={() =>
                        setAllNoti((prevNoti) =>
                            prevNoti.map((noti) => ({ ...noti, isRead: true })),
                        )
                    }
                >
                    Đánh dấu tất cả đã đọc
                </Button>
            </div>
            <Divider>
                <span className="text-[#717276]">Giao dịch</span>
            </Divider>
            <List
                itemLayout="horizontal"
                dataSource={allNoti}
                renderItem={(item: any) =>
                    item.type === 'transaction' && generateLink(item)
                }
            />
            <Divider>
                <span className="text-[#717276]">Hợp đồng và thanh toán</span>
            </Divider>
            <List
                itemLayout="horizontal"
                dataSource={allNoti}
                renderItem={(item: any) =>
                    item.type === 'contract' && generateLink(item)
                }
            />
        </div>
    )
}

const Loading = () => <Skeleton active round avatar title />

export default AllNotification
