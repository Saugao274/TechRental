import React, { useEffect, useState } from 'react'
import PageHader from '../../common/PageHeader'
import ProductCard from '../../common/CardCommon/ProductCard'
import SectionCommon from '../../common/SectionCommon'
import { productEndpoint } from '@/settings/endpoints'
import { getRequest } from '@/request'
import { useAuth } from '@/context/AuthContext'
import { Skeleton } from 'antd'
import { useProducts } from '@/context/ProductContext'

const NewProduct = () => {
    const { productsData, loading } = useProducts()
    const newProductsData = productsData?.filter(
        (product: any) => product.isNewProduct,
    )
    return (
        <SectionCommon className="flex flex-col gap-10">
            <div>
                <PageHader title="Sản phẩm mới" />
            </div>
            {!loading ? (
                <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
                    {newProductsData
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
                            {newProductsData
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

export default NewProduct
