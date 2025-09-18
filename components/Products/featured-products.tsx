import { ProductAPI } from '@/apis/product-api';
import { product } from '@/types/product';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from 'react-native';
import LinkButton from '../General/link.button';
import ProductCard from './product-card';

const screenWidth = Dimensions.get('window').width;
const productCardWidth = (screenWidth - 36) / 2; // 12 padding + 12 margin between columns

export default function FeaturedProducts() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [featuredProducts, setFeaturedProducts] = useState<product[]>([]);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        const productAPI = new ProductAPI();

        let results = await productAPI.getFeaturedProducts();
        let products = results?.data?.docs || [];

        if (products.length < 18) {
          const additionalResults = await productAPI.getProducts({
            where: { status: { equals: 'published' } },
            sort: '-createdAt',
            limit: 18 - products.length + 10,
          });

          const recentProducts = additionalResults?.data?.docs || [];
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
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#7c2d12" />;
  if (error) return <Text style={styles.errorText}>An error occurred. Please try again.</Text>;

  // Group products into rows of 2
  const rows = [];
  for (let i = 0; i < featuredProducts.length; i += 2) {
    rows.push(featuredProducts.slice(i, i + 2));
  }

  return (
    <View style={styles.scrollContainer}>
      {/* Heading */}
      <Text style={styles.heading}>Featured Products</Text>

      {/*Product grid */}
      {rows.map((row, rowIndex) => (
        <View style={styles.row} key={rowIndex}>
          {row.map((product, colIndex) => (
            <View key={colIndex} style={[styles.productWrapper, { width: productCardWidth }]}>
              <ProductCard product={product} />
            </View>
          ))}
        </View>
      ))}

      {featuredProducts.length === 0 && (
        <View style={styles.noProductContainer}>
          <Text>No featured products available at the moment</Text>
          <Text>Check back soon for our latest featured items!</Text>
        </View>
      )}
      <LinkButton text="View All Products" href="/all-products" />
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 12,
    paddingBottom: 24,
  },
  banner: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginTop: 8,
    marginBottom: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 20,
    color: '#111827',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  productWrapper: {
    marginHorizontal: 2,
  },
  noProductContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
});
