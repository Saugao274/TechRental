'use client'
import SectionCommon from '@/components/core/common/SectionCommon'
import News from '@/components/core/elements/News'
import NewProduct from '@/components/core/elements/Products/NewProduct'
import React from 'react'

const Home = () => {
    return (
        <SectionCommon>
            <div>HOME</div>
            <NewProduct />
            <News />
        </SectionCommon>
    )
}

export default Home
