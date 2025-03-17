export const notiData = [
    {
        _id: '1',
        type: 'transaction',
        title: 'Xác nhận đơn hàng',
        description:
            'Đơn hàng DJI Osmo Pocket 3 của bạn đã được xác nhận thành công. Hợp đồng điện tử đã được gửi đến email của bạn, vui lòng kiểm tra hộp thư đến và xác nhận các thông tin liên quan',
        time: 'Hôm nay 16:43',
        payload: { transactionId: '/' },
        image: ['/images/Noti/trans.png'],
        isRead: false,
    },
    {
        _id: '2',
        type: 'transaction',
        title: 'Hoàn tất giao dịch',
        description:
            'Giao dịch  DJI Osmo Pocket 3 đã hoàn tất. Tiền cọc sẽ được hoàn trả trong',
        time: 'Hôm nay 16:43',
        payload: { transactionId: '/' },
        image: ['/images/Noti/trans.png'],
        isRead: true,
    },
    {
        _id: '3',
        type: 'contract',
        title: 'Hợp đồng điện tử đã ký',
        description:
            'Hợp đồng cho thuê DJI Osmo Pocket 3 đã được ký thành công',
        payload: { contractId: '/' },
        image: ['/images/Noti/contract.png'],
        time: 'Hôm nay 16:43',
        isRead: true,
    },
    {
        _id: '4',
        type: 'contract',
        title: 'Nhắc nhở thanh toán cọc',
        description:
            'Bạn chưa thanh toán tiền cọc cho đơn hàng  DJI Osmo Pocket 3. Vui lòng hoàn tất để không bị hủy đơn',
        payload: { contractId: '/' },
        image: ['/images/Noti/contract.png'],
        time: 'Hôm nay 16:43',
        isRead: true,
    },
]
