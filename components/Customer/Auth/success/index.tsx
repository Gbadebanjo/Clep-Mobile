import SearchNavCompo from '@/components/General/search-nav';
import { ThemedText } from '@/components/ThemedText';
import { ThemedTouchableOpacity } from '@/components/ThemedTouchableOpacity';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { useColorScheme, View } from 'react-native';
import { accountCreatedStyles } from './style';

export default function CustomerAccountCreatedComponent() {
  const colorScheme = useColorScheme() as 'light' | 'dark';
  const styles = accountCreatedStyles(colorScheme);
  const handleContinue = () => {
    router.push('/(tabs)');
  };

  return (
    <ThemedView style={styles.container}>
      <LinearGradient
        colors={['rgba(233, 30, 99, 0)', 'rgba(233, 30, 99, 0.1)', 'rgba(233, 30, 99, 0.2)']}
        locations={[0.7, 0.85, 1]}
        style={styles.gradientOverlay}
      />

      <SearchNavCompo />

      <View style={styles.content}>
        <View style={styles.successContainer}>
          <View style={styles.checkmarkContainer}>
            <Ionicons name="checkmark" size={40} color="#fff" />
          </View>

          <ThemedText style={styles.title}>Voila, your Account{'\n'}has been Created</ThemedText>

          <ThemedText lightColor="#747778" darkColor="#fff" style={styles.subtitle}>
            Click the button To continue.
          </ThemedText>

          <ThemedTouchableOpacity style={styles.continueButton} onPress={handleContinue}>
            <ThemedText lightColor="#fff" darkColor="#000" style={styles.continueButtonText}>
              Continue
            </ThemedText>
          </ThemedTouchableOpacity>
        </View>
      </View>
    </ThemedView>
  );
}
