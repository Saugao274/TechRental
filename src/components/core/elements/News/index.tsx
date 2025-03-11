import React from 'react'
import PageHader from '../../common/PageHeader'
import NewsCard from '../../common/CardCommon/NewsCard'
import ButtonCommon from '../../common/ButtonCommon'
import AllNews from './AllNews'
import { NewsData } from '@/data/news'
import SectionCommon from '../../common/SectionCommon'

const News = () => {
    const mostViewedNews = NewsData.filter((news) => news.isMostViewed).slice(
        0,
        6,
    )
    const isLasterNews = NewsData.filter((news) => news.isLaster).slice(0, 3)

    return (
        <SectionCommon className="flex flex-col gap-5">
            <PageHader title="Tin tức" />
            <div className="flex flex-col gap-14">
                <div className="max-h-680px flex justify-between gap-12">
                    <div className="flex w-3/4 flex-col justify-between gap-5">
                        {isLasterNews.map((news) => (
                            <NewsCard
                                id={news.keyID}
                                type="horizontal"
                                Image={news.Image}
                                Title={news.Title}
                                Details={news.Details}
                                Date={news.Date}
                            />
                        ))}
                    </div>
                    <div className="flex w-1/4 flex-col gap-5">
                        <ButtonCommon
                            type="primary"
                            className="!pointer-events-none !m-0 !w-max !text-[16px] !text-white"
                        >
                            Xem nhiều
                        </ButtonCommon>
                        <div className="flex flex-col justify-between gap-2">
                            {mostViewedNews.map((news) => (
                                <NewsCard
                                    id={news.keyID}
                                    key={news.Title}
                                    type="mini"
                                    Image={news.Image}
                                    Title={news.Title}
                                    Date={news.Date}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <AllNews newsList={NewsData.sort()} />
            </div>
        </SectionCommon>
    )
}

export default News
