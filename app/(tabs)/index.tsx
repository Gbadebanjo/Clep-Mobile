import SliderComp from '@/components/Home/slider-comp';
import BestSellers from '@/components/Products/BestSellers/best-sellers';
import FashionShowcase from '@/components/Products/FashionShowcase';
import FeaturedProducts from '@/components/Products/FeaturedProducts';
import { ThemedView } from '@/components/ThemedView';
import { ScrollView } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView>
      <ThemedView>
        <SliderComp />
        <FeaturedProducts />
        <FashionShowcase />
        <BestSellers />
      </ThemedView>
    </ScrollView>
  );
}

