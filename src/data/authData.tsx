export interface User {
    _id: string
    fullname?: string //sau khi định danh
    name: string
    email: string
    roles?: string[]
    joinDate: string
    phone: string
    address: string
    isVerified: boolean // là đã định danh
    ownedProducts: number
    rentingProducts: number
    registeredLessor: boolean
    avatar: string
    gender: string
    rentedProducts?: number
    dateOfBirth: string
}

export const user = {
    id: 'abc',
    name: 'Nguyễn ABC',
    joinDate: '01/01/2025',
    roles: ['rental'],
    email: 'example@example.com',
    phone: '0123456789',
    address: 'Hà Nội, Việt Nam',
    isVerified: true,
    ownedProducts: 5,
    rentingProducts: 2,
    rentedProducts: 10,
    registeredLessor: true,
}
