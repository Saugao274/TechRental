'use client'

import { Form, Input, message } from 'antd'
import ButtonCommon from '@/components/core/common/ButtonCommon'
import { postRequest } from '@/request'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function ForgotPasswordPage() {
    const [form] = Form.useForm()
    const router = useRouter()

    const onFinish = async (v: { email: string }) => {
        const res: any = await postRequest('/api/auth/forgotPassword', {
            data: v,
        })
        if (res?.code === 200) {
            message.success('Đã gửi mã xác thực tới email')
            router.push(`/forgot-password/verify?email=${v.email}`)
        } else message.error(res?.message || 'Lỗi gửi mã')
    }

    return (
        <div className="mx-auto flex h-full min-h-screen w-full flex-col items-center justify-center gap-10 md:flex-row md:px-5">
            {/* ---------- Hình minh hoạ ---------- */}
            <div className="flex w-full flex-col items-center md:w-2/5">
                <Image
                    src="/icons/logo_full.png"
                    alt="logo"
                    width={300}
                    height={200}
                />
                <img
                    src="/images/auth.png"
                    className="w-2/3 md:w-full"
                    alt="Auth"
                />
            </div>

            {/* ---------- Form ---------- */}
            <div className="w-full md:w-2/5">
                <div className="w-full rounded-xl bg-gradient-to-b from-blue-100 to-blue-200 p-2 md:border">
                    <Form
                        layout="vertical"
                        form={form}
                        onFinish={onFinish}
                        className="flex flex-col gap-4 p-6"
                    >
                        <div className="text-center">
                            <p className="text-3xl font-bold text-primary">
                                Quên Mật Khẩu
                            </p>
                            <p className="italic">Chúng tôi sẽ hỗ trợ bạn!</p>
                        </div>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[{ required: true }, { type: 'email' }]}
                        >
                            <Input placeholder="Nhập email đã đăng ký" />
                        </Form.Item>

                        <ButtonCommon
                            htmlType="submit"
                            type="primary"
                            className="w-full"
                        >
                            Tiếp tục
                        </ButtonCommon>
                    </Form>
                    <div className="mt-5 flex flex-col items-center gap-2 pb-[20px]">
                        <div className="flex flex-row items-center gap-2">
                            <p>Hoặc đăng nhập với</p>
                            <div className="flex gap-5">
                                <img
                                    src="/social/google.png"
                                    alt="google"
                                    className="h-[30px] w-[30px]"
                                />
                                <img
                                    src="/social/facebook.png"
                                    alt="facebook"
                                    className="h-[30px] w-[30px]"
                                />
                            </div>
                        </div>

                        <div>
                            Bạn đã có tài khoản chưa?{' '}
                            <span
                                className="cursor-pointer text-primary underline"
                                onClick={() => router.push('/signUp')}
                            >
                                Đăng ký
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
