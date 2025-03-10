import { Divider } from 'antd'
import React from 'react'

export default function PageHader({ title }: { title: string }) {
    return (
        <div className="relative flex w-full items-center justify-center">
            <Divider className="!w-20 !min-w-96 !border-t-[#1A4381]">
                <div className="relative border-spacing-1 rounded-2xl border-[1px_solid_#1A4381] bg-[#E3EDF7] px-8 shadow-[-4px_-4px_12px_#fff]">
                    <h2 className="text-lg font-bold text-blue-900">
                        {title.toLocaleUpperCase()}
                    </h2>
                </div>
            </Divider>
        </div>
    )
}
