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
} from 'antd'
import {
    CameraOutlined,
    VideoCameraOutlined,
    StopOutlined,
    UploadOutlined,
    DeleteOutlined,
} from '@ant-design/icons'
import { useParams } from 'next/navigation'

const { Title, Text } = Typography
const { TextArea } = Input

export default function ConfirmProducts() {
    const params = useParams()
    const { orderId } = params
    const [selectedOrder, setSelectedOrder] = useState('')
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

    const handleImageUpload = (file: File) => {
        const reader = new FileReader()
        reader.onload = (e) => {
            if (e.target?.result) {
                setCapturedImages((prev) => [
                    ...prev,
                    e?.target?.result as string,
                ])
                message.success('Đã tải ảnh lên thành công')
            }
        }
        reader.readAsDataURL(file)
        return false
    }

    const handleVideoUpload = (file: File) => {
        const videoUrl = URL.createObjectURL(file)
        setRecordedVideos((prev) => [...prev, videoUrl])
        message.success('Đã tải video lên thành công')
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

    const handleSubmit = () => {
        if (!selectedOrder) {
            message.error('Vui lòng chọn đơn hàng')
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
        message.success('Báo cáo đã được gửi thành công!')
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
                        <Select
                            placeholder="Chọn đơn hàng"
                            className="!h-[80px] w-full !pb-2"
                            size="large"
                            value={selectedOrder}
                            onChange={setSelectedOrder}
                            options={orderOptions}
                        />
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
