import React from 'react'
import PageHader from '../../common/PageHeader'
import ProductCard from '../../common/CardCommon/ProductCard'
import SectionCommon from '../../common/SectionCommon'
import { productsData } from '@/data/products'

const HotProducts = () => {
    const hotProductssData = productsData.filter(
        (product) => product.isHotProduct,
    )
    return (
        <SectionCommon className="flex flex-col gap-10">
            <PageHader title="Sản phẩm nổi bật" />
            <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
                {hotProductssData.slice(0, 4).map((product, index) => (
                    <ProductCard product={product} key={index} />
                ))}
            </div>
        </SectionCommon>
    )
}

export default HotProducts
