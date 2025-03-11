'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import { NewsData } from '@/data/news'
import NotFound from '@/app/not-found'

const ProductsDetail = () => {
    const params = useParams()
    const { id } = params
    const article = NewsData.find((news) => news.keyID === id)

    if (!article) {
        return <NotFound />
    }

    return (
        <div className="news-detail">
            <h1>{article.Title}</h1>
            <img src={`/images/${article.Image}`} alt={article.Title} />
            <p>{article.Details}</p>
            <span>{article.Date}</span>
        </div>
    )
}

export default ProductsDetail
