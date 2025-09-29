import { useRouter, Link } from 'expo-router'; // if you're using expo-router
import React from 'react';
import { GestureResponderEvent, StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Path, Svg } from 'react-native-svg';

type Props = {
  text?: string;
  href?: string;
  onPress?: (event: GestureResponderEvent) => void;
  containerStyle?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
  buttonStyle?: ViewStyle | ViewStyle[];
};

const LinkButton: React.FC<Props> = ({
  text = 'View All Products',
  href,
  onPress,
  containerStyle,
  textStyle,
  buttonStyle,
}) => {
  const router = useRouter();

  const handlePress = (e: GestureResponderEvent) => {
    if (onPress) {
      onPress(e);
    } else if (href) {
      router.push(href as any);
    }  else {
    console.warn("No href or onPress provided for LinkButton");
  }
  };

  return (
    <View style={[styles.wrapper, containerStyle]}>
      <TouchableOpacity style={[styles.button, buttonStyle]} activeOpacity={0.8} onPress={handlePress}>
        <Text style={[styles.text, textStyle]}>{text}</Text>
        <Svg width={20} height={20} fill="white" viewBox="0 0 20 20" style={{ marginLeft: 8 }}>
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 
            010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 
            11H5a1 1 0 110-2h7.586l-2.293-2.293a1 
            1 0 010-1.414z"
          />
        </Svg>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 12,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#450a0a', // red-950
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 9999,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  text: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default LinkButton;
