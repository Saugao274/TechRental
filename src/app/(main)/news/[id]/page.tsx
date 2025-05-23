'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import { NewsData } from '@/data/news'
import NotFound from '@/app/not-found'
import Image from 'next/image'
import { CalendarIcon, ChevronRightIcon } from 'lucide-react'
import NewsModule from '@/components/modules/News'

const NewsDetail = () => {
    const params = useParams()
    const { id } = params
    const article = NewsData.find((news) => news.keyID === id)

    if (!article) {
        return <NotFound />
    }

    return <NewsModule article={article} />
}

export default NewsDetail
