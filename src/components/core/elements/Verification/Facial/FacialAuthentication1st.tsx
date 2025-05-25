'use client'
import SectionCommon from '@/components/core/common/SectionCommon'
import { StepProps } from '@/components/modules/Profile/Personal/Verification'
import { Button, message } from 'antd'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import ButtonCommon from '@/components/core/common/ButtonCommon'
import { ArrowLeft } from 'lucide-react'
import {
    loadFaceApiModels,
    getFaceDescriptorFromImageURL,
    getFaceDescriptorFromVideo,
    compareFaceDescriptors,
} from '@/libs/face-verification'
import {
    FONT_INFO_IMAGE,
    VERIFY_COUNTRY_KEY,
    VERIFY_DOC_KEY,
    VERIFY_INFO_KEY,
} from '../VerifyCountry'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'

export default function FacialAuthentication1st({ setStep }: StepProps) {
    const [image, setImage] = useState<string | null>(null)
    const [phase1st, setPhase1st] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [cameraOn, setCameraOn] = useState(false)
    const [rotation, setRotation] = useState(0)
    const streamRef = useRef<MediaStream | null>(null)
    const { updateIdentifier, user } = useAuth()
    const router = useRouter()

    const beforeUpload = (file: File) => {
        stopCamera()
        const reader = new FileReader()
        reader.onload = () => {
            setImage(reader.result as string)
        }
        reader.readAsDataURL(file)
        return false
    }

    const startCamera = async () => {
        try {
            setCameraOn(true)
            setImage(null)
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
            })
            streamRef.current = stream
            if (videoRef.current) videoRef.current.srcObject = stream
        } catch (err) {
            message.error('Không thể truy cập camera')
        }
    }

    const stopCamera = () => {
        streamRef.current?.getTracks().forEach((track) => track.stop())
        setCameraOn(false)
    }

    const captureImage = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current
            const canvas = canvasRef.current
            canvas.width = video.videoWidth
            canvas.height = video.videoHeight
            const context = canvas.getContext('2d')
            if (context) {
                context.translate(canvas.width, 0)
                context.scale(-1, 1)
                context.drawImage(video, 0, 0, canvas.width, canvas.height)
                const dataUrl = canvas.toDataURL('image/png')
                setImage(dataUrl)
                stopCamera()
            }
        }
    }

    const rotateImage = () => {
        setRotation((prev) => (prev + 90) % 360)
    }

    useEffect(() => {
        return () => {
            stopCamera()
        }
    }, [])

    return (
        <SectionCommon className="flex flex-col gap-4">
            <div className="mb-4">
                <h1 className="flex w-full items-center justify-center text-2xl font-bold text-primary">
                    Xác nhận khuôn mặt
                </h1>
            </div>
            <div
                className="mb-4 flex h-60 w-full items-center justify-center overflow-hidden rounded-xl bg-gray-200"
                style={{ width: '500px', height: '300px', margin: '0 auto' }}
            >
                {image ? (
                    <Image
                        src={image}
                        alt="Uploaded Face"
                        width={500}
                        height={300}
                        className="h-[300px] w-[500px] object-cover"
                        style={{ transform: `rotate(${rotation}deg)` }}
                    />
                ) : cameraOn ? (
                    <video
                        ref={videoRef}
                        autoPlay
                        className="h-[300px] w-[500px] rounded-xl object-cover"
                    />
                ) : (
                    <span className="text-gray-400">Bật camera</span>
                )}
            </div>

            <div className="flex flex-col items-center justify-center gap-2">
                <div className="flex flex-wrap gap-2">
                    <Button
                        onClick={() => {
                            startCamera()
                            setPhase1st(true)
                        }}
                        disabled={cameraOn}
                        type="primary"
                    >
                        Bắt đầu ghi hình
                    </Button>
                </div>

                <p className="mt-2 font-bold">
                    Nhìn vào camera và giữ thẳng đầu
                </p>

                <ul className="mb-4 list-disc pl-5 text-left text-sm text-gray-700">
                    <li>
                        Hệ thống sẽ quay một đoạn video ngắn để xác minh bạn là
                        người thật.
                    </li>
                    <li>Làm theo hướng dẫn trên màn hình</li>
                    <li>
                        Không đội mũ, không đeo kính, giữ khuôn mặt rõ ràng, ánh
                        sáng đầy đủ.
                    </li>
                    <li>
                        Đặt thiết bị ngang tầm mắt và giữ yên trong vài giây
                    </li>
                </ul>

                <canvas ref={canvasRef} className="hidden" />
            </div>

            <div className="flex justify-center gap-2">
                <ButtonCommon
                    type="default"
                    className="w-1/3 rounded-lg bg-gray-200 px-4 py-2 text-primary hover:bg-gray-300"
                    onClick={() => {
                        stopCamera()
                        setStep('fontCCCD')
                    }}
                >
                    <ArrowLeft />
                    Quay lại
                </ButtonCommon>
                <ButtonCommon
                    type="primary"
                    className="w-1/3 rounded-lg bg-primary px-4 py-2 text-white hover:bg-blue-700"
                    htmlType="submit"
                    onClick={async () => {
                        if (!phase1st || !videoRef.current) {
                            message.warning('Vui lòng xác nhận khuôn mặt trước')
                            return
                        }

                        await loadFaceApiModels()

                        const webcamDesc = await getFaceDescriptorFromVideo(
                            videoRef.current,
                        )
                        if (!webcamDesc) {
                            message.error(
                                'Không nhận diện được khuôn mặt từ camera.',
                            )
                            return
                        }

                        const cccdImageUrl =
                            localStorage.getItem(FONT_INFO_IMAGE)
                        if (!cccdImageUrl) {
                            message.error('Không tìm thấy ảnh CCCD.')
                            return
                        }

                        const cccdDesc =
                            await getFaceDescriptorFromImageURL(cccdImageUrl)
                        if (!cccdDesc) {
                            message.error(
                                'Không nhận diện được khuôn mặt từ CCCD.',
                            )
                            return
                        }

                        const isMatch = compareFaceDescriptors(
                            webcamDesc,
                            cccdDesc,
                        )
                        if (isMatch) {
                            message.success('Xác minh khuôn mặt thành công!')
                            updateIdentifier()
                            localStorage.removeItem(VERIFY_COUNTRY_KEY)
                            localStorage.removeItem(VERIFY_INFO_KEY)
                            localStorage.removeItem(VERIFY_DOC_KEY)
                            localStorage.removeItem(FONT_INFO_IMAGE)

                            router.push(`/personal/${user?._id}`)
                        } else {
                            message.error('Khuôn mặt không khớp với ảnh CCCD.')
                        }
                    }}
                >
                    Nhận diện gương mặt
                </ButtonCommon>
            </div>
        </SectionCommon>
    )
}
