import SearchNavCompo from '@/components/General/search-nav';
import { ThemedText } from '@/components/ThemedText';
import { ThemedTouchableOpacity } from '@/components/ThemedTouchableOpacity';
import { ThemedView } from '@/components/ThemedView';
import { walletSetupStyles } from '@/components/Vendor/wallet-setup-styles';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function VendorWalletSetupScreen() {
  const [selectedBank, setSelectedBank] = useState('GTB');
  const [accountNumber, setAccountNumber] = useState('0236610706');
  const [accountName, setAccountName] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [showBankDropdown, setShowBankDropdown] = useState(false);

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
    router.push('/vendor-account-created');
  };

  const handlePrevious = () => {
    router.back();
  };

  return (
    <ThemedView style={walletSetupStyles.container}>
      <LinearGradient
        colors={['rgba(233, 30, 99, 0)', 'rgba(233, 30, 99, 0.1)', 'rgba(233, 30, 99, 0.2)']}
        locations={[0.7, 0.85, 1]}
        style={walletSetupStyles.gradientOverlay}
      />

      <ScrollView style={walletSetupStyles.scrollView}>
        <SearchNavCompo />

        <View style={walletSetupStyles.content}>
          <ThemedText style={walletSetupStyles.title}>Create your Wallet</ThemedText>
          <ThemedText lightColor="#747778" darkColor="#fff" style={walletSetupStyles.subtitle}>
            Get started by Creating your Wallet on Vazzel.com
          </ThemedText>

          <View style={walletSetupStyles.formContainer}>
            <ThemedText style={walletSetupStyles.label}>Choose a Bank</ThemedText>
            <TouchableOpacity
              style={walletSetupStyles.bankSelector}
              onPress={() => setShowBankDropdown(!showBankDropdown)}
            >
              <Text style={walletSetupStyles.bankText}>{selectedBank}</Text>
              <Ionicons name="chevron-down" size={20} color="#747778" />
            </TouchableOpacity>

            {showBankDropdown && (
              <View style={walletSetupStyles.bankDropdown}>
                {banks.map((bank) => (
                  <TouchableOpacity
                    key={bank}
                    style={walletSetupStyles.bankOption}
                    onPress={() => {
                      setSelectedBank(bank);
                      setShowBankDropdown(false);
                    }}
                  >
                    <Text style={walletSetupStyles.bankOptionText}>{bank}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <ThemedText style={walletSetupStyles.label}>Enter Account Number</ThemedText>
            <TextInput
              style={walletSetupStyles.input}
              value={accountNumber}
              onChangeText={handleAccountNumberChange}
              keyboardType="numeric"
              maxLength={10}
            />

            {isVerified && accountName && (
              <View style={walletSetupStyles.verificationContainer}>
                <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                <Text style={walletSetupStyles.accountName}>{accountName}</Text>
              </View>
            )}

            <View style={walletSetupStyles.buttonContainer}>
              <ThemedTouchableOpacity style={walletSetupStyles.previousButton} onPress={handlePrevious}>
                <ThemedText style={walletSetupStyles.previousButtonText}>Previous</ThemedText>
              </ThemedTouchableOpacity>
              <ThemedTouchableOpacity
                style={[walletSetupStyles.nextButton, !isVerified && walletSetupStyles.nextButtonDisabled]}
                onPress={handleNext}
                disabled={!isVerified}
              >
                <ThemedText lightColor="#fff" darkColor="#000" style={walletSetupStyles.nextButtonText}>
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
