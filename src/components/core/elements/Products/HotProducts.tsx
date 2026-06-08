import React, { useEffect, useState } from 'react'
import PageHader from '../../common/PageHeader'
import ProductCard from '../../common/CardCommon/ProductCard'
import SectionCommon from '../../common/SectionCommon'
import { productEndpoint } from '@/settings/endpoints'
import { Skeleton } from 'antd'
import { useProducts } from '@/context/ProductContext'

const HotProducts = () => {
    const { productsData, loading } = useProducts()
    const hotProductssData = productsData?.filter(
        (product) => product.isHotProduct,
    )
    return (
        <SectionCommon className="flex flex-col gap-10">
            <PageHader title="Sản phẩm nổi bật" />
            {!loading ? (
                <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
                    {hotProductssData
                        ?.slice(0, 4)
                        .map((product, index) => (
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
                            {hotProductssData
                                .slice(0, 4)
                                .map((product, index) => (
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
