import React from 'react'
import { Modal, Button } from 'antd'

type PrivacyModalProps = {
    open: boolean
    onClose: () => void
}

const PrivacyModal: React.FC<PrivacyModalProps> = ({ open, onClose }) => {
    return (
        <Modal
            open={open}
            title="Bảo mật"
            onCancel={onClose}
            footer={[
                <Button key="close" onClick={onClose}>
                    Đóng
                </Button>,
            ]}
            centered
        >
            <p>Nội dung Bảo mật: Đây là chính sách bảo mật của chúng tôi...</p>
        </Modal>
    )
}

export default PrivacyModal