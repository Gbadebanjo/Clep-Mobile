import React from 'react';
import { ActivityIndicator, StyleSheet, View, type ViewProps } from 'react-native';

import { Colors } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedText } from './ThemedText';

export type ThemedLoaderProps = ViewProps & {
  size?: 'small' | 'large';
  color?: string;
  text?: string;
  lightColor?: string;
  darkColor?: string;
};

export function ThemedLoader({
  size = 'large',
  color,
  text,
  lightColor,
  darkColor,
  style,
  ...otherProps
}: ThemedLoaderProps) {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  const loaderColor = color || Colors.light.primary800;

  return (
    <View style={[styles.container, backgroundColor && { backgroundColor }, style]} {...otherProps}>
      <ActivityIndicator size={size} color={loaderColor} />
      {text && <ThemedText style={styles.text}>{text}</ThemedText>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 100,
  },
  text: {
    marginTop: 12,
    fontSize: 16,
    textAlign: 'center',
  },
});
