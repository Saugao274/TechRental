'use client'
import React from 'react'
import { useParams } from 'next/navigation'

const NewsDetail = () => {
    const params = useParams()
    const { id } = params

    return (
        <div>
            <h1>Chi tiết bài viết {id}</h1>
            <p>Đây là nội dung bài viết với ID: {id}</p>
        </div>
    )
}

export default NewsDetail
