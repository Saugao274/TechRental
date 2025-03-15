'use client'
import SectionCommon from '@/components/core/common/SectionCommon'
import Intro from '@/components/core/elements/Intro'
import NavIcons from '@/components/core/elements/NavIcons'
import News from '@/components/core/elements/News'
import HotProducts from '@/components/core/elements/Products/HotProducts'
import NewProduct from '@/components/core/elements/Products/NewProduct'
import Slider from '@/components/core/elements/Slider'
import StaticHome from '@/components/core/elements/StaticHome'
import Footer from '@/components/core/elements/Footer'
import React from 'react'

const Home = () => {
    return (
        <div className="mx-auto max-w-[1440px]">
            <Intro />
            <div>
                <NavIcons />
                <Slider />
            </div>
            <HotProducts />
            <NewProduct />
            <News />
            <StaticHome />
        </div>
    )
}

export default Home
