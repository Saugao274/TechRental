'use client'

import HeaderProduct from '@/components/core/elements/Products/AllProduct/HeaderProduct'
import NewArrivals from '@/components/core/elements/Products/AllProduct/NewArrivals'
import RecommentProduct from '@/components/core/elements/Products/AllProduct/RecommentProduct'
import React from 'react'
import { useSearchParams } from 'next/navigation'
import { useProducts } from '@/context/ProductContext'

const Products = () => {
    const searchParams = useSearchParams()
    const searchTerm = searchParams.get('search') || ''
    const { productsData } = useProducts()
    const filteredProducts = searchTerm
        ? productsData.filter((product: any) =>
              product.title?.toLowerCase().includes(searchTerm.toLowerCase()),
          )
        : productsData
    // Truyền filteredProducts xuống các component con nếu cần, hoặc render trực tiếp ở đây
    return (
        <div>
            <HeaderProduct />
            {/* Có thể truyền filteredProducts vào RecommentProduct nếu muốn filter ở đó */}
            <RecommentProduct products={filteredProducts} />
            <NewArrivals />
        </div>
    )
}

export default Products
