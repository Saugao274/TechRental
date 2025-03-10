import { Layout } from 'antd'
import React from 'react'

export default function SectionCommon({
    children,
}: {
    children: React.ReactNode
}) {
    return <div className='w-full p-[80px]'>{children}</div>
}
