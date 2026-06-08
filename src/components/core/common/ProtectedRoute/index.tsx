'use client'

import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { isAuthenticated } from '@/utils/authApi'

interface ProtectedRouteProps {
    children: React.ReactNode
    fallback?: React.ReactNode
    redirectTo?: string
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    children,
    fallback,
    redirectTo = '/signIn'
}) => {
    const router = useRouter()
    const { user } = useAuth()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const checkAuth = async () => {
            // Check if user is authenticated either through context or localStorage
            const hasUser = user || isAuthenticated()
            
            if (!hasUser) {
                // Store the current path for redirect after login
                localStorage.setItem('redirectAfterLogin', window.location.pathname)
                router.replace(redirectTo)
                return
            }
            
            setIsLoading(false)
        }

        checkAuth()
    }, [user, router, redirectTo])

    if (isLoading) {
        return fallback || (
            <div className="flex h-screen items-center justify-center">
                <div className="text-center">
                    <div className="mb-4">
                        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                    </div>
                    <p className="text-lg font-medium">Đang kiểm tra xác thực...</p>
                </div>
            </div>
        )
    }

    return <>{children}</>
}

export default ProtectedRoute 