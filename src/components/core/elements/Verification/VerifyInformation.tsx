'use client'

import React, { useEffect } from 'react'
import SectionCommon from '../../common/SectionCommon'
import { Select, Input, DatePicker, Form, BackTop } from 'antd'
import { ArrowLeft, Flag } from 'lucide-react'
import ButtonCommon from '../../common/ButtonCommon'
import { type StepProps } from '@/components/modules/Profile/Personal/Verification'
import { useFormAutoSave } from '@/hooks/useFormAutoSave'
import TextArea from 'antd/es/input/TextArea'
import { VERIFY_COUNTRY_KEY, VERIFY_INFO_KEY } from './VerifyCountry'
import dayjs from 'dayjs'

const VerifyInformation = ({ setStep }: StepProps) => {
    const [form] = Form.useForm()
    const { onValuesChange } = useFormAutoSave(form, VERIFY_INFO_KEY)
    const savedCountry = localStorage.getItem(VERIFY_COUNTRY_KEY)
    const saveInfo = localStorage.getItem(VERIFY_INFO_KEY)

    useEffect(() => {
        if (savedCountry) {
            try {
                const parsed = JSON.parse(savedCountry)
                if (parsed?.residence) {
                    form.setFieldsValue({ nationality: parsed.residence })
                }
            } catch (error) {
                console.error('Không thể đọc verify-country-step:', error)
            }
        }

        if (saveInfo) {
            try {
                const parsed = JSON.parse(saveInfo)
                if (parsed?.dob && typeof parsed.dob === 'string') {
                    parsed.dob = dayjs(parsed.dob)
                }
                form.setFieldsValue(parsed)
            } catch (error) {
                console.error('Không thể đọc verify-info-step:', error)
            }
        }
    }, [form])

    const onFinish = (values: any) => {
        localStorage.setItem(VERIFY_INFO_KEY, JSON.stringify(values))
        setStep('document')
    }

    return (
        <div className="flex flex-col gap-4">
            <SectionCommon className="flex flex-col gap-4">
                <div className="mb-4">
                    <h1 className="text-2xl font-bold text-primary">
                        Thông tin cá nhân
                    </h1>
                    <p className="italic text-primary">
                        Vui lòng cung cấp các thông tin sau theo thông tin có
                        trên hộ chiếu hoặc thẻ căn cước của bạn.
                    </p>
                </div>

                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    className="flex w-1/2 flex-col gap-4"
                    onValuesChange={onValuesChange}
                >
                    <Form.Item
                        label="Quốc tịch"
                        name="nationality"
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
                            placeholder="Chọn quốc tịch"
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

                    <Form.Item
                        label="Tên đầy đủ"
                        name="fullName"
                        rules={[
                            { required: true, message: 'Vui lòng nhập họ tên' },
                        ]}
                    >
                        <Input placeholder="Nhập họ tên trên giấy tờ" />
                    </Form.Item>

                    <Form.Item
                        label="Ngày tháng năm sinh"
                        name="dob"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn ngày sinh',
                            },
                        ]}
                    >
                        <DatePicker
                            style={{ width: 300 }}
                            format="DD/MM/YYYY"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Tỉnh/Thành phố"
                        name="city"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tỉnh/thành phố',
                            },
                        ]}
                    >
                        <Input placeholder="Ví dụ: Hà Nội, TP.HCM..." />
                    </Form.Item>

                    <Form.Item
                        label="Phường/Xã"
                        name="ward"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập phường/xã',
                            },
                        ]}
                    >
                        <Input placeholder="Nhập phường/xã" />
                    </Form.Item>

                    <Form.Item
                        label="Tên đường, tòa nhà, số nhà"
                        name="address"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập địa chỉ chi tiết',
                            },
                        ]}
                    >
                        <TextArea
                            placeholder="Ví dụ: 123 Nguyễn Văn Cừ, Tòa nhà A1..."
                            rows={2}
                        />
                    </Form.Item>
                    <div className="mt-4 flex w-full gap-2">
                        <ButtonCommon
                            type="default"
                            className="w-1/3 rounded-lg bg-gray-200 px-4 py-2 text-primary hover:bg-gray-300"
                            onClick={() => setStep('country')}
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
                </Form>
            </SectionCommon>
        </div>
    )
}

export default VerifyInformation
