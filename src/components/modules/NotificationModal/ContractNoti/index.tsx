import { useState } from 'react'
import { List, Avatar, Skeleton, Button, Divider } from 'antd'
import { CheckOutlined } from '@ant-design/icons'
import Link from 'next/link'
import { notiData } from '@/data/notiData'

const ContractNoti = ({ onClose }: any) => {
    const [loading, setLoading] = useState(false)
    const [contractNoti, setContractNoti] = useState(
        notiData.filter((noti) => noti.type === 'contract'),
    )

    return loading ? (
        <Loading />
    ) : (
        <div>
            <List
                itemLayout="horizontal"
                dataSource={contractNoti}
                renderItem={(item: any, index) => (
                    <List.Item
                        key={item?._id}
                        className={`mb-2 rounded !p-3 shadow-sm transition-all hover:!bg-blue-200 ${item?.isRead ? 'bg-transparent' : 'bg-gray-200 font-bold'}`}
                    >
                        <List.Item.Meta
                            avatar={
                                <Link onClick={onClose} href={`/`}>
                                    <Avatar src={item?.image[0]} />
                                </Link>
                            }
                            title={
                                <span className="text-base">{item?.title}</span>
                            }
                            description={
                                <div className="flex flex-col gap-2">
                                    <span className="text-[14px]">
                                        {item?.description}
                                    </span>
                                    <span className="text-[10px]">
                                        {item?.time}
                                    </span>
                                    {/* {!item?.isAccepted && (
                                        <div className="mt-4 flex justify-end gap-2 pt-2">
                                            <Button className="border-gray-500 bg-gray-300 text-black">
                                                Hủy
                                            </Button>
                                            <Button
                                                loading={loadingButtons[index]}
                                                className="bg-blue-500 text-white"
                                                onClick={() =>
                                                    setLoadingButton(index)
                                                }
                                            >
                                                Xác nhận
                                            </Button>
                                        </div>
                                    )} */}
                                </div>
                            }
                        />
                    </List.Item>
                )}
            />
        </div>
    )
}

const Loading = () => <Skeleton active round avatar title />

export default ContractNoti
