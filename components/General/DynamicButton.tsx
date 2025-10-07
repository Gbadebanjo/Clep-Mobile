import React from 'react';
import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View, ViewStyle, TextStyle } from 'react-native';
import { useRouter } from 'expo-router';

type Props = {
  text: string;
  href?: string;
  onPress?: (event: GestureResponderEvent) => void;
  backgroundColor?: string;
  textColor?: string;
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  containerStyle?: ViewStyle | ViewStyle[];
  buttonStyle?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
};

const DynamicButton: React.FC<Props> = ({
  text,
  href,
  onPress,
  backgroundColor = '#000',
  textColor = '#fff',
  size = 'medium',
  fullWidth = false,
  containerStyle,
  buttonStyle,
  textStyle,
}) => {
  const router = useRouter();

  const handlePress = (e: GestureResponderEvent) => {
    if (onPress) {
      onPress(e);
    } else if (href) {
      router.push(href as any);
    } else {
      console.warn('No onPress or href provided to DynamicButton');
    }
  };

  const getPadding = () => {
    switch (size) {
      case 'small':
        return 8;
      case 'large':
        return 16;
      default:
        return 12;
    }
  };

  return (
    <View style={[styles.wrapper, containerStyle]}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.button,
          {
            backgroundColor,
            paddingVertical: getPadding(),
            width: fullWidth ? '100%' : 'auto',
          },
          buttonStyle,
        ]}
        onPress={handlePress}
      >
        <Text style={[styles.text, { color: textColor }, textStyle]}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 16,
    alignItems: 'center',
  },
  button: {
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default DynamicButton;
