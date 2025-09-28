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

  return (
    <ThemedTouchableOpacity style={buttonStyle} disabled={isLoading} {...props}>
      {isLoading ? (
        <ActivityIndicator color={lightTextColor} />
      ) : (
        <ThemedText lightColor={lightTextColor} darkColor={darkTextColor} style={textStyle}>
          {text}
        </ThemedText>
      )}
    </ThemedTouchableOpacity>
  );
}
