import { ProductAPI } from '@/apis/product-api';
import { product } from '@/types/product';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, Text, View } from 'react-native';
import LinkButton from '../General/link.button';
import ProductCard from './product-card';

const screenWidth = Dimensions.get('window').width;
const productCardWidth = (screenWidth - 36) / 2; // 12 padding + 12 margin between columns

export default function BestSellers() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [bestSellers, setBestSellers] = useState<product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        setLoading(true);
        const productAPI = new ProductAPI();

        // First try to get featured products
        // let results = await productAPI.getProductBestSellers({category: selectedCategory, period: selectedPeriod});
        let results = await productAPI.getFeaturedProducts();
        let products = results?.data?.docs || [];

        // If we have less than 6 featured products, get additional recent products
        if (products.length < 6) {
          const additionalResults = await productAPI.getProducts({
            where: { status: { equals: 'published' } },
            sort: '-createdAt',
            limit: 6 - products.length + 10, // Get extra to filter out duplicates
          });

          const recentProducts = additionalResults?.data?.docs || [];

          // Filter out products that are already featured to avoid duplicates
          const featuredIds = products.map((p) => p.id);
          const additionalProducts = recentProducts
            .filter((p) => !featuredIds.includes(p.id))
            .slice(6, 12 - products.length);

          products = [...products, ...additionalProducts];
        }

        // Limit to 6 products total
        setLoading(false);
        setBestSellers(products.slice(0, 6));
        setLoading(false);
      } catch (err) {
        console.error('Error fetching best sellers:', err);
        setError(true);
        setLoading(false);
      }
    };

    fetchBestSellers();
  }, [selectedCategory, selectedPeriod]);

  if (loading) return <ActivityIndicator size="large" color="#7c2d12" />;
  if (error) return <Text style={styles.errorText}>An error occurred. Please try again.</Text>;

  // Group products into rows of 2
  const rows = [];
  for (let i = 0; i < bestSellers.length; i += 2) {
    rows.push(bestSellers.slice(i, i + 2));
  }

  return (
    <View style={styles.scrollContainer}>
      {/* Heading */}
      <Text style={styles.heading}>Best Products</Text>

      <LinkButton
        text="Explore All"
        href="/all-products/featured"
        containerStyle={styles.exploreButton}
        buttonStyle={styles.exploreButtonInner}
      />

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

      {bestSellers.length === 0 && (
        <View style={styles.noProductContainer}>
          <Text>No featured products available at the moment</Text>
          <Text>Check back soon for our latest featured items!</Text>
        </View>
      )}
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
    marginBottom: 0,
    color: '#111827',
  },
  exploreButton: {
    marginBottom: 20,
  },
  exploreButtonInner: {
    alignItems: 'flex-start',
    backgroundColor: '#d97706',
    width: '100%',
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
