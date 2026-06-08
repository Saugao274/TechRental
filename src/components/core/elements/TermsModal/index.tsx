import React, { useState } from 'react'
import { Modal, Button, Tabs } from 'antd'

type TermsModalProps = {
    open: boolean
    onClose: () => void
}

const TermsModal: React.FC<TermsModalProps> = ({ open, onClose }) => {
    const [activeTab, setActiveTab] = useState('rental')

    return (
        <Modal
            open={open}
            title="Điều khoản"
            onCancel={onClose}
            footer={[
                <Button key="close" onClick={onClose}>
                    Đóng
                </Button>,
            ]}
            centered
        >
            <div className="mt-8 flex justify-center">
                <Tabs
                    activeKey={activeTab}
                    onChange={setActiveTab}
                    items={[
                        {
                            key: 'rental',
                            label: 'Chính sách bảo hiểm thiết bị',
                            children: (
                                <img
                                    src="/images/rental-policy.png"
                                    alt="Chính sách bảo hiểm thiết bị"
                                    className="w-full"
                                />
                            ),
                        },
                        {
                            key: 'insurance',
                            label: 'Chính sách đền bù thiệt hại',
                            children: (
                                <img
                                    src="/images/insurance-policy.png"
                                    alt="Chính sách đền bù thiệt hại"
                                    className="w-full"
                                />
                            ),
                        },
                    ]}
                    className="w-full max-w-screen-xl"
                />
            </div>
        </Modal>
    )
}

export default TermsModal