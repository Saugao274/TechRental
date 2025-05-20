'use client'
import React, { useEffect, useRef } from 'react'

import { useState } from 'react'
import {
    Form,
    Input,
    Select,
    Upload,
    Button,
    message,
    Switch,
    InputNumber,
    Typography,
    Divider,
    Card,
    Collapse,
    Progress,
    Col,
    Row,
} from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import { UploadFile } from 'antd/es/upload/interface'
import {
    ChevronDown,
    ChevronUp,
    Lightbulb,
    RotateCw,
    TriangleAlert,
    UploadCloud,
    X,
} from 'lucide-react'
import TextArea from 'antd/es/input/TextArea'

const { Panel } = Collapse
const { Title, Text } = Typography

const { Dragger } = Upload

const MAX_TITLE_LENGTH = 255

type PriceField = {
    label: string
    name: string
}
const priceFields: PriceField[] = [
    { label: 'Giá bán theo ngày', name: 'daily' },
    { label: 'Giá bán theo tuần', name: 'weekly' },
    { label: 'Giá bán theo tháng', name: 'monthly' },
]

export default function ProductCreateForm() {
    const [form] = Form.useForm()

    const validateVideo = (file: File) => {
        const isMp4 = file.type === 'video/mp4'
        const isLt100MB = file.size / 1024 / 1024 <= 100

        if (!isMp4) {
            message.error('Chỉ chấp nhận định dạng .mp4')
        } else if (!isLt100MB) {
            message.error('Kích thước video phải nhỏ hơn hoặc bằng 100MB')
        }

        return isMp4 && isLt100MB
    }
    const [collapsed, setCollapsed] = useState(true)
    const handleSubmit = (values: any) => {
        //todo: submit form data to server
        console.log('Form values:', values)
    }
    const getContentScore = (values: any, priceFields: any[]): number => {
        let score = 0
        const detailImages = values.detailImage || []
        if (detailImages.length >= 3) score += 1

        const description = values.description || ''
        if (description.trim().length >= 30) score += 1

        priceFields.forEach((field) => {
            const price = values[`${field.name}Price`]
            const stock = values[`${field.name}Stock`]
            const enabled = values[`${field.name}Enabled`]

            if (enabled && price > 0 && stock > 0) {
                score += 1
            }
        })
        console.log(score)
        return score
    }

    const [contentScore, setContentScore] = useState(0)
    const [detailImages, setDetailImages] = useState<File[]>([])
    const [realImages, setRealImages] = useState<File[]>([])

    function getContentRank(score: number): string {
        if (score === 0) return 'Poor'
        if (score <= 2) return 'Fair'
        if (score <= 4) return 'Good'
        return 'Excellent'
    }

    return (
        <div className="grid grid-cols-5 gap-5">
            <div className="col-span-3 flex flex-col gap-5">
                <div>
                    <h2 className="text-2xl font-bold text-primary">
                        Thêm sản phẩm mới
                    </h2>
                </div>
                <Form
                    layout="vertical"
                    form={form}
                    onValuesChange={() => {
                        const values = form.getFieldsValue()
                        console.log('first', values)
                        const score = getContentScore(values, priceFields)
                        setContentScore(score)
                    }}
                    onFinish={handleSubmit}
                    className="mx-auto flex max-w-2xl flex-col gap-5 rounded-xl"
                    initialValues={{
                        dailyPrice: 0,
                        dailyStock: '',
                        dailyEnabled: true,
                        weeklyEnabled: true,
                        monthlyEnabled: true,
                    }}
                >
                    <div className="rounded-2xl bg-white p-4">
                        <h3 className="text-lg font-bold text-primary">
                            Thông tin cơ bản
                        </h3>

                        <Form.Item
                            name="productName"
                            label="Tên sản phẩm"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập tên sản phẩm',
                                },
                                {
                                    max: MAX_TITLE_LENGTH,
                                    message: `Tối đa ${MAX_TITLE_LENGTH} ký tự`,
                                },
                            ]}
                        >
                            <Input
                                placeholder="Ex. Máy ảnh Sony Alpha A6400 (Black, Body Only)"
                                maxLength={MAX_TITLE_LENGTH}
                            />
                        </Form.Item>

                        <Form.Item
                            name="category"
                            label="Danh mục ngành hàng"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng chọn danh mục',
                                },
                            ]}
                        >
                            <Select placeholder="Chọn thể loại">
                                <Select.Option value="camera">
                                    Máy ảnh
                                </Select.Option>
                                <Select.Option value="laptop">
                                    Laptop
                                </Select.Option>
                                <Select.Option value="phone">
                                    Điện thoại
                                </Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="realImage"
                            label="Ảnh thực tế của sản phẩm (Chụp chung với chủ shop)"
                            valuePropName="fileList"
                            getValueFromEvent={(e) =>
                                Array.isArray(e) ? e : e?.fileList
                            }
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng tải lên ảnh thực tế',
                                },
                            ]}
                        >
                           <ImageUploadPreview
                                value={realImages}
                                onChange={(newFiles) => {
                                    setRealImages(newFiles)
                                }}
                            />
                        </Form.Item>

                        <Form.Item
                            name="detailImage"
                            label="Ảnh chi tiết của sản phẩm"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng tải lên ảnh chi tiết',
                                },
                            ]}
                            getValueFromEvent={(e) => e}
                        >
                            <ImageUploadPreview
                                value={detailImages}
                                onChange={(newFiles) => {
                                    setDetailImages(newFiles)
                                }}
                            />
                        </Form.Item>

                        <Form.Item
                            name="video"
                            label="Video"
                            valuePropName="fileList"
                            getValueFromEvent={(e) =>
                                Array.isArray(e) ? e : e?.fileList
                            }
                        >
                            <Dragger
                                beforeUpload={(file) =>
                                    validateVideo(file) || Upload.LIST_IGNORE
                                }
                                maxCount={5}
                                accept="video/mp4"
                            >
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">
                                    Kéo thả video hoặc click để tải lên
                                </p>
                                <p className="ant-upload-hint text-sm text-gray-500">
                                    Min kích thước: 480x480px. Max thời lượng:
                                    60s. Max dung lượng: 100MB. Định dạng: MP4.
                                </p>
                            </Dragger>
                        </Form.Item>
                    </div>
                    <div className="rounded-2xl bg-white p-4">
                        <h3 className="text-lg font-bold text-primary">
                            Đặc tính sản phẩm
                        </h3>
                        <h4>
                            Cung cấp đầy đủ đặc tính sản phẩm để tối ưu kết quả
                            tìm kiếm sản phẩm.
                        </h4>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="brand"
                                    label="Thương hiệu"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Vui lòng nhập thương hiệu',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="status"
                                    label="Tình trạng"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập tình trạng',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>

                            <Col span={12}>
                                <Form.Item
                                    name="cameraType"
                                    label="Loại máy ảnh"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Vui lòng nhập loại máy ảnh',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="productCode"
                                    label="Mã sản phẩm"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Vui lòng nhập mã sản phẩm',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>

                            <Col span={12}>
                                <Form.Item
                                    name="sensorSize"
                                    label="Kích thước cảm biến"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Vui lòng nhập kích thước cảm biến',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name="resolution"
                                    label="Độ phân giải (MP)"
                                >
                                    <Input />
                                </Form.Item>
                            </Col>

                            {/* Các trường có thể ẩn/hiện */}
                            {!collapsed && (
                                <>
                                    <Col span={12}>
                                        <Form.Item
                                            name="lensSupport"
                                            label="Hệ lens (Canon EF, Sony E,...)"
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            name="burstSpeed"
                                            label="Tốc độ chụp liên tiếp"
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>

                                    <Col span={12}>
                                        <Form.Item
                                            name="videoFormat"
                                            label="Định Dạng Quay Video"
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            name="opticalZoom"
                                            label="Zoom quang học"
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>

                                    <Col span={12}>
                                        <Form.Item
                                            name="iso"
                                            label="Chỉ số ISO"
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            name="storage"
                                            label="Ổ cứng lưu trữ (nếu tích hợp)"
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>

                                    <Col span={12}>
                                        <Form.Item
                                            name="screen"
                                            label="Màn hình xoay / cảm ứng"
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            name="accessories"
                                            label="Phụ kiện đi kèm"
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>

                                    <Col span={12}>
                                        <Form.Item
                                            name="mic"
                                            label="Input mic / tai nghe"
                                        >
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                </>
                            )}
                        </Row>

                        <div className="mt-4 flex justify-start">
                            <Button
                                type="link"
                                icon={
                                    collapsed ? (
                                        <ChevronDown size={16} />
                                    ) : (
                                        <ChevronUp size={16} />
                                    )
                                }
                                onClick={() => setCollapsed(!collapsed)}
                                className="font-medium text-blue-600"
                            >
                                {collapsed ? 'Mở rộng' : 'Thu gọn'}
                            </Button>
                        </div>
                    </div>
                    <Form.Item name={'description'}>
                        <div className="rounded-2xl bg-white p-4">
                            <h3 className="text-lg font-bold text-primary">
                                Mô tả sản phẩm
                            </h3>
                            <h4>
                                Cung cấp đầy đủ đặc tính sản phẩm để tối ưu kết
                                quả tìm kiếm sản phẩm.
                            </h4>
                            <TextArea className="" rows={6}></TextArea>
                        </div>
                    </Form.Item>
                    <div className="rounded-2xl bg-white p-4">
                        <h3 className="text-lg font-bold text-primary">
                            Giá bán và kho hàng
                        </h3>
                        {priceFields.map((field) => (
                            <div
                                key={field.name}
                                className="mb-4 rounded-xl border px-4 py-3"
                            >
                                <Text strong className="text-base text-black">
                                    * {field.label}
                                </Text>

                                <div className="mt-3 grid grid-cols-3 items-center gap-4">
                                    <Form.Item
                                        name={`${field.name}Price`}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập giá',
                                            },
                                        ]}
                                        label={
                                            <span className="text-xs text-gray-600">
                                                Giá
                                            </span>
                                        }
                                    >
                                        <InputNumber
                                            size="large"
                                            addonAfter="đ"
                                            min={0}
                                            className="w-full"
                                            placeholder="Nhập giá"
                                        />
                                    </Form.Item>

                                    <Form.Item
                                        name={`${field.name}Stock`}
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Vui lòng nhập kho hàng',
                                            },
                                        ]}
                                        label={
                                            <span className="text-xs text-gray-600">
                                                Kho hàng
                                            </span>
                                        }
                                    >
                                        <Input placeholder="Số lượng" />
                                    </Form.Item>

                                    <Form.Item
                                        name={`${field.name}Enabled`}
                                        valuePropName="checked"
                                        label={
                                            <span className="text-xs text-gray-600">
                                                Mở cho thuê
                                            </span>
                                        }
                                    >
                                        <CustomSwitch />
                                    </Form.Item>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-5 rounded-2xl bg-white p-4">
                        <div className="col-span-3 flex flex-row items-center gap-2 font-medium text-primary">
                            <div className="flex h-[50px] w-[50px] items-center">
                                <TriangleAlert className="text-[#F9AC2A]" />
                            </div>
                            <p>
                                Danh mục sản phẩm là bằng tay lựa chọn. Sản phẩm
                                với sai danh mục sẽ bị đình chỉ.
                            </p>
                        </div>
                        <div className="col-span-2 flex flex-row items-center gap-2">
                            <Form.Item className="!mb-0">
                                <Button
                                    htmlType="submit"
                                    variant="outlined"
                                    className="border-primary"
                                >
                                    Lưu bản nháp
                                </Button>
                            </Form.Item>
                            <Form.Item className="!mb-0">
                                <Button htmlType="submit" type="primary">
                                    Gửi đi
                                </Button>
                            </Form.Item>
                        </div>
                    </div>
                </Form>
            </div>
            <div className="col-span-2">
                <div className="sticky top-16 mt-[50px]">
                    <div className="flex flex-col gap-4">
                        <div className="w-full rounded-2xl bg-white p-4">
                            <div className="mb-2 flex items-center justify-between">
                                <Title level={5} className="mb-0">
                                    Điểm nội dung
                                </Title>
                                <div className="flex h-[30px] w-[30px] cursor-pointer items-center">
                                    <RotateCw size={24} />
                                </div>
                            </div>
                            <div className="flex flex-row items-center gap-5">
                                <Progress
                                    percent={(contentScore / 5) * 100} // maxScore là tổng tối đa, ví dụ 6
                                    showInfo={false}
                                    status={
                                        contentScore === 0
                                            ? 'exception'
                                            : 'normal'
                                    }
                                    strokeColor={
                                        contentScore === 0
                                            ? '#EF4444'
                                            : contentScore <= 2
                                              ? '#F59E0B'
                                              : contentScore <= 4
                                                ? '#3B82F6'
                                                : '#10B981'
                                    }
                                />
                                <span className="text-lg font-bold">
                                    { (contentScore/5)*100 }%
                                </span>
                            </div>
                            <Text
                                type={
                                    contentScore === 0
                                        ? 'danger'
                                        : contentScore <= 2
                                          ? 'warning'
                                          : contentScore <= 4
                                            ? 'secondary'
                                            : 'success'
                                }
                                className="text-sm font-bold"
                            >
                                {getContentRank(contentScore)}
                            </Text>

                            <Collapse
                                defaultActiveKey={['1']}
                                ghost
                                expandIconPosition="end"
                            >
                                <Panel
                                    header={
                                        <span className="font-bold">
                                            Thông tin cơ bản
                                        </span>
                                    }
                                    key="1"
                                >
                                    <ul className="list-disc pl-4 text-sm">
                                        <li>Thêm ít nhất 3 ảnh chính</li>
                                    </ul>
                                </Panel>
                                <Panel
                                    header={
                                        <span className="font-bold">
                                            Mô tả sản phẩm
                                        </span>
                                    }
                                    key="2"
                                >
                                    <ul className="list-disc pl-4 text-sm">
                                        <li>Thêm ít nhất 1 ảnh trong mô tả</li>
                                        <li>Thêm mô tả dài ít nhất 30 từ</li>
                                    </ul>
                                </Panel>
                                <Panel
                                    header={
                                        <span className="font-bold">
                                            Giá bán và kho hàng
                                        </span>
                                    }
                                    key="3"
                                />
                            </Collapse>
                        </div>

                        <div className="relative w-full rounded-2xl bg-white p-4">
                            <div>
                                <Title
                                    level={5}
                                    style={{
                                        color: '#0284C7',
                                        marginBottom: 4,
                                    }}
                                >
                                    Gợi ý
                                </Title>
                                <Text>
                                    Vui lòng tải lên hình ảnh, điền tên sản phẩm
                                    và chọn đúng ngành hàng trước khi đăng tải
                                    sản phẩm.
                                </Text>
                            </div>
                            <div className="absolute -top-2 right-0">
                                <img
                                    src="/icons/light-bulb.png"
                                    width={118}
                                ></img>
                            </div>
                        </div>
                        <div className="relative w-full rounded-2xl bg-white p-4">
                            <div>
                                <Title
                                    level={5}
                                    style={{
                                        color: '#0284C7',
                                        marginBottom: 4,
                                    }}
                                >
                                    Tên sản phẩm
                                </Title>
                                <Text>
                                    Tên sản phẩm có nhãn hiệu rõ ràng và nhấn
                                    mạnh đặc điểm sản phẩm sẽ giúp tăng khả năng
                                    tìm thấy đến 6 lần.
                                    <br />
                                    Tránh sử dụng các từ khóa không liên quan vì
                                    có thể dẫn đến bị đình chỉ sản phẩm.
                                </Text>
                            </div>
                            <div className="absolute -top-2 right-0">
                                <img
                                    src="/icons/light-bulb.png"
                                    width={118}
                                ></img>
                            </div>
                        </div>
                        <div className="relative w-full rounded-2xl bg-white p-4">
                            <div>
                                <Title
                                    level={5}
                                    style={{
                                        color: '#0284C7',
                                        marginBottom: 4,
                                    }}
                                >
                                    Giá bán & Kho hàng
                                </Title>
                                <Text>
                                    Đây là số tiền khách hàng phải trả khi thuê
                                    sản phẩm. Các đơn vị được phân cách bởi dấu
                                    chấm.
                                </Text>
                            </div>
                            <div className="absolute -top-2 right-0">
                                <img
                                    src="/icons/light-bulb.png"
                                    width={118}
                                ></img>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const CustomSwitch = () => {
    const [checked, setChecked] = useState(true)

    return (
        <Switch
            checked={checked}
            onChange={(value) => setChecked(value)}
            checkedChildren="cho thuê"
            unCheckedChildren="không"
            style={{
                backgroundColor: checked ? '#22C55E' : '#EF4444', // xanh khi ON, đỏ khi OFF
            }}
        />
    )
}

interface ImageUploadPreviewProps {
    value?: File[]
    onChange?: (value: File[]) => void
}

const ImageUploadPreview: React.FC<ImageUploadPreviewProps> = ({
    value = [],
    onChange,
}) => {
    const inputRef = useRef<HTMLInputElement>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files) return

        const selectedFiles = Array.from(files).slice(0, 20)
        const combined = [...value, ...selectedFiles].slice(0, 20)
        onChange?.(combined)
        e.target.value = ''
    }

    const handleClick = () => {
        inputRef.current?.click()
    }

    const handleRemove = (indexToRemove: number) => {
        const newList = value.filter((_, index) => index !== indexToRemove)
        onChange?.(newList)
    }

    // Cleanup preview URLs on unmount
    useEffect(() => {
        return () => {
            value.forEach((file) => URL.revokeObjectURL(file as any))
        }
    }, [value])

    return (
        <div className="w-full">
            <div className="hidden">
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                />
            </div>

            <div
                onClick={handleClick}
                className="mb-2 flex h-32 cursor-pointer items-center justify-center rounded-md border border-dashed flex-col"
            >
                <UploadCloud className="h-5 w-5" size={40}/>
                <span className="text-gray-500">Tải ảnh lên</span>
            </div>

            <div className="grid grid-cols-4 gap-2">
                {value.map((file, index) => {
                    const previewUrl = URL.createObjectURL(file)
                    return (
                        <div key={index} className="relative">
                            <img
                                src={previewUrl}
                                className="h-24 w-full rounded object-cover"
                                alt={`preview-${index}`}
                            />
                            <button
                                type="button"
                                onClick={() => handleRemove(index)}
                                className="absolute right-1 top-1 rounded-full bg-black bg-opacity-50 p-1 text-white hover:bg-opacity-80"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
