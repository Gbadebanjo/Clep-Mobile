// import { Image } from 'expo-image';
import { ScrollView, StyleSheet } from 'react-native';
// import Slider from '@/components/Home/slider';
import SliderComp from '@/components/Home/slider-comp';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ScrollView>
      <ThemedView>
        <SliderComp />
        {/* <FeaturedProducts /> */}
        {/* <FashionShowcase /> */}
        {/* <BestSellers /> */}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});
