'use client'
import SectionCommon from '@/components/core/common/SectionCommon'
import { StoreModule } from '@/components/modules/Store'
import { useParams, useSearchParams } from 'next/navigation'
import React from 'react'

export default function StorePage() {
    const params = useParams<{ id: string }>()

    return (
        <div className="mx-auto w-full md:max-w-[1440px]">
            <SectionCommon>
                <StoreModule id={params?.id} />
            </SectionCommon>
        </div>
    )
}
