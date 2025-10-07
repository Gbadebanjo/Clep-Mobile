import { ProductAPI } from '@/apis/product-api';
import { product } from '@/types/product';
import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import ProductDetail from '../../components/Products/ProductDetail';
import { ThemedLoader } from '../../components/ThemedLoader';
import { ThemedText } from '../../components/ThemedText';
import { ThemedView } from '../../components/ThemedView';

const ProductDetailPage = () => {
  const { id } = useLocalSearchParams();
  console.log(id);

  const [featuredProducts, setFeaturedProducts] = useState<product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<product | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        const productAPI = new ProductAPI();

        let results = await productAPI.getFeaturedProducts();
        let products = results?.data?.docs || [];

        const toViewProduct = products.find((p) => p.id === id);
        if (toViewProduct) setSelectedProduct(toViewProduct);
        else setSelectedProduct(null);

        if (products.length < 18) {
          const additionalResults = await productAPI.getProducts({
            where: { status: { equals: 'published' } },
            sort: '-createdAt',
            limit: 18 - products.length + 10,
          });

          const recentProducts = additionalResults?.data?.docs || [];
          const toViewProduct = recentProducts.find((p) => p.id === id);
          if (toViewProduct) setSelectedProduct(toViewProduct);
          else setSelectedProduct(null);
          const featuredIds = products.map((p) => p.id);
          const additionalProducts = recentProducts
            .filter((p) => !featuredIds.includes(p.id))
            .slice(0, 18 - products.length);

          products = [...products, ...additionalProducts];
        }

        setFeaturedProducts(products.slice(0, 18));

        setLoading(false);
      } catch (err) {
        console.error('Error fetching featured products:', err);
        setError(true);
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, [id]);

  if (isLoading) {
    return <ThemedLoader />;
  }

  if (error || !selectedProduct) {
    return (
      <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ThemedText>Product not found.</ThemedText>
      </ThemedView>
    );
  }

  return (
    <>
      {/* <Stack.Screen options={{ title: selectedProduct.name, headerBackTitle: 'Back' }} /> */}
      <ProductDetail product={selectedProduct} />
    </>
  );
};

export default ProductDetailPage;
