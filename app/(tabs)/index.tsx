import SliderComp from '@/components/Home/slider-comp';
import { ThemedView } from '@/components/ThemedView';
import { router } from 'expo-router';
import { ScrollView, Text, TouchableOpacity } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView>
      <ThemedView>
        <SliderComp />
        {/* <FeaturedProducts />
        <FashionShowcase />
        <BestSellers /> */}
          <TouchableOpacity onPress={()=>router.push("/dashboard/vendor/store-front")}>
      <Text>Callsss....</Text>
      </TouchableOpacity>
      </ThemedView>
    </ScrollView>
  );
}

