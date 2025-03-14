'use client'
import { Button, Modal } from 'antd'
import React, { useState } from 'react'

const ChatModal = ({ openResponsive, setOpenResponsive }: any) => {
    return (
        <div>
            <Modal
                title="Modal responsive width"
                centered
                open={openResponsive}
                onOk={() => setOpenResponsive(false)}
                onCancel={() => setOpenResponsive(false)}
                width={{
                    xs: '90%',
                    sm: '80%',
                    md: '70%',
                    lg: '60%',
                    xl: '50%',
                    xxl: '40%',
                }}
                focusTriggerAfterClose
            >
                <p>some contents...</p>
                <p>some contents...</p>
                <p>some contents...</p>
            </Modal>
        </div>
    )
}

export default ChatModal
