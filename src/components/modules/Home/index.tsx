'use client'
import SectionCommon from '@/components/core/common/SectionCommon'
import News from '@/components/core/elements/News'
import HotProducts from '@/components/core/elements/Products/HotProducts'
import NewProduct from '@/components/core/elements/Products/NewProduct'
import Slider from '@/components/core/elements/Slider'
import React from 'react'

const Home = () => {
    return (
        <div className="mx-auto max-w-[1440px]">
            <Slider />
            <HotProducts />
            <NewProduct />
            <News />
        </div>
    )
}

export default Home
