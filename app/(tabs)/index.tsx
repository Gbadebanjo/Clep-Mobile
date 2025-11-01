import SliderComp from '@/components/Home/slider-comp';
import { ThemedView } from '@/components/ThemedView';
import { ScrollView } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView>
      <ThemedView>
        <SliderComp />
        {/* <FeaturedProducts />
        <FashionShowcase />
         <BestSellers /> */}
      </ThemedView>
    </ScrollView>
  );
}

