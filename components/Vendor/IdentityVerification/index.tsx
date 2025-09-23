import { ThemedInput } from '@/components/ThemedInput';
import { ThemedText } from '@/components/ThemedText';
import { ThemedTouchableOpacity } from '@/components/ThemedTouchableOpacity';
import { ThemedView } from '@/components/ThemedView';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { TouchableOpacity, useColorScheme, View } from 'react-native';
import { identityVerificationStyles } from './style';

export default function VendorIdentityVerificationScreen() {
  const [nin, setNin] = useState('**********');
  const [showNin, setShowNin] = useState(false);

  const colorScheme = useColorScheme() as 'light' | 'dark';
  const styles = identityVerificationStyles(colorScheme);

  const handleNext = () => {
    router.push('/vendor/store-setup');
  };

  const handlePrevious = () => {
    router.back();
  };

  const handleSignIn = () => {
    router.push('/vendor/login');
  };

  return (
    <ThemedView style={styles.container}>
      <LinearGradient
        colors={['rgba(233, 30, 99, 0)', 'rgba(233, 30, 99, 0.1)', 'rgba(233, 30, 99, 0.2)']}
        locations={[0.7, 0.85, 1]}
        style={styles.gradientOverlay}
      />

      {/* <SearchNavCompo /> */}

      <View style={styles.content}>
        <ThemedText style={styles.title}>Verify your Identity</ThemedText>
        <ThemedText lightColor="#747778" darkColor="#fff" style={styles.subtitle}>
          To protect your account and confirm your identity, we require your National Identification Number (NIN) for
          verification
        </ThemedText>

        <View style={styles.formContainer}>
          <ThemedInput
            label="Verify your NIN"
            value={nin}
            onChangeText={setNin}
            isPassword={true}
            keyboardType="numeric"
            maxLength={11}
          />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.previousButton} onPress={handlePrevious}>
              <ThemedText style={styles.previousButtonText}>Previous</ThemedText>
            </TouchableOpacity>
            <ThemedTouchableOpacity style={styles.nextButton} onPress={handleNext}>
              <ThemedText lightColor="#fff" darkColor="#000" style={styles.nextButtonText}>
                Next
              </ThemedText>
            </ThemedTouchableOpacity>
          </View>

          <View style={styles.signInContainer}>
            <ThemedText style={styles.haveAccountText}>Already have an Account? </ThemedText>
            <TouchableOpacity onPress={handleSignIn}>
              <ThemedText style={styles.signInText}>Sign In</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ThemedView>
  );
}
