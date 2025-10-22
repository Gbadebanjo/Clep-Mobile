// import { Image } from 'expo-image';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
// import Slider from '@/components/Home/slider';
import SliderComp from '@/components/Home/slider-comp';
import { ThemedView } from '@/components/ThemedView';
import { router } from 'expo-router';

export default function HomeScreen() {
  return (
    <ScrollView>
      <ThemedView>
        <SliderComp />
        {/* <FeaturedProducts />
        <FashionShowcase />
        <BestSellers /> */}

           <TouchableOpacity onPress={()=>router.push("/dashboard/vendor/wallet")}>
      <Text>Callsss....</Text>
      </TouchableOpacity>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});
