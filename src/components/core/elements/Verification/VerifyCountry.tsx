'use client'

import React from 'react'
import SectionCommon from '../../common/SectionCommon'
import { Form, Select } from 'antd'
import { Flag, IdCard, ScanFace, UserPen } from 'lucide-react'
import ButtonCommon from '../../common/ButtonCommon'
import { type StepProps } from '@/components/modules/Profile/Personal/Verification'
import { useFormAutoSave } from '@/hooks/useFormAutoSave'

const VERIFY_COUNTRY_KEY = 'verify-country-step'

const VerifyCountry = ({ setStep }: StepProps) => {
    const [form] = Form.useForm()
    const { onValuesChange } = useFormAutoSave(form, VERIFY_COUNTRY_KEY)

    const onFinish = () => {
        setStep(2)
    }

    return (
        <SectionCommon className="flex flex-col gap-4">
            <div className="mb-4">
                <h1 className="text-2xl font-bold text-primary">
                    Định danh tài khoản ngay
                </h1>
                <p className="italic text-primary">
                    Chọn nơi cư trú và thực hiện các bước sau
                </p>
            </div>

            <Form
                form={form}
                onFinish={onFinish}
                onValuesChange={onValuesChange}
                layout="vertical"
                className="flex flex-col gap-4"
            >
                <Form.Item
                    label="Địa chỉ thường trú"
                    name="residence"
                    rules={[
                        { required: true, message: 'Vui lòng chọn nơi cư trú' },
                    ]}
                >
                    <Select
                        style={{ width: 300 }}
                        placeholder="Chọn quốc gia"
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

                <div className="flex flex-col gap-4">
                    <p className="font-bold">
                        Hoàn tất các bước sau để xác minh tài khoản
                    </p>
                    <div className="flex flex-col gap-2">
                        <p className="flex gap-2">
                            <UserPen /> Thông tin cá nhân
                        </p>
                        <p className="flex gap-2">
                            <IdCard /> Giấy tờ tuỳ thân do chính phủ cấp
                        </p>
                        <p className="flex gap-2">
                            <ScanFace /> Xác nhận khuôn mặt
                        </p>
                    </div>
                </div>

                {/* Nút tiếp tục */}
                <ButtonCommon
                    type="primary"
                    className="mt-4 w-1/6 rounded-lg bg-primary px-4 py-2 text-white hover:bg-blue-700"
                    htmlType="submit"
                >
                    Tiếp tục
                </ButtonCommon>
            </Form>
        </SectionCommon>
    )
}

export default VerifyCountry
