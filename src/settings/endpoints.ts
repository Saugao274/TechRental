const prefixBase: string = '/api'

const authEndpoint = {
    SIGN_IN: '/auth/login',
    SIGN_UP: '/auth/register',
    FORGOT_PASSWORD: '/auth/forgotPassword',
    REFRESH_TOKEN: '/auth/refreshToken',
}
const userEndpoint = {
    CHANGE_PASSWORD: `${prefixBase}/auth/changePassword`,
}
const productEndpoint = {
    GET_ALL: `${prefixBase}/product`,
    GET_BY_ID: (id: string) => `${prefixBase}/product/${id}`,
    CREATE: `${prefixBase}/product`,
    // UPDATE: (id: string) => `/products/${id}`,
    // DELETE: (id: string) => `/products/${id}`,
    GET_BY_IDSHOP: (id: string) => `${prefixBase}/product/store/${id}`,
    // GET_BY_SUBCATEGORY: (subcategoryId: string) => `/products/subcategory/${subcategoryId}`,
    // GET_BY_BRAND: (brandId: string) => `/products/brand/${brandId}`,
    // GET_BY_SEARCH: (search: string) => `/products/search/${search}`,
    // GET_BY_PRICE: (minPrice: number, maxPrice: number) => `/products/price/${minPrice}/${maxPrice}`,
    // GET_BY_RATING: (rating: number) => `/products/rating/${rating}`,
    // GET_BY_COLOR: (color: string) => `/products/color/${color}`,
    // GET_BY_SIZE: (size: string) => `/products/size/${size}`,
    // GET_BY_TAG: (tag: string) => `/products/tag/${tag}`,
    // GET_BY_DISCOUNT: (discount: number) => `/products/discount/${discount}`,
    // GET_BY_STOCK: (inStock: boolean) => `/products/stock/${inStock}`,
}

const storeEndpoint = {
    GET_ALL: `${prefixBase}/shopDetail`,
    GET_BY_ID: (id: string) => `${prefixBase}/shopDetail/${id}`,
    CREATE: `${prefixBase}/shopDetail`,
}
const categoryEndpoint = {
    GET_ALL: `${prefixBase}/category`,
}
const productReviewEndpoint = {
    GET_ALL: `${prefixBase}/productReview`,
    GET_BY_ID_PRODUCT: (id: string) =>
        `${prefixBase}/productReview/product/${id}`,
    CREATE: `${prefixBase}/shopDetail`,
}
const cloudinaryEndpoint = {
    UPLOAD: `${prefixBase}/cloudinary`,
}

export const chatEndpoint = {
  GET_ROOMS: () => '/api/chatrooms',
  CREATE_ROOM: () => '/api/chatrooms',
  GET_MESSAGES: (roomId: string) => `/api/chatrooms/${roomId}/messages`,
  POST_MESSAGE: (roomId: string) => `/api/chatrooms/${roomId}/messages`,
}

export {
    authEndpoint,
    userEndpoint,
    productEndpoint,
    storeEndpoint,
    productReviewEndpoint,
    categoryEndpoint,
    cloudinaryEndpoint,
}
