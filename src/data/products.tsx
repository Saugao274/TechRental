interface ReviewsType {
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
export type ProductDetail = {
    title: string
    brand?: string
    category: string
    price: number
    images?: string[]
    view: number
    idProduct: string
    idShop: string
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
}
export type ShopDetail = {
    idShop: string
    response: number
    nameShop: string
    rentered: number
    rate: number
    totalReviews: number
    avatar?: string
}

export const productsData: ProductDetail[] = [
    {
        title: 'DJI Osmo Pocket 3 Combo',
        shortDetails: 'Độ phân giải màu D-Log M và HLG 10-bit',
        brand: 'DJI',
        category: 'Camera',
        price: 525000,
        idProduct: 'DJI_Osmo_Pocket_3',
        idShop: 's001',
        details:
            'Sản phẩm có chất lượng camera vượt trội, pin trâu và thiết kế nhỏ gọn.',
        parameter: [
            { key: '1', label: 'Trọng lượng', value: 'Dưới 10 kg (DJI 3)' },
            { key: '2', label: 'Thuộc về', value: 'Trong nước' },
            { key: '3', label: 'Xuất xứ', value: 'Trung Quốc' },
            { key: '4', label: 'Dung lượng pin', value: '4/5 mAh' },
            { key: '5', label: 'Độ cao tối đa', value: '120m' },
            { key: '6', label: 'Phụ kiện đi kèm', value: 'Pin, 2|3" x4' },
            { key: '7', label: 'Thời gian bay', value: '34 phút' },
            { key: '8', label: 'Khoảng cách điều khiển', value: '15km' },
            { key: '9', label: 'Camera', value: '4K Ultra HD' },
            { key: '10', label: 'Cảm biến', value: 'Tránh vật cản đa hướng' },
        ],
        images: [
            'https://dji-vietnam.vn/wp-content/uploads/2023/10/Artboard-1-600x400.jpg',
            'https://product.hstatic.net/200000039412/product/pk3-cb_2e93bbb10b5c43ba8e8a45c3be9dbab1_master.jpg',
            'https://dji-vietnam.vn/wp-content/uploads/2023/10/danh-gia-dji-osmo-pocket3-14.jpg',
            'https://down-vn.img.susercontent.com/file/sg-11134201-7rbm1-lop7qkzd7yknd9',
        ],
        reviews: [
            {
                id: 1,
                author: 'Thanh Thúy',
                avatar: '/Message/images1.png',
                rating: 4.8,
                date: '1 tháng trước',
                content:
                    'Sản phẩm tốt, đóng gói cẩn thận, giao hàng nhanh. Chất lượng camera rất tốt, pin trâu.',
            },
            {
                id: 2,
                author: 'Minh Tuấn',
                avatar: '/Message/images2.png',
                rating: 5,
                date: '2 tháng trước',
                content:
                    'Rất hài lòng với sản phẩm. Bay ổn định, dễ điều khiển, chụp ảnh đẹp.',
            },
            {
                id: 3,
                author: 'Hồng Anh',
                avatar: '/Message/images6.png',
                rating: 4,
                date: '3 tháng trước',
                content:
                    'Thời lượng pin tốt, camera chụp đẹp. Giao hàng hơi lâu.',
            },
            {
                id: 4,
                author: 'Văn Đức',
                avatar: '/Message/images4.png',
                rating: 4.5,
                date: '3 tháng trước',
                content:
                    'Chất lượng sản phẩm tương xứng với giá tiền. Rất hài lòng.',
            },
        ],
        isHotProduct: true,
        isNewProduct: true,
        location: 'Hà Nội',
        view: 200,
    },
    {
        title: 'iPhone 15 Pro Max',
        shortDetails: 'Chip A17 Bionic, màn hình ProMotion 120Hz, camera 48MP.',
        brand: 'Apple',
        category: 'SmartPhone',
        price: 525000,
        idProduct: 'p001',
        idShop: 's001',
        details: 'iPhone 14 Pro Max, 256GB, màu tím',
        parameter: [
            { key: '1', label: 'Trọng lượng', value: 'Dưới 10 kg (DJI 3)' },
            { key: '2', label: 'Thuộc về', value: 'Trong nước' },
            { key: '3', label: 'Xuất xứ', value: 'Trung Quốc' },
            { key: '4', label: 'Dung lượng pin', value: '4/5 mAh' },
            { key: '5', label: 'Độ cao tối đa', value: '120m' },
            { key: '6', label: 'Phụ kiện đi kèm', value: 'Pin, 2|3" x4' },
            { key: '7', label: 'Thời gian bay', value: '34 phút' },
            { key: '8', label: 'Khoảng cách điều khiển', value: '15km' },
            { key: '9', label: 'Camera', value: '4K Ultra HD' },
            { key: '10', label: 'Cảm biến', value: 'Tránh vật cản đa hướng' },
        ],
        images: [
            'https://msmobile.vn/images/products/2023/09/13/large/iphone-15-pro-max-vang-dong_1694565999.png',
            'https://www.apple.com/newsroom/images/2023/09/apple-unveils-iphone-15-pro-and-iphone-15-pro-max/tile/Apple-iPhone-15-Pro-lineup-hero-230912.jpg.news_app_ed.jpg',
            'https://shopdunk.com/images/thumbs/0024989_combo-iphone-15-pro-max-tra-gop-0.jpeg',
            'https://smartviets.com/upload/iPHONE15/iPHONE15PR-PRM/15PRM-black_titanium.jpg',
        ],
        reviews: [
            {
                id: 1,
                author: 'Thanh Thúy',
                avatar: '/Message/images1.png',
                rating: 4.8,
                date: '1 tháng trước',
                content:
                    'Sản phẩm tốt, đóng gói cẩn thận, giao hàng nhanh. Chất lượng camera rất tốt, pin trâu.',
            },
            {
                id: 2,
                author: 'Minh Tuấn',
                avatar: '/Message/images2.png',
                rating: 5,
                date: '2 tháng trước',
                content:
                    'Rất hài lòng với sản phẩm. Bay ổn định, dễ điều khiển, chụp ảnh đẹp.',
            },
            {
                id: 3,
                author: 'Hồng Anh',
                avatar: '/Message/images6.png',
                rating: 4,
                date: '3 tháng trước',
                content:
                    'Thời lượng pin tốt, camera chụp đẹp. Giao hàng hơi lâu.',
            },
            {
                id: 4,
                author: 'Văn Đức',
                avatar: '/Message/images4.png',
                rating: 4.5,
                date: '3 tháng trước',
                content:
                    'Chất lượng sản phẩm tương xứng với giá tiền. Rất hài lòng.',
            },
        ],
        isHotProduct: false,
        isNewProduct: true,
        location: 'Hà Nội',
        view: 1500,
    },

    {
        title: 'Chân Máy Chuyên Nghiệp XYZ',
        shortDetails: 'Chân máy ổn định, phù hợp cho studio.',
        brand: 'XYZ',
        category: 'Camera',
        price: 250000,
        idProduct: 'chan_may_001',
        idShop: 's002',
        details:
            'Chân máy XYZ với chất liệu nhôm, độ ổn định cao, dễ dàng điều chỉnh góc quay.',
        parameter: [
            { key: 'material', label: 'Chất liệu', value: 'Nhôm hợp kim' },
            { key: 'height', label: 'Chiều cao', value: '1.2m' },
        ],
        images: [
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShlaJgoUckrjbQy5fn6S4Ld9bcFULtVqZP9A&s',
            'https://minhduc.com.vn/vn/images/sanpham/shop_1464333317_chan-may-anh-may-quay-beike-Q-666C-minhduc.com.vn%20(1).jpg.jpg',
            'https://minhduc.com.vn/vn/images/sanpham/shop_1464332796_chan-may-anh-may-quay-beike-Q-666-minhduc.com.vn%20(1).jpg.jpg',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYpL11TSmbQ8lYnsLjUB0X_wCSOcZa0tqiDNYAvTt9DGSkrfDm-g2_CUN5D1bq82zBEo8&usqp=CAU',
        ],
        reviews: [
            {
                id: 1,
                author: 'Trần Thị B',
                avatar: '/Message/avatar2.png',
                rating: 4.0,
                date: '2 tuần trước',
                content: 'Đạt yêu cầu cho công việc chuyên nghiệp.',
            },
        ],
        isHotProduct: false,
        isNewProduct: true,
        location: 'Hồ Chí Minh',
        view: 120,
    },
    {
        title: 'Drone FPV Racing Pro',
        shortDetails: 'Drone FPV cho đua tốc độ cao.',
        brand: 'RacingPro',
        category: 'FPV',
        price: 1500000,
        idProduct: 'fpv_001',
        idShop: 's001',
        details:
            'Drone FPV Racing Pro với tốc độ và độ bền vượt trội, lý tưởng cho các cuộc đua.',
        parameter: [
            { key: 'maxSpeed', label: 'Tốc độ tối đa', value: '120 km/h' },
            { key: 'flightTime', label: 'Thời gian bay', value: '20 phút' },
        ],
        images: [
            'https://dji-vietnam.vn/wp-content/uploads/2021/03/so-sanh-DJI-FPV-va-FPV-Drones-khac-copy.jpg',
            'https://dji-vietnam.vn/wp-content/uploads/2021/03/Drone-Racing-1400x788.jpg',
            'https://dji-vietnam.vn/wp-content/uploads/2021/02/FPV-la-gi-3.jpg',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIe0TSrmNg4-PVpbkE4Rpyce2R5MHdgay68F7QEQvrONNF66BsH2DwNAfdbEwhhcrTCrQ&usqp=CAU',
        ],
        reviews: [
            {
                id: 1,
                author: 'Lê Văn C',
                avatar: '/Message/avatar3.png',
                rating: 4.7,
                date: '3 tuần trước',
                content: 'Drone mạnh mẽ, phù hợp cho đua tốc độ cao.',
            },
        ],
        isHotProduct: true,
        isNewProduct: false,
        location: 'Đà Nẵng',
        view: 800,
    },
    {
        title: 'Kính DJI Goggles V2',
        shortDetails: 'Kính thực tế ảo dành cho drone DJI.',
        brand: 'DJI',
        category: 'DJI Goggles',
        price: 950000,
        idProduct: 'dji_goggles_001',
        idShop: 's001',
        details:
            'DJI Goggles V2 mang đến trải nghiệm bay với góc nhìn ấn tượng, kết nối mượt mà với drone DJI.',
        parameter: [
            { key: 'resolution', label: 'Độ phân giải', value: '1080p' },
            { key: 'fieldOfView', label: 'Góc nhìn', value: '85°' },
        ],
        images: [
            'https://dji-vietnam.vn/wp-content/uploads/2024/11/DJI-Goggles-N-vuong-7.jpg',
            'https://m.media-amazon.com/images/I/61WQZrpsAzL.jpg',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgdd4fWg39Bd4Q-VYcdJNyZhoLR8z_kgOd1DVGA2VFP4Ap1xB8vogfjakDmxRFModZDSY&usqp=CAU',
            'https://dji-vietnam.vn/wp-content/uploads/2023/03/Combo-DJI-Avata.jpg',
        ],
        reviews: [
            {
                id: 1,
                author: 'Phạm Thị D',
                avatar: '/Message/avatar4.png',
                rating: 4.6,
                date: '4 tuần trước',
                content:
                    'Trải nghiệm tuyệt vời với DJI Goggles, kết nối ổn định.',
            },
        ],
        isHotProduct: true,
        isNewProduct: true,
        location: 'Hà Nội',
        view: 450,
    },
    {
        title: 'Máy Quay Phim ABC',
        shortDetails: 'Máy quay phim chuyên nghiệp cho studio và sự kiện.',
        brand: 'ABC',
        category: 'Camera',
        price: 2000000,
        idProduct: 'may_quay_001',
        idShop: 's002',
        details:
            'Máy quay phim ABC với khả năng quay 4K, hệ thống ổn định tốt, phù hợp cho mọi môi trường quay.',
        parameter: [
            { key: 'resolution', label: 'Độ phân giải', value: '4K' },
            { key: 'stabilization', label: 'Ổn định', value: 'Có' },
        ],
        images: [
            'https://zshop.vn/blogs/wp-content/uploads/2022/12/1664368534_172e.jpg',
            'https://cdn.vjshop.vn/tin-tuc/top-7-may-quay-phim-chuyen-nghiep/top-may-quay-phim-chuyen-nghiep-tot-nhat-0.jpeg',
            'https://cellphones.com.vn/sforum/wp-content/uploads/2023/06/may-anh-quay-phim-1.jpg',
            'https://d1hjkbq40fs2x4.cloudfront.net/images/801.jpg',
        ],
        reviews: [
            {
                id: 1,
                author: 'Nguyễn Thị E',
                avatar: '/Message/avatar5.png',
                rating: 4.3,
                date: '5 tuần trước',
                content:
                    'Chất lượng video xuất sắc, phù hợp với nhiều mục đích sử dụng.',
            },
        ],
        isHotProduct: false,
        isNewProduct: true,
        location: 'Hồ Chí Minh',
        view: 600,
    },
    {
        title: 'Flycam Mini 360',
        shortDetails: 'Flycam nhỏ gọn, quay toàn cảnh 360°.',
        brand: 'MiniFly',
        category: 'Flycam',
        price: 1200000,
        idProduct: 'flycam_001',
        idShop: 's001',
        details:
            'Flycam Mini 360 với thiết kế nhỏ gọn, dễ sử dụng, hỗ trợ quay video 360 độ mượt mà.',
        parameter: [
            { key: 'fieldOfView', label: 'Góc quay', value: '360°' },
            { key: 'battery', label: 'Thời lượng pin', value: '25 phút' },
        ],
        images: [
            'https://dji-vietnam.vn/wp-content/uploads/2022/05/dji-mini-3-review.png',
            'https://flycamvn.com/wp-content/uploads/2023/09/mini-pro.jpg',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6Lnwe_MbwO0whSFSfSYrGDijljomX1vrpQVfVqMfXafDwAYveU6KVqTPG6HUUeky0TL0&usqp=CAU',
            'https://flycamvn.com/wp-content/uploads/2023/09/mini-pro.jpg',
        ],
        reviews: [
            {
                id: 1,
                author: 'Trần Văn F',
                avatar: '/Message/avatar6.png',
                rating: 4.4,
                date: '2 tuần trước',
                content:
                    'Thiết kế thông minh, quay video 360 độ thật ấn tượng.',
            },
        ],
        isHotProduct: true,
        isNewProduct: false,
        location: 'Hà Nội',
        view: 700,
    },
    {
        title: 'Mic Thu Âm Chuyên Nghiệp ProSound',
        shortDetails: 'Mic thu âm chất lượng cao cho studio và livestream.',
        brand: 'ProSound',
        category: 'Mic Thu Âm',
        price: 350000,
        idProduct: 'mic_thu_am_001',
        idShop: 's002',
        details:
            'Mic ProSound với chất âm trung thực, phù hợp cho thu âm nhạc và phát trực tiếp.',
        parameter: [
            { key: 'sensitivity', label: 'Độ nhạy', value: 'High' },
            { key: 'frequency', label: 'Dải tần số', value: '20Hz-20kHz' },
        ],
        images: [
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWcRK2VfeHvGxghrUu5gjVDha8EmCEpn6Wf1mFkDvMsp8kIyABPuPexRJ5mGtBlsvUFa0&usqp=CAU',
            'https://img.vn.my-best.com/content_section/choice_component/sub_contents/5e733ebfde97f4df6aee1a20399f1e3b.jpg?ixlib=rails-4.3.1&q=70&lossless=0&w=690&fit=max&s=6db46ebbfef70b48cd6efeab9efec59e',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjLvGNd6_A_GXFE-zXuZQe1t12ri5H5__kKg&s',
        ],
        reviews: [
            {
                id: 1,
                author: 'Lê Thị G',
                avatar: '/Message/avatar7.png',
                rating: 4.2,
                date: '1 tuần trước',
                content: 'Chất lượng âm thanh rõ ràng, phù hợp cho livestream.',
            },
        ],
        isHotProduct: false,
        isNewProduct: true,
        location: 'Hà Nội',
        view: 300,
    },
    {
        title: 'Gimbal 3 trục Stabilizer Pro',
        shortDetails: 'Gimbal 3 trục giúp ổn định hình ảnh khi quay.',
        brand: 'Stabilizer',
        category: 'Camera',
        price: 800000,
        idProduct: 'gimbal_001',
        idShop: 's001',
        details:
            'Gimbal Stabilizer Pro hỗ trợ 3 trục, giảm thiểu rung lắc, phù hợp cho mọi thiết bị quay phim.',
        parameter: [
            { key: 'axis', label: 'Số trục', value: '3' },
            { key: 'battery', label: 'Thời gian hoạt động', value: '2 giờ' },
        ],
        images: [
            'https://htcamera.htskys.com/wp-content/uploads/2023/10/Top-5-gimbal-GoPro-nen-mua-HTCamera-3.jpg',
            'https://flycamvn.com/wp-content/uploads/2018/05/8.jpg',
            'https://songchannelvn.com/wp-content/uploads/2022/12/gimbal_f8_estabilizador_smartphone_3_ejes_03_ad_l.jpg',
        ],
        reviews: [
            {
                id: 1,
                author: 'Phạm Văn H',
                avatar: '/Message/avatar8.png',
                rating: 4.5,
                date: '3 tuần trước',
                content:
                    'Ổn định tuyệt đối, dễ sử dụng trong mọi điều kiện quay.',
            },
        ],
        isHotProduct: true,
        isNewProduct: true,
        location: 'Đà Nẵng',
        view: 550,
    },
    {
        title: 'Máy ảnh DSLR Canon EOS 200D',
        shortDetails: 'Máy ảnh DSLR cho người mới bắt đầu.',
        brand: 'Canon',
        category: 'Máy ảnh',
        price: 1500000,
        idProduct: 'may_anh_001',
        idShop: 's002',
        details:
            'Canon EOS 200D với cảm biến APS-C, dễ sử dụng, phù hợp cho cả nhiếp ảnh gia nghiệp dư lẫn chuyên nghiệp.',
        parameter: [
            { key: 'sensor', label: 'Cảm biến', value: 'APS-C' },
            { key: 'resolution', label: 'Độ phân giải', value: '24MP' },
        ],
        images: [
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmEjz45DjbEcoJNWEu3w38h-Puw1T8gHJriw&s',
            'https://cdn.nguyenkimmall.com/images/detailed/257/may-anh-canon-200d_p8yu-xn.jpg',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr2WjETryGwDmyCOqStCxhpMBbetqGGxo9P1Y9mMa6GyVh9Y0-Ige-7LNeIDLMxyehzFs&usqp=CAU',
        ],
        reviews: [
            {
                id: 1,
                author: 'Trần Văn I',
                avatar: '/Message/avatar9.png',
                rating: 4.3,
                date: '2 tuần trước',
                content: 'Độ phân giải tốt, dễ sử dụng cho mọi trình độ.',
            },
        ],
        isHotProduct: false,
        isNewProduct: true,
        location: 'Hồ Chí Minh',
        view: 900,
    },
    {
        title: 'Đèn Quay Phim LED BrightLight',
        shortDetails: 'Đèn LED với ánh sáng mạnh mẽ, điều chỉnh dễ dàng.',
        brand: 'BrightLight',
        category: 'Đèn quay phim',
        price: 400000,
        idProduct: 'den_quay_phim_001',
        idShop: 's001',
        details:
            'Đèn Quay Phim BrightLight cung cấp ánh sáng đều, thích hợp cho quay phim trong nhà và ngoài trời.',
        parameter: [
            { key: 'brightness', label: 'Độ sáng', value: '5000 lumens' },
            { key: 'colorTemp', label: 'Nhiệt độ màu', value: '5500K' },
        ],
        images: [
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1uI6Gs-LnqhMLaDN_1y1k5p0n_AfvNX65xA&s',
            'https://minhduc.com.vn/vn/files/den-led-tolifo-x-500b-500w-bicolor-2700k-6500k-chuyen-nghiep%20(2)(1).jpg',
            'https://cdn-img-v2.mybota.vn/uploadv2/web/16/16683/media/2021/09/29/10/46/1632924833_71iqrtfad7l._ac_sl1500__result.jpg',
        ],
        reviews: [
            {
                id: 1,
                author: 'Ngô Thị K',
                avatar: '/Message/avatar10.png',
                rating: 4.0,
                date: '1 tuần trước',
                content:
                    'Ánh sáng đều và mạnh mẽ, phù hợp cho quay phim chuyên nghiệp.',
            },
        ],
        isHotProduct: false,
        isNewProduct: false,
        location: 'Hà Nội',
        view: 250,
    },
    {
        title: 'Đèn Flash Studio Pro',
        shortDetails: 'Đèn Flash chuyên nghiệp cho studio chụp ảnh.',
        brand: 'StudioPro',
        category: 'Đèn Flash',
        price: 300000,
        idProduct: 'den_flash_001',
        idShop: 's002',
        details:
            'Đèn Flash Studio Pro với chế độ ánh sáng đa dạng, đảm bảo chất lượng ảnh chụp trong mọi điều kiện.',
        parameter: [
            { key: 'power', label: 'Công suất', value: '500W' },
            { key: 'recycleTime', label: 'Thời gian tái sạc', value: '2 giây' },
        ],
        images: [
            'https://minhduc.com.vn/vn/images/sanpham/den-flash-ngoai-troi-godox-ad600-pro-ii%20(3).jpg',
            'https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lpxf3phw0yev4f',
            'https://shopnhiepanh.vn/admin/js/ckfinder/userfiles/images/03-den-led-panel-chup-san-pham.jpg',
        ],
        reviews: [
            {
                id: 1,
                author: 'Lâm Văn M',
                avatar: '/Message/avatar11.png',
                rating: 4.4,
                date: '2 tuần trước',
                content: 'Đèn flash mạnh mẽ, phục vụ tốt cho nhu cầu studio.',
            },
        ],
        isHotProduct: true,
        isNewProduct: false,
        location: 'Đà Nẵng',
        view: 350,
    },
    {
        title: 'Macbook Pro 14 inch',
        shortDetails:
            'Macbook Pro 14 inch hiệu năng cao cho chuyên gia sáng tạo.',
        brand: 'Apple',
        category: 'Macbook',
        price: 3000000,
        idProduct: 'macbook_001',
        idShop: 's001',
        details:
            'Macbook Pro 14 inch với chip M1 Pro, màn hình Retina sắc nét, thiết kế tinh tế, phù hợp cho công việc thiết kế đồ họa.',
        parameter: [
            { key: 'chip', label: 'Chip xử lý', value: 'M1 Pro' },
            { key: 'ram', label: 'RAM', value: '16GB' },
        ],
        images: [
            'https://product.hstatic.net/200000348419/product/macbook_pro_14_inch_m1_2021_gray_0_639eee6bae5a454294aea8d3f97a316c_master.png',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR00jcPEAjFb0wllabWj7Z5qzcmt56L4ZPIzA&s',
            'https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/475157Pjr/anh-mo-ta.png',
        ],
        reviews: [
            {
                id: 1,
                author: 'Phạm Văn N',
                avatar: '/Message/avatar12.png',
                rating: 4.7,
                date: '3 tuần trước',
                content: 'Hiệu năng mạnh mẽ, thiết kế sang trọng.',
            },
        ],
        isHotProduct: true,
        isNewProduct: true,
        location: 'Hà Nội',
        view: 1200,
    },
    {
        title: 'Samsung Galaxy S23 Ultra',
        shortDetails:
            'SmartPhone cao cấp với camera chất lượng và hiệu năng mạnh mẽ.',
        brand: 'Samsung',
        category: 'SmartPhone',
        price: 1800000,
        idProduct: 'dien_thoai_001',
        idShop: 's002',
        details:
            'Samsung Galaxy S23 Ultra với công nghệ chụp ảnh tiên tiến, màn hình sắc nét, pin trâu cho người dùng chuyên nghiệp.',
        parameter: [
            { key: 'screen', label: 'Màn hình', value: '6.8 inch' },
            { key: 'battery', label: 'Dung lượng pin', value: '5000mAh' },
        ],
        images: [
            'https://image.banker.vn/600x,q60/https://cms.ub.net/media/images/banker_news/4c63274b7ff9865820ed21e0b3f585f5.png',
            'https://media.viez.vn/prod/2023/3/7/1678156113052_629dd47143.png',
            'https://i.ytimg.com/vi/02i3Tt6Vdsc/hqdefault.jpg',
        ],
        reviews: [
            {
                id: 1,
                author: 'Trần Văn O',
                avatar: '/Message/avatar13.png',
                rating: 4.6,
                date: '1 tuần trước',
                content: 'Camera xuất sắc và hiệu năng vượt trội.',
            },
        ],
        isHotProduct: false,
        isNewProduct: true,
        location: 'Hồ Chí Minh',
        view: 1600,
    },
    {
        title: 'Trạm Sạc Di Động PowerBank X',
        shortDetails:
            'Trạm sạc di động dung lượng lớn, sạc nhanh, thiết kế nhỏ gọn.',
        brand: 'PowerX',
        category: 'Trạm Xạc Di Động',
        price: 500000,
        idProduct: 'tram_sac_001',
        idShop: 's001',
        details:
            'PowerBank X với dung lượng 20000mAh, hỗ trợ sạc nhanh, an toàn cho thiết bị của bạn.',
        parameter: [
            { key: 'capacity', label: 'Dung lượng', value: '20000mAh' },
            { key: 'output', label: 'Cổng xuất', value: 'USB-C, USB-A' },
        ],
        images: [
            'https://bizweb.dktcdn.net/100/461/377/files/tram-sac-du-phong-di-dong-joyroom-pbf10-dung-luong-75000mah-sac-nhanh-100w-tich-hop-den-10.jpg?v=1719041060868',
            'https://pisenvietnam.vn/upload/product/power_9915.jpg',
            'https://manager.remaxvietnam.vn/asset/images/SanPham/phukiendienthoai/pinsacduphong/WP-08/slide/tram-sac-du-phong-ngoai-troi-50000mah-wp-08-1-21032024.jpg',
            'https://vn-test-11.slatic.net/p/3450d70b167ecfc3ba1cac0ff6259127.jpg',
        ],
        reviews: [
            {
                id: 1,
                author: 'Nguyễn Văn P',
                avatar: '/Message/avatar14.png',
                rating: 4.3,
                date: '2 tuần trước',
                content: 'Sạc nhanh, thiết kế tiện lợi cho người dùng di động.',
            },
        ],
        isHotProduct: true,
        isNewProduct: false,
        location: 'Hà Nội',
        view: 500,
    },
    {
        title: 'Bộ Phụ Kiện Đèn Chiếu Sáng',
        shortDetails:
            'Bộ phụ kiện đa năng, dễ lắp đặt, tăng cường ánh sáng cho buổi chụp.',
        brand: 'LightPro',
        category: 'Phụ Kiện Đèn',
        price: 250000,
        idProduct: 'phu_kien_den_001',
        idShop: 's002',
        details:
            'Bộ phụ kiện đèn của LightPro bao gồm bộ kẹp, bộ điều chỉnh góc, và bộ chuyển đổi nguồn, phù hợp cho các loại đèn quay phim và flash.',
        parameter: [
            { key: 'compatibility', label: 'Tương thích', value: 'Đa dạng' },
            { key: 'material', label: 'Chất liệu', value: 'Nhựa cao cấp' },
        ],
        images: [
            'https://canhxinh.com/wp-content/uploads/2023/08/bo-chup-cau.jpg',
            'https://thietbigao.com/uploads/images/Dich%20vu/su-dung-anh-sang-nhu-the-nao-de-co-buc-anh-san-pham-dep-j.jpg',
            'https://hlstudio.vn/wp-content/uploads/2023/04/godox-combo-09-giai-phap-chup-anh-quay-livestream-do-trang-suc-chuyen-nghiep.jpg',
        ],
        reviews: [
            {
                id: 1,
                author: 'Trần Thị Q',
                avatar: '/Message/avatar15.png',
                rating: 4.2,
                date: '2 tuần trước',
                content:
                    'Phụ kiện tiện lợi, dễ lắp đặt, cải thiện ánh sáng hiệu quả.',
            },
        ],
        isHotProduct: false,
        isNewProduct: true,
        location: 'Hà Nội',
        view: 400,
    },

    {
        title: 'Thiết Bị Livestream Chuyên Nghiệp',
        shortDetails:
            'Thiết bị livestream tích hợp âm thanh, hình ảnh chất lượng cao, dễ thiết lập.',
        brand: 'LiveTech',
        category: 'Thiết bị Live',
        price: 2200000,
        idProduct: 'thiet_bi_live_001',
        idShop: 's001',
        details:
            'Thiết bị Livestream của LiveTech hỗ trợ kết nối nhanh, cấu hình mạnh mẽ, phù hợp cho các sự kiện trực tuyến chuyên nghiệp.',
        parameter: [
            { key: 'resolution', label: 'Độ phân giải', value: '1080p' },
            { key: 'connectivity', label: 'Kết nối', value: 'HDMI, USB' },
        ],
        reviews: [
            {
                id: 1,
                author: 'Lê Văn R',
                avatar: '/Message/avatar16.png',
                rating: 4.5,
                date: '3 tuần trước',
                content:
                    'Thiết bị ổn định, dễ cài đặt cho các buổi livestream.',
            },
        ],
        isHotProduct: true,
        isNewProduct: true,
        location: 'Đà Nẵng',
        view: 750,
    },

    {
        title: 'Chân Máy Mini Pro',
        shortDetails: 'Chân máy nhỏ gọn cho các buổi chụp ảnh ngoài trời.',
        brand: 'MiniTech',
        category: 'Camera',
        price: 300000,
        idProduct: 'chan_may_minipro',
        idShop: 's002',
        details:
            'Chân máy Mini Pro với thiết kế siêu nhẹ và dễ dàng di chuyển, thích hợp cho nhiếp ảnh đường phố.',
        parameter: [
            { key: 'material', label: 'Chất liệu', value: 'Nhựa cao cấp' },
            {
                key: 'adjustability',
                label: 'Độ điều chỉnh',
                value: 'Rộng 180°',
            },
        ],
        reviews: [
            {
                id: 1,
                author: 'Test Reviewer',
                avatar: '/Message/avatar2.png',
                rating: 4.2,
                date: '2 ngày trước',
                content: 'Thiết kế nhỏ gọn, phù hợp với nhu cầu di chuyển.',
            },
        ],
        isHotProduct: false,
        isNewProduct: true,
        location: 'Hồ Chí Minh',
        view: 200,
    },
    {
        title: 'Drone FPV Speedster X',
        shortDetails: 'Drone FPV tốc độ cao với khả năng quay video 4K.',
        brand: 'SpeedX',
        category: 'FPV',
        price: 1600000,
        idProduct: 'fpv_speedster_x',
        idShop: 's001',
        details:
            'Drone FPV Speedster X được trang bị cảm biến hiện đại và khả năng điều khiển chính xác, phù hợp cho các cuộc đua.',
        parameter: [
            { key: 'maxSpeed', label: 'Tốc độ tối đa', value: '130 km/h' },
            { key: 'flightTime', label: 'Thời gian bay', value: '18 phút' },
        ],
        reviews: [
            {
                id: 1,
                author: 'Test Reviewer',
                avatar: '/Message/avatar3.png',
                rating: 4.6,
                date: '1 ngày trước',
                content: 'Drone mạnh mẽ, đáp ứng tốt nhu cầu đua tốc độ.',
            },
        ],
        isHotProduct: true,
        isNewProduct: false,
        location: 'Đà Nẵng',
        view: 950,
    },
    {
        title: 'DJI Goggles V3',
        shortDetails: 'Kính thực tế ảo với chất lượng hình ảnh 4K.',
        brand: 'DJI',
        category: 'DJI Goggles',
        price: 1100000,
        idProduct: 'dji_goggles_v3',
        idShop: 's001',
        details:
            'DJI Goggles V3 cung cấp trải nghiệm thực tế ảo đỉnh cao với khả năng kết nối mượt mà và độ phân giải 4K.',
        parameter: [
            { key: 'resolution', label: 'Độ phân giải', value: '4K' },
            { key: 'connectivity', label: 'Kết nối', value: 'WiFi, Bluetooth' },
        ],
        reviews: [
            {
                id: 1,
                author: 'Test Reviewer',
                avatar: '/Message/avatar4.png',
                rating: 4.7,
                date: '1 ngày trước',
                content:
                    'Kinh nghiệm thực tế ảo vượt trội với hình ảnh sắc nét.',
            },
        ],
        isHotProduct: true,
        isNewProduct: true,
        location: 'Hà Nội',
        view: 600,
    },
    {
        title: 'Máy Quay 4K Ultra Pro',
        shortDetails:
            'Máy quay chuyên nghiệp với khả năng ghi hình 4K và ổn định tuyệt đối.',
        brand: 'UltraVision',
        category: 'Camera',
        price: 2500000,
        idProduct: 'may_quay_4k_ultra',
        idShop: 's002',
        details:
            'Máy quay 4K Ultra Pro với cảm biến cao cấp, cho phép quay phim mượt mà ngay cả trong điều kiện ánh sáng yếu.',
        parameter: [
            { key: 'resolution', label: 'Độ phân giải', value: '4K' },
            {
                key: 'stabilization',
                label: 'Ổn định',
                value: 'Công nghệ ổn định 5 trục',
            },
        ],
        reviews: [
            {
                id: 1,
                author: 'Test Reviewer',
                avatar: '/Message/avatar5.png',
                rating: 4.5,
                date: '1 ngày trước',
                content:
                    'Chất lượng quay phim ấn tượng, ổn định trong mọi điều kiện.',
            },
        ],
        isHotProduct: true,
        isNewProduct: true,
        location: 'Hồ Chí Minh',
        view: 800,
    },
    {
        title: 'Flycam Pro 4K',
        shortDetails:
            'Flycam cao cấp với khả năng quay video 4K chất lượng cao.',
        brand: 'ProFly',
        category: 'Flycam',
        price: 1400000,
        idProduct: 'flycam_pro_4k',
        idShop: 's001',
        details:
            'Flycam Pro 4K được thiết kế cho các chuyến bay dài với khả năng ghi hình chất lượng cao và dễ điều khiển.',
        parameter: [
            { key: 'camera', label: 'Camera', value: '4K Ultra HD' },
            { key: 'flightTime', label: 'Thời gian bay', value: '30 phút' },
        ],
        reviews: [
            {
                id: 1,
                author: 'Test Reviewer',
                avatar: '/Message/avatar6.png',
                rating: 4.4,
                date: '1 ngày trước',
                content: 'Hiệu năng quay phim ấn tượng và dễ điều khiển.',
            },
        ],
        isHotProduct: false,
        isNewProduct: true,
        location: 'Hà Nội',
        view: 750,
    },
    {
        title: 'Mic Thu Âm StudioMaster',
        shortDetails:
            'Mic thu âm chất lượng cao, lý tưởng cho studio và podcast.',
        brand: 'StudioSound',
        category: 'Mic Thu Âm',
        price: 400000,
        idProduct: 'mic_studiomaster',
        idShop: 's002',
        details:
            'Mic StudioMaster mang đến chất lượng âm thanh sống động, giảm nhiễu hiệu quả, phù hợp cho các buổi thu âm chuyên nghiệp.',
        parameter: [
            { key: 'sensitivity', label: 'Độ nhạy', value: 'Ultra High' },
            { key: 'frequency', label: 'Dải tần số', value: '18Hz-22kHz' },
        ],
        reviews: [
            {
                id: 1,
                author: 'Test Reviewer',
                avatar: '/Message/avatar7.png',
                rating: 4.3,
                date: '1 ngày trước',
                content: 'Âm thanh sống động, giảm nhiễu tốt.',
            },
        ],
        isHotProduct: false,
        isNewProduct: true,
        location: 'Hà Nội',
        view: 350,
    },
    {
        title: 'Gimbal 5 trục Ultra',
        shortDetails: 'Gimbal 5 trục cho sự ổn định tối đa khi quay phim.',
        brand: 'UltraStabil',
        category: 'Camera',
        price: 1200000,
        idProduct: 'gimbal_5ultra',
        idShop: 's001',
        details:
            'Gimbal 5 trục Ultra giúp loại bỏ hoàn toàn rung lắc, phù hợp cho mọi thiết bị quay phim chuyên nghiệp.',
        parameter: [
            { key: 'axis', label: 'Số trục', value: '5' },
            { key: 'battery', label: 'Thời gian hoạt động', value: '3 giờ' },
        ],
        reviews: [
            {
                id: 1,
                author: 'Test Reviewer',
                avatar: '/Message/avatar8.png',
                rating: 4.6,
                date: '1 ngày trước',
                content: 'Ổn định tuyệt đối, rất chuyên nghiệp.',
            },
        ],
        isHotProduct: true,
        isNewProduct: true,
        location: 'Đà Nẵng',
        view: 700,
    },
    {
        title: 'Máy ảnh Mirrorless Sony A7 III',
        shortDetails:
            'Máy ảnh mirrorless chuyên nghiệp với cảm biến full-frame.',
        brand: 'Sony',
        category: 'Máy ảnh',
        price: 3200000,
        idProduct: 'sony_a7_iii',
        idShop: 's002',
        details:
            'Sony A7 III mang lại chất lượng hình ảnh xuất sắc, khả năng chụp nhanh và hiệu suất cao trong điều kiện ánh sáng yếu.',
        parameter: [
            { key: 'sensor', label: 'Cảm biến', value: 'Full-frame' },
            { key: 'resolution', label: 'Độ phân giải', value: '24MP' },
        ],
        reviews: [
            {
                id: 1,
                author: 'Test Reviewer',
                avatar: '/Message/avatar9.png',
                rating: 4.5,
                date: '1 ngày trước',
                content: 'Hình ảnh sắc nét và hiệu năng vượt trội.',
            },
        ],
        isHotProduct: false,
        isNewProduct: true,
        location: 'Hồ Chí Minh',
        view: 1000,
    },
    {
        title: 'Đèn Quay Phim SoftLight',
        shortDetails: 'Đèn mềm mại cho hiệu ứng ánh sáng tự nhiên.',
        brand: 'SoftLight',
        category: 'Đèn quay phim',
        price: 450000,
        idProduct: 'den_quay_phim_softlight',
        idShop: 's001',
        details:
            'Đèn SoftLight mang đến ánh sáng tự nhiên, giúp giảm bóng và tạo hiệu ứng mềm mại cho các buổi quay phim trong nhà và ngoài trời.',
        parameter: [
            { key: 'brightness', label: 'Độ sáng', value: '4000 lumens' },
            { key: 'colorTemp', label: 'Nhiệt độ màu', value: '5000K' },
        ],
        reviews: [
            {
                id: 1,
                author: 'Test Reviewer',
                avatar: '/Message/avatar10.png',
                rating: 4.2,
                date: '1 ngày trước',
                content: 'Ánh sáng tự nhiên, tạo không gian ấm áp.',
            },
        ],
        isHotProduct: false,
        isNewProduct: true,
        location: 'Hà Nội',
        view: 320,
    },
    {
        title: 'Đèn Flash HighSpeed',
        shortDetails:
            'Đèn flash với tốc độ tái sạc cực nhanh, lý tưởng cho nhiếp ảnh thể thao.',
        brand: 'FlashPro',
        category: 'Đèn Flash',
        price: 350000,
        idProduct: 'den_flash_highspeed',
        idShop: 's002',
        details:
            'Đèn Flash HighSpeed của FlashPro có tốc độ tái sạc chỉ trong 1.5 giây, đảm bảo không bỏ lỡ khoảnh khắc.',
        parameter: [
            { key: 'power', label: 'Công suất', value: '600W' },
            {
                key: 'recycleTime',
                label: 'Thời gian tái sạc',
                value: '1.5 giây',
            },
        ],
        reviews: [
            {
                id: 1,
                author: 'Test Reviewer',
                avatar: '/Message/avatar11.png',
                rating: 4.4,
                date: '1 ngày trước',
                content: 'Tốc độ flash nhanh, lý tưởng cho chụp thể thao.',
            },
        ],
        isHotProduct: true,
        isNewProduct: false,
        location: 'Đà Nẵng',
        view: 400,
    },
    {
        title: 'Macbook Air 13 inch',
        shortDetails:
            'Macbook Air nhẹ và hiệu năng ổn định cho công việc hàng ngày.',
        brand: 'Apple',
        category: 'Macbook',
        price: 2500000,
        idProduct: 'macbook_air_13',
        idShop: 's001',
        details:
            'Macbook Air 13 inch với chip M1, thiết kế mỏng nhẹ, thời lượng pin ấn tượng, phù hợp cho công việc văn phòng và di động.',
        parameter: [
            { key: 'chip', label: 'Chip xử lý', value: 'M1' },
            { key: 'ram', label: 'RAM', value: '8GB' },
        ],
        reviews: [
            {
                id: 1,
                author: 'Test Reviewer',
                avatar: '/Message/avatar12.png',
                rating: 4.3,
                date: '1 ngày trước',
                content: 'Máy nhẹ, hiệu năng tốt cho công việc hàng ngày.',
            },
        ],
        isHotProduct: false,
        isNewProduct: true,
        location: 'Hà Nội',
        view: 1100,
    },
    {
        title: 'Google Pixel 7 Pro',
        shortDetails:
            'SmartPhone thông minh với camera tối ưu và hiệu năng mạnh mẽ.',
        brand: 'Google',
        category: 'SmartPhone',
        price: 1700000,
        idProduct: 'google_pixel_7',
        idShop: 's002',
        details:
            'Google Pixel 7 Pro được trang bị công nghệ AI tiên tiến, cho phép tối ưu hóa chất lượng ảnh và hiệu suất xử lý vượt trội.',
        parameter: [
            { key: 'screen', label: 'Màn hình', value: '6.7 inch' },
            { key: 'battery', label: 'Dung lượng pin', value: '4800mAh' },
        ],
        reviews: [
            {
                id: 1,
                author: 'Test Reviewer',
                avatar: '/Message/avatar13.png',
                rating: 4.6,
                date: '1 ngày trước',
                content: 'Camera tối ưu, hiệu năng ấn tượng.',
            },
        ],
        isHotProduct: true,
        isNewProduct: true,
        location: 'Hồ Chí Minh',
        view: 1400,
    },
    {
        title: 'Trạm Xạc Di Động SuperCharge',
        shortDetails:
            'Trạm sạc di động với dung lượng cực lớn và công nghệ sạc nhanh.',
        brand: 'ChargeMax',
        category: 'Trạm Xạc Di Động',
        price: 650000,
        idProduct: 'tram_sac_supercharge',
        idShop: 's001',
        details:
            'Trạm Xạc Di Động SuperCharge có dung lượng lên tới 30000mAh, hỗ trợ sạc nhanh và nhiều cổng kết nối, lý tưởng cho nhu cầu di động cao.',
        parameter: [
            { key: 'capacity', label: 'Dung lượng', value: '30000mAh' },
            {
                key: 'ports',
                label: 'Cổng kết nối',
                value: 'USB-C, USB-A, QuickCharge',
            },
        ],
        reviews: [
            {
                id: 1,
                author: 'Test Reviewer',
                avatar: '/Message/avatar14.png',
                rating: 4.5,
                date: '1 ngày trước',
                content: 'Sạc nhanh, thiết kế tiện lợi, dung lượng cực lớn.',
            },
        ],
        isHotProduct: true,
        isNewProduct: true,
        location: 'Hà Nội',
        view: 600,
    },
    {
        title: 'Phụ Kiện Đèn Chuyên Nghiệp Set',
        shortDetails: 'Bộ phụ kiện đèn đầy đủ cho studio chuyên nghiệp.',
        brand: 'LightPro',
        category: 'Phụ Kiện Đèn',
        price: 300000,
        idProduct: 'phu_kien_den_set',
        idShop: 's002',
        details:
            'Bộ phụ kiện bao gồm giá treo, cáp nối và bộ điều chỉnh góc, tối ưu cho hệ thống chiếu sáng chuyên nghiệp.',
        parameter: [
            {
                key: 'components',
                label: 'Số lượng linh kiện',
                value: '5 thành phần',
            },
            { key: 'material', label: 'Chất liệu', value: 'Nhựa cao cấp' },
        ],
        reviews: [
            {
                id: 1,
                author: 'Test Reviewer',
                avatar: '/Message/avatar15.png',
                rating: 4.2,
                date: '1 ngày trước',
                content:
                    'Bộ phụ kiện đầy đủ, dễ lắp đặt, cải thiện ánh sáng hiệu quả.',
            },
        ],
        isHotProduct: false,
        isNewProduct: true,
        location: 'Hà Nội',
        view: 450,
    },
    {
        title: 'Thiết Bị Livestream Mobile Kit',
        shortDetails:
            'Bộ thiết bị livestream tích hợp camera, mic và đèn, dễ dàng sử dụng trên SmartPhone.',
        brand: 'LiveMobile',
        category: 'Thiết bị Live',
        price: 1800000,
        idProduct: 'thiet_bi_live_mobile',
        idShop: 's001',
        details:
            'Thiết Bị Livestream Mobile Kit thiết kế dành riêng cho livestream trên SmartPhone với kết nối nhanh và cấu hình ổn định.',
        parameter: [
            { key: 'connectivity', label: 'Kết nối', value: 'WiFi, Bluetooth' },
            { key: 'battery', label: 'Thời lượng pin', value: '4 giờ' },
        ],
        reviews: [
            {
                id: 1,
                author: 'Test Reviewer',
                avatar: '/Message/avatar16.png',
                rating: 4.5,
                date: '1 ngày trước',
                content:
                    'Thiết bị ổn định, dễ thiết lập, lý tưởng cho livestream di động.',
            },
        ],
        isHotProduct: true,
        isNewProduct: true,
        location: 'Đà Nẵng',
        view: 700,
    },
]

export const shopDetails: ShopDetail[] = [
    {
        avatar: '/images/Intro/avt1.png',
        idShop: 's001',
        response: 95,
        nameShop: 'Tech Store',
        rentered: 10,
        rate: 4.8,
        totalReviews: 500,
    },
    {
        avatar: '/images/Intro/avt2.png',
        idShop: 's002',
        response: 90,
        nameShop: 'Mobile World',
        rentered: 8,
        rate: 4.7,
        totalReviews: 300,
    },
    {
        avatar: '/images/Intro/avt3.png',
        idShop: 's003',
        response: 92,
        nameShop: 'Gadget Hub',
        rentered: 12,
        rate: 4.9,
        totalReviews: 450,
    },
    {
        avatar: '/images/Intro/avt4.png',
        idShop: 's004',
        response: 88,
        nameShop: 'Creative Zone',
        rentered: 7,
        rate: 4.6,
        totalReviews: 280,
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
