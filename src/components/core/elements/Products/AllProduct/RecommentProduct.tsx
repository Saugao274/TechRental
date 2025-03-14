'use client'

import React, { useState } from 'react'
import { Pagination } from 'antd'
import FilterSidebar from './FilterSidebar'
import { productsData } from '@/data/products'
import ProductCard from '@/components/core/common/CardCommon/ProductCard'
import SectionCommon from '@/components/core/common/SectionCommon'

const RecommentProduct = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [filteredProducts, setFilteredProducts] = useState(productsData)
    const pageSize = 9

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    const handleFilter = (filtered: any[]) => {
        setFilteredProducts(filtered)
        setCurrentPage(1)
    }

    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize
    const currentProducts = filteredProducts.slice(startIndex, endIndex)

    return (
        <SectionCommon className="container mx-auto h-full p-4">
            <div className="flex h-full items-center justify-center gap-6">
                <div className="w-1/4 flex-shrink-0">
                    <FilterSidebar onFilter={handleFilter} />
                </div>

                <div className="w-4/3 grid flex-1 grid-cols-1 grid-rows-3 gap-5 sm:grid-cols-2 md:grid-cols-3">
                    {currentProducts.map((product) => (
                        <ProductCard key={product.Id} product={product} />
                    ))}
                </div>
            </div>

            <div className="mt-6 flex justify-center">
                <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={filteredProducts.length}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                />
            </div>
        </SectionCommon>
    )
}

export default RecommentProduct
