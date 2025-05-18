import React, { useEffect, useState } from 'react'
import { Form, message } from 'antd'
import type { StepProps } from '@/components/modules/Profile/Personal/Verification'
import SectionCommon from '../../common/SectionCommon'
import { ArrowLeft } from 'lucide-react'
import ButtonCommon from '../../common/ButtonCommon'
import Image from 'next/image'
import imgDocument from '/public/images/Verify/VerifyDocument.png'
import { VERIFY_DOC_KEY } from './VerifyCountry'

const VerifyGuideline = ({ setStep }: StepProps) => {
    const [form] = Form.useForm()
    const [valueDoc, setValueDoc] = useState()
    useEffect(() => {
        const saved = localStorage.getItem(VERIFY_DOC_KEY)

        if (saved) {
            try {
                const parsed = JSON.parse(saved)
                setValueDoc(parsed)
            } catch (error) {}
        }
    }, [form])

    return (
        <SectionCommon className="flex flex-col gap-4">
            <div className="mb-4">
                <h1 className="text-2xl font-bold text-primary">
                    Xác minh giấy tờ
                </h1>
                <p className="italic text-primary">
                    Tải ảnh lên hoặc chụp cả hai mặt giấy tờ tuỳ thân do chính
                    phủ cấp cho bạn
                </p>
            </div>
            <Image src={imgDocument} alt={''} width={300} height={300} />

            <ul className="flex list-disc flex-col gap-2 font-medium">
                <li>Chụp rõ ràng toàn bộ giấy tờ tùy thân của bạn.</li>
                <li>
                    Đảm bảo các thông tin hiển thị rõ nét, không bị mờ hoặc lóa
                    sáng.
                </li>
                <li>Sử dụng giấy tờ bản gốc, còn hiệu lực.</li>

                <li>Đặt giấy tờ trên nền phẳng, màu đơn sắc để dễ nhận dạng</li>
            </ul>
            <div className="mt-4 flex w-1/2 gap-2">
                <ButtonCommon
                    type="default"
                    className="w-1/3 rounded-lg bg-gray-200 px-4 py-2 text-primary hover:bg-gray-300"
                    onClick={() => setStep('document')}
                >
                    <ArrowLeft />
                    Quay lại
                </ButtonCommon>
                <ButtonCommon
                    type="primary"
                    className="w-1/3 rounded-lg bg-primary px-4 py-2 text-white hover:bg-blue-700"
                    htmlType="submit"
                    onClick={() => {
                        if (valueDoc === 'cccd') {
                            setStep('fontCCCD')
                            return
                        }
                        if (valueDoc === 'bl') {
                            setStep('fontLicense')
                            return
                        }
                        setStep('passport')
                    }}
                >
                    Tiếp tục
                </ButtonCommon>
            </div>
        </SectionCommon>
    )
}

export default VerifyGuideline
