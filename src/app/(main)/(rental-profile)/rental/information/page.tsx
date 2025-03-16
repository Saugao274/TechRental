'use client'
import React, { useState } from 'react'
import {
    Form,
    Input,
    Select,
    Modal,
    Button,
    message,
    Upload,
    Avatar,
    Space,
    Typography,
} from 'antd'
import { UploadOutlined, EditOutlined } from '@ant-design/icons'
import type { UploadFile, UploadProps } from 'antd'

export default function ShopProfilePage() {
    const [shop, setShop] = useState({
        name: 'TechRental',
        avatar: 'https://via.placeholder.com/100',
        scale: '5-20',
        operatingArea: 'Hà Nội',
        businessType: 'personal',
        businessAddress: 'Bình Thuận / Huyện Phú Quí / Xã Tam Thanh',
        invoiceEmail: 'techrental@example.com',
        taxCode: '0123456789',
        isVerified: true,
    })

    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [form] = Form.useForm()
    const [avatarFile, setAvatarFile] = useState<UploadFile | null>(null)

    const onFinish = (values: any) => {
        setShop((prev) => ({
            ...prev,
            ...values,
            avatar: avatarFile
                ? URL.createObjectURL(avatarFile.originFileObj as Blob)
                : prev.avatar,
        }))
        message.success('Thông tin shop đã được cập nhật thành công!')
        setIsEditModalOpen(false)
        form.resetFields()
        setAvatarFile(null)
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Form error:', errorInfo)
    }

    // Upload props for avatar
    const uploadProps: UploadProps = {
        beforeUpload: (file) => {
            const isImage = file.type.startsWith('image/')
            if (!isImage) {
                message.error('Bạn chỉ có thể tải lên file hình ảnh!')
            } else {
                setAvatarFile(file)
            }
            return false // Prevent automatic upload
        },
        onRemove: () => {
            setAvatarFile(null)
        },
        fileList: avatarFile ? [avatarFile] : [],
    }

    return (
        <div className="mx-auto w-full max-w-3xl p-4 md:p-6">
            <div className="mb-4">
                <h1 className="text-2xl font-bold text-primary">
                    Trang cá nhân của Shop
                </h1>
                <p className="text-primary">
                    Quản lý thông tin và hồ sơ của shop cho thuê của bạn.
                </p>
            </div>

            {/* Thông báo đã xác minh */}
            {shop.isVerified && (
                <div className="mb-4 flex items-center rounded-md border border-green-400 bg-green-50 p-4">
                    <ShieldCheck className="mr-2 hidden text-xl text-green-500 md:block" />
                    <div>
                        <h3 className="font-bold text-green-800">
                            Đã xác minh
                        </h3>
                        <p className="text-sm text-green-700">
                            Shop của bạn đã được xác minh danh tính. Hãy cập
                            nhật thông tin để quản lý tốt hơn!
                        </p>
                    </div>
                </div>
            )}

            <div className="rounded-md bg-white p-6 shadow-md">
                <div className="mb-6 flex items-center justify-between">
                    <Space>
                        <Avatar src={shop.avatar} size={100} />
                        <div>
                            <Typography.Title level={3} style={{ margin: 0 }}>
                                {shop.name}
                            </Typography.Title>
                            <Typography.Text type="secondary">
                                Shop cho thuê thiết bị công nghệ
                            </Typography.Text>
                        </div>
                    </Space>
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => setIsEditModalOpen(true)}
                    >
                        Chỉnh sửa thông tin
                    </Button>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                        <Typography.Text strong>
                            Quy mô sản phẩm:
                        </Typography.Text>
                        <p>
                            {shop.scale === '1-5'
                                ? '1 - 5 sản phẩm'
                                : shop.scale === '5-20'
                                  ? '5 - 20 sản phẩm'
                                  : 'Trên 20 sản phẩm'}
                        </p>
                    </div>
                    <div>
                        <Typography.Text strong>
                            Khu vực hoạt động:
                        </Typography.Text>
                        <p>{shop.operatingArea}</p>
                    </div>
                    <div>
                        <Typography.Text strong>
                            Loại hình kinh doanh:
                        </Typography.Text>
                        <p>
                            {shop.businessType === 'personal'
                                ? 'Cá nhân'
                                : shop.businessType === 'household'
                                  ? 'Hộ kinh doanh'
                                  : 'Công ty'}
                        </p>
                    </div>
                    <div>
                        <Typography.Text strong>
                            Địa chỉ kinh doanh:
                        </Typography.Text>
                        <p>{shop.businessAddress}</p>
                    </div>
                    <div>
                        <Typography.Text strong>
                            Email nhận hóa đơn:
                        </Typography.Text>
                        <p>{shop.invoiceEmail}</p>
                    </div>
                    <div>
                        <Typography.Text strong>Mã số thuế:</Typography.Text>
                        <p>{shop.taxCode || 'Chưa cập nhật'}</p>
                    </div>
                </div>
            </div>

            {/* Modal chỉnh sửa thông tin */}
            <Modal
                title="Chỉnh sửa thông tin shop"
                open={isEditModalOpen}
                onCancel={() => {
                    setIsEditModalOpen(false)
                    form.resetFields()
                    setAvatarFile(null)
                }}
                footer={[
                    <Button
                        key="cancel"
                        onClick={() => {
                            setIsEditModalOpen(false)
                            form.resetFields()
                            setAvatarFile(null)
                        }}
                    >
                        Hủy
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        onClick={() => form.submit()}
                    >
                        Lưu thay đổi
                    </Button>,
                ]}
            >
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={shop}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item label="Avatar shop" name="avatar">
                        <Upload {...uploadProps}>
                            <Button icon={<UploadOutlined />}>
                                Tải lên ảnh avatar
                            </Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item
                        label="Tên shop"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tên shop!',
                            },
                        ]}
                    >
                        <Input placeholder="Nhập tên shop" className="h-12" />
                    </Form.Item>

                    <Form.Item
                        label="Quy mô sản phẩm"
                        name="scale"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn quy mô sản phẩm!',
                            },
                        ]}
                    >
                        <Select
                            placeholder="Chọn số lượng sản phẩm"
                            className="h-12"
                        >
                            <Select.Option value="1-5">
                                1 - 5 sản phẩm
                            </Select.Option>
                            <Select.Option value="5-20">
                                5 - 20 sản phẩm
                            </Select.Option>
                            <Select.Option value="20+">
                                Trên 20 sản phẩm
                            </Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Khu vực hoạt động"
                        name="operatingArea"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập khu vực hoạt động!',
                            },
                        ]}
                    >
                        <Input
                            placeholder="VD: Hà Nội, TP.HCM..."
                            className="h-12"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Loại hình kinh doanh"
                        name="businessType"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn loại hình kinh doanh!',
                            },
                        ]}
                    >
                        <Select
                            placeholder="Chọn loại hình kinh doanh"
                            className="h-12"
                        >
                            <Select.Option value="personal">
                                Cá nhân
                            </Select.Option>
                            <Select.Option value="household">
                                Hộ kinh doanh
                            </Select.Option>
                            <Select.Option value="company">
                                Công ty
                            </Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Địa chỉ kinh doanh"
                        name="businessAddress"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập địa chỉ kinh doanh!',
                            },
                        ]}
                    >
                        <Input
                            placeholder="VD: Bình Thuận / Huyện Phú Quí / Xã Tam Thanh..."
                            className="h-12"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Email nhận hóa đơn"
                        name="invoiceEmail"
                        rules={[
                            { required: true, message: 'Vui lòng nhập email!' },
                            { type: 'email', message: 'Email không hợp lệ!' },
                        ]}
                    >
                        <Input
                            placeholder="Nhập địa chỉ email"
                            className="h-12"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Mã số thuế"
                        name="taxCode"
                        rules={[
                            {
                                pattern: /^[0-9]{10,14}$/,
                                message: 'MST phải là dãy số, 10-14 ký tự',
                            },
                        ]}
                    >
                        <Input
                            maxLength={14}
                            placeholder="VD: 0123456789 (không bắt buộc)"
                            className="h-12"
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

// Giả lập component ShieldCheck (vì không có trong Ant Design)
const ShieldCheck = ({ className }: { className?: string }) => (
    <svg
        className={className}
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M12 2L2 7v10l10 5 10-5V7l-10-5zm0 2.7l7 3.5v6.6l-7 3.5-7-3.5V8.2l7-3.5zm-1 1.5l-5 2.5v6l5-2.5v-3.5l-3-1.5 3-1.5v3.5zm2 0v3.5l3 1.5-3 1.5v-3.5l-5 2.5v6l5-2.5V8.2l-2-1z" />
    </svg>
)
