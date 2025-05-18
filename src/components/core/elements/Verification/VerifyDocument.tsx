import React, { useEffect, useState } from 'react'
import { Form, Select } from 'antd'
import type { StepProps } from '@/components/modules/Profile/Personal/Verification'
import SectionCommon from '../../common/SectionCommon'
import { ArrowLeft, Contact, Flag, GlobeIcon, IdCard } from 'lucide-react'
import ButtonCommon from '../../common/ButtonCommon'
const VERIFY_COUNTRY_KEY = 'verify-country-step'
const documentTypes = [
    {
        value: 'cccd',
        label: 'Căn cước công dân',
        icon: <Contact style={{ fontSize: 20 }} />,
        recommended: true,
    },
    {
        value: 'bl',
        label: 'Bằng lái',
        icon: <IdCard style={{ fontSize: 20 }} />,
        recommended: false,
    },
    {
        value: 'passport',
        label: 'Hộ chiếu',
        icon: <GlobeIcon style={{ fontSize: 20 }} />,
        recommended: false,
    },
]

const VerifyDocument = ({ setStep }: StepProps) => {
    const [selectedDoc, setSelectedDoc] = useState('cccd')
    const [form] = Form.useForm()

    useEffect(() => {
        const saved = localStorage.getItem(VERIFY_COUNTRY_KEY)
        if (saved) {
            try {
                const parsed = JSON.parse(saved)
                if (parsed?.residence) {
                    form.setFieldsValue({ nationality: parsed.residence })
                }
            } catch (error) {
                console.error('Không thể đọc verify-country-step:', error)
            }
        }
    }, [form])

    return (
        <SectionCommon className="flex flex-col gap-4">
            <div className="mb-4">
                <h1 className="text-2xl font-bold text-primary">
                    Xác minh giấy tờ
                </h1>
                <p className="italic text-primary">
                    Giấy tờ của bạn sẽ được sử dụng để xác minh danh tính trong
                    quá trình thuê thiết bị
                </p>
            </div>
            <Form.Item
                label="Quốc gia/khu vực cấp giấy tờ"
                name="nationality"
                layout="vertical"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng chọn quốc tịch',
                    },
                ]}
            >
                <Select
                    disabled
                    style={{ width: 300 }}
                    placeholder="Quốc tịch"
                    optionFilterProp="label"
                    options={[
                        {
                            value: 'vn',
                            label: (
                                <div className="flex items-center gap-2">
                                    <Flag />
                                    <span>Việt Nam</span>
                                </div>
                            ),
                        },
                        {
                            value: 'us',
                            label: (
                                <div className="flex items-center gap-2">
                                    <Flag />
                                    <span>United States</span>
                                </div>
                            ),
                        },
                    ]}
                />
            </Form.Item>

            <div>
                <label className="mb-2 block text-sm font-medium">
                    Loại giấy tờ
                </label>
                <div className="flex w-1/2 flex-col gap-4">
                    {documentTypes.map((doc) => (
                        <div
                            key={doc.value}
                            onClick={() => setSelectedDoc(doc.value)}
                            className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition-all ${
                                selectedDoc === doc.value
                                    ? 'border-[#2d5eff] bg-[#e4efff]'
                                    : 'border-[#000] border-opacity-50 bg-white'
                            }`}
                        >
                            <div className="flex items-center gap-4">
                                {doc.icon}
                                <span className="flex flex-col text-base font-medium">
                                    {doc.label}
                                    {doc.recommended && (
                                        <span className="w-1/2 rounded-lg bg-[#173fa6] px-3 py-1 text-xs text-white">
                                            Đề xuất
                                        </span>
                                    )}
                                </span>
                            </div>
                            <div
                                className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                                    selectedDoc === doc.value
                                        ? 'border-[#2d5eff]'
                                        : 'border-gray-500'
                                }`}
                            >
                                {selectedDoc === doc.value && (
                                    <div className="h-2.5 w-2.5 rounded-full bg-[#2d5eff]" />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-4 flex w-1/2 gap-2">
                <ButtonCommon
                    type="default"
                    className="w-1/3 rounded-lg bg-gray-200 px-4 py-2 text-primary hover:bg-gray-300"
                    onClick={() => setStep((prev) => prev - 1)}
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

export default VerifyDocument
