import { ThemedView } from '@/components/ThemedView';
import { productResponse } from '@/types/product';
import ProductsTabs from './products-tabs';
// import Header from './Header';
// import ProductsTabs from './ProductsTabs';

const ProductsTemplate = ({ products }: { products: productResponse }) => {
    return (
        <ThemedView>
            {/* <Header /> */}
            <ProductsTabs allProducts={products} />
        </ThemedView>
    );
};

export default ProductsTemplate;
