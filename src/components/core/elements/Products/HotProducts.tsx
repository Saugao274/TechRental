import React, { useEffect, useState } from 'react'
import PageHader from '../../common/PageHeader'
import ProductCard from '../../common/CardCommon/ProductCard'
import SectionCommon from '../../common/SectionCommon'
import { Skeleton } from 'antd'
import { useProducts } from '@/context/ProductContext'
import { Input } from 'antd'

const HotProducts = () => {
    const { productsData, loading } = useProducts()
    const [searchTerm, setSearchTerm] = React.useState('')
    const hotProducts = productsData?.filter((p: any) => p.isHotProduct)
    const filteredProducts = hotProducts?.filter((product: any) =>
        product.title?.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    return (
        <SectionCommon className="flex flex-col gap-10">
            <PageHader title="Sản phẩm nổi bật" />
            <Input
                placeholder="Tìm kiếm sản phẩm nổi bật..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                allowClear
                className="mb-4"
            />
            {!loading ? (
                <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
                    {filteredProducts
                        ?.slice(0, 4)
                        .map((product: any, index: number) => (
                            <ProductCard product={product} key={index} />
                        ))}
                </div>
            ) : (
                <Skeleton
                    active
                    paragraph={{ rows: 4 }}
                    className="h-full w-full"
                >
                    <SectionCommon className="flex flex-col gap-10">
                        <PageHader title="Sản phẩm nổi bật" />
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
                            {filteredProducts
                                .slice(0, 4)
                                .map((product: any, index: number) => (
                                    <ProductCard
                                        product={product}
                                        key={index}
                                    />
                                ))}
                        </div>
                    </SectionCommon>
                </Skeleton>
            )}
        </SectionCommon>
    )
}

export default HotProducts
