'use client'
import ButtonCommon from '@/components/core/common/ButtonCommon'
import {
    Avatar,
    Badge,
    Card,
    Divider,
    Modal,
    Input,
    Select,
    DatePicker,
    Upload,
    Button,
    message,
} from 'antd'
import {
    CalendarClock,
    Clock,
    ShieldCheck,
    ShieldQuestion,
    Star,
    User,
} from 'lucide-react'
import React, { useState } from 'react'
import { UploadOutlined } from '@ant-design/icons'

import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import * as faceapi from 'face-api.js'
import { CameraOutlined } from '@ant-design/icons'
import { useRef, useEffect } from 'react'
import webLocalStorage from '@/utils/webLocalStorage'

export default function PersonalProfile() {
    var videoRef = useRef<HTMLVideoElement>(null)
    const [isModelLoaded, setIsModelLoaded] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { user, updateIdentifier } = useAuth()
    const [gender, setGender] = useState('')
    const router = useRouter()
    const [capturedImage, setCapturedImage] = useState<string | null>(null)
    const [uploadedCCCDImageURL, setUploadedCCCDImageURL] = useState<
        string | null
    >(null)
    const streamRef = useRef<MediaStream | null>(null)

    const handleFrontCCCDUpload = (info: any) => {
        if (info.file.status === 'done') {
            const reader = new FileReader()
            reader.onload = () =>
                setUploadedCCCDImageURL(reader.result as string)
            reader.readAsDataURL(info.file.originFileObj)
        }
    }
    const loadModels = async () => {
        await faceapi.nets.tinyFaceDetector.loadFromUri(
            '/models/tiny_face_detector',
        )

        await faceapi.nets.faceLandmark68Net.loadFromUri(
            '/models/face_landmark_68',
        )
        await faceapi.nets.faceRecognitionNet.loadFromUri(
            '/models/face_recognition',
        )
        setIsModelLoaded(true)
    }
    const startVideo = async () => {
        await loadModels()
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
        })
        streamRef.current = stream
        if (videoRef.current) {
            videoRef.current.srcObject = stream
        }
    }
    useEffect(() => {
        const stopVideo = () => {
            if (streamRef.current) {
                streamRef.current.getTracks().forEach((track) => track.stop())
                streamRef.current = null
            }
            if (videoRef.current) {
                videoRef.current.srcObject = null
            }
        }

        if (!isModalOpen || capturedImage) {
            stopVideo()
        } else {
            startVideo()
        }

        return () => stopVideo()
    }, [isModalOpen, capturedImage])

    const OffCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream
            stream.getTracks().forEach((track) => track.stop())
            videoRef.current.srcObject = null
        }
    }
    const handleCaptureFace = async () => {
        if (!videoRef.current || !isModelLoaded) return

        const detection = await faceapi
            .detectSingleFace(
                videoRef.current,
                new faceapi.TinyFaceDetectorOptions(),
            )
            .withFaceLandmarks()
            .withFaceDescriptor()

        if (detection) {
            const descriptor = Array.from(detection.descriptor)
            webLocalStorage.set('faceDescriptor', JSON.stringify(descriptor))

            const canvas = document.createElement('canvas')
            canvas.width = videoRef.current.videoWidth
            canvas.height = videoRef.current.videoHeight
            const ctx = canvas.getContext('2d')
            if (ctx) {
                ctx.drawImage(
                    videoRef.current,
                    0,
                    0,
                    canvas.width,
                    canvas.height,
                )
                const imageData = canvas.toDataURL('image/jpeg')
                setCapturedImage(imageData)
            }

            message.success('Đã lưu khuôn mặt để xác thực sau này!')
        } else {
            message.error('Không nhận diện được khuôn mặt. Hãy thử lại.')
        }
    }

    const handleVerificationClick = () => {
        // setIsModalOpen(true)
        router.push('/personal/verification')
    }
    const extractFaceFromImage = async (imageUrl: string) => {
        const img = await faceapi.fetchImage(imageUrl)
        const detection = await faceapi
            .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceDescriptor()

        return detection?.descriptor || null
    }

    const compareDescriptors = (desc1: Float32Array, desc2: Float32Array) => {
        if (!desc1 || !desc2) {
            return false
        }
        const distance = faceapi.euclideanDistance(desc1, desc2)
        console.log(`Khoảng cách giữa các khuôn mặt: ${distance}`)
        return distance < 0.6
    }

    const handleOk = async () => {
        const webcamDescriptor = JSON.parse(
            webLocalStorage.get('faceDescriptor') || '[]',
        )
        if (
            !webcamDescriptor ||
            webcamDescriptor.length === 0 ||
            !uploadedCCCDImageURL
        ) {
            message.error('Chưa lưu khuôn mặt từ webcam.')
            return
        }

        const imageFile = uploadedCCCDImageURL

        const cccdDescriptor = await extractFaceFromImage(imageFile || '')

        if (!cccdDescriptor) {
            message.error('Không phát hiện khuôn mặt trong ảnh CCCD.')
            return
        }

        const isMatch = compareDescriptors(
            new Float32Array(webcamDescriptor),
            new Float32Array(cccdDescriptor),
        )

        if (isMatch) {
            updateIdentifier()
            message.success('Xác minh khuôn mặt thành công!')
            handleCancel()
        } else {
            message.error('Khuôn mặt không khớp với ảnh CCCD.')
        }
    }

    const handleCancel = () => {
        OffCamera()
        setCapturedImage(null)
        setIsModalOpen(false)
    }
    return (
        <main className="mx-auto flex w-full flex-col gap-5">
            {/* Greeting Header */}
            <div className="">
                <h1 className="text-2xl font-bold text-primary">
                    Xin chào, {user?.name}
                </h1>
                <p className="text-primary">
                    Chào mừng bạn đến với trang cá nhân của mình
                </p>
            </div>

            {/* Verification Status */}
            {user?.isVerified ? (
                <div className="border-green-4 00 flex items-center rounded-md border bg-green-50 p-4">
                    <ShieldCheck className="mr-2 hidden text-xl text-green-500 md:block" />
                    <div>
                        <h3 className="font-bold text-green-800">
                            Đã xác minh
                        </h3>
                        <p className="text-sm text-green-700">
                            Tài khoản của bạn đã được xác minh danh tính. Điều
                            này giúp tăng độ tin cậy và có thể thuê được sản
                            phẩm.
                        </p>
                    </div>
                </div>
            ) : (
                <div className="border-green-4 flex flex-col items-center gap-3 rounded-md border bg-red-50 p-4 md:flex-row">
                    <ShieldQuestion className="mr-2 hidden text-xl font-bold text-red-500 md:block" />
                    <div className="gap 2 flex flex-col">
                        <h3 className="mx-auto text-[16px] font-bold text-black md:mx-0">
                            Chưa xác minh
                        </h3>
                        <p className="text-[12px] text-black">
                            Tài khoản của bạn chưa được xác minh danh tính. Điều
                            này sẽ cản trở bạn trong việc thuê sản phẩm, hãy đi
                            đến định danh tài khoản để xác minh ngay!
                        </p>
                    </div>
                    <ButtonCommon
                        type="dashed"
                        onClick={handleVerificationClick}
                    >
                        Định danh tài khoản
                    </ButtonCommon>
                </div>
            )}
            <Modal
                title={
                    <h2 className="text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-center text-2xl font-bold text-transparent">
                        Đăng Ký Định Danh
                    </h2>
                }
                open={isModalOpen}
                onCancel={handleCancel}
                footer={
                    <Button
                        type="primary"
                        onClick={handleOk}
                        className="h-10 w-full rounded-md border-none bg-gradient-to-r from-green-500 to-teal-500 text-white transition-all duration-300 hover:from-green-600 hover:to-teal-600"
                    >
                        Hoàn tất
                    </Button>
                }
                width={600}
                className="rounded-xl"
                centered
            >
                <form className="space-y-5 p-4">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Họ và Tên
                        </label>
                        <Input
                            placeholder="Họ và Tên"
                            className="w-full rounded-md border-gray-300 transition-all duration-200 focus:border-blue-500 focus:ring focus:ring-blue-200"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Địa chỉ
                        </label>
                        <Input
                            placeholder="Địa chỉ"
                            className="w-full rounded-md border-gray-300 transition-all duration-200 focus:border-blue-500 focus:ring focus:ring-blue-200"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Quốc tịch
                        </label>
                        <Input
                            placeholder="Quốc tịch"
                            className="w-full rounded-md border-gray-300 transition-all duration-200 focus:border-blue-500 focus:ring focus:ring-blue-200"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Nơi cấp chứng từ
                        </label>
                        <Input
                            placeholder="Nơi cấp chứng từ"
                            className="w-full rounded-md border-gray-300 transition-all duration-200 focus:border-blue-500 focus:ring focus:ring-blue-200"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Giới Tính
                        </label>
                        <Select
                            value={gender}
                            onChange={(value) => setGender(value)}
                            placeholder="Chọn giới tính"
                            className="w-full"
                            popupClassName="rounded-md"
                        >
                            <Select.Option value="Nam">Nam</Select.Option>
                            <Select.Option value="Nữ">Nữ</Select.Option>
                            <Select.Option value="Khác">Khác</Select.Option>
                        </Select>
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Ngày, tháng, năm sinh
                        </label>
                        <DatePicker
                            placeholder="Chọn ngày"
                            className="w-full rounded-md border-gray-300 transition-all duration-200 focus:border-blue-500 focus:ring focus:ring-blue-200"
                            format="DD/MM/YYYY"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            CCCD/CMND
                        </label>
                        <Input
                            placeholder="CCCD/CMND"
                            className="w-full rounded-md border-gray-300 transition-all duration-200 focus:border-blue-500 focus:ring focus:ring-blue-200"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                            <label className="mb-2 block text-center text-sm font-medium text-gray-700">
                                Mặt trước CCCD/CMND
                            </label>
                            <Upload
                                listType="picture"
                                maxCount={1}
                                className="w-full"
                                onChange={handleFrontCCCDUpload}
                            >
                                <Button
                                    icon={<UploadOutlined />}
                                    className="w-full bg-blue-100 text-blue-700 transition-all duration-200 hover:bg-blue-200"
                                >
                                    Tải lên
                                </Button>
                            </Upload>
                        </div>
                        <div>
                            <label className="mb-2 block text-center text-sm font-medium text-gray-700">
                                Mặt sau CCCD/CMND
                            </label>
                            <Upload
                                listType="picture"
                                maxCount={1}
                                className="w-full"
                            >
                                <Button
                                    icon={<UploadOutlined />}
                                    className="w-full bg-blue-100 text-blue-700 transition-all duration-200 hover:bg-blue-200"
                                >
                                    Tải lên
                                </Button>
                            </Upload>
                        </div>
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Xác thực khuôn mặt
                        </label>
                        <div className="flex flex-col items-center space-y-2">
                            {capturedImage ? (
                                <img
                                    src={capturedImage}
                                    alt="Ảnh khuôn mặt đã chụp"
                                    className="rounded-md border"
                                    width="300"
                                />
                            ) : (
                                <video
                                    ref={videoRef}
                                    autoPlay
                                    muted
                                    width="300"
                                    className="rounded-md border"
                                />
                            )}

                            {!capturedImage ? (
                                <Button
                                    icon={<CameraOutlined />}
                                    onClick={handleCaptureFace}
                                    className="bg-blue-500 text-white hover:bg-blue-600"
                                >
                                    Chụp và lưu khuôn mặt
                                </Button>
                            ) : (
                                <Button
                                    onClick={() => {
                                        setCapturedImage(null)
                                        setIsModelLoaded(false)
                                    }}
                                    className="bg-yellow-500 text-white hover:bg-yellow-600"
                                >
                                    Thử lại
                                </Button>
                            )}
                        </div>
                    </div>
                </form>
            </Modal>

            {/* User? Profile Card */}
            <Card className="shadow-sm">
                <div className="flex flex-col gap-2 md:flex-col">
                    <div className="mb-4 flex items-center md:mb-0 md:mr-6">
                        <Avatar
                            size={64}
                            icon={<User />}
                            className="bg-gray-300"
                        />
                        <div className="ml-4">
                            <h2 className="text-lg font-bold">{user?.name}</h2>
                            <p className="text-sm text-gray-500">
                                Thành viên · Tham gia từ: {user?.joinDate}
                            </p>
                        </div>
                    </div>

                    <Divider
                        type="vertical"
                        className="hidden h-auto md:block"
                    />

                    <div className="grid flex-grow grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <h3 className="text-sm text-gray-500">Email</h3>
                            <p>{user?.email}</p>
                        </div>
                        <div>
                            <h3 className="text-sm text-gray-500">Địa chỉ</h3>
                            <p>{user?.address}</p>
                        </div>
                        <div>
                            <h3 className="text-sm text-gray-500">
                                Số điện thoại
                            </h3>
                            <p>{user?.phone}</p>
                        </div>
                        <div>
                            <h3 className="text-sm text-gray-500">
                                Trạng thái
                            </h3>
                            {user?.isVerified ? (
                                <Badge status="success" text="Đã xác thực" />
                            ) : (
                                <Badge status="error" text="Chưa xác thực" />
                            )}
                        </div>
                    </div>
                </div>
                <div
                    className="mt-4 flex justify-end"
                    onClick={() => {
                        router.push('/personal/update-info')
                    }}
                >
                    <ButtonCommon type="primary" className="bg-blue-500">
                        Cập nhật thông tin
                    </ButtonCommon>
                </div>
            </Card>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {/* Owned Products */}
                <Card className="shadow-sm">
                    <div className="mb-2 flex flex-row-reverse items-center justify-between">
                        <Star className="text-primary" />
                        <h3 className="font-medium">Danh giá sản phẩm</h3>
                    </div>
                    <h2 className="text-xl font-bold text-blue-800">
                        {user?.ownedProducts} sản phẩm
                    </h2>
                    <p className="text-sm text-gray-500">đã đăng bán</p>
                    <ButtonCommon
                        variant="outlined"
                        className="mt-2 w-full p-0 text-primary"
                    >
                        Xem chi tiết
                    </ButtonCommon>
                </Card>

                {/* Renting Products */}
                <Card className="shadow-sm">
                    <div className="mb-2 flex flex-row-reverse items-center justify-between">
                        <Clock className="text-primary" />
                        <h3 className="font-medium">Thời gian thuê hàng</h3>
                    </div>
                    <h2 className="text-xl font-bold text-blue-800">
                        {user?.rentingProducts} sản phẩm
                    </h2>
                    <p className="text-sm text-gray-500">đang thuê</p>
                    <ButtonCommon
                        variant="outlined"
                        className="mt-2 w-full p-0 text-primary"
                    >
                        Xem chi tiết
                    </ButtonCommon>
                </Card>

                {/* Rented Products */}
                <Card className="shadow-sm">
                    <div className="mb-2 flex flex-row-reverse items-center justify-between">
                        <CalendarClock className="text-primary" />
                        <h3 className="font-medium">Lịch sử thuê</h3>
                    </div>
                    <h2 className="text-xl font-bold text-blue-800">
                        {user?.rentedProducts} sản phẩm
                    </h2>
                    <p className="text-sm text-gray-500">đã thuê</p>
                    <ButtonCommon
                        variant="outlined"
                        className="mt-2 w-full p-0 text-primary"
                    >
                        Xem chi tiết
                    </ButtonCommon>
                </Card>
            </div>

            {/* Landlord Information */}
            <div className="">
                <h2 className="mb-4 text-lg font-bold">
                    Thông tin người cho thuê
                </h2>
                {!user?.registeredLessorr ? (
                    <Card className="flex items-center">
                        <div className="flex flex-row items-center gap-5">
                            <Avatar
                                size={48}
                                icon={<User />}
                                className="mr-4 bg-gray-300"
                            />
                            <div>
                                <h3 className="font-medium">
                                    Bạn chưa đăng ký làm người cho thuê
                                </h3>
                                <p className="mb-2 text-sm text-gray-500">
                                    Đăng ký ngay để bắt đầu cho thuê sản phẩm
                                    của bạn
                                </p>
                                <ButtonCommon type="primary">
                                    Đăng ký ngay
                                </ButtonCommon>
                            </div>
                        </div>
                    </Card>
                ) : (
                    <Card>
                        <p>Bạn đã đăng ký làm người cho thuê</p>
                    </Card>
                )}
            </div>
        </main>
    )
}
