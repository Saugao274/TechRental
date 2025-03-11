'use client'
import SectionCommon from '@/components/core/common/SectionCommon'
import News from '@/components/core/elements/News'
import HotProducts from '@/components/core/elements/Products/HotProducts'
import NewProduct from '@/components/core/elements/Products/NewProduct'
import React from 'react'

const Home = () => {
    return (
        <div className='max-w-[1440px] mx-auto'>
            <SectionCommon>HOME</SectionCommon>
            <HotProducts />
            <NewProduct />
            <News />
        </div>
    )
}

export default Home
