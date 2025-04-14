export interface User {
    id: string
    fullname?: string //sau khi định danh
    name: string
    email: string
    joinDate: string
    phone: string
    address: string
    isVerified: boolean // là đã định danh
    ownedProducts: number
    rentingProducts: number
    registeredLessorr: boolean // là người bán
    rentedProducts?: number //có thể lọc từ tổng số sản phẩm cùng _id
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
    registeredLessorr: false,
}
