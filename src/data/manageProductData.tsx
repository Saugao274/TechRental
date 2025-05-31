import { userData, type User } from './authData'

export type UnitProductType = {
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
    customerId: User
    products: UnitProductType[]
    totalPrice: number
    status:
        | 'completed'
        | 'pending_payment'
        | 'pending_confirmation'
        | 'in_delivery'
        | 'canceled'
        | 'before_deadline'
    createdAt: string
    updatedAt: string
    duration: number
}
export const statusColors = {
    completed: 'green',
    //người thuê
    pending_payment: 'orange',
    canceledy: 'red',
    pending_confirmation: 'orange',
    in_delivery: 'orange',
    before_deadline: 'blue',
}
export const orders: OrderType[] = [
    {
        _id: 'OR01',
        customerId: userData,
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
        duration: 3,
        status: 'completed',
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: '2023-01-01T00:00:00Z',
    },
    {
        _id: 'OR02',
        customerId: userData,
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
        duration: 3,
        status: 'in_delivery',
        createdAt: '2023-02-15T00:00:00Z',
        updatedAt: '2023-02-15T00:00:00Z',
    },
]
