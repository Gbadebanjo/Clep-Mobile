import { useColorScheme } from '@/hooks/useColorScheme.web';
import { ActivityIndicator, StyleProp, TextStyle, TouchableOpacityProps, ViewStyle } from 'react-native';
import { ThemedText } from '../ThemedText';
import { ThemedTouchableOpacity } from '../ThemedTouchableOpacity';

interface SubmitButtonProps extends TouchableOpacityProps {
  text: string;
  isLoading?: boolean;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  lightColor?: string;
  darkColor?: string;
}

export function SubmitButton({
  text,
  isLoading,
  buttonStyle,
  textStyle,
  lightColor,
  darkColor,
  ...props
}: SubmitButtonProps) {
  const lightTextColor = lightColor || '#fff';
  const darkTextColor = darkColor || '#000';

  const colorScheme = useColorScheme();

  return (
    <ThemedTouchableOpacity
      lightColor="#fff"
      darkColor="#fff"
      style={[
        buttonStyle,
        {
          backgroundColor: colorScheme === 'light' ? '#000' : '#fff',
        },
      ]}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator color={colorScheme === 'light' ? '#fff' : '#000'} />
      ) : (
        <ThemedText
          lightColor={darkTextColor}
          darkColor={lightTextColor}
          style={[textStyle, { color: colorScheme === 'light' ? lightTextColor : darkTextColor }]}
        >
          {text}
        </ThemedText>
      )}
    </ThemedTouchableOpacity>
  );
}
