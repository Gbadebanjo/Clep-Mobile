import { ThemedView } from '@/components/ThemedView';
import React, { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import { sliderStyles } from './slider-styles';

const { width } = Dimensions.get('window');

interface SliderProps {
  children: ReactNode[];
  autoScrollInterval?: number;
}

const Slider: React.FC<SliderProps> = ({ children, autoScrollInterval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const translateX = useRef<Animated.Value>(new Animated.Value(0)).current;

  const slides = children.filter((item): item is ReactNode => item !== null);
  const length = slides.length;

  const animateToIndex = useCallback((index: number) => {
    Animated.spring(translateX, {
      toValue: -index * width,
      useNativeDriver: true,
    }).start();
  });

  const nextSlide = useCallback(() => {
    const newIndex = currentIndex + 1;
    setCurrentIndex(newIndex);
    animateToIndex(newIndex);
  }, [animateToIndex, currentIndex]);

  const prevSlide = () => {
    const newIndex = currentIndex === 0 ? 0 : currentIndex - 1;
    setCurrentIndex(newIndex);
    animateToIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, autoScrollInterval);
    return () => clearInterval(interval);
  }, [autoScrollInterval, currentIndex, nextSlide]);

  useEffect(() => {
    if (currentIndex === length) {
      setTimeout(() => {
        translateX.setValue(0);
        setCurrentIndex(0);
      }, 300);
    }
  }, [currentIndex, length, translateX]);

  return (
    <ThemedView style={sliderStyles.sliderContainer as StyleProp<ViewStyle>}>
      <Animated.View style={[sliderStyles.slidesContainer, { transform: [{ translateX }] }]}>
        {slides.concat(slides[0]).map((child, i) => (
          <View key={i} style={{ width }}>
            {child}
          </View>
        ))}
      </Animated.View>

      <View style={sliderStyles.paginationContainer}>
        {slides.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={
              currentIndex % length === index ? sliderStyles.paginationDotActive : sliderStyles.paginationDotInactive
            }
            onPress={() => {
              setCurrentIndex(index);
              animateToIndex(index);
            }}
          />
        ))}
      </View>
    </ThemedView>
  );
};

export default Slider;
