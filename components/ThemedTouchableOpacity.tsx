import { TouchableOpacity, type TouchableOpacityProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

export type ThemedTouchableOpacityProps = TouchableOpacityProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedTouchableOpacity({ style, lightColor, darkColor, ...otherProps }: ThemedTouchableOpacityProps) {
  const backgroundColor = useThemeColor({ light: lightColor || '#000000', dark: darkColor || '#ffffff' }, 'background');

  return <TouchableOpacity style={[{ backgroundColor }, style]} {...otherProps} />;
}
