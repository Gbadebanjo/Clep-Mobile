import { successModalStyles } from '@/components/Auth/styles/success-modal-styles';
import { router } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function LoginSuccessScreen() {
  const handleContinue = () => {
    router.push('/(tabs)');
  };

  return (
    <View style={successModalStyles.container}>
      <View style={successModalStyles.modal}>
        <Text style={successModalStyles.title}>Successful</Text>
        <Text style={successModalStyles.message}>
          Your password has been successfully updated. Click continue to sign into your account
        </Text>
        <TouchableOpacity style={successModalStyles.continueButton} onPress={handleContinue}>
          <Text style={successModalStyles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
