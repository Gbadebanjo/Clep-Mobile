// import { Image } from 'expo-image';
import { ScrollView, StyleSheet } from 'react-native';
// import Slider from '@/components/Home/slider';
import SliderComp from '@/components/Home/slider-comp';
import BestSellers from '@/components/Products/best-sellers';
import FeaturedProducts from '@/components/Products/featured-products';

export default function HomeScreen() {
  return (
    <ScrollView>
      <SliderComp />
      <FeaturedProducts />
      {/* <FashionShowcase /> */}
      <BestSellers />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});
