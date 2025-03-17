import React, { useState } from 'react'
import { Badge, Modal, Tabs } from 'antd'
import AllNotification from './AllNotification'
import TransactionNotification from './TransactionNotification'
import ContractNoti from './ContractNoti'

const { TabPane } = Tabs

interface NotificationModalProps {
    visible: boolean
    onClose: () => void
}

const NotificationModal: React.FC<NotificationModalProps> = ({
    visible,
    onClose,
}) => {
    const [activeTab, setActiveTab] = useState('1')

    return (
        <Modal
            open={visible}
            title={
                <div className="text-xl font-bold text-[#1D3D85]">
                    📢 Thông báo
                </div>
            }
            onCancel={onClose}
            destroyOnClose={true}
            footer={null}
            centered
            className="rounded-lg !p-0 text-[#1D3D85] shadow-lg"
        >
            <Tabs
                activeKey={activeTab}
                onChange={(key) => setActiveTab(key)}
                centered
                tabBarStyle={{
                    fontWeight: 'bold',
                    fontSize: '20px',
                    color: '#352F44',
                }}
                className="xborder-b text-lg font-bold text-gray-800"
            >
                <TabPane
                    tab={
                        <Badge count={4} offset={[10, 0]}>
                            Tổng quan
                        </Badge>
                    }
                    key="1"
                    destroyInactiveTabPane={true}
                >
                    <div className="overflow-y-auto">
                        <AllNotification onClose={onClose} />
                    </div>
                </TabPane>
                <TabPane
                    tab={
                        <Badge count={2} offset={[10, 0]}>
                            Giao dịch
                        </Badge>
                    }
                    key="2"
                    destroyInactiveTabPane={true}
                >
                    <div className="h-96 overflow-y-auto">
                        <TransactionNotification onClose={onClose} />
                    </div>
                </TabPane>
                <TabPane
                    tab={
                        <Badge count={2} offset={[10, 0]}>
                            Hợp đồng thanh toán
                        </Badge>
                    }
                    key="3"
                    destroyInactiveTabPane={true}
                >
                    <div className="h-96 overflow-y-auto">
                        <ContractNoti onClose={onClose} />
                    </div>
                </TabPane>
            </Tabs>
        </Modal>
    )
}

export default NotificationModal
