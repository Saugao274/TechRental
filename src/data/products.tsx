import { useEffect } from 'react'

export interface ReviewsType {
    id: number
    author: string
    avatar: string
    rating: number
    date: string
    content: string
}
export interface SpecificationType {
    key: string
    label: string
    value: string
}
export interface CategoryType {
    _id: string
    name: string
}

export type ProductDetail = {
    _id: string
    title: string
    brand?: string
    category: CategoryType
    price: number
    priceWeek: number
    priceMonth: number
    images?: string[]
    view: number
    idShop: ShopDetail
    details: string
    shortDetails: string
    parameter: {
        key: string
        label: string
        value: string
    }[]
    reviews: ReviewsType[]
    isHotProduct: boolean
    isNewProduct: boolean
    location: string
    soldCount: number
    discount: number | 0
    rate: number | 0
    storage: number | 0
    adminApprovalStatus: 'approved' | 'pending' | 'rejected'
    stock: number
}
export interface ShopDetail {
    _id: string
    name: string
    avatar?: string
    cover?: string
    rating?: number
    followers?: number
    responseRate?: number
    responseTime?: string
    joinedDate?: string
    productsCount?: number
    totalReviews?: number
    lastActive?: string
    description?: string
    location: 'Hồ Chí Minh' | 'Đà Nẵng' | 'Hà Nội'
    contact?: {
        phone?: string
        email?: string
    }
    operatingHours?: string
    createdAt?: Date
    updatedAt?: Date
    skipConfirmation?: Boolean
    packagePost?: ('Free' | 'Basic' | 'Advanced' | 'Business')[];
    packageInsurance?: ('Basic' | 'Standard' | 'Premium')[];

}

export const shopDetails: ShopDetail[] = [
    {
        _id: 's001',
        name: 'Tech Store',
        avatar: '/images/Intro/avt1.png',
        responseRate: 95,
        followers: 10,
        rating: 4.8,
        totalReviews: 500,
        lastActive: '3',
        location: 'Hồ Chí Minh',
    },
    {
        _id: ' shopDetails[1]',
        name: 'Mobile World',
        avatar: '/images/Intro/avt2.png',
        responseRate: 90,
        followers: 8,
        rating: 4.7,
        totalReviews: 300,
        lastActive: '3',
        location: 'Hà Nội',
    },
    {
        _id: 's003',
        name: 'Gadget Hub',
        avatar: '/images/Intro/avt3.png',
        responseRate: 92,
        followers: 12,
        rating: 4.9,
        totalReviews: 450,
        lastActive: '3',
        location: 'Đà Nẵng',
    },
    {
        _id: 's004',
        name: 'Creative Zone',
        avatar: '/images/Intro/avt4.png',
        responseRate: 88,
        followers: 7,
        rating: 4.6,
        totalReviews: 280,
        lastActive: '3',
        location: 'Hồ Chí Minh',
    },
]

export const FALLBACK_IMAGES = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNBPK_Nmyaibf5zEOe_qJ0BWax0wO8RrHpIUfDpkpOUNT3qC52wcg6pAdYEybC3hSq9Yg&usqp=CAU',
    'https://tiki.vn/blog/wp-content/uploads/2023/11/IPhone-12-Pro-Max-1024x576.jpg',
    'https://gihakitchen.com/wp-content/uploads/2020/03/chup-do-an-dep.jpg',
    'https://fancongnghe.com/wp-content/uploads/2020/02/FCN_Banner_thue-dslr_1-460x295.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-gGjLWdiHvkDq5YCankeDa07GIWS3OJVdTurrMLd7BmU3MQ9w08-eEP-Usv2VKBrAmVE&usqp=CAU',
    'https://cdn.xtmobile.vn/vnt_upload/news/06_2023/02/Do-camera-iphone-14-pro-vs-may-anh-canon-eos-r5-thiet-bi-nao-chup-anh-dep-xtmobile.jpg',
    'https://www.winwinstore.vn/wp-content/uploads/2023/09/meo-chup-anh-DJI-Mini-4-Pro.webp',
    'https://tokyocamera.vn/wp-content/uploads/2022/12/Dinh-dang-anh-MOV-mau-D-cinelike-dinh-dang-file-H265-1400x659.jpg',
    'https://logoaz.net/wp-content/uploads/2019/02/thiet-bi-chup-anh-su-kien.jpg',
    'https://lavenderstudio.com.vn/wp-content/uploads/2021/05/chup-hinh-san-pham-dep1.jpg',
    'https://cdn.vjshop.vn/tin-tuc/6-tips-ban-can-biet-de-co-buc-anh-chup-hoa-tuyet-dep/bts-2290-1024x683.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNBPK_Nmyaibf5zEOe_qJ0BWax0wO8RrHpIUfDpkpOUNT3qC52wcg6pAdYEybC3hSq9Yg&usqp=CAU',
    'https://tiki.vn/blog/wp-content/uploads/2023/11/IPhone-12-Pro-Max-1024x576.jpg',
    'https://gihakitchen.com/wp-content/uploads/2020/03/chup-do-an-dep.jpg',
    'https://fancongnghe.com/wp-content/uploads/2020/02/FCN_Banner_thue-dslr_1-460x295.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-gGjLWdiHvkDq5YCankeDa07GIWS3OJVdTurrMLd7BmU3MQ9w08-eEP-Usv2VKBrAmVE&usqp=CAU',
    'https://cdn.xtmobile.vn/vnt_upload/news/06_2023/02/Do-camera-iphone-14-pro-vs-may-anh-canon-eos-r5-thiet-bi-nao-chup-anh-dep-xtmobile.jpg',
    'https://www.winwinstore.vn/wp-content/uploads/2023/09/meo-chup-anh-DJI-Mini-4-Pro.webp',
    'https://tokyocamera.vn/wp-content/uploads/2022/12/Dinh-dang-anh-MOV-mau-D-cinelike-dinh-dang-file-H265-1400x659.jpg',
    'https://logoaz.net/wp-content/uploads/2019/02/thiet-bi-chup-anh-su-kien.jpg',
    'https://lavenderstudio.com.vn/wp-content/uploads/2021/05/chup-hinh-san-pham-dep1.jpg',
    'https://cdn.vjshop.vn/tin-tuc/6-tips-ban-can-biet-de-co-buc-anh-chup-hoa-tuyet-dep/bts-2290-1024x683.jpg',
]

export const getRandomFallbackImage = () =>
    FALLBACK_IMAGES[Math.floor(Math.random() * FALLBACK_IMAGES.length)]

export const getRandomFallbackImageArray = (length: number): string[] => {
    if (length === 1) {
        return [getRandomFallbackImage()]
    }
    const result: string[] = []
    for (let i = 0; i < length; i++) {
        result.push(getRandomFallbackImage())
    }
    return result
}
