import SectionCommon from '@/components/core/common/SectionCommon'
import StoreModule from '@/components/modules/Store'
import { useParams, useSearchParams } from 'next/navigation'
import React from 'react'

export default function StorePage() {
    return (
        <div className='w-full md:max-w-[1440px] mx-auto '>
            <SectionCommon>
                <StoreModule />
            </SectionCommon>
        </div>
    )
}
