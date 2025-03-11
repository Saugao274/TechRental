'use client'
import ButtonCommon from '@/components/core/common/ButtonCommon'
import SectionCommon from '@/components/core/common/SectionCommon'
import News from '@/components/core/elements/News'
import React from 'react'

const Home = () => {
    return (
        <div className="mx-auto max-w-[1440px]">
            <SectionCommon>HOME</SectionCommon>
            <News />
        </div>
    )
}

export default Home
