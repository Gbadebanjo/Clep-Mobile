import SearchNavCompo from '@/components/General/search-nav';
import { ThemedText } from '@/components/ThemedText';
import { ThemedTouchableOpacity } from '@/components/ThemedTouchableOpacity';
import { ThemedView } from '@/components/ThemedView';
import { storeSetupStyles } from '@/components/Vendor/store-setup-styles';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, TextInput, TouchableOpacity, View } from 'react-native';

export default function VendorStoreSetupScreen() {
  const [businessName, setBusinessName] = useState('');
  const [storeUrl, setStoreUrl] = useState('');
  const [storeDescription, setStoreDescription] = useState('example: Top rated fashion store on the main land');
  const [customizeNow, setCustomizeNow] = useState(true);

  const handleNext = () => {
    router.push('/vendor-wallet-setup');
  };

  const handlePrevious = () => {
    router.back();
  };

  return (
    <ThemedView style={storeSetupStyles.container}>
      <LinearGradient
        colors={['rgba(233, 30, 99, 0)', 'rgba(233, 30, 99, 0.1)', 'rgba(233, 30, 99, 0.2)']}
        locations={[0.7, 0.85, 1]}
        style={storeSetupStyles.gradientOverlay}
      />

      <ScrollView style={storeSetupStyles.scrollView}>
        <SearchNavCompo />

        <View style={storeSetupStyles.content}>
          <ThemedText style={storeSetupStyles.title}>Create your Store</ThemedText>
          <ThemedText lightColor="#747778" darkColor="#fff" style={{ ...storeSetupStyles.subtitle }}>
            Customize your store to match your style and preferences. Choose a unique URL, add a personalized
            description
          </ThemedText>

          <View style={storeSetupStyles.formContainer}>
            <ThemedText style={storeSetupStyles.label}>What is your Business Name</ThemedText>
            <TextInput
              style={storeSetupStyles.input}
              value={businessName}
              onChangeText={setBusinessName}
              placeholder="Enter your business name"
              placeholderTextColor="#999"
            />

            <ThemedText style={storeSetupStyles.label}>Choose a store url</ThemedText>
            <View style={storeSetupStyles.urlContainer}>
              <ThemedText style={storeSetupStyles.urlPrefix}>vazzel.com/</ThemedText>
              <TextInput
                style={storeSetupStyles.urlInput}
                value={storeUrl}
                onChangeText={setStoreUrl}
                placeholder="Enter your store name"
                placeholderTextColor="#999"
              />
            </View>

            <ThemedText style={storeSetupStyles.label}>Store Description</ThemedText>
            <TextInput
              style={storeSetupStyles.descriptionInput}
              value={storeDescription}
              onChangeText={setStoreDescription}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />

            <View style={storeSetupStyles.customizeSection}>
              <ThemedText style={storeSetupStyles.customizeTitle}>Customise your Store Now?</ThemedText>
              <View style={storeSetupStyles.customizeOptions}>
                <ThemedTouchableOpacity
                  style={[storeSetupStyles.customizeButton, customizeNow && storeSetupStyles.customizeButtonActive]}
                  onPress={() => setCustomizeNow(true)}
                >
                  <ThemedText
                    style={[
                      storeSetupStyles.customizeButtonText,
                      customizeNow && storeSetupStyles.customizeButtonTextActive,
                    ]}
                  >
                    Yes
                  </ThemedText>
                </ThemedTouchableOpacity>
                <ThemedTouchableOpacity
                  style={[storeSetupStyles.customizeButton, !customizeNow && storeSetupStyles.customizeButtonActive]}
                  onPress={() => setCustomizeNow(false)}
                >
                  <ThemedText
                    style={[
                      storeSetupStyles.customizeButtonText,
                      !customizeNow && storeSetupStyles.customizeButtonTextActive,
                    ]}
                  >
                    No
                  </ThemedText>
                </ThemedTouchableOpacity>
              </View>
            </View>

            <View style={storeSetupStyles.buttonContainer}>
              <TouchableOpacity style={storeSetupStyles.previousButton} onPress={handlePrevious}>
                <ThemedText style={storeSetupStyles.previousButtonText}>Previous</ThemedText>
              </TouchableOpacity>
              <ThemedTouchableOpacity style={storeSetupStyles.nextButton} onPress={handleNext}>
                <ThemedText lightColor="#fff" darkColor="#000" style={storeSetupStyles.nextButtonText}>
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
