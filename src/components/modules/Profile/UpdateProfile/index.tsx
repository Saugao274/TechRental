'use client'
import {
    Avatar,
    Button,
    Card,
    Col,
    DatePicker,
    Form,
    FormProps,
    Input,
    message,
    Radio,
    Row,
    Select,
    Typography,
    Upload,
} from 'antd'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { UploadOutlined } from '@ant-design/icons'
import {
    FacebookOutlined,
    TwitterOutlined,
    LinkedinOutlined,
} from '@ant-design/icons'
import { useAuth } from '@/context/AuthContext'
import type { User } from '@/data/authData'
import {
    Phone,
    RefreshCw,
    ThumbsUp,
    Trophy,
    User as UserIcon,
    Users,
} from 'lucide-react'
import CountUp from 'react-countup'
import { getRequest, patchRequest } from '@/request'
import { userEndpoint } from '@/settings/endpoints'
import dayjs from 'dayjs'

const { Text } = Typography

interface ProfileFormValues {
    fullName: string
    gender: string
    dateOfBirth: string
    phoneNumber: string
    email: string
    currentAddress: string
    ward: string
    district: string
    province: string
}

const UpdateProfile = () => {
    const [form] = Form.useForm()
    const [avatar, setAvatar] = useState('/images/Intro/avt1.png')
    const { user, updateUser } = useAuth()
    console.log(user)
    const [userData, setUserData] = useState<any>(null)
    // console.log(userData)
    useEffect(() => {
        form.setFieldsValue(user)
    }, [form])

    const handleGetMe = async () => {
        const response: User = await getRequest(userEndpoint.GET_MY_USER)
        setUserData(response)
    }

    useEffect(() => {
        handleGetMe()
    }, [])

    useEffect(() => {
        handleGetMe()
    }, [])

    const handleSubmit = async (values: any) => {
        if (!user) return
        const response: any = await patchRequest(
            '/api/users/me',
            {
                data: {
                    avatar: values,
                },
            },
            false,
        )
        updateUser(response.user)
    }

    const handleAvatarChange = (info: any) => {
        if (info.file.status === 'done') {
            const newAvatarUrl = URL.createObjectURL(info.file.originFileObj)
            setAvatar(newAvatarUrl)
            message.success('Đổi ảnh đại diện thành công!')
        }
    }
    const [loading, setLoading] = useState(false)
    const onFinish: FormProps<ProfileFormValues>['onFinish'] = async (
        values,
    ) => {
        if (!user) return

        try {
            setLoading(true)
            const payload = {
                name: values.fullName,
                phone: values.phoneNumber,
                email: values.email,
                identityVerification: {
                    address: `${values.currentAddress}, ${values.ward}, ${values.district}, ${values.province}`,
                },
                gender: values.gender,
                dateOfBirth: values.dateOfBirth,
            }

            const response: any = await patchRequest(
                '/api/users/me',
                { data: payload },
                false,
            )

            if (!response || !response.user) {
                throw new Error('Dữ liệu phản hồi không hợp lệ từ máy chủ.')
            }

            updateUser(response.user)
            message.success('Cập nhật thông tin thành công!')
        } catch (error) {
            message.error('Cập nhật thất bại. Vui lòng thử lại sau.')
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const provinces = [
        { value: 'Đà Nẵng', label: 'Đà Nẵng' },
        { value: 'Hà Nội', label: 'Hà Nội' },
        { value: 'TP. Hồ Chí Minh', label: 'TP. Hồ Chí Minh' },
        { value: 'Hải Phòng', label: 'Hải Phòng' },
    ]

    const [isChangePassword, setIsChangePassword] = useState(false)

    return (
        <div className="flex justify-center">
            <Card
                className="w-full max-w-2xl shadow-lg"
                style={{ borderRadius: '16px' }}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    initialValues={{
                        gender: user?.gender,
                        province: 'Đà Nẵng',
                        fullName: user?.name,
                        email: user?.email,
                        phoneNumber: user?.phone,
                        dateOfBirth: user?.dateOfBirth
                            ? dayjs(user.dateOfBirth)
                            : null,
                    }}
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <div className="mb-6 flex flex-col items-center gap-4">
                                <Avatar
                                    src={user?.avatar ? user.avatar : avatar}
                                    size={185}
                                    icon={<UserIcon />}
                                    className="mb-3 bg-gray-300"
                                />
                                <Upload
                                    name="avatar"
                                    listType="picture"
                                    showUploadList={false}
                                    beforeUpload={(file) => {
                                        const isJpgOrPng =
                                            file.type === 'image/jpeg' ||
                                            file.type === 'image/png'
                                        if (!isJpgOrPng) {
                                            message.error(
                                                'Chỉ có thể tải lên file JPG/PNG!',
                                            )
                                            return false
                                        }
                                        const isLt2M =
                                            file.size / 1024 / 1024 < 2
                                        if (!isLt2M) {
                                            message.error(
                                                'Ảnh phải nhỏ hơn 2MB!',
                                            )
                                            return false
                                        }

                                        const reader = new FileReader()
                                        reader.readAsDataURL(file)
                                        reader.onload = () => {
                                            const base64 =
                                                reader.result as string
                                            setAvatar(base64)
                                            handleSubmit(base64)
                                            message.success(
                                                'Đổi ảnh đại diện thành công!',
                                            )
                                        }
                                        reader.onerror = () => {
                                            message.error(
                                                'Có lỗi xảy ra khi xử lý ảnh!',
                                            )
                                        }

                                        return false
                                    }}
                                >
                                    <Button
                                        type="primary"
                                        size="middle"
                                        style={{
                                            backgroundColor: '#1e3a8a',
                                            borderColor: '#1e3a8a',
                                            borderRadius: '6px',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        Thay đổi
                                    </Button>
                                </Upload>
                            </div>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label={<Text strong>Họ và tên</Text>}
                                name="fullName"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập họ và tên!',
                                    },
                                ]}
                            >
                                <Input
                                    placeholder="Nguyễn ABC"
                                    size="large"
                                    style={{ borderRadius: '6px' }}
                                />
                            </Form.Item>

                            {/* Gender */}
                            <Form.Item
                                label={<Text strong>Giới tính</Text>}
                                name="gender"
                            >
                                <Radio.Group>
                                    <Radio value="male">Nam</Radio>
                                    <Radio value="female">Nữ</Radio>
                                    <Radio value="other">Khác</Radio>
                                </Radio.Group>
                            </Form.Item>

                            {/* Date of Birth */}
                            {/* <Form.Item
                                label={<Text strong>Ngày sinh</Text>}
                                name="dateOfBirth"
                            >
                                <DatePicker
                                    placeholder="dd/mm/yyyy"
                                    format="DD/MM/YYYY"
                                    size="large"
                                    className="w-full"
                                    style={{ borderRadius: '6px' }}
                                />
                            </Form.Item> */}
                        </Col>
                    </Row>

                    {/* Phone Number */}
                    <div className="">
                        <Row gutter={16} className="flex items-center">
                            <Col span={12}>
                                <Text className="font-medium">
                                    Số điện thoại
                                </Text>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="phoneNumber" className="!mb-0">
                                    {!isChangePassword && (
                                        <div className="flex items-center rounded-md p-3">
                                            <div className="flex items-center gap-2">
                                                <Phone
                                                    size={16}
                                                    className="text-gray-500"
                                                />
                                                <Text>+84 {user?.phone}</Text>
                                            </div>
                                            <p className="ml-2">|</p>
                                            <Button
                                                type="link"
                                                size="middle"
                                                className="p-0 text-blue-600"
                                                onClick={() =>
                                                    setIsChangePassword(true)
                                                }
                                            >
                                                Thay đổi
                                            </Button>
                                        </div>
                                    )}
                                    {isChangePassword && (
                                        <div className="flex flex-row items-center gap-2">
                                            <Input
                                                placeholder="Nhập số điện thoại"
                                                size="large"
                                                style={{ borderRadius: '6px' }}
                                            />
                                            <Button type="default" className="" onClick={() => setIsChangePassword(false)}>
                                                Hủy bỏ
                                            </Button>
                                        </div>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                    </div>

                    <div className="mt-6">
                        <Row gutter={16} className="flex items-center">
                            <Col span={12}>
                                <Text className="font-medium">Email</Text>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    className="!mb-0"
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập email!',
                                        },
                                        {
                                            type: 'email',
                                            message: 'Email không hợp lệ!',
                                        },
                                    ]}
                                >
                                    <div className="flex flex-row items-center gap-2">
                                        <Input
                                            disabled
                                            placeholder="nguyenabc@gmail.com"
                                            size="large"
                                            style={{ borderRadius: '6px' }}
                                        />
                                    </div>
                                </Form.Item>
                            </Col>
                        </Row>
                    </div>

                    {/* Current Address */}
                    <Form.Item
                        label={<Text strong>Địa chỉ hiện tại</Text>}
                        name="currentAddress"
                        className="!mt-6"
                    >
                        <Input
                            placeholder="123 Đường ABC"
                            size="large"
                            style={{ borderRadius: '6px' }}
                        />
                    </Form.Item>

                    {/* Ward and District */}
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label={<Text strong>Phường/ Xã</Text>}
                                name="ward"
                            >
                                <Input
                                    placeholder="Phường Hải Châu"
                                    size="large"
                                    style={{ borderRadius: '6px' }}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label={<Text strong>Quận/ Huyện</Text>}
                                name="district"
                            >
                                <Input
                                    placeholder="Quận Hải Châu"
                                    size="large"
                                    style={{ borderRadius: '6px' }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    {/* Province/City */}
                    <Form.Item
                        label={<Text strong>Tỉnh/ Thành Phố</Text>}
                        name="province"
                    >
                        <Select
                            placeholder="Chọn tỉnh/thành phố"
                            size="large"
                            style={{ borderRadius: '6px' }}
                            options={provinces}
                        />
                    </Form.Item>

                    {/* Save Button */}
                    <Form.Item className="mb-0 mt-6">
                        <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
                            block
                            style={{
                                backgroundColor: '#1e3a8a',
                                borderColor: '#1e3a8a',
                                borderRadius: '6px',
                                fontWeight: 'bold',
                                height: '48px',
                            }}
                        >
                            LƯU THAY ĐỔI
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default UpdateProfile
