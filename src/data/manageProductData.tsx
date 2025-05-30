export type ordersType = {
    _id: string
    idProduct: string[]
    productId?: string
    unitId?: string
    dateOrder: string
    duration: string
    idCustomer: string
    productStatus: 'rented' | 'available'
    status:
        | 'Đã hoàn thành'
        | 'Chờ thanh toán'
        | 'Chờ người cho thuê xác nhận'
        | 'Chờ người thuê thanh toán'
        | 'Người thuê đã hủy'
        | 'Người bán đã hủy'
        | 'Cần xác nhận'
        | 'Chờ giao hàng' //người thuê
        | 'Đang giao hàng' //cho thuê
        | 'Đã giao hàng' //cho thuê
        | 'Đã nhận hàng' //người thuê
        | 'Đã trả hàng' //người thuê
    total: number
}
export const statusColors = {
    'Đã hoàn thành': 'green',
    //người thuê
    'Chờ thanh toán': 'orange',
    'Người thuê đã hủy': 'red',
    'Chờ người cho thuê xác nhận': 'orange',
    'Chờ giao hàng': 'orange',
    'Đã nhận hàng': 'blue',
    'Đã trả hàng': 'blue',
    //người cho thuê
    'Chờ người thuê thanh toán': 'orange',
    'Người bán đã hủy': 'red',
    'Cần xác nhận': 'orange',
    'Đang giao hàng': 'blue',
    'Đã giao hàng': 'blue',
}
export const orders: ordersType[] = [
    {
        _id: 'OR01',
        idProduct: ['p001', 'DJI_Osmo_Pocket_3'],
        dateOrder: '01/01/2023',
        duration: '5 ngày',
        productStatus: 'available',
        status: 'Đã hoàn thành',
        total: 2500000,
        idCustomer: 'Viết Thông',
    },
    {
        _id: 'OR01',
        idProduct: ['chan_may_001'],
        dateOrder: '15/02/2023',
        duration: '7 ngày',
        productStatus: 'available',
        status: 'Đang giao hàng',
        total: 1500000,
        idCustomer: 'Nguyên',
    },
    {
        _id: 'Or03',
        idProduct: ['chan_may_001'],
        dateOrder: '05/04/2023',
        duration: '3 ngày',
        productStatus: 'available',
        status: 'Cần xác nhận',
        total: 2000000,
        idCustomer: 'Duyên',
    },
    {
        _id: 'Or03',
        idProduct: ['chan_may_001'],
        dateOrder: '05/04/2023',
        duration: '3 ngày',
        productStatus: 'available',
        status: 'Đang giao hàng',
        total: 2000000,
        idCustomer: 'Duyên',
    },
    {
        _id: 'OR_003',
        idProduct: ['fpv_001'],
        dateOrder: '10/04/2023',
        duration: '10 ngày',
        productStatus: 'available',
        status: 'Chờ người thuê thanh toán',
        total: 5500000,
        idCustomer: 'Đức Ánh',
    },
    {
        _id: 'OR_003',
        idProduct: ['fpv_001'],
        dateOrder: '10/04/2023',
        duration: '10 ngày',
        productStatus: 'available',
        status: 'Người bán đã hủy',
        total: 5500000,
        idCustomer: 'Thế Anh',
    },
]
