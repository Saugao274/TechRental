import React from 'react'
import PageHader from '../../common/PageHeader'
import ProductCard from '../../common/CardCommon/ProductCard'
import SectionCommon from '../../common/SectionCommon'
import { productsData } from '@/data/products'

const NewProduct = () => {
    const newProductsData = productsData.filter(
        (product) => product.IsNewProduct,
    )
    return (
        <SectionCommon className="flex flex-col gap-10">
            <div>
                <PageHader title="Sản phẩm mới" />
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
                {newProductsData.slice(0.4).map((product, index) => (
                    <ProductCard product={product} />
                ))}
            </div>
        </SectionCommon>
    )
}

export default NewProduct
