'use client'
import React, { useState } from 'react'
import {
    Form,
    Input,
    Radio,
    Select,
    Checkbox,
    Modal,
    Button,
    message,
} from 'antd'
import { ShieldCheck } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { postRequest } from '@/request'
import constants from '@/settings/constants'
import webStorageClient from '@/utils/webStorageClient'
import { useRouter, useParams } from 'next/navigation'
import { getRequest } from '@/request'

export default function PersonalRentalRegistryPage() {
    const { user, registeredLessor } = useAuth()
    const [showTermsModal, setShowTermsModal] = useState(false)
    const router = useRouter()

    const onFinish = async (values: any) => {
        const res = await postRequest('/api/users/become-owner', {
            data: values,
        })
        const shopRes = await getRequest('/api/shopDetail/me')
        const shopId = shopRes?.metadata?._id

        if (!shopId) {
            return message.error('Không tìm thấy shopId sau khi đăng ký')
        }

        if (!user) return

        if (!user.isVerified) {
            return message.warning('Bạn cần xác minh tài khoản trước!')
        }

        const token = webStorageClient.getToken()
        if (!token) {
            return message.error(
                'Không tìm thấy token đăng nhập. Vui lòng đăng nhập lại.',
            )
        }

        try {
            message.loading({ content: 'Đang gửi đăng ký...', key: 'reg' })

            await postRequest('/api/users/become-owner', { data: values })

            registeredLessor()

            message.success({
                content: 'Đăng ký thành công! Đang chuyển hướng...',
                key: 'reg',
            })
            router.push(`/rental/${shopId}`)
        } catch (err: any) {
            const msg =
                err?.response?.data?.message ||
                err?.message ||
                'Đăng ký thất bại. Vui lòng thử lại'
            message.error({ content: msg, key: 'reg' })
        }
    }

    const onFinishFailed = (err: any) => console.log('Form error:', err)

    return (
        <div className="mx-auto w-full max-w-3xl p-4 md:p-6">
            <div className="mb-4">
                <h1 className="text-2xl font-bold text-primary">
                    Xin chào, {user?.name}
                </h1>
                <p className="text-primary">
                    Chào mừng bạn đến với trang cá nhân của mình
                </p>
            </div>

            {/* Thông báo đã xác minh */}
            {user?.isVerified && (
                <div className="mb-4 flex items-center rounded-md border border-green-400 bg-green-50 p-4">
                    <ShieldCheck className="mr-2 hidden text-xl text-green-500 md:block" />
                    <div>
                        <h3 className="font-bold text-green-800">
                            Đã xác minh
                        </h3>
                        <p className="text-sm text-green-700">
                            Tài khoản của bạn đã được xác minh danh tính. Hãy
                            hoàn tất thông tin để đăng ký làm người cho thuê!
                        </p>
                    </div>
                </div>
            )}

            <div className="rounded-md bg-white p-6 shadow-md">
                <h2 className="mb-2 text-xl font-bold">
                    Đăng ký làm người cho thuê
                </h2>
                <p className="mb-4 text-sm text-gray-600">
                    Vui lòng điền các thông tin dưới đây để gửi yêu cầu đến quản
                    trị viên.
                </p>

                <Form
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Quy mô sản phẩm"
                        name="scale"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn quy mô sản phẩm!',
                            },
                        ]}
                        className="max-w-xs"
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
                        label="Địa điểm kinh doanh"
                        name="location"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn địa điểm!',
                            },
                        ]}
                        className="max-w-xs"
                    >
                        <Select placeholder="Chọn địa điểm">
                            <Select.Option value="Hồ Chí Minh">
                                Hồ Chí Minh
                            </Select.Option>
                            <Select.Option value="Đà Nẵng">
                                Đà Nẵng
                            </Select.Option>
                            <Select.Option value="Hà Nội">Hà Nội</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Tên shop"
                        name="shopName"
                        className="max-w-xs"
                    >
                        <Input
                            placeholder="Nhập tên shop (nếu có)"
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
                        initialValue="personal"
                        className="max-w-xs"
                    >
                        <Radio.Group>
                            <Radio value="personal">Cá nhân</Radio>
                            <Radio value="household">Hộ kinh doanh</Radio>
                            <Radio value="company">Công ty</Radio>
                        </Radio.Group>
                    </Form.Item>

                    {/* Địa chỉ đăng ký kinh doanh */}
                    <Form.Item
                        label="Địa chỉ đăng ký kinh doanh"
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
                        label="Email nhận hóa đơn điện tử"
                        name="invoiceEmail"
                        rules={[
                            { required: true, message: 'Vui lòng nhập email!' },
                            { type: 'email', message: 'Email không hợp lệ!' },
                        ]}
                        className="max-w-xs"
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
                        className="max-w-xs"
                    >
                        <Input
                            maxLength={14}
                            placeholder="VD: 0123456789 (không bắt buộc)"
                            className="h-12"
                        />
                    </Form.Item>

                    <Form.Item
                        name="acceptTerms"
                        valuePropName="checked"
                        rules={[
                            {
                                validator: (_, value) =>
                                    value
                                        ? Promise.resolve()
                                        : Promise.reject(
                                              new Error(
                                                  'Bạn cần đồng ý điều khoản!',
                                              ),
                                          ),
                            },
                        ]}
                    >
                        <Checkbox>
                            Tôi đồng ý với{' '}
                            <span
                                className="cursor-pointer text-blue-600 hover:underline"
                                onClick={() => setShowTermsModal(true)}
                            >
                                Điều khoản dịch vụ
                            </span>
                        </Checkbox>
                    </Form.Item>

                    {/* Nút submit */}
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Hoàn tất
                        </Button>
                    </Form.Item>
                </Form>
            </div>

            <Modal
                title="Điều khoản dịch vụ"
                open={showTermsModal}
                onCancel={() => setShowTermsModal(false)}
                footer={[
                    <Button
                        key="close"
                        onClick={() => setShowTermsModal(false)}
                    >
                        Đóng
                    </Button>,
                ]}
            >
                <div className="max-h-96 overflow-y-auto text-sm text-gray-700">
                    <p>
                        {/* Điền thêm vào nhé  */}
                        1. Người cho thuê phải tuân thủ quy định pháp luật hiện
                        hành. <br />
                        2. Cung cấp thông tin trung thực, chính xác về sản phẩm.{' '}
                        <br />
                        3. Bảo đảm tính minh bạch về giá và chất lượng sản phẩm
                        cho thuê. <br />
                        4. ...
                    </p>
                </div>
            </Modal>
        </div>
    )
}
