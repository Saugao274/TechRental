import React, { useRef, useState } from 'react'
import { Button, Upload } from 'antd'
import {
    UploadOutlined,
    CameraOutlined,
    RotateRightOutlined,
} from '@ant-design/icons'
import Image from 'next/image'
import SectionCommon from '@/components/core/common/SectionCommon'
import ButtonCommon from '@/components/core/common/ButtonCommon'
import { ArrowLeft } from 'lucide-react'
import type { StepProps } from '@/components/modules/Profile/Personal/Verification'

const BackCCCD = ({ setStep }: StepProps) => {
    const [image, setImage] = useState<string | null>(null)
    const videoRef = useRef<HTMLVideoElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [cameraOn, setCameraOn] = useState(false)
    const [rotation, setRotation] = useState(0)

    const beforeUpload = (file: File) => {
        setCameraOn(false)
        const reader = new FileReader()
        reader.onload = () => {
            setImage(reader.result as string)
        }
        reader.readAsDataURL(file)
        return false
    }

    const startCamera = async () => {
        setCameraOn(true)
        setImage(null)
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
        })
        if (videoRef.current) videoRef.current.srcObject = stream
    }

    const capturePhoto = () => {
        if (!videoRef.current || !canvasRef.current) return
        const video = videoRef.current
        const canvas = canvasRef.current
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        const ctx = canvas.getContext('2d')
        ctx?.drawImage(video, 0, 0)
        const imageData = canvas.toDataURL('image/png')
        setImage(imageData)
        setCameraOn(false)
        if (video.srcObject) {
            const tracks = (video.srcObject as MediaStream).getTracks()
            tracks.forEach((track) => track.stop())
        }
    }

    return (
        <SectionCommon className="flex flex-col gap-4">
            <div className="mb-4">
                <h1 className="flex w-full items-center justify-center text-2xl font-bold text-primary">
                    Căn cước công dân
                </h1>
            </div>
            <div
                className="mb-4 flex h-60 w-full items-center justify-center overflow-hidden rounded-xl bg-gray-200"
                style={{ width: '500px', height: '300px', margin: '0 auto' }}
            >
                {image ? (
                    <Image
                        src={image}
                        alt="Uploaded CCCD"
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
                    <span className="text-gray-400">Chưa có ảnh</span>
                )}
            </div>

            <div className="flex w-full flex-col items-center justify-center gap-2">
                <h2 className="text-xl font-bold text-primary">Mặt sau</h2>

                <ul className="mb-4 list-disc pl-5 text-sm text-gray-700">
                    <li>Chụp rõ ràng toàn bộ giấy tờ tùy thân của bạn.</li>
                    <li>
                        Đảm bảo các thông tin hiển thị rõ nét, không bị mờ hoặc
                        lóa.
                    </li>
                    <li>Sử dụng giấy tờ bản gốc, còn hiệu lực.</li>
                    <li>Đặt giấy tờ trên nền phẳng, màu đơn sắc để dễ nhận.</li>
                </ul>

                <div className="flex justify-center gap-2">
                    <Upload
                        showUploadList={false}
                        beforeUpload={beforeUpload}
                        accept="image/*"
                    >
                        <Button icon={<UploadOutlined />}>Tải lên</Button>
                    </Upload>
                    <Button
                        icon={<CameraOutlined />}
                        onClick={startCamera}
                        disabled={cameraOn}
                    >
                        Chụp ảnh
                    </Button>
                    <Button
                        icon={<RotateRightOutlined />}
                        onClick={() => setRotation((r) => r + 90)}
                    >
                        Xoay
                    </Button>
                </div>

                <canvas ref={canvasRef} className="hidden" />

                {cameraOn && (
                    <div className="mt-2 text-center">
                        <Button type="dashed" onClick={capturePhoto}>
                            Chụp và lưu
                        </Button>
                    </div>
                )}
            </div>

            <div className="flex justify-center gap-2">
                <ButtonCommon
                    type="default"
                    className="w-1/3 rounded-lg bg-gray-200 px-4 py-2 text-primary hover:bg-gray-300"
                    onClick={() => setStep('fontCCCD')}
                >
                    <ArrowLeft />
                    Quay lại
                </ButtonCommon>
                <ButtonCommon
                    type="primary"
                    className="w-1/3 rounded-lg bg-primary px-4 py-2 text-white hover:bg-blue-700"
                    htmlType="submit"
                >
                    Tiếp tục
                </ButtonCommon>
            </div>
        </SectionCommon>
    )
}

export default BackCCCD
