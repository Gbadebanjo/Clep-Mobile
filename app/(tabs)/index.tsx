import SliderComp from '@/components/Home/slider-comp';
import BestSellers from '@/components/Products/BestSellers/best-sellers';
import FashionShowcase from '@/components/Products/FashionShowcase';
import FeaturedProducts from '@/components/Products/FeaturedProducts';
import { ThemedView } from '@/components/ThemedView';
import { useAuthStore } from '@/store';
import { router } from 'expo-router';
import { FlatList, Text, TouchableOpacity } from 'react-native';

export default function HomeScreen() {
  const data = [{ key: 'content' }];
  const { user } = useAuthStore();
  const storeId = user?.store?.id;
  console.log('User Info:', storeId);

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.key}
      renderItem={() => (
        <ThemedView>
          <SliderComp />
          <TouchableOpacity  
          onPress={() => router.push(`/store-front/${storeId}`)}
           style={{ padding: 16 }}>
            <Text>
              Welcome to the Fashion Store! Explore the latest trends and styles.
            </Text>
            
          </TouchableOpacity>
          <FeaturedProducts />
          <FashionShowcase />
          <BestSellers />
        </ThemedView>
      )}
      showsVerticalScrollIndicator={false}
    />
  );
}
