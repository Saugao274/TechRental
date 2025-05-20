import ProfileRootLayout from '@/components/core/layouts/ProfileLayout'
import React from 'react'

export default function ProfileLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <ProfileRootLayout>{children}</ProfileRootLayout>
}
