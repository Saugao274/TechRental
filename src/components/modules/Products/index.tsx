import HeaderProduct from '@/components/core/elements/Products/AllProduct/HeaderProduct'
import NewArrivals from '@/components/core/elements/Products/AllProduct/NewArrivals'
import RecommentProduct from '@/components/core/elements/Products/AllProduct/RecommentProduct'
import React from 'react'

const Products = () => {
    return (
        <div>
            <HeaderProduct />
            <RecommentProduct />
            <NewArrivals />
        </div>
    )
}

export default Products
