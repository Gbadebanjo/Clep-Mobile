import SearchNavCompo from '@/components/General/search-nav';
import { ThemedText } from '@/components/ThemedText';
import { ThemedTouchableOpacity } from '@/components/ThemedTouchableOpacity';
import { ThemedView } from '@/components/ThemedView';
import { planSelectionStyles } from '@/components/Vendor/plan-selection-styles';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from 'react-native';

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

  const handlePlanSelect = (index: number) => {
    setSelectedPlan(index);
  };

  const handleContinue = () => {
    router.push('/vendor-identity-verification');
  };

  return (
    <ThemedView style={planSelectionStyles.container}>
      <LinearGradient
        colors={['rgba(233, 30, 99, 0)', 'rgba(233, 30, 99, 0.1)', 'rgba(233, 30, 99, 0.2)']}
        locations={[0.7, 0.85, 1]}
        style={planSelectionStyles.gradientOverlay}
      />

      <SearchNavCompo />

      <View style={planSelectionStyles.content}>
        <ThemedText style={planSelectionStyles.title}>Scroll to select{'\n'}Your Plan</ThemedText>
        <ThemedText lightColor="#747778" darkColor="#fff" style={planSelectionStyles.subtitle}>
          Select your membership plan to continue
        </ThemedText>

        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={planSelectionStyles.plansContainer}
          onMomentumScrollEnd={(event) => {
            const index = Math.round(event.nativeEvent.contentOffset.x / (width - 80));
            setSelectedPlan(index);
          }}
        >
          {plans.map((plan, index) => (
            <TouchableOpacity
              key={plan.id}
              style={[
                planSelectionStyles.planCard,
                {
                  backgroundColor: plan.backgroundColor,
                  borderColor: plan.borderColor,
                },
              ]}
              onPress={() => handlePlanSelect(index)}
            >
              <View style={planSelectionStyles.planHeader}>
                <Text
                  style={[planSelectionStyles.planTitle, { color: plan.backgroundColor === '#000' ? '#fff' : '#000' }]}
                >
                  {plan.title}
                </Text>
                <Text
                  style={[
                    planSelectionStyles.planSubtitle,
                    { color: plan.backgroundColor === '#000' ? '#fff' : '#747778' },
                  ]}
                >
                  {plan.subtitle}
                </Text>
              </View>

              <View style={planSelectionStyles.planPricing}>
                <Text
                  style={[planSelectionStyles.planPrice, { color: plan.backgroundColor === '#000' ? '#fff' : '#000' }]}
                >
                  {plan.price}
                </Text>
                <Text style={planSelectionStyles.planCommission}>{plan.commission}</Text>
              </View>

              <View style={planSelectionStyles.planProgress}>
                <View style={planSelectionStyles.progressBar} />
              </View>

              <TouchableOpacity style={planSelectionStyles.trialButton}>
                <Text style={planSelectionStyles.trialButtonText}>{plan.buttonText}</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <ThemedTouchableOpacity style={planSelectionStyles.continueButton} onPress={handleContinue}>
          <ThemedText lightColor="#fff" darkColor="#000" style={planSelectionStyles.continueButtonText}>
            Ready to go!
          </ThemedText>
        </ThemedTouchableOpacity>
      </View>
    </ThemedView>
  );
}
