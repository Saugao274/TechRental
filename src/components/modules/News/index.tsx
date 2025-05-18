import { NewsData } from '@/data/news'
import { Divider, Pagination } from 'antd'
import { CalendarIcon, ChevronRightIcon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

type TProps = {
    article: any
}

export default function NewsModule({ article }: TProps) {
    console.log(article)
    const mostViewedNews = NewsData.filter((news) => news.isMostViewed).slice(
        0,
        3,
    )
    const router = useRouter();
    const news = NewsData.sort()
    console.log(news)
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 4
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize
    const currentNews = news.filter((item) => item.keyID !== article?.keyId).slice(startIndex, endIndex)
    console.log(currentNews);
    const handleClick = (id:string) => {
        router.push(`/news/${id}`)
    }
    return (
        <div className="mx-auto min-h-screen max-w-full p-5 md:max-w-[1440px] md:px-[80px]">
            <div className="container mx-auto px-4 py-6">
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
                    {/* Main Article - Takes 3 columns on large screens */}
                    <div className="rounded-md p-4 shadow-sm lg:col-span-3">
                        <div className="mb-4 flex justify-between">
                            <div className="rounded-md bg-white px-3 py-1 text-sm font-medium text-primary">
                                Tin Tức
                            </div>
                            <div className="flex items-center rounded-md bg-white px-4 text-center text-sm font-medium text-gray-700">
                                <p>Thứ ba 22/4/2025, 19:00 (+07:+7)</p>
                            </div>
                        </div>

                        <div
                            dangerouslySetInnerHTML={{
                                __html: article?.content,
                            }}
                        ></div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="mb-6 rounded-md p-4 shadow-sm">
                            <div className="relative mb-4 h-fit">
                                <div className="inline-block rounded-md bg-primary px-3 py-1 text-sm font-medium text-white">
                                    XEM NHIỀU
                                </div>
                                <div className="absolute bottom-0 left-1 h-[3px] w-[calc(100%-0.25rem)] bg-primary"></div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex flex-col gap-3" onClick={() => handleClick(article?.keyID)}>
                                    <img
                                        src={`/images/${article?.Image}`}
                                        alt=""
                                        className="aspect-[4/3] h-44 w-full scale-100 rounded-lg object-cover transition-all duration-300 hover:scale-105 md:w-72"
                                    />
                                    <h3 className="text-sm font-medium">
                                        {article?.Title}
                                    </h3>
                                    <p className="text-xs text-gray-500">
                                        {article?.Details}
                                    </p>
                                </div>

                                <Divider className="bg-primary" />

                                {mostViewedNews.map((item, index) => (
                                    <div key={index} className="flex gap-3" onClick={() => handleClick(item?.keyID)}>
                                        <img
                                            src={`/images/${item?.Image}`}
                                            alt={`Camera siêu nhanh chụp P320...`}
                                            width={70}
                                            height={70}
                                            className="h-16 w-16 rounded-md object-cover"
                                        />
                                        <div>
                                            <h3 className="text-sm font-medium">
                                                {item?.Title}
                                            </h3>
                                            <div className="mt-1 flex items-center text-xs text-gray-500">
                                                <CalendarIcon className="mr-1 h-3 w-3" />
                                                {item?.Date}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Latest Articles Section */}
                <div className="mt-8 rounded-md p-4 shadow-sm">
                    <div className="relative mb-4">
                        <div className="inline-block rounded-md bg-primary px-4 py-2 text-sm font-medium text-white">
                            BÀI VIẾT MỚI NHẤT
                        </div>
                        <div className="absolute bottom-0 left-1 h-[3px] w-[calc(100%-0.25rem)] bg-primary"></div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
                        {currentNews.map((item, index) => (
                            <div
                                key={index}
                                className="overflow-hidden rounded-md"
                                onClick={() => handleClick(item?.keyID)}
                            >
                                <img
                                    src={`/images/${item?.Image}`}
                                    alt="Canon EOS R50"
                                    width={300}
                                    height={200}
                                    className="h-40 w-full object-cover"
                                />
                                <div className="p-2">
                                    <h3 className="h-[50px] text-sm font-medium">
                                        {item?.Title}
                                    </h3>
                                    <p className="whitespace-wrap mt-1 line-clamp-3 text-xs text-gray-700">
                                        {item?.Details}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="mt-6 flex justify-center">
                        <Pagination
                            current={currentPage}
                            total={news.length}
                            pageSize={pageSize}
                            onChange={(page) => setCurrentPage(page)}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
