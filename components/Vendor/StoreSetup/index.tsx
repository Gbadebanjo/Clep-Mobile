import SearchNavCompo from '@/components/General/search-nav';
import { ThemedText } from '@/components/ThemedText';
import { ThemedTouchableOpacity } from '@/components/ThemedTouchableOpacity';
import { ThemedView } from '@/components/ThemedView';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native';
import { storeSetupStyles } from './style';

export default function VendorStoreSetupScreen() {
  const [businessName, setBusinessName] = useState('');
  const [storeUrl, setStoreUrl] = useState('');
  const [storeDescription, setStoreDescription] = useState('example: Top rated fashion store on the main land');
  const [customizeNow, setCustomizeNow] = useState(true);

  const colorScheme = useColorScheme() as 'light' | 'dark';
  const styles = storeSetupStyles(colorScheme);
  const handleNext = () => {
    router.push('/vendor/wallet-setup');
  };

  const handlePrevious = () => {
    router.back();
  };

  return (
    <ThemedView style={styles.container}>
      <LinearGradient
        colors={['rgba(233, 30, 99, 0)', 'rgba(233, 30, 99, 0.1)', 'rgba(233, 30, 99, 0.2)']}
        locations={[0.7, 0.85, 1]}
        style={styles.gradientOverlay}
      />

      <ScrollView style={styles.scrollView}>
        <SearchNavCompo />

        <View style={styles.content}>
          <ThemedText style={styles.title}>Create your Store</ThemedText>
          <ThemedText lightColor="#747778" darkColor="#fff" style={{ ...styles.subtitle }}>
            Customize your store to match your style and preferences. Choose a unique URL, add a personalized
            description
          </ThemedText>

          <View style={styles.formContainer}>
            <ThemedText style={styles.label}>What is your Business Name</ThemedText>
            <TextInput
              style={styles.input}
              value={businessName}
              onChangeText={setBusinessName}
              placeholder="Enter your business name"
              placeholderTextColor="#999"
            />

            <ThemedText style={styles.label}>Choose a store url</ThemedText>
            <View style={styles.urlContainer}>
              <ThemedText style={styles.urlPrefix}>vazzel.com/</ThemedText>
              <TextInput
                style={styles.urlInput}
                value={storeUrl}
                onChangeText={setStoreUrl}
                placeholder="Enter your store name"
                placeholderTextColor="#999"
              />
            </View>

            <ThemedText style={styles.label}>Store Description</ThemedText>
            <TextInput
              style={styles.descriptionInput}
              value={storeDescription}
              onChangeText={setStoreDescription}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />

            <View style={styles.customizeSection}>
              <ThemedText style={styles.customizeTitle}>Customise your Store Now?</ThemedText>
              <View style={styles.customizeOptions}>
                <ThemedTouchableOpacity
                  style={[styles.customizeButton, customizeNow && styles.customizeButtonActive]}
                  onPress={() => setCustomizeNow(true)}
                >
                  <ThemedText style={[styles.customizeButtonText, customizeNow && styles.customizeButtonTextActive]}>
                    Yes
                  </ThemedText>
                </ThemedTouchableOpacity>
                <ThemedTouchableOpacity
                  style={[styles.customizeButton, !customizeNow && styles.customizeButtonActive]}
                  onPress={() => setCustomizeNow(false)}
                >
                  <ThemedText style={[styles.customizeButtonText, !customizeNow && styles.customizeButtonTextActive]}>
                    No
                  </ThemedText>
                </ThemedTouchableOpacity>
              </View>
            </View>

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
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}
