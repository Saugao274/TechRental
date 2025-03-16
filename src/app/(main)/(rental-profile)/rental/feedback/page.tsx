'use client'
import React, { useState } from 'react'
import {
    Card,
    Rate,
    Row,
    Col,
    Typography,
    Avatar,
    Space,
    Button,
    Modal,
    Form,
    Input,
    message,
    Select,
} from 'antd'
import { CommentOutlined, SendOutlined } from '@ant-design/icons'

// Interface cho sản phẩm
interface Product {
    id: string
    name: string
}

// Interface cho đánh giá
interface Review {
    id: string
    productId: string // Liên kết với sản phẩm
    customerName: string
    avatar: string
    rating: number
    comment: string
    date: string
    response?: string
    verified: boolean
}

// Dữ liệu mẫu
const initialProducts: Product[] = [
    { id: 'PROD-001', name: 'Osmo Pocket 3' },
    { id: 'PROD-002', name: 'Sony ZV-1' },
    { id: 'PROD-003', name: 'GoPro Hero 12 Black' },
]

const initialReviews: Review[] = [
    {
        id: 'REV-001',
        productId: 'PROD-001',
        customerName: 'Nguyễn Thị B',
        avatar: 'https://via.placeholder.com/40',
        rating: 4.5,
        comment: 'Sản phẩm rất tốt, giao hàng nhanh chóng!',
        date: '2025-03-10',
        response: 'Cảm ơn bạn đã đánh giá! Chúng tôi rất vui khi bạn hài lòng.',
        verified: true,
    },
    {
        id: 'REV-002',
        productId: 'PROD-002',
        customerName: 'Trần Văn C',
        avatar: 'https://via.placeholder.com/40',
        rating: 3.0,
        comment: 'Chất lượng sản phẩm ổn nhưng giao hàng hơi chậm.',
        date: '2025-03-12',
        response: '',
        verified: true,
    },
    {
        id: 'REV-003',
        productId: 'PROD-001',
        customerName: 'Lê Thị D',
        avatar: 'https://via.placeholder.com/40',
        rating: 5.0,
        comment: 'Tuyệt vời, sẽ thuê lại lần nữa!',
        date: '2025-03-14',
        response: 'Cảm ơn bạn! Rất mong được phục vụ bạn lần nữa.',
        verified: false,
    },
]

// Tính toán thống kê đánh giá theo sản phẩm
const calculateRatingStats = (
    reviews: Review[],
    productId: string | null = null,
) => {
    const filteredReviews = productId
        ? reviews.filter((r) => r.productId === productId)
        : reviews
    const total = filteredReviews.length
    const sumRatings = filteredReviews.reduce(
        (sum, review) => sum + review.rating,
        0,
    )
    const averageRating = total > 0 ? sumRatings / total : 0

    const ratingDistribution = [5, 4, 3, 2, 1].map((star) => ({
        star,
        count: filteredReviews.filter((r) => Math.floor(r.rating) === star)
            .length,
        percentage:
            total > 0
                ? (filteredReviews.filter((r) => Math.floor(r.rating) === star)
                      .length /
                      total) *
                  100
                : 0,
    }))

    return { averageRating, ratingDistribution, total }
}

export default function CustomerReviewsPage() {
    const [reviews, setReviews] = useState<Review[]>(initialReviews)
    const [isReplyModalOpen, setIsReplyModalOpen] = useState(false)
    const [selectedReview, setSelectedReview] = useState<Review | null>(null)
    const [form] = Form.useForm()
    const [sortBy, setSortBy] = useState('relevance')
    const [filterBy, setFilterBy] = useState('all')
    const [selectedProductId, setSelectedProductId] = useState<string | null>(
        null,
    )

    const { averageRating, ratingDistribution, total } = calculateRatingStats(
        reviews,
        selectedProductId,
    )

    const handleReply = (values: { response: string }) => {
        if (!selectedReview) return

        const updatedReviews = reviews.map((review) =>
            review.id === selectedReview.id
                ? { ...review, response: values.response }
                : review,
        )
        setReviews(updatedReviews)
        message.success('Phản hồi đã được gửi thành công!')
        setIsReplyModalOpen(false)
        setSelectedReview(null)
        form.resetFields()
    }

    const sortedAndFilteredReviews = [...reviews]
        .filter((review) =>
            selectedProductId ? review.productId === selectedProductId : true,
        )
        .sort((a, b) => {
            if (sortBy === 'relevance')
                return new Date(b.date).getTime() - new Date(a.date).getTime()
            return new Date(b.date).getTime() - new Date(a.date).getTime()
        })
        .filter((review) => {
            if (filterBy === 'all') return true
            return Math.floor(review.rating) === parseInt(filterBy)
        })

    return (
        <div className="mx-auto w-full max-w-3xl p-4 md:p-6">
            <div className="mb-4">
                <h1 className="text-2xl font-bold text-primary">
                    Đánh giá và phản hồi từ khách hàng
                </h1>
                <p className="text-primary">
                    Xem và quản lý các đánh giá, phản hồi từ khách hàng theo
                    từng sản phẩm.
                </p>
            </div>

            <Card>
                {/* Chọn sản phẩm */}
                <div className="mb-6">
                    <Typography.Title level={4} style={{ margin: 0 }}>
                        Chọn sản phẩm
                    </Typography.Title>
                    <Select
                        value={selectedProductId || 'all'}
                        onChange={(value) =>
                            setSelectedProductId(
                                value === 'all' ? null : (value as string),
                            )
                        }
                        style={{ width: '200px', marginTop: '8px' }}
                    >
                        <Select.Option value="all">
                            Tất cả sản phẩm
                        </Select.Option>
                        {initialProducts.map((product) => (
                            <Select.Option key={product.id} value={product.id}>
                                {product.name}
                            </Select.Option>
                        ))}
                    </Select>
                </div>

                {/* Tổng quan đánh giá */}
                <div className="mb-6">
                    <Typography.Title level={4} style={{ margin: 0 }}>
                        Đánh giá tổng quan
                    </Typography.Title>
                    <div className="mt-4">
                        <Typography.Title
                            level={2}
                            style={{ margin: '8px 0', color: '#000' }}
                        >
                            {averageRating.toFixed(1)}/5
                        </Typography.Title>
                        <Rate
                            value={averageRating}
                            allowHalf
                            disabled
                            style={{ color: '#fadb14', fontSize: '20px' }}
                        />
                        <Typography.Text style={{ marginLeft: '8px' }}>
                            ({total} đánh giá)
                        </Typography.Text>
                    </div>
                    <div className="mt-4">
                        {ratingDistribution.map(
                            ({ star, count, percentage }) => (
                                <Row
                                    key={star}
                                    align="middle"
                                    style={{ marginBottom: '8px' }}
                                >
                                    <Col span={4}>
                                        <Typography.Text>
                                            {star} sao
                                        </Typography.Text>
                                    </Col>
                                    <Col span={16}>
                                        <div
                                            style={{
                                                width: '100%',
                                                background: '#f0f0f0',
                                                borderRadius: '4px',
                                                height: '8px',
                                            }}
                                        >
                                            <div
                                                style={{
                                                    width: `${percentage}%`,
                                                    background: '#fadb14',
                                                    borderRadius: '4px',
                                                    height: '100%',
                                                }}
                                            />
                                        </div>
                                    </Col>
                                    <Col span={4}>
                                        <Typography.Text>
                                            {count}
                                        </Typography.Text>
                                    </Col>
                                </Row>
                            ),
                        )}
                    </div>
                </div>

                {/* Bộ lọc và sắp xếp */}
                <div className="mb-4 flex justify-between">
                    <Typography.Text>Product Reviews</Typography.Text>
                    <Space>
                        <Select
                            value={sortBy}
                            onChange={(value) => setSortBy(value)}
                            style={{ width: '120px' }}
                        >
                            <Select.Option value="relevance">
                                Sort: Relevance
                            </Select.Option>
                            <Select.Option value="date">
                                Sort: Date
                            </Select.Option>
                        </Select>
                        <Select
                            value={filterBy}
                            onChange={(value) => setFilterBy(value)}
                            style={{ width: '100px' }}
                        >
                            <Select.Option value="all">
                                Filter: All
                            </Select.Option>
                            <Select.Option value="5">5 Star</Select.Option>
                            <Select.Option value="4">4 Star</Select.Option>
                            <Select.Option value="3">3 Star</Select.Option>
                            <Select.Option value="2">2 Star</Select.Option>
                            <Select.Option value="1">1 Star</Select.Option>
                        </Select>
                    </Space>
                </div>

                {/* Danh sách đánh giá */}
                {sortedAndFilteredReviews.map((review) => (
                    <Card
                        key={review.id}
                        className="mb-4"
                        bodyStyle={{ padding: '12px' }}
                    >
                        <Space align="start" size={16}>
                            <Avatar src={review.avatar} />
                            <div style={{ flex: 1 }}>
                                <div className="mb-2 flex items-center justify-between">
                                    <Typography.Text strong>
                                        {review.customerName}{' '}
                                        {review.verified && (
                                            <span className="text-green-500">
                                                ✔ Verified Purchase
                                            </span>
                                        )}
                                    </Typography.Text>
                                    <Typography.Text type="secondary">
                                        {review.date} -{' '}
                                        {
                                            initialProducts.find(
                                                (p) =>
                                                    p.id === review.productId,
                                            )?.name
                                        }
                                    </Typography.Text>
                                </div>
                                <Rate
                                    value={review.rating}
                                    allowHalf
                                    disabled
                                    style={{
                                        color: '#fadb14',
                                        fontSize: '16px',
                                        marginBottom: '8px',
                                    }}
                                />
                                <Typography.Paragraph>
                                    {review.comment}
                                </Typography.Paragraph>
                                {review.response && (
                                    <Typography.Paragraph
                                        type="secondary"
                                        style={{
                                            background: '#f0f0f0',
                                            padding: '8px',
                                            borderRadius: '4px',
                                        }}
                                    >
                                        <span className="text-red-500">
                                            Seller Response
                                        </span>{' '}
                                        - {review.response}
                                    </Typography.Paragraph>
                                )}
                                {!review.response && (
                                    <Button
                                        type="link"
                                        icon={<CommentOutlined />}
                                        onClick={() => {
                                            setSelectedReview(review)
                                            setIsReplyModalOpen(true)
                                        }}
                                    >
                                        Phản hồi
                                    </Button>
                                )}
                            </div>
                        </Space>
                    </Card>
                ))}
            </Card>

            {/* Modal phản hồi */}
            <Modal
                title={`Phản hồi cho đánh giá của ${selectedReview?.customerName}`}
                open={isReplyModalOpen}
                onCancel={() => {
                    setIsReplyModalOpen(false)
                    setSelectedReview(null)
                    form.resetFields()
                }}
                footer={[
                    <Button
                        key="cancel"
                        onClick={() => {
                            setIsReplyModalOpen(false)
                            setSelectedReview(null)
                            form.resetFields()
                        }}
                    >
                        Hủy
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        icon={<SendOutlined />}
                        onClick={() => form.submit()}
                    >
                        Gửi phản hồi
                    </Button>,
                ]}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleReply}
                    initialValues={{ response: selectedReview?.response || '' }}
                >
                    <Form.Item
                        label="Nội dung phản hồi"
                        name="response"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập phản hồi!',
                            },
                        ]}
                    >
                        <Input.TextArea
                            rows={4}
                            placeholder="Nhập phản hồi của bạn..."
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
