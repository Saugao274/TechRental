import React, { useState } from 'react'
import NewsCard from '../../common/CardCommon/NewsCard'
import ButtonCommon from '../../common/ButtonCommon'
import { Divider, Pagination } from 'antd'
type NewsType = {
    Image: string
    Title: string
    Details: string
    Date: string
    Type: string
    isLaster: boolean
    isMostViewed: boolean
    keyID: string
}
type AllNewsProps = {
    newsList: NewsType[]
}

const AllNews: React.FC<AllNewsProps> = ({ newsList }: AllNewsProps) => {
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 4
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize
    const currentNews = newsList.slice(startIndex, endIndex)
    return (
        <div className="flex flex-col gap-5">
            <div className="flex w-full flex-col items-start">
                <ButtonCommon
                    type="primary"
                    className="!pointer-events-none !text-[16px] !text-white"
                >
                    TẤT CẢ TIN TỨC
                </ButtonCommon>
                <Divider className="!m-0 !w-full !border-t-[#1D3D85]" />
            </div>

            <div className="flex flex-col items-center justify-center gap-14">
                <div className="flex justify-between gap-5">
                    {currentNews.map((news) => (
                        <NewsCard
                            id={news.keyID}
                            type="vertical"
                            Image={news.Image}
                            Title={news.Title}
                            Details={news.Details}
                            Date={news.Date}
                        />
                    ))}
                </div>
                <Pagination
                    current={currentPage}
                    total={newsList.length}
                    pageSize={pageSize}
                    onChange={(page) => setCurrentPage(page)}
                />
            </div>
        </div>
    )
}

export default AllNews
