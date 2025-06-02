'use client'
import { useState, useRef, useCallback, useEffect } from 'react'
import {
    Card,
    Select,
    Button,
    Input,
    Checkbox,
    Space,
    Typography,
    Row,
    Col,
    Upload,
    message,
    Image,
    Spin,
} from 'antd'
import {
    CameraOutlined,
    VideoCameraOutlined,
    StopOutlined,
    UploadOutlined,
    DeleteOutlined,
} from '@ant-design/icons'
import { useParams, useRouter } from 'next/navigation'
import { getRequest, postRequest, putRequest } from '@/request'
import { orderEndpoint } from '@/settings/endpoints'

const { Title, Text } = Typography
const { TextArea } = Input

interface Parameter {
    key: string;
    label: string;
    value: string;
}

interface ProductDetail {
    _id: string;
    title: string;
    brand: string;
    category: string;
    price: number;
    priceWeek: number;
    priceMonth: number;
    images: string[];
    details: string;
    shortDetails: string;
    parameter: Parameter[];
    status: string;
    location: string;
    stock: number;
}

interface Product {
    _id: string;
    productId: ProductDetail;
    unitId: string;
    productStatus: string;
    renterId: string;
}

interface IdentityVerification {
    status: string;
}

interface Customer {
    _id: string;
    name: string;
    email: string;
    roles: string[];
    walletBalance: number;
    isActive: boolean;
    identityVerification: IdentityVerification;
    createdAt: string;
    updatedAt: string;
}

interface OrderData {
    _id: string;
    customerId: Customer;
    products: Product[];
    totalPrice: number;
    status: string;
    duration: number;
    deliveryDate: string;
    createdAt: string;
    updatedAt: string;
}

export default function ConfirmProductsPersonal() {
    const router = useRouter()
    const params = useParams()
    const { orderId } = params
    const [selectedOrder, setSelectedOrder] = useState('')
    const [orderData, setOrderData] = useState<OrderData | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [capturedImages, setCapturedImages] = useState<string[]>([])
    const [recordedVideos, setRecordedVideos] = useState<string[]>([])
    const [isCapturing, setIsCapturing] = useState(false)
    const [isRecording, setIsRecording] = useState(false)
    const [notes, setNotes] = useState('')
    const [isConfirmed, setIsConfirmed] = useState(false)

    const photoVideoRef = useRef<HTMLVideoElement>(null)
    const recordVideoRef = useRef<HTMLVideoElement>(null)
    const mediaRecorderRef = useRef<MediaRecorder | null>(null)
    const photoStreamRef = useRef<MediaStream | null>(null)
    const videoStreamRef = useRef<MediaStream | null>(null)

    const stopAllStreams = useCallback(() => {
        if (photoStreamRef.current) {
            photoStreamRef.current.getTracks().forEach((track) => track.stop())
            photoStreamRef.current = null
        }
        if (videoStreamRef.current) {
            videoStreamRef.current.getTracks().forEach((track) => track.stop())
            videoStreamRef.current = null
        }
        if (photoVideoRef.current) {
            photoVideoRef.current.srcObject = null
        }
        if (recordVideoRef.current) {
            recordVideoRef.current.srcObject = null
        }
    }, [])

    const startCamera = useCallback(async () => {
        try {
            if (isRecording) {
                if (mediaRecorderRef.current) {
                    mediaRecorderRef.current.stop()
                    mediaRecorderRef.current = null
                }
                setIsRecording(false)
            }

            stopAllStreams()

            let stream: MediaStream | null = null

            try {
                stream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        width: { ideal: 1280 },
                        height: { ideal: 720 },
                        facingMode: 'environment',
                    },
                    audio: false,
                })
            } catch (error) {
                stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: false,
                })
            }

            if (stream && photoVideoRef.current) {
                photoVideoRef.current.srcObject = stream

                photoVideoRef.current.onloadedmetadata = () => {
                    if (photoVideoRef.current) {
                        photoVideoRef.current.play().catch((error) => {
                            console.error('Error playing video:', error)
                        })
                    }
                }
            }

            photoStreamRef.current = stream
            setIsCapturing(true)
            message.success('Camera chụp ảnh đã được bật')
        } catch (error) {
            console.error('Error accessing photo camera:', error)
            message.error(
                'Không thể truy cập camera. Vui lòng cho phép quyền truy cập camera.',
            )
        }
    }, [isRecording, stopAllStreams])

    const stopCamera = useCallback(() => {
        if (photoStreamRef.current) {
            photoStreamRef.current.getTracks().forEach((track) => track.stop())
            photoStreamRef.current = null
        }
        if (photoVideoRef.current) {
            photoVideoRef.current.srcObject = null
        }
        setIsCapturing(false)
        message.info('Camera chụp ảnh đã được tắt')
    }, [])

    const capturePhoto = useCallback(() => {
        if (!photoVideoRef.current || !photoStreamRef.current) {
            message.warning('Camera chụp ảnh chưa được khởi tạo')
            return
        }

        if (photoVideoRef.current.readyState < 2) {
            message.warning('Camera đang tải, vui lòng thử lại sau giây lát')
            return
        }

        try {
            const canvas = document.createElement('canvas')
            const video = photoVideoRef.current

            const videoWidth = video.videoWidth || video.clientWidth
            const videoHeight = video.videoHeight || video.clientHeight

            const aspectRatio = 16 / 9
            let canvasWidth = videoWidth
            let canvasHeight = videoHeight

            if (videoWidth / videoHeight > aspectRatio) {
                canvasWidth = videoHeight * aspectRatio
            } else {
                canvasHeight = videoWidth / aspectRatio
            }

            canvas.width = canvasWidth
            canvas.height = canvasHeight

            const ctx = canvas.getContext('2d')
            if (ctx) {
                const sourceX = (videoWidth - canvasWidth) / 2
                const sourceY = (videoHeight - canvasHeight) / 2

                ctx.drawImage(
                    video,
                    sourceX,
                    sourceY,
                    canvasWidth,
                    canvasHeight,
                    0,
                    0,
                    canvasWidth,
                    canvasHeight,
                )

                const imageDataUrl = canvas.toDataURL('image/jpeg', 0.9)
                setCapturedImages((prev) => [...prev, imageDataUrl])
                message.success('Đã chụp ảnh thành công')
            }
        } catch (error) {
            console.error('Error capturing photo:', error)
            message.error('Lỗi khi chụp ảnh')
        }
    }, [])

    const startVideoRecording = useCallback(async () => {
        try {
            if (isCapturing) {
                stopCamera()
            }

            stopAllStreams()

            let stream: MediaStream | null = null

            try {
                stream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        width: { ideal: 1280 },
                        height: { ideal: 720 },
                        facingMode: 'environment',
                    },
                    audio: true,
                })
            } catch (error) {
                stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true,
                })
            }

            if (stream && recordVideoRef.current) {
                recordVideoRef.current.srcObject = stream

                recordVideoRef.current.onloadedmetadata = () => {
                    if (recordVideoRef.current) {
                        recordVideoRef.current.play().catch((error) => {
                            console.error('Error playing video:', error)
                        })
                    }
                }
            }

            let mediaRecorder: MediaRecorder
            try {
                mediaRecorder = new MediaRecorder(stream, {
                    mimeType: 'video/webm;codecs=vp9',
                })
            } catch (error) {
                try {
                    mediaRecorder = new MediaRecorder(stream, {
                        mimeType: 'video/webm',
                    })
                } catch (error2) {
                    mediaRecorder = new MediaRecorder(stream)
                }
            }

            const chunks: BlobPart[] = []

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    chunks.push(event.data)
                }
            }

            mediaRecorder.onstop = () => {
                const blob = new Blob(chunks, { type: 'video/webm' })
                const videoUrl = URL.createObjectURL(blob)
                setRecordedVideos((prev) => [...prev, videoUrl])

                if (videoStreamRef.current) {
                    videoStreamRef.current
                        .getTracks()
                        .forEach((track) => track.stop())
                    videoStreamRef.current = null
                }
                if (recordVideoRef.current) {
                    recordVideoRef.current.srcObject = null
                }

                message.success('Video đã được lưu thành công')
            }

            mediaRecorder.start()
            mediaRecorderRef.current = mediaRecorder
            videoStreamRef.current = stream
            setIsRecording(true)
            message.success('Bắt đầu quay video')
        } catch (error) {
            console.error('Error starting video recording:', error)
            message.error(
                'Không thể bắt đầu quay video. Vui lòng cho phép quyền truy cập camera và microphone.',
            )
        }
    }, [isCapturing, stopCamera, stopAllStreams])

    const stopVideoRecording = useCallback(() => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop()
            mediaRecorderRef.current = null
            setIsRecording(false)
            message.info('Đã dừng quay video')
        }
    }, [isRecording])

    const uploadToCloudinary = async (file: File, resourceType: 'image' | 'video', index: number) => {
        if (!orderData) {
            throw new Error('Không có thông tin đơn hàng')
        }

        const timestamp = new Date().getTime()
        const customerName = orderData.customerId.name.replace(/\s+/g, '_')
        const orderId = orderData._id
        const fileExtension = file.name.split('.').pop()
        const newFileName = `${resourceType}_${orderId}_${customerName}_${timestamp}_${index}.${fileExtension}`

        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', 'techrental')
        formData.append('cloud_name', 'dijb7tbho')
        formData.append('public_id', `techrental/${resourceType}s/${newFileName.split('.')[0]}`)

        try {
            const res = await fetch(
                `https://api.cloudinary.com/v1_1/dijb7tbho/${resourceType}/upload`,
                {
                    method: 'POST',
                    body: formData,
                },
            )

            const data = await res.json()
            return data.secure_url
        } catch (error: any) {
            throw new Error(error.message || 'Error uploading to Cloudinary')
        }
    }

    const handleImageUpload = async (file: File) => {
        try {
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
            if (!isJpgOrPng) {
                message.error('Chỉ có thể tải lên file JPG/PNG!')
                return false
            }
            const isLt2M = file.size / 1024 / 1024 < 2
            if (!isLt2M) {
                message.error('Ảnh phải nhỏ hơn 2MB!')
                return false
            }

            const imageUrl = await uploadToCloudinary(file, 'image', capturedImages.length + 1)
            setCapturedImages((prev) => [...prev, imageUrl])
            message.success('Đã tải ảnh lên thành công')
        } catch (error: any) {
            message.error(error.message || 'Lỗi không xác định khi tải ảnh lên')
        }
        return false
    }

    const handleVideoUpload = async (file: File) => {
        try {
            const isLt100M = file.size / 1024 / 1024 < 100
            if (!isLt100M) {
                message.error('Video phải nhỏ hơn 100MB!')
                return false
            }

            const videoUrl = await uploadToCloudinary(file, 'video', recordedVideos.length + 1)
            setRecordedVideos((prev) => [...prev, videoUrl])
            message.success('Đã tải video lên thành công')
        } catch (error: any) {
            message.error(error.message || 'Lỗi không xác định khi tải video lên')
        }
        return false
    }

    const removeImage = (index: number) => {
        setCapturedImages((prev) => prev.filter((_, i) => i !== index))
        message.info('Đã xóa ảnh')
    }

    const removeVideo = (index: number) => {
        setRecordedVideos((prev) => prev.filter((_, i) => i !== index))
        message.info('Đã xóa video')
    }

    const handleChangeToBeforeDeadLine = async (
        orderId: string,
        customerId: string,
    ): Promise<void> => {
        try {
            await putRequest(
                orderEndpoint.UPDATE_STATUS.replace(':id', orderId),
                {
                    data: {
                        status: 'before_deadline',
                        toId: customerId,
                    },
                },
            )

        } catch (error) {
            console.error(error)
        } finally {
        }
    }

    const handleSubmit = async () => {
        if (!orderId) {
            message.error('Không tìm thấy mã đơn hàng')
            return
        }
        if (capturedImages.length === 0) {
            message.error('Vui lòng chụp ít nhất một hình ảnh kiểm tra')
            return
        }
        if (!isConfirmed) {
            message.error('Vui lòng xác nhận đã kiểm tra đầy đủ')
            return
        }

        try {
            setLoading(true)

            // Upload all captured images to Cloudinary
            const imageUrls = await Promise.all(
                capturedImages
                    .filter(url => !url.startsWith('http')) // Only upload new images
                    .map(async (imageDataUrl, index) => {
                        const response = await fetch(imageDataUrl)
                        const blob = await response.blob()
                        const file = new File([blob], 'image.jpg', { type: 'image/jpeg' })
                        return uploadToCloudinary(file, 'image', index + 1)
                    })
            )

            // Upload all recorded videos to Cloudinary
            const videoUrls = await Promise.all(
                recordedVideos
                    .filter(url => !url.startsWith('http')) // Only upload new videos
                    .map(async (videoUrl, index) => {
                        const response = await fetch(videoUrl)
                        const blob = await response.blob()
                        const file = new File([blob], 'video.webm', { type: 'video/webm' })
                        return uploadToCloudinary(file, 'video', index + 1)
                    })
            )

            // Combine existing URLs with newly uploaded ones
            const allImageUrls = [
                ...capturedImages.filter(url => url.startsWith('http')),
                ...imageUrls
            ]
            const allVideoUrls = [
                ...recordedVideos.filter(url => url.startsWith('http')),
                ...videoUrls
            ]

            // Submit evidence to backend
            const evidenceData = {
                orderId,
                evidenceType: 'delivery',
                images: allImageUrls,
                videos: allVideoUrls,
                description: notes || 'Kiểm tra thiết bị trước khi giao hàng',
                submittedBy: 'owner',
                status: 'approved'
            }

            await postRequest(orderEndpoint.ORDER_EVIDENCE, {
                data: evidenceData
            })

            message.success('Đã gửi minh chứng thành công!')
            if (orderData?.customerId?._id) {
                handleChangeToBeforeDeadLine(orderId as string, orderData.customerId._id)
            }
            router.back();
        } catch (error: any) {
            console.error('Error submitting evidence:', error)
            message.error('Lỗi khi gửi: ' + (error.message || 'Vui lòng thử lại'))
        } finally {
            setLoading(false)
        }
    }

    const orderOptions = [
        {
            value: 'order-123',
            label: (
                <div>
                    <div className="font-medium">MacBook Pro 14 M4 Max</div>
                    <div className="text-xs text-gray-600">
                        Đơn #123: Ngày 22/5/2025
                    </div>
                </div>
            ),
        },
        {
            value: 'order-124',
            label: (
                <div>
                    <div className="font-medium">iPhone 15 Pro Max</div>
                    <div className="text-xs text-gray-600">
                        Đơn #124: Ngày 23/5/2025
                    </div>
                </div>
            ),
        },
    ]

    useEffect(() => {
        const fetchOrderData = async () => {
            if (!orderId) return;

            setLoading(true);
            setError(null);

            try {
                const response = await getRequest(orderEndpoint.GET_ORDER_BY_ID(orderId as string))
                setOrderData(response.data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
                message.error('Failed to load order data');
            } finally {
                setLoading(false);
            }
        };

        fetchOrderData();
    }, [orderId]);

    useEffect(() => {
        return () => {
            stopAllStreams()
        }
    }, [stopAllStreams])

    useEffect(() => {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            message.error(
                'Trình duyệt không hỗ trợ camera. Vui lòng sử dụng Chrome, Firefox hoặc Safari.',
            )
        }
    }, [])

    return (
        <div className="flex min-h-fit justify-center p-4">
            <Card className="w-full max-w-4xl shadow-2xl">
                <Space direction="vertical" size="large" className="w-full">
                    <div>
                        <Title level={3} className="!mb-2 !text-blue-900">
                            Ghi nhận tình trạng trước khi giao hàng
                        </Title>
                        <Text type="secondary">
                            Xác minh tình trạng thiết bị để làm minh chứng nếu
                            có khiếu nại về sau.
                        </Text>
                    </div>

                    <div>
                        <Text strong className="mb-2 block">
                            Thông tin đơn hàng
                        </Text>
                        <Card className="bg-gray-50">
                            {loading ? (
                                <div className="flex justify-center py-8">
                                    <Spin size="large" />
                                </div>
                            ) : error ? (
                                <div className="text-center text-red-500 py-4">
                                    {error}
                                </div>
                            ) : orderData ? (
                                <>
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="flex-grow">
                                            <div className="text-lg font-medium text-blue-900">
                                                Đơn hàng #{orderData._id}
                                            </div>
                                            <div className="mt-2 flex flex-col gap-1 text-sm text-gray-600">
                                                <div>
                                                    <Text type="secondary">Khách hàng: </Text>
                                                    {orderData.customerId.name}
                                                </div>
                                                <div>
                                                    <Text type="secondary">Email: </Text>
                                                    {orderData.customerId.email}
                                                </div>
                                                <div>
                                                    <Text type="secondary">Trạng thái xác thực: </Text>
                                                    <Text className={orderData.customerId.identityVerification.status === 'verified' ? 'text-green-600' : 'text-yellow-600'}>
                                                        {orderData.customerId.identityVerification.status === 'verified' ? 'Đã xác thực' : 'Chưa xác thực'}
                                                    </Text>
                                                </div>
                                                <div>
                                                    <Text type="secondary">Ngày giao hàng: </Text>
                                                    {new Date(orderData.deliveryDate).toLocaleDateString('vi-VN')}
                                                </div>
                                                <div>
                                                    <Text type="secondary">Thời hạn thuê: </Text>
                                                    {orderData.duration} ngày
                                                </div>
                                                <div>
                                                    <Text type="secondary">Trạng thái: </Text>
                                                    <Text className="text-green-600">
                                                        {orderData.status === 'in_delivery' ? 'Đang giao hàng' : orderData.status}
                                                    </Text>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex-shrink-0 ml-4">
                                            <div className="text-right">
                                                <div className="text-sm text-gray-500">Tổng tiền thuê</div>
                                                <div className="text-xl font-medium text-blue-600">
                                                    {new Intl.NumberFormat('vi-VN', {
                                                        style: 'currency',
                                                        currency: 'VND'
                                                    }).format(orderData.totalPrice)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {orderData.products.length > 0 ? (
                                        <div className="space-y-4">
                                            <div className="font-medium">Danh sách sản phẩm:</div>
                                            {orderData.products.map((product) => (
                                                <div key={product._id} className="border-t pt-4">
                                                    <div className="flex gap-4">
                                                        <div className="w-24 h-24 flex-shrink-0">
                                                            <img
                                                                src={product.productId.images[0]}
                                                                alt={product.productId.title}
                                                                className="w-full h-full object-cover rounded-lg"
                                                            />
                                                        </div>
                                                        <div className="flex-grow">
                                                            <div className="text-base font-medium">
                                                                {product.productId.title}
                                                            </div>
                                                            <div className="text-sm text-gray-500 mt-1">
                                                                {product.productId.shortDetails}
                                                            </div>
                                                            <div className="mt-2 space-y-1">
                                                                <div className="text-sm">
                                                                    <Text type="secondary">Thương hiệu: </Text>
                                                                    {product.productId.brand}
                                                                </div>
                                                                <div className="text-sm">
                                                                    <Text type="secondary">Mã sản phẩm: </Text>
                                                                    {product.productId.parameter.find(p => p.key === 'productCode')?.value || 'N/A'}
                                                                </div>
                                                                <div className="text-sm">
                                                                    <Text type="secondary">Tình trạng: </Text>
                                                                    {product.productId.parameter.find(p => p.key === 'status')?.value || 'N/A'}
                                                                </div>
                                                                <div className="text-sm">
                                                                    <Text type="secondary">Kho: </Text>
                                                                    {product.productId.location}
                                                                </div>
                                                            </div>
                                                            <div className="mt-2 flex justify-between items-center">
                                                                <div className="text-sm">
                                                                    <Text type="secondary">Trạng thái: </Text>
                                                                    <Text className={product.productStatus === 'rented' ? 'text-orange-600' : 'text-green-600'}>
                                                                        {product.productStatus === 'rented' ? 'Đang cho thuê' : product.productStatus}
                                                                    </Text>
                                                                </div>
                                                                <div className="text-base font-medium text-blue-600">
                                                                    {new Intl.NumberFormat('vi-VN', {
                                                                        style: 'currency',
                                                                        currency: 'VND'
                                                                    }).format(product.productId.price)}
                                                                    <span className="text-xs text-gray-500">/ngày</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center text-gray-500 border-t pt-4">
                                            Chưa có sản phẩm nào trong đơn hàng
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="text-center text-gray-500 py-4">
                                    Không tìm thấy thông tin đơn hàng
                                </div>
                            )}
                        </Card>
                    </div>

                    <div>
                        <Text strong className="mb-2 block">
                            <span className="text-red-500">*</span> Hình ảnh
                            kiểm tra sản phẩm
                        </Text>

                        <div className="relative mb-4 flex h-80 items-center justify-center overflow-hidden rounded-lg bg-gray-100">
                            <video
                                ref={photoVideoRef}
                                className={`h-full w-full object-cover ${isCapturing ? 'block' : 'hidden'}`}
                                autoPlay
                                muted
                                playsInline
                            />
                            {!isCapturing && (
                                <div className="text-center">
                                    <CameraOutlined className="mb-2 text-6xl text-gray-400" />
                                    <div className="text-gray-500">
                                        Nhấn "Bắt đầu chụp ảnh" để bật camera
                                    </div>
                                </div>
                            )}

                            {isCapturing && (
                                <Button
                                    type="primary"
                                    shape="circle"
                                    size="large"
                                    icon={<CameraOutlined />}
                                    onClick={capturePhoto}
                                    className="absolute bottom-4 left-1/2 h-16 w-16 -translate-x-1/2 transform border-2 border-blue-600 bg-white text-blue-600 hover:bg-gray-100"
                                />
                            )}
                        </div>

                        <Space wrap className="mb-4">
                            {!isCapturing ? (
                                <Button
                                    type="primary"
                                    icon={<CameraOutlined />}
                                    onClick={startCamera}
                                    size="large"
                                    className="bg-blue-600 hover:bg-blue-700"
                                >
                                    Bắt đầu chụp ảnh
                                </Button>
                            ) : (
                                <>
                                    <Button
                                        type="primary"
                                        icon={<CameraOutlined />}
                                        onClick={capturePhoto}
                                        size="large"
                                        className="bg-green-600 hover:bg-green-700"
                                    >
                                        Chụp ảnh
                                    </Button>
                                    <Button
                                        icon={<StopOutlined />}
                                        onClick={stopCamera}
                                        size="large"
                                    >
                                        Dừng chụp
                                    </Button>
                                </>
                            )}

                            <Upload
                                beforeUpload={handleImageUpload}
                                showUploadList={false}
                                accept="image/*"
                                multiple
                            >
                                <Button icon={<UploadOutlined />} size="large">
                                    Tải ảnh lên
                                </Button>
                            </Upload>
                        </Space>

                        {capturedImages.length > 0 && (
                            <Row gutter={[8, 8]}>
                                {capturedImages.map((image, index) => (
                                    <Col span={8} key={index}>
                                        <div className="relative">
                                            <Image
                                                src={
                                                    image || '/placeholder.svg'
                                                }
                                                alt={`Captured ${index + 1}`}
                                                className="h-24 w-full rounded object-cover"
                                            />
                                            <Button
                                                type="primary"
                                                danger
                                                size="small"
                                                icon={<DeleteOutlined />}
                                                className="absolute right-1 top-1 h-6 min-w-6"
                                                onClick={() =>
                                                    removeImage(index)
                                                }
                                            />
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        )}
                    </div>

                    <div>
                        <Text strong className="mb-2 block">
                            <span className="text-red-500">*</span> Video kiểm
                            tra sản phẩm
                        </Text>

                        <div className="relative mb-4 flex h-80 items-center justify-center overflow-hidden rounded-lg bg-gray-100">
                            <video
                                ref={recordVideoRef}
                                className={`h-full w-full object-cover ${isRecording ? 'block' : 'hidden'}`}
                                autoPlay
                                muted
                                playsInline
                            />
                            {!isRecording && (
                                <div className="text-center">
                                    <VideoCameraOutlined className="mb-2 text-6xl text-gray-400" />
                                    <div className="text-gray-500">
                                        Nhấn "Bắt đầu quay video" để bật camera
                                    </div>
                                </div>
                            )}

                            {isRecording && (
                                <div className="absolute left-4 top-4 flex items-center rounded-full bg-red-600 px-3 py-1 text-sm font-medium text-white">
                                    <div className="mr-2 h-2 w-2 animate-pulse rounded-full bg-white"></div>
                                    REC
                                </div>
                            )}
                        </div>

                        <Space wrap className="mb-4">
                            {!isRecording ? (
                                <Button
                                    type="primary"
                                    icon={<VideoCameraOutlined />}
                                    onClick={startVideoRecording}
                                    size="large"
                                    className="bg-blue-600 hover:bg-blue-700"
                                >
                                    Bắt đầu quay video
                                </Button>
                            ) : (
                                <Button
                                    icon={<StopOutlined />}
                                    onClick={stopVideoRecording}
                                    size="large"
                                    className="bg-red-600 text-white hover:bg-red-700"
                                >
                                    Dừng quay
                                </Button>
                            )}

                            <Upload
                                beforeUpload={handleVideoUpload}
                                showUploadList={false}
                                accept="video/*"
                                multiple
                            >
                                <Button icon={<UploadOutlined />} size="large">
                                    Tải video lên
                                </Button>
                            </Upload>
                        </Space>

                        {recordedVideos.length > 0 && (
                            <Row gutter={[8, 8]}>
                                {recordedVideos.map((video, index) => (
                                    <Col span={12} key={index}>
                                        <div className="relative">
                                            <video
                                                src={video}
                                                className="h-52 w-full rounded object-cover"
                                                controls
                                            />
                                            <Button
                                                type="primary"
                                                danger
                                                size="small"
                                                icon={<DeleteOutlined />}
                                                className="absolute right-1 top-1 h-6 min-w-6"
                                                onClick={() =>
                                                    removeVideo(index)
                                                }
                                            />
                                        </div>
                                    </Col>
                                ))}
                            </Row>
                        )}
                    </div>

                    <div>
                        <Text strong className="mb-2 block">
                            Ghi chú mô tả tình trạng
                        </Text>
                        <TextArea
                            placeholder="Ví dụ: Thiết bị nguyên vẹn, có vết trầy nhỏ cạnh trái. Đầy đủ phụ kiện sạc + túi đựng."
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            rows={4}
                            size="large"
                        />
                    </div>

                    <Checkbox
                        checked={isConfirmed}
                        onChange={(e) => setIsConfirmed(e.target.checked)}
                    >
                        Tôi xác nhận đã kiểm tra đầy đủ và thiết bị sẵn sàng bàn
                        giao
                    </Checkbox>

                    <Button
                        type="primary"
                        size="large"
                        onClick={handleSubmit}
                        className="h-12 w-full border-blue-900 bg-blue-900 hover:bg-blue-800"
                    >
                        Lưu tình trạng
                    </Button>
                </Space>
            </Card>
        </div>
    )
}
