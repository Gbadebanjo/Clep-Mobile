'use client';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ImageBackground } from 'expo-image';
import { router } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import Slider from './slider';
import { sliderStyles } from './slider-styles';

function IntroductionSliderComp() {
  const handleGetStarted = () => {
    router.push('/vendor-login');
  };

  return (
    <View style={sliderStyles.fullScreenContainer}>
      <Slider autoScrollInterval={10000}>
        <View style={sliderStyles.slideContainer}>
          <ThemedView style={sliderStyles.cardContainer}>
            <ImageBackground source={require('@/assets/images/banner1.png')} style={sliderStyles.imageSection} />
            <View style={sliderStyles.textSection}>
              <ThemedText style={sliderStyles.title}>Hello</ThemedText>
              <ThemedText style={sliderStyles.description}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non consectetur turpis. Morbi eu eleifend
                lacus.
              </ThemedText>
            </View>
          </ThemedView>
        </View>

        <View style={sliderStyles.slideContainer}>
          <ThemedView style={sliderStyles.cardContainer}>
            <ImageBackground source={require('@/assets/images/banner2.png')} style={sliderStyles.imageSection} />
            <View style={sliderStyles.textSection}>
              <ThemedText style={sliderStyles.title}>Ready?</ThemedText>
              <ThemedText style={sliderStyles.description}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </ThemedText>
              <TouchableOpacity style={sliderStyles.actionButton} onPress={handleGetStarted}>
                <Text style={sliderStyles.actionButtonText}>Let&apos;s Start</Text>
              </TouchableOpacity>
            </View>
          </ThemedView>
        </View>
      </Slider>
    </View>
  );
}

export default IntroductionSliderComp;
