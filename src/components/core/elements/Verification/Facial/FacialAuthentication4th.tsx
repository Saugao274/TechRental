'use client'
import SectionCommon from '@/components/core/common/SectionCommon'
import { Button, message } from 'antd'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import ButtonCommon from '@/components/core/common/ButtonCommon'
import { ArrowLeft } from 'lucide-react'
import { StepProps } from '@/components/modules/Profile/Personal/Verification'

export default function FacialAuthentication4th({ setStep }: StepProps) {
    const [image, setImage] = useState<string | null>(null)
    const [phase4th, setPhase4th] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [cameraOn, setCameraOn] = useState(false)
    const [rotation, setRotation] = useState(0)
    const streamRef = useRef<MediaStream | null>(null)

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
                            setPhase4th(true)
                        }}
                        disabled={cameraOn}
                        type="primary"
                    >
                        Bắt đầu ghi hình
                    </Button>
                </div>

                <p className="mt-2 font-bold">
                    Quay đầu sang trái
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
                        setStep('facialAuthentication3nd')
                    }}
                >
                    <ArrowLeft />
                    Quay lại
                </ButtonCommon>
                <ButtonCommon
                    type="primary"
                    className="w-1/3 rounded-lg bg-primary px-4 py-2 text-white hover:bg-blue-700"
                    htmlType="submit"
                    onClick={() => {
                        if (!phase4th) {
                            message.warning('Vui lòng xác nhận khuôn mặt trước')
                        } else {
                            stopCamera()
                            setStep('country')
                        }
                    }}
                >
                    Tiếp tục
                </ButtonCommon>
            </div>
        </SectionCommon>
    )
}
