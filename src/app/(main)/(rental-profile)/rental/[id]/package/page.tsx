'use client'

import PackageNews from '@/components/modules/Rental/Package'
import { useParams } from 'next/navigation'
import React from 'react'

const PackagePage = () => {
    const params = useParams()
    let id = params?.id
    if (Array.isArray(id)) {
        id = id[0]
    }

    return <PackageNews id={id} />
}

export default PackagePage
