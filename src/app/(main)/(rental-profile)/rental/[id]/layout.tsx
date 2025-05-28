'use client'

import RentalRootLayout from '@/components/core/layouts/RentalLayout'
import React from 'react'

export default function RentalLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <RentalRootLayout>{children}</RentalRootLayout>
}
