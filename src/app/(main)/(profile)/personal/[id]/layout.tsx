'use client'
import MainLayout from '@/components/core/layouts/MainLayout'
import ProfileRootLayout from '@/components/core/layouts/ProfileLayout'
import OtherProfileLayout from '@/components/core/layouts/ProfileLayout/OtherProfileLayout'
import { useAuth } from '@/context/AuthContext'
import { useParams } from 'next/navigation'
import React from 'react'

export default function ProfileLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const params = useParams()
    const { id } = params
    const { user } = useAuth()
    return user?._id === id ? (
        <ProfileRootLayout>{children}</ProfileRootLayout>
    ) : (
        <OtherProfileLayout>{children}</OtherProfileLayout>
    )
}
