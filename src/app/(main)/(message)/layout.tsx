import MessageLayout from '@/components/core/layouts/MessageLayout'
import React from 'react'

export default function MessageRootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <MessageLayout>{children}</MessageLayout>
}
