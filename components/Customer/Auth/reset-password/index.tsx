import { ThemedInput } from '@/components/ThemedInput';
import { ThemedText } from '@/components/ThemedText';
import { ThemedTouchableOpacity } from '@/components/ThemedTouchableOpacity';
import { ThemedView } from '@/components/ThemedView';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ImageBackground, ScrollView, useColorScheme, View } from 'react-native';
import { resetPasswordStyles } from './style';

export default function CustomerResetPasswordComponent() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const colorScheme = useColorScheme() as 'light' | 'dark';
  const styles = resetPasswordStyles(colorScheme);

  const handleUpdatePassword = () => {
    // Handle password update logic
    router.push('/customer/login');
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* <SearchNavCompo /> */}

        {/* Hero Image */}
        <View style={styles.imageContainer}>
          <ImageBackground
            source={require('@/assets/images/auth/forgot-password-3.png')}
            style={styles.heroImage}
            resizeMode="cover"
          />
        </View>

        {/* Content */}
        <View style={styles.content}>
          <ThemedText style={styles.title}>Set New Password</ThemedText>
          <ThemedText lightColor="#747778" darkColor="#fff" style={styles.subtitle}>
            WELCOME Password should be a minimum of 8 characters and contain mix of letters, numbers, and symbols.
          </ThemedText>

          <View style={styles.formContainer}>
            <ThemedInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              isPassword={true}
              placeholder="**********"
            />

            <ThemedInput
              label="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              isPassword={true}
              placeholder="**********"
            />

            <ThemedTouchableOpacity style={styles.updateButton} onPress={handleUpdatePassword}>
              <ThemedText lightColor="#fff" darkColor="#000" style={styles.updateButtonText}>
                Update Password
              </ThemedText>
            </ThemedTouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}
