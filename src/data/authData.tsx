export interface User {
    id: string
    name: string
    email: string
    joinDate: string
    phone: string
    address: string
    isVerified: boolean
    ownedProducts: number
    rentingProducts: number
    rentedProducts: number
    isLandlord: boolean
}

export const user = {
    id: 'abc',
    name: 'Nguyễn ABC',
    joinDate: '01/01/2025',
    email: 'example@example.com',
    phone: '0123456789',
    address: 'Hà Nội, Việt Nam',
    isVerified: false,
    ownedProducts: 5,
    rentingProducts: 2,
    rentedProducts: 10,
    isLandlord: false,
}
