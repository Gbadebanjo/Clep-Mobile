import SearchNavCompo from '@/components/General/search-nav';
import { ThemedText } from '@/components/ThemedText';
import { ThemedTouchableOpacity } from '@/components/ThemedTouchableOpacity';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native';
import { walletSetupStyles } from './style';

export default function VendorWalletSetupComponent() {
  const [selectedBank, setSelectedBank] = useState('GTB');
  const [accountNumber, setAccountNumber] = useState('0236610706');
  const [accountName, setAccountName] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [showBankDropdown, setShowBankDropdown] = useState(false);
  const colorScheme = useColorScheme() as 'light' | 'dark';
  const styles = walletSetupStyles(colorScheme);

  const banks = ['GTB', 'Access Bank', 'First Bank', 'UBA', 'Zenith Bank', 'Fidelity Bank'];

  const handleAccountNumberChange = (text: string) => {
    setAccountNumber(text);
    if (text.length === 10) {
      // Simulate account verification
      setTimeout(() => {
        setAccountName('Kehinde Gbemisola');
        setIsVerified(true);
      }, 1000);
    } else {
      setIsVerified(false);
      setAccountName('');
    }
  };

  const handleNext = () => {
    router.push('/vendor/account-created');
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

        <View style={styles.content}>
          <ThemedText style={styles.title}>Create your Wallet</ThemedText>
          <ThemedText lightColor="#747778" darkColor="#fff" style={styles.subtitle}>
            Get started by Creating your Wallet on Vazzel.com
          </ThemedText>

          <View style={styles.formContainer}>
            <ThemedText style={styles.label}>Choose a Bank</ThemedText>
            <TouchableOpacity style={styles.bankSelector} onPress={() => setShowBankDropdown(!showBankDropdown)}>
              <Text style={styles.bankText}>{selectedBank}</Text>
              <Ionicons name="chevron-down" size={20} color="#747778" />
            </TouchableOpacity>

            {showBankDropdown && (
              <View style={styles.bankDropdown}>
                {banks.map((bank) => (
                  <TouchableOpacity
                    key={bank}
                    style={styles.bankOption}
                    onPress={() => {
                      setSelectedBank(bank);
                      setShowBankDropdown(false);
                    }}
                  >
                    <Text style={styles.bankOptionText}>{bank}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <ThemedText style={styles.label}>Enter Account Number</ThemedText>
            <TextInput
              style={styles.input}
              value={accountNumber}
              onChangeText={handleAccountNumberChange}
              keyboardType="numeric"
              maxLength={10}
            />

            {isVerified && accountName && (
              <View style={styles.verificationContainer}>
                <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                <Text style={styles.accountName}>{accountName}</Text>
              </View>
            )}

            <View style={styles.buttonContainer}>
              <ThemedTouchableOpacity style={styles.previousButton} onPress={handlePrevious}>
                <ThemedText style={styles.previousButtonText}>Previous</ThemedText>
              </ThemedTouchableOpacity>
              <ThemedTouchableOpacity
                style={[styles.nextButton, !isVerified && styles.nextButtonDisabled]}
                onPress={handleNext}
                disabled={!isVerified}
              >
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
