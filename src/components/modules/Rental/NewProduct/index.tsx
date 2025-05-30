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
    Collapse,
    Progress,
    Col,
    Row,
} from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import {
    ChevronDown,
    ChevronUp,
    RotateCw,
    TriangleAlert,
    UploadCloud,
    X,
} from 'lucide-react'
import TextArea from 'antd/es/input/TextArea'
import {
    categoryEndpoint,
    cloudinaryEndpoint,
    productEndpoint,
} from '@/settings/endpoints'
import { getRequest, postRequest } from '@/request'
import { CategoryType } from '@/data/products'
import { useAuth } from '@/context/AuthContext'
import { useParams, useRouter } from 'next/navigation'

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
    const { user } = useAuth()
    const router = useRouter()
    const { id } = useParams() as { id: string }

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
    const [category, setCategory] = useState('')
    const [collapsed, setCollapsed] = useState(true)
    const productAttributes: Record<
        string,
        { key: string; label: string; required?: boolean }[]
    > = {
        'Máy ảnh': [
            { key: 'brand', label: 'Thương hiệu', required: true },
            { key: 'status', label: 'Tình trạng', required: true },
            { key: 'cameraType', label: 'Loại máy ảnh', required: true },
            { key: 'productCode', label: 'Mã sản phẩm', required: true },
            { key: 'sensorSize', label: 'Kích thước cảm biến' },
            { key: 'resolution', label: 'Độ phân giải (MP)' },
            { key: 'lensSupport', label: 'Hệ lens (Canon EF, Sony E,...)' },
            { key: 'burstSpeed', label: 'Tốc độ chụp liên tiếp' },
            { key: 'videoFormat', label: 'Định dạng quay video' },
            { key: 'opticalZoom', label: 'Zoom quang học' },
            { key: 'iso', label: 'Chỉ số ISO' },
            { key: 'storage', label: 'Ổ cứng lưu trữ (nếu tích hợp)' },
            { key: 'screen', label: 'Màn hình xoay / cảm ứng' },
            { key: 'accessories', label: 'Phụ kiện đi kèm' },
            { key: 'mic', label: 'Input mic / tai nghe' },
        ],
        'Ống kính': [
            { key: 'brand', label: 'Thương hiệu', required: true },
            { key: 'status', label: 'Tình trạng', required: true },
            { key: 'lensType', label: 'Loại ống kính', required: true },
            { key: 'focalLength', label: 'Tiêu cự (mm)' },
            { key: 'aperture', label: 'Khẩu độ tối đa' },
            { key: 'lensMount', label: 'Ngàm lens' },
            { key: 'opticalZoom', label: 'Zoom quang học' },
            { key: 'weight', label: 'Khối lượng' },
            { key: 'accessories', label: 'Phụ kiện đi kèm' },
        ],
        'Máy quay phim': [
            { key: 'brand', label: 'Thương hiệu', required: true },
            { key: 'status', label: 'Tình trạng', required: true },
            { key: 'cameraType', label: 'Loại máy quay', required: true },
            { key: 'resolution', label: 'Độ phân giải (MP)' },
            { key: 'sensorSize', label: 'Kích thước cảm biến' },
            { key: 'videoFormat', label: 'Định dạng quay video' },
            { key: 'opticalZoom', label: 'Zoom quang học' },
            { key: 'iso', label: 'Chỉ số ISO' },
            { key: 'storage', label: 'Ổ cứng lưu trữ (nếu tích hợp)' },
            { key: 'screen', label: 'Màn hình xoay / cảm ứng' },
            { key: 'accessories', label: 'Phụ kiện đi kèm' },
        ],
        'Phụ kiện máy ảnh': [
            { key: 'brand', label: 'Thương hiệu', required: true },
            { key: 'status', label: 'Tình trạng', required: true },
            { key: 'accessoryType', label: 'Loại phụ kiện', required: true },
            { key: 'compatibility', label: 'Tương thích với thiết bị' },
            { key: 'weight', label: 'Khối lượng' },
            { key: 'dimensions', label: 'Kích thước' },
            { key: 'accessories', label: 'Phụ kiện đi kèm' },
        ],
        'Thiết bị Studio': [
            { key: 'brand', label: 'Thương hiệu', required: true },
            { key: 'status', label: 'Tình trạng', required: true },
            { key: 'equipmentType', label: 'Loại thiết bị', required: true },
            { key: 'power', label: 'Công suất (W)' },
            { key: 'dimensions', label: 'Kích thước' },
            { key: 'weight', label: 'Khối lượng' },
            { key: 'accessories', label: 'Phụ kiện đi kèm' },
        ],
        'Âm thanh & livestream': [
            { key: 'brand', label: 'Thương hiệu', required: true },
            { key: 'status', label: 'Tình trạng', required: true },
            {
                key: 'audioType',
                label: 'Loại thiết bị âm thanh',
                required: true,
            },
            { key: 'frequencyRange', label: 'Dải tần số' },
            { key: 'connectivity', label: 'Kết nối (Bluetooth, USB,...)' },
            { key: 'power', label: 'Công suất (W)' },
            { key: 'dimensions', label: 'Kích thước' },
            { key: 'weight', label: 'Khối lượng' },
            { key: 'accessories', label: 'Phụ kiện đi kèm' },
        ],
        Gimbal: [
            { key: 'brand', label: 'Thương hiệu', required: true },
            { key: 'status', label: 'Tình trạng', required: true },
            { key: 'gimbalType', label: 'Loại gimbal', required: true },
            { key: 'compatibility', label: 'Tương thích với thiết bị' },
            { key: 'batteryLife', label: 'Thời lượng pin' },
            { key: 'weight', label: 'Khối lượng' },
            { key: 'dimensions', label: 'Kích thước' },
            { key: 'accessories', label: 'Phụ kiện đi kèm' },
        ],
        'Đồ chơi': [
            { key: 'brand', label: 'Thương hiệu', required: true },
            { key: 'status', label: 'Tình trạng', required: true },
            { key: 'toyType', label: 'Loại đồ chơi', required: true },
            { key: 'ageGroup', label: 'Nhóm tuổi phù hợp' },
            { key: 'material', label: 'Chất liệu' },
            { key: 'dimensions', label: 'Kích thước' },
            { key: 'weight', label: 'Khối lượng' },
            { key: 'accessories', label: 'Phụ kiện đi kèm' },
        ],
        'Lưu trữ': [
            { key: 'brand', label: 'Thương hiệu', required: true },
            { key: 'status', label: 'Tình trạng', required: true },
            { key: 'storageType', label: 'Loại lưu trữ', required: true },
            { key: 'capacity', label: 'Dung lượng' },
            { key: 'readSpeed', label: 'Tốc độ đọc' },
            { key: 'writeSpeed', label: 'Tốc độ ghi' },
            { key: 'dimensions', label: 'Kích thước' },
            { key: 'weight', label: 'Khối lượng' },
            { key: 'compatibility', label: 'Tương thích với thiết bị' },
        ],
    }
    const handleSubmit = async (values: any) => {
        try {
            const detailUrls = await Promise.all(
                detailImages?.map(async (file) => {
                    const formData = new FormData()
                    formData.append('my_file', file)

                    const res = await postRequest(
                        cloudinaryEndpoint.UPLOAD,
                        { data: formData },
                        true,
                    )
                    return res.secure_url
                }) || [],
            )

            const realUrls = await Promise.all(
                realImages?.map(async (file) => {
                    const formData = new FormData()
                    formData.append('my_file', file)

                    const res = await postRequest(
                        cloudinaryEndpoint.UPLOAD,
                        { data: formData },
                        true,
                    )
                    return res.secure_url
                }) || [],
            )

            const imageUrls =
                values.imageUrls
                    ?.split('\n')
                    .map((url: string) => url.trim())
                    .filter((url: string) => url) || []

            const images = [...realUrls, ...detailUrls, ...imageUrls]

            const categoryKey = values?.category?.label || values?.category?.key
            const attributeList = productAttributes[categoryKey] || []

            const parameter = attributeList
                .filter((a) => values?.[a.key] !== undefined)
                .map((attr) => ({
                    key: attr.key,
                    label: attr.label,
                    value: values[attr.key] ?? '',
                }))

            const res = await postRequest(productEndpoint.CREATE, {
                data: {
                    title: values?.title?.trim(),
                    brand: values?.brand?.trim(),
                    category: values?.category?.key,

                    price: values?.dailyPrice,
                    priceWeek: values?.weeklyPrice,
                    priceMonth: values?.monthlyPrice,

                    parameter,
                    images,
                    idShop: id,
                    details: values?.description,
                    shortDetails: values?.description
                        ? values.description.length > 100
                            ? values.description.substring(0, 100) + '...'
                            : values.description
                        : '',

                    location: values?.location,
                    discount: values?.discount,
                    stock: values?.stock,
                },
            })
            console.log('res?.metadata?._id', res)
            if (!res?.data?.product?._id) {
                message.error('Tạo sản phẩm thất bại')
                return
            }

            message.success('Tạo sản phẩm thành công, chờ admin duyệt')
            router.push(`/rental/${id}`)
        } catch (error) {
            console.error('Error while creating product:', error)
            message.error('Đã xảy ra lỗi khi tạo sản phẩm')
        }
    }
    const [categoryData, setCategoryData] = useState<CategoryType[]>()
    useEffect(() => {
        const getCategoryData = async () => {
            const res = await getRequest(categoryEndpoint.GET_ALL)
            setCategoryData(res?.metadata)
        }
        getCategoryData()
    }, [])
    const getContentScore = (values: any): number => {
        let score = 0

        const detailImages = values.detailImages || []
        const imageUrls =
            values.imageUrls
                ?.split('\n')
                .map((url: string) => url.trim())
                .filter((url: string) => url) || []

        // Check if there are at least 3 images (uploaded or URLs)
        if (detailImages.length + imageUrls.length >= 3) score += 1

        const description = values.description || ''
        if (description.trim().length >= 30) score += 1

        const price = values?.dailyPrice
        const stock = values?.stock
        if (price > 0 && stock > 0) {
            score += 1
        }
        if (values.title?.trim()) score += 0.5

        const categoryKey = values?.category?.label || values?.category?.name
        if (categoryKey) score += 0.5
        if (values?.location) score += 0.5
        const requiredAttrs =
            productAttributes[categoryKey]?.filter((a) => a.required) || []

        if (
            requiredAttrs.length > 0 &&
            requiredAttrs.every((attr) => values[attr.key])
        ) {
            score += 0.5
        }

        return score
    }

    const [contentScore, setContentScore] = useState(0)
    const [detailImages, setDetailImages] = useState<File[]>([])
    const [realImages, setRealImages] = useState<File[]>([])
    const locationData = ['Hồ Chí Minh', 'Đà Nẵng', 'Hà Nội']

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
                        if (values?.category) {
                            setCategory(values.category.label)
                        }

                        const score = getContentScore(values)
                        setContentScore(score)
                    }}
                    onFinish={handleSubmit}
                    onFinishFailed={({ errorFields }) => {
                        if (errorFields.length > 0) {
                            message.error(
                                'Vui lòng điền đầy đủ thông tin bắt buộc!',
                            )
                        }
                    }}
                    className="mx-auto flex max-w-2xl flex-col gap-5 rounded-xl"
                >
                    <div className="rounded-2xl bg-white p-4">
                        <h3 className="text-lg font-bold text-primary">
                            Thông tin cơ bản
                        </h3>

                        <Form.Item
                            name="title"
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
                            <Select placeholder="Chọn thể loại" labelInValue>
                                {categoryData?.map((c) => (
                                    <Select.Option key={c._id} value={c._id}>
                                        {c.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="location"
                            label="Vị trí"
                            rules={[
                                {
                                    message: 'Vui lòng chọn danh mục',
                                },
                            ]}
                        >
                            <Select placeholder="Chọn thể loại">
                                {locationData?.map((c) => (
                                    <Select.Option value={c}>{c}</Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name={'realImages'}
                            label="Ảnh thực tế của sản phẩm (Chụp chung với chủ shop)"
                            valuePropName="fileList"
                            getValueFromEvent={(e) =>
                                Array.isArray(e) ? e : e?.fileList
                            }
                            rules={[
                                {
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
                            name={'detailImages'}
                            label="Ảnh chi tiết của sản phẩm"
                            rules={[
                                {
                                    message: 'Vui lòng tải lên ảnh chi tiết',
                                },
                            ]}
                            getValueFromEvent={(e) => e}
                        >
                            <ImageUploadPreview
                                value={detailImages}
                                onChange={async (newFiles) => {
                                    setDetailImages(newFiles)
                                }}
                            />
                            <Form.Item
                                name="imageUrls"
                                label="URLs của ảnh (mỗi URL trên một dòng)"
                                rules={[
                                    {
                                        required: false,
                                        message: 'Vui lòng nhập URL ảnh',
                                    },
                                ]}
                            >
                                <Input.TextArea
                                    placeholder="Nhập URL ảnh, mỗi URL trên một dòng"
                                    rows={4}
                                />
                            </Form.Item>
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
                    {category != '' && (
                        <>
                            <div className="rounded-2xl bg-white p-4">
                                <h3 className="text-lg font-bold text-primary">
                                    Đặc tính sản phẩm
                                </h3>
                                <h4>
                                    Cung cấp đầy đủ đặc tính sản phẩm để tối ưu
                                    kết quả tìm kiếm sản phẩm.
                                </h4>
                                <Row gutter={16}>
                                    {/* Hiển thị luôn các trường bắt buộc */}
                                    {productAttributes[category]
                                        ?.filter((f) => f.required)
                                        .map((field) => (
                                            <Col span={12} key={field.key}>
                                                <Form.Item
                                                    name={field.key}
                                                    label={field.label}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: `Vui lòng nhập ${field.label.toLowerCase()}`,
                                                        },
                                                    ]}
                                                >
                                                    <Input />
                                                </Form.Item>
                                            </Col>
                                        ))}

                                    {!collapsed &&
                                        productAttributes[category]
                                            ?.filter((f) => !f.required)
                                            .map((field) => (
                                                <Col span={12} key={field.key}>
                                                    <Form.Item
                                                        name={field.key}
                                                        label={field.label}
                                                        rules={[]} // Không bắt buộc
                                                    >
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                            ))}
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
                                        Cung cấp đầy đủ đặc tính sản phẩm để tối
                                        ưu kết quả tìm kiếm sản phẩm.
                                    </h4>
                                    <TextArea className="" rows={6}></TextArea>
                                </div>
                            </Form.Item>
                            <div className="rounded-2xl bg-white p-4">
                                <h3 className="text-lg font-bold text-primary">
                                    Giá bán và kho hàng
                                </h3>
                                <div className="my-4 rounded-xl border px-4 py-3">
                                    <Form.Item
                                        name={`stock`}
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
                                </div>
                                {priceFields.map((field) => (
                                    <div
                                        key={field.name}
                                        className="mb-4 rounded-xl border px-4 py-3"
                                    >
                                        <div className="mt-3 grid items-center gap-4">
                                            <Form.Item
                                                name={`${field.name}Price`}
                                                rules={[
                                                    {
                                                        required:
                                                            field.name ===
                                                            'daily',
                                                        message:
                                                            'Vui lòng nhập giá',
                                                    },
                                                ]}
                                                label={
                                                    <span className="text-red text-xs">
                                                        {field.label}
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
                                        Danh mục sản phẩm là bằng tay lựa chọn.
                                        Sản phẩm với sai danh mục sẽ bị đình
                                        chỉ.
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
                                        <Button
                                            htmlType="submit"
                                            type="primary"
                                        >
                                            Gửi đi
                                        </Button>
                                    </Form.Item>
                                </div>
                            </div>
                        </>
                    )}
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
                                    percent={(contentScore / 5) * 100}
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
                                    {(contentScore / 5) * 100}%
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
                className="mb-2 flex h-32 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed"
            >
                <UploadCloud className="h-5 w-5" size={40} />
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
