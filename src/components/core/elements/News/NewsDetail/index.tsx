import { NewsData } from '@/data/news'
import { useParams } from 'next/navigation'

const NewsDetail = () => {
    const params = useParams()
    const { keyID } = params

    const article = NewsData.find((news) => news.keyID === keyID)

    if (!article) {
        return <p>Bài viết không tồn tại.</p>
    }

    return (
        <div className="news-detail">
            <h1>{article.Title}</h1>
            <img src={article.Image} alt={article.Title} />
            <p>{article.Details}</p>
            <span>{article.Date}</span>
        </div>
    )
}

export default NewsDetail
