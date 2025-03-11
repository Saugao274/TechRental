import { cn } from '@/libs/utils'
import { Layout } from 'antd'
import { ClassValue } from 'clsx'
import React from 'react'

export default function SectionCommon({
    children,
    className,
}: {
    children: React.ReactNode
    className?: ClassValue
}) {
    return (
        <div
            className={cn('w-full p-5 md:px-[80px] md:py-[40px]', `${className}`)}
        >
            {children}
        </div>
    )
}
