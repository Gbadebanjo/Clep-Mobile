import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  TouchableOpacity,
  View,
  Animated,
  ImageBackground,
} from "react-native";
import { sliderStyles } from "./slider-styles";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const Slider = ({ children, autoScrollInterval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;

  const slides = children.filter((item) => item !== null);
  const length = slides.length;

  const animateToIndex = (index) => {
    Animated.spring(translateX, {
      toValue: -index * width,
      useNativeDriver: true,
    }).start();
  };

  const nextSlide = () => {
    const newIndex = currentIndex + 1;
    setCurrentIndex(newIndex);
    animateToIndex(newIndex);
  };

  const prevSlide = () => {
    const newIndex = currentIndex === 0 ? 0 : currentIndex - 1;
    setCurrentIndex(newIndex);
    animateToIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, autoScrollInterval);
    return () => clearInterval(interval);
  }, [currentIndex]);

  // When we reach the copy of the first slide, jump back to the real first
  useEffect(() => {
    if (currentIndex === length) {
      setTimeout(() => {
        translateX.setValue(0); // instantly reset position
        setCurrentIndex(0);
      }, 300); // small delay to finish spring animation
    }
  }, [currentIndex]);

  return (
    <ImageBackground
      source={require("@/assets/images/bg.png")}
      style={sliderStyles.sliderContainer}
      resizeMode="cover"
    >
      <Animated.View
        style={[
          sliderStyles.slidesContainer,
          { transform: [{ translateX }] },
        ]}
      >
        {slides.concat(slides[0]).map((child, i) => (
          <View key={i} style={{ width }}>
            {child}
          </View>
        ))}
      </Animated.View>

      <TouchableOpacity style={sliderStyles.navButtonLeft} onPress={prevSlide}>
        <Ionicons name="chevron-back" size={28} style={sliderStyles.iconStyle} />
      </TouchableOpacity>

      <TouchableOpacity style={sliderStyles.navButtonRight} onPress={nextSlide}>
        <Ionicons name="chevron-forward" size={28} style={sliderStyles.iconStyle} />
      </TouchableOpacity>

      <View style={sliderStyles.paginationContainer}>
        {slides.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={
              currentIndex % length === index
                ? sliderStyles.paginationDotActive
                : sliderStyles.paginationDotInactive
            }
            onPress={() => {
              setCurrentIndex(index);
              animateToIndex(index);
            }}
          />
        ))}
      </View>
    </ImageBackground>
  );
};

export default Slider;
