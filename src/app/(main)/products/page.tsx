import Products from '@/components/modules/Products'
import { ProductProvider } from '@/context/ProductContext'

const ProductsPage = () => (
    <ProductProvider>
        <Products />
    </ProductProvider>
)

export default ProductsPage
