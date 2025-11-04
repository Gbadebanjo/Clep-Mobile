import { ProductAPI } from '@/apis/product-api';
import { product } from '@/types/product';
import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, Dimensions, Text, View } from 'react-native';
import LinkButton from '../../General/link.button';
import { ThemedLoader } from '../../ThemedLoader';
import { ThemedText } from '../../ThemedText';
import { ThemedView } from '../../ThemedView';
import ProductCard from '../ProductCard/product-card';
import styles from './style';

const screenWidth = Dimensions.get('window').width;
const productCardWidth = (screenWidth - 36) / 2;

export default function FeaturedProducts() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [featuredProducts, setFeaturedProducts] = useState<product[]>([]);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        const productAPI = new ProductAPI();

        // Run both requests in parallel
        const [featuredRes, recentRes] = await Promise.all([
          productAPI.getFeaturedProducts(),
          productAPI.getProducts({
            where: { status: { equals: 'published' } },
            sort: '-createdAt',
            limit: 28, // just fetch once, no need for two-step
          }),
        ]);

        const featured = featuredRes?.data?.docs || [];
        const recent = recentRes?.data?.docs || [];

        const featuredIds = new Set(featured.map(p => p.id));
        const combined = [...featured, ...recent.filter(p => !featuredIds.has(p.id))].slice(0, 18);

        setFeaturedProducts(combined);
      } catch (err) {
        console.error('Error fetching featured products:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const data = useMemo(() => featuredProducts, [featuredProducts]);

  if (loading) return <ThemedLoader text="" />;
  if (error)
    return (
      <Text style={styles.errorText}>
        An error occurred. Please try again.
      </Text>
    );

  if (data.length === 0) {
    return (
      <ThemedView style={styles.noProductContainer}>
        <ThemedText>No featured products available at the moment</ThemedText>
        <ThemedText>Check back soon for our latest featured items!</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.scrollContainer}>
      <ThemedText style={styles.heading}>Featured Products</ThemedText>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={({ item }) => (
          <View style={[styles.productWrapper, { width: productCardWidth }]}>
            <ProductCard product={item} />
          </View>
        )}
        showsVerticalScrollIndicator={false}
        initialNumToRender={6}
        maxToRenderPerBatch={8}
        windowSize={7}
      />

      <LinkButton text="View All Products" href="/all-products" />
    </ThemedView>
  );
}
