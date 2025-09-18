// import { Image } from 'expo-image';
import { ScrollView, StyleSheet } from 'react-native';
// import Slider from '@/components/Home/slider';
import LandingCompo from '@/components/Landing/landing-compo';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ScrollView>
      <ThemedView>
        <LandingCompo />
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
});
