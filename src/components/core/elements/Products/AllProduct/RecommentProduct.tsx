'use client'

import React, { useEffect, useState } from 'react'
import { Pagination, Skeleton } from 'antd'
import FilterSidebar from './FilterSidebar'
import ProductCard from '@/components/core/common/CardCommon/ProductCard'
import SectionCommon from '@/components/core/common/SectionCommon'
import { productEndpoint } from '@/settings/endpoints'
import { getRequest } from '@/request'
import { useAuth } from '@/context/AuthContext'

const RecommentProduct = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [productsData, setProductsData] = useState<any[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true)
            try {
                const responseAllProduct = await getRequest(
                    productEndpoint.GET_ALL,
                )
                setProductsData(responseAllProduct.metadata)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching products:', error)
            }
        }

        fetchProducts()
    }, [])
    const [filteredProducts, setFilteredProducts] = useState(productsData)

    const pageSize =
        typeof window !== 'undefined' && window.innerWidth < 768 ? 4 : 9

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
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
                {/* Sidebar */}
                <div className="w-full lg:w-1/4">
                    <FilterSidebar onFilter={handleFilter} />
                </div>
                {!loading ? (
                    <div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-3">
                        {currentProducts.map((product) => (
                            <ProductCard
                                key={product.idProduct}
                                product={product}
                            />
                        ))}
                    </div>
                ) : (
                    <Skeleton
                        active
                        paragraph={{ rows: 4 }}
                        className="h-full w-full"
                    >
                        <div className="grid w-full grid-cols-1 gap-5 lg:grid-cols-3">
                            {currentProducts.map((product) => (
                                <ProductCard
                                    key={product.idProduct}
                                    product={product}
                                />
                            ))}
                        </div>
                    </Skeleton>
                )}
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
