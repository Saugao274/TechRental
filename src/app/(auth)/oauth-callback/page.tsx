'use client'

import { useAuth } from '@/context/AuthContext'
import { message } from 'antd'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import constants from '@/settings/constants'
import webStorageClient from '@/utils/webStorageClient'

const OAuthCallback = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const { login } = useAuth()
    const [processing, setProcessing] = useState(true)

    useEffect(() => {
        const handleOAuthCallback = async () => {
            try {
                const token = searchParams.get('token')
                const userParam = searchParams.get('user')
                const error = searchParams.get('error')

                if (error) {
                    console.error('OAuth error:', error)
                    message.error('Đăng nhập Google thất bại')
                    router.replace('/signIn?error=oauth_failed')
                    return
                }

                if (token && userParam) {
                    try {
                        const user = JSON.parse(decodeURIComponent(userParam))
                        const role = user.roles?.[0] ?? 'guest'

                        // Lưu thông tin user và token
                        login(user, token)
                        webStorageClient.set(constants.ACCESS_TOKEN, token)
                        localStorage.setItem('role', role)
                        localStorage.setItem('userId', user._id)

                        // Kiểm tra redirect URL
                        const storedRedirect = localStorage.getItem('redirectAfterLogin')
                        localStorage.removeItem('redirectAfterLogin')

                        const redirectUrl =
                            storedRedirect || (role === 'admin' ? '/admin/dashboard' : '/')

                        message.success('Đăng nhập Google thành công!')
                        router.replace(redirectUrl)
                    } catch (error) {
                        console.error('Error parsing user data:', error)
                        message.error('Dữ liệu người dùng không hợp lệ')
                        router.replace('/signIn?error=invalid_data')
                    }
                } else {
                    message.error('Không nhận được thông tin đăng nhập')
                    router.replace('/signIn?error=no_token')
                }
            } catch (error) {
                console.error('OAuth callback error:', error)
                message.error('Có lỗi xảy ra trong quá trình đăng nhập')
                router.replace('/signIn?error=callback_error')
            } finally {
                setProcessing(false)
            }
        }

        handleOAuthCallback()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) // <-- chỉ chạy 1 lần

    const handleOAuthError = (error: string) => {
        switch (error) {
            case 'oauth_failed':
                return 'Đăng nhập Google thất bại'
            case 'server_error':
                return 'Lỗi máy chủ'
            case 'no_token':
                return 'Không nhận được token'
            case 'invalid_data':
                return 'Dữ liệu không hợp lệ'
            case 'callback_error':
                return 'Lỗi xử lý callback'
            default:
                return 'Có lỗi xảy ra'
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="text-center">
                {processing ? (
                    <div>
                        <div className="mb-4 flex justify-center">
                            {/* Colorful animated spinner with bounce */}
                            <span className="relative flex h-12 w-12">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-12 w-12 border-4 border-t-4 border-blue-500 border-t-pink-500 animate-spin"></span>
                            </span>
                        </div>
                        <p className="text-lg font-bold text-blue-600 animate-bounce">Đang xử lý đăng nhập...</p>
                        <p className="text-sm text-gray-500 mt-2">Vui lòng chờ trong giây lát</p>
                    </div>
                ) : (
                    <div>
                        <p className="text-lg font-medium">Hoàn tất đăng nhập</p>
                        <p className="text-sm text-gray-500 mt-2">Đang chuyển hướng...</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default OAuthCallback 