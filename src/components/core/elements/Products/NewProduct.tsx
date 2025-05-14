import React, { useEffect, useState } from 'react'
import PageHader from '../../common/PageHeader'
import ProductCard from '../../common/CardCommon/ProductCard'
import SectionCommon from '../../common/SectionCommon'
import { productEndpoint } from '@/settings/endpoints'
import { getRequest } from '@/request'

const NewProduct = () => {
    const [productsData, setProductsData] = useState<any[]>([])
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const responseAllProduct = await getRequest(
                    productEndpoint.GET_ALL,
                )
                setProductsData(responseAllProduct.metadata)
            } catch (error) {
                console.error('Error fetching products:', error)
            }
        }

        fetchProducts()
    }, [productsData])
    const newProductsData = productsData.filter(
        (product) => product.isNewProduct,
    )
    return (
        <SectionCommon className="flex flex-col gap-10">
            <div>
                <PageHader title="Sản phẩm mới" />
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
                {newProductsData.slice(0, 4).map((product, index) => (
                    <ProductCard product={product} key={index} />
                ))}
            </div>
        </SectionCommon>
    )
}

export default NewProduct
