'use client'

import { ReactNode } from 'react'
import MessageLayout from '@/components/core/layouts/MessageLayout'

export default function ChatLayout({ children }: { children: ReactNode }) {
    return <MessageLayout>{children}</MessageLayout>
}
