export type OrderProductType = {
    _id: string
    productId: string
    unitId: string
    productStatus: 'available' | 'rented'
    orderId: string
    createdAt: string
    updatedAt: string
}

export type OrderType = {
    _id: string
    customerId: string
    products: OrderProductType[]
    totalPrice: number
    status:
        | 'completed'
        | 'pending_payment'
        | 'pending_confirmation'
        | 'in_delivery'
        | 'canceled'
    createdAt: string
    updatedAt: string
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
export const orders: OrderType[] = [
    {
        _id: 'OR01',
        customerId: 'Viết Thông',
        products: [
            {
                _id: 'p001',
                productId: 'DJI_Osmo_Pocket_3',
                unitId: 'DJI_Osmo_Pocket_3-1',
                productStatus: 'available',
                orderId: 'OR01',
                createdAt: '2023-01-01T00:00:00Z',
                updatedAt: '2023-01-01T00:00:00Z',
            },
        ],
        totalPrice: 2500000,
        status: 'completed',
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: '2023-01-01T00:00:00Z',
    },
    {
        _id: 'OR02',
        customerId: 'Nguyên',
        products: [
            {
                _id: 'chan_may_001',
                productId: 'Laptop MacBook Pro',
                unitId: 'Laptop_MacBook_Pro-1',
                productStatus: 'available',
                orderId: 'OR02',
                createdAt: '2023-02-15T00:00:00Z',
                updatedAt: '2023-02-15T00:00:00Z',
            },
        ],
        totalPrice: 3200000,
        status: 'in_delivery',
        createdAt: '2023-02-15T00:00:00Z',
        updatedAt: '2023-02-15T00:00:00Z',
    },
]
