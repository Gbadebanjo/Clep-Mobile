import SearchNavCompo from '@/components/General/search-nav';
import { ThemedText } from '@/components/ThemedText';
import { ThemedTouchableOpacity } from '@/components/ThemedTouchableOpacity';
import { ThemedView } from '@/components/ThemedView';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Dimensions, ScrollView, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { planSelectionStyles } from './style';

const { width } = Dimensions.get('window');

const plans = [
  {
    id: 1,
    title: 'Commission Based',
    subtitle: 'Every Sale',
    price: 'NGN2000 on NGN100,000',
    commission: '2% on Every Sale',
    buttonText: 'Start 90 days free trial',
    backgroundColor: '#000',
    borderColor: '#E91E63',
  },
  {
    id: 2,
    title: 'No Commission',
    subtitle: 'Monthly Plan',
    price: 'NGN5000 per month',
    commission: '0% Commission',
    buttonText: 'Start 30 days free trial',
    backgroundColor: '#fff',
    borderColor: '#E91E63',
  },
  {
    id: 3,
    title: 'Premium Plan',
    subtitle: 'Yearly Plan',
    price: 'NGN50000 per year',
    commission: '0% Commission + Benefits',
    buttonText: 'Start 60 days free trial',
    backgroundColor: '#E91E63',
    borderColor: '#E91E63',
  },
];

export default function VendorPlanSelectionScreen() {
  const [selectedPlan, setSelectedPlan] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const colorScheme = useColorScheme() as 'light' | 'dark';
  const styles = planSelectionStyles(colorScheme);

  const handlePlanSelect = (index: number) => {
    setSelectedPlan(index);
  };

  const handleContinue = () => {
    router.push('/vendor-identity-verification');
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
        <ThemedText style={styles.title}>Scroll to select{'\n'}Your Plan</ThemedText>
        <ThemedText lightColor="#747778" darkColor="#fff" style={styles.subtitle}>
          Select your membership plan to continue
        </ThemedText>

        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.plansContainer}
          onMomentumScrollEnd={(event) => {
            const index = Math.round(event.nativeEvent.contentOffset.x / (width - 80));
            setSelectedPlan(index);
          }}
        >
          {plans.map((plan, index) => (
            <TouchableOpacity
              key={plan.id}
              style={[
                styles.planCard,
                {
                  backgroundColor: plan.backgroundColor,
                  borderColor: plan.borderColor,
                },
              ]}
              onPress={() => handlePlanSelect(index)}
            >
              <View style={styles.planHeader}>
                <Text style={[styles.planTitle, { color: plan.backgroundColor === '#000' ? '#fff' : '#000' }]}>
                  {plan.title}
                </Text>
                <Text style={[styles.planSubtitle, { color: plan.backgroundColor === '#000' ? '#fff' : '#747778' }]}>
                  {plan.subtitle}
                </Text>
              </View>

              <View style={styles.planPricing}>
                <Text style={[styles.planPrice, { color: plan.backgroundColor === '#000' ? '#fff' : '#000' }]}>
                  {plan.price}
                </Text>
                <Text style={styles.planCommission}>{plan.commission}</Text>
              </View>

              <View style={styles.planProgress}>
                <View style={styles.progressBar} />
              </View>

              <TouchableOpacity style={styles.trialButton}>
                <Text style={styles.trialButtonText}>{plan.buttonText}</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <ThemedTouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <ThemedText lightColor="#fff" darkColor="#000" style={styles.continueButtonText}>
            Ready to go!
          </ThemedText>
        </ThemedTouchableOpacity>
      </View>
    </ThemedView>
  );
}
