import React, { useEffect, useState } from 'react'
import PageHader from '../../common/PageHeader'
import ProductCard from '../../common/CardCommon/ProductCard'
import SectionCommon from '../../common/SectionCommon'
import { productEndpoint } from '@/settings/endpoints'
import { getRequest } from '@/request'
import { useAuth } from '@/context/AuthContext'
import { Skeleton } from 'antd'

const NewProduct = () => {
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
    const newProductsData = productsData?.filter(
        (product) => product.isNewProduct,
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
                            {newProductsData
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

export default NewProduct
