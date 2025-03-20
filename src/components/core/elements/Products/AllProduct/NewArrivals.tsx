'use client'
import NewArrivalCard from '@/components/core/common/CardCommon/ProductCard/NewArrivalCard'
import PageHader from '@/components/core/common/PageHeader'
import SectionCommon from '@/components/core/common/SectionCommon'
import React from 'react'

const NewArrivals = () => {
    return (
        <SectionCommon className="w- flex flex-col gap-10">
            <PageHader title="Có gì mới" />
            <div className="grid grid-cols-2 justify-center justify-items-center gap-8 max-sm:grid-cols-1 lg:grid-cols-4">
                <NewArrivalCard
                    Title="DJI Power 1000"
                    Details="Công suất đầu ra tối đa 2200W"
                    Background="/Products/NewArrival/bg1.png"
                    itemImg="/Products/NewArrival/item1.png"
                    itemStyle="top-4 -rotate-0 w-40"
                />
                <NewArrivalCard
                    Title="DJI Flip"
                    Details="Cá nhân hóa AI theo ý bạn"
                    Background="/Products/NewArrival/bg2.png"
                    itemImg="/Products/NewArrival/item2.png"
                    itemStyle="top-20 scale-95 w-60"
                />
                <NewArrivalCard
                    Title="DJI Avatar 2"
                    Details="Từ bàn tay chạm đến bài trời"
                    Background="/Products/NewArrival/bg3.png"
                    itemImg="/Products/NewArrival/item3.png"
                    itemStyle="top-20 scale-10 drop-shadow-2xl w-52 right-40"
                />
                <NewArrivalCard
                    Title="DJI RS 4 Mini"
                    Details="Module theo dõi thông minh"
                    Background="/Products/NewArrival/bg4.png"
                    itemImg="/Products/NewArrival/item4.png"
                    itemStyle="top-8 left-34  w-60  -rotate-5"
                />
            </div>
        </SectionCommon>
    )
}

export default NewArrivals
