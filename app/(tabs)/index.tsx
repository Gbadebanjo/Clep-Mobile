import SliderComp from '@/components/Home/slider-comp';
import BestSellers from '@/components/Products/BestSellers/best-sellers';
import FashionShowcase from '@/components/Products/FashionShowcase';
import FeaturedProducts from '@/components/Products/FeaturedProducts';
import { ThemedView } from '@/components/ThemedView';
import { FlatList } from 'react-native';

export default function HomeScreen() {
  const data = [{ key: 'content' }];

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.key}
      renderItem={() => (
        <ThemedView>
          <SliderComp />
          <FeaturedProducts />
          <FashionShowcase />
          <BestSellers />
        </ThemedView>
      )}
      showsVerticalScrollIndicator={false}
    />
  );
}
