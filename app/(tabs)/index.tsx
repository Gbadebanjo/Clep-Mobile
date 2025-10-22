import { ScrollView, } from 'react-native';
import SliderComp from '@/components/Home/slider-comp';
import { ThemedView } from '@/components/ThemedView';
import FeaturedProducts from '@/components/Products/FeaturedProducts';
import FashionShowcase from '@/components/Products/FashionShowcase';
import BestSellers from '@/components/Products/BestSellers/best-sellers';

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

