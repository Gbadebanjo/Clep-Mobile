import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View, type TextInputProps } from 'react-native';

import { Colors } from '@/constants/Colors';
import { useThemeColor } from '@/hooks/useThemeColor';
import { ThemedText } from './ThemedText';

export type ThemedInputProps = TextInputProps & {
  label?: string;
  lightColor?: string;
  darkColor?: string;
  isPassword?: boolean;
  containerStyle?: any;
  labelStyle?: any;
  value?: string;
  onChangeText?: (text: string) => void;
};

export function ThemedInput({
  label,
  lightColor,
  darkColor,
  isPassword = false,
  containerStyle,
  labelStyle,
  style,
  value,
  onChangeText,
  ...otherProps
}: ThemedInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const backgroundColor = useThemeColor(
    { light: lightColor || Colors.light.inputBackground, dark: darkColor || Colors.dark.inputBackground },
    'background'
  );

  const textColor = useThemeColor({ light: Colors.light.inputText, dark: Colors.dark.inputText }, 'text');

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <ThemedText style={[styles.label, labelStyle]}>{label}</ThemedText>}

      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { backgroundColor, color: textColor }, isPassword && styles.passwordInput, style]}
          secureTextEntry={isPassword && !showPassword}
          placeholderTextColor="#999"
          value={value}
          onChangeText={onChangeText}
          {...otherProps}
        />

        {isPassword && (
          <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
            <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={20} color="#999" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  inputContainer: {
    position: 'relative',
  },
  input: {
    borderRadius: 40,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
  },
  passwordInput: {
    paddingRight: 50,
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: 18,
  },
});
