'use client';
import { ImageBackground } from 'expo-image';
import { Text, TouchableOpacity, View } from 'react-native';
import { sliderStyles } from './slider-styles';
import Slider from './slider';

function SliderComp() {
  return (
    <Slider autoScrollInterval={10000}>
      <View style={sliderStyles.slideCompContainer}>
        <ImageBackground
          source={require('@/assets/images/banner1.png')}
          style={sliderStyles.bannerImage}
        >
        </ImageBackground>
          <View style={sliderStyles.mobileButtonSection}>
            <TouchableOpacity style={sliderStyles.actionButton}>
              <Text style={sliderStyles.actionButtonText}>Explore Store Front</Text>
            </TouchableOpacity>
          </View>
      </View>

      <View style={sliderStyles.slideCompContainer}>
        <ImageBackground
          source={require('@/assets/images/banner2.png')}
          style={sliderStyles.bannerImage}
        >
        </ImageBackground>
        <View style={sliderStyles.mobileButtonSection}>
            <TouchableOpacity style={sliderStyles.actionButton}>
              <Text style={sliderStyles.actionButtonText}>📏 Take Measurement</Text>
            </TouchableOpacity>
          </View>
      </View>

      <View style={sliderStyles.slideCompContainer}>
        <ImageBackground
          source={require('@/assets/images/banner3.png')}
          style={sliderStyles.bannerImage}
        >
          
        </ImageBackground>
        <View style={sliderStyles.mobileButtonSection}>
            <TouchableOpacity style={sliderStyles.actionButton}>
              <Text style={sliderStyles.actionButtonText}>🛍️ Start Shopping</Text>
            </TouchableOpacity>
          </View>
      </View>
    </Slider>
  );
}


export default SliderComp;
