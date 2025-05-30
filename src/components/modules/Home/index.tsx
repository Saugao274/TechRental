'use client'
import SectionCommon from '@/components/core/common/SectionCommon'
import Intro from '@/components/core/elements/Intro'
import NavIcons from '@/components/core/elements/NavIcons'
import News from '@/components/core/elements/News'
import HotProducts from '@/components/core/elements/Products/HotProducts'
import NewProduct from '@/components/core/elements/Products/NewProduct'
import Slider from '@/components/core/elements/Slider'
import StaticHome from '@/components/core/elements/StaticHome'
import { ProductProvider } from '@/context/ProductContext'
import { Skeleton } from 'antd'
import React, { useEffect, useState } from 'react'

const Home = () => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
        }, 1000)

        return () => clearTimeout(timer)
    }, [])

    return loading ? (
        <Loading />
    ) : (
        <div className="mx-auto max-w-full md:max-w-[1440px]">
            <Intro />
            <div>
                <NavIcons />
                <Slider />
            </div>
            <ProductProvider>
                <HotProducts />
                <NewProduct />
            </ProductProvider>

            <News />
            <StaticHome />
        </div>
    )
}

const Loading = () => {
    return (
        <div className="flex flex-col gap-5 p-5">
            <Skeleton active />
            <Skeleton active />
            <Skeleton active />
        </div>
    )
}

export default Home
