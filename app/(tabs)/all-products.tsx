// import { Image } from 'expo-image';
import { ScrollView, StyleSheet } from 'react-native';
// import Slider from '@/components/Home/slider';
import AllProducts from '@/components/Products/all-products';

export default function AllProductsPage() {
  return (
    <ScrollView>
      <AllProducts />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});
