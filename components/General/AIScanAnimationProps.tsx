import React, { useEffect, useRef } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Animated,
  Easing,
  ActivityIndicator,
} from 'react-native';

interface AIScanAnimationProps {
  imageUrl: string;
}

export const AIScanAnimation: React.FC<AIScanAnimationProps> = ({ imageUrl }) => {
  const scanAnim = useRef(new Animated.Value(0)).current;

  // Start scanning animation
  useEffect(() => {
    const loopAnimation = () => {
      scanAnim.setValue(0);
      Animated.timing(scanAnim, {
        toValue: 1,
        duration: 12000,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => loopAnimation());
    };

    loopAnimation();
  }, [scanAnim]);

  const translateY = scanAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 500], // height of container minus line height (updated)
  });

  return (
    <View style={styles.container}>
      <View style={styles.scanBox}>
        {/* Scan Line */}
        <Animated.View
          style={[
            styles.scanLine,
            { transform: [{ translateY }] },
          ]}
        />

        {/* Image */}
        {imageUrl ? (
          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />
        ) : null}

        {/* Loader */}
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#06b6d4" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanBox: {
    width: 350, // increased width
    height: 500, // increased height
    borderWidth: 2,
    borderColor: '#06b6d4', // cyan-400
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanLine: {
    position: 'absolute',
    width: '100%',
    height: 2,
    backgroundColor: '#06b6d4',
    zIndex: 2,
  },
  image: {
    width: '100%',
    height: '100%',
    opacity: 0.6,
  },
  loaderContainer: {
    position: 'absolute',
    top: '45%',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 3,
  },
});

export default AIScanAnimation;