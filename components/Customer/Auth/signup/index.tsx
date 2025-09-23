import { ThemedInput } from '@/components/ThemedInput';
import { ThemedLoader } from '@/components/ThemedLoader';
import { ThemedText } from '@/components/ThemedText';
import { ThemedTouchableOpacity } from '@/components/ThemedTouchableOpacity';
import { ThemedView } from '@/components/ThemedView';
import { showError } from '@/services/api';
import { AuthService } from '@/services/auth.service';
import { useAuthStore } from '@/store';
import { RegisterVendorForm } from '@/types/auth';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ImageBackground, ScrollView, TouchableOpacity, useColorScheme, View } from 'react-native';
import { vendorSignupStyles } from './style';

export default function CustomerSignupComponent() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showSetupPassword, setShowSetupPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState<{ isValid: boolean; errors: string[] }>({
    isValid: true,
    errors: [],
  });
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const colorScheme = useColorScheme() as 'light' | 'dark';
  const styles = vendorSignupStyles(colorScheme);
  const { setUser } = useAuthStore();

  const handleNext = () => {
    if (!fullName || !email || !phoneNumber) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    setShowSetupPassword(true);
  };

  const handlePrevious = () => {
    setShowSetupPassword(false);
  };

  const handleSignIn = () => {
    router.push('/customer/login');
  };

  const handleFileUpload = () => {
    console.log('Upload CAC file');
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    const validation = AuthService.validatePassword(text);
    setPasswordValidation(validation);
  };

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
    setConfirmPasswordError(text !== password && text.length > 0);
  };

  const handleSignup = async () => {
    if (!password || !confirmPassword) {
      showError('Please enter both password fields');
      return;
    }

    if (password !== confirmPassword) {
      showError('Passwords do not match');
      return;
    }

    // Use the new password validation
    const validation = AuthService.validatePassword(password);
    if (!validation.isValid) {
      showError(validation.errors.join('\n'));
      return;
    }

    setIsLoading(true);

    try {
      const signupData: Omit<RegisterVendorForm, 'businessName' | 'businessDetails' | 'ninNumber' | 'currentPlan'> = {
        email,
        name: fullName,
        phoneNumber,
        role: 'customer' as any,
        password,
        isActive: true,
      };

      const response = await AuthService.registerVendor(signupData as any);

      if (response.success && response.data) {
        // Save user data to store
        setUser(response.data.data.doc);

        // Navigate to verification screen
        router.push('/customer/verification');
      } else {
        showError(response.error || 'Registration failed');
      }
    } catch (error: any) {
      showError(error.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <ThemedLoader text="Creating your account..." />;
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* <SearchNavCompo /> */}
        {!showSetupPassword ? (
          <>
            <View style={styles.dashboardContainer}>
              <ImageBackground
                source={require('@/assets/images/auth/signup-banner-1.png')}
                style={styles.dashboardImage}
              />
            </View>

            <View style={styles.content}>
              <ThemedText style={styles.title}>Sign up as a Customer</ThemedText>
              <ThemedText lightColor="#747778" darkColor="#fff" style={styles.subtitle}>
                Create an account to start shopping on Vazzel
              </ThemedText>

              <View style={styles.formContainer}>
                <ThemedInput label="Full Name" value={fullName} onChangeText={setFullName} placeholder="E.g John Doe" />

                <ThemedInput
                  label="Email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholder="jubileefaith36@gmail.com"
                />

                <ThemedInput
                  label="Phone Number"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  keyboardType="phone-pad"
                  placeholder="1234567890"
                />

                {/* <View style={styles.uploadSection}>
                  <View style={styles.uploadHeader}>
                    <ThemedText style={styles.uploadLabel}>Upload CAC</ThemedText>
                    <View style={styles.optionalBadge}>
                      <Ionicons name="information-circle" size={16} color="#747778" />
                      <ThemedText style={styles.optionalText}>(Optional)</ThemedText>
                    </View>
                  </View>

                  <TouchableOpacity style={styles.uploadArea} onPress={handleFileUpload}>
                    <Ionicons name="cloud-upload-outline" size={24} color="#747778" />
                    <ThemedText style={styles.uploadText}>Drag and drop files or, or click to add file</ThemedText>
                    <TouchableOpacity style={styles.browseButton}>
                      <ThemedText style={styles.browseButtonText}>Browse here</ThemedText>
                    </TouchableOpacity>
                  </TouchableOpacity>
                </View> */}

                <ThemedTouchableOpacity style={styles.nextButton} onPress={handleNext}>
                  <ThemedText lightColor="#fff" darkColor="#000" style={styles.nextButtonText}>
                    Next
                  </ThemedText>
                </ThemedTouchableOpacity>

                <View style={styles.signInContainer}>
                  <ThemedText style={styles.haveAccountText}>Already have an Account? </ThemedText>
                  <TouchableOpacity onPress={handleSignIn}>
                    <ThemedText style={styles.signInText}>Sign In</ThemedText>
                  </TouchableOpacity>
                </View>

                <View style={styles.customerSignupContainer}>
                  <TouchableOpacity onPress={() => router.push('/vendor/signup' as any)}>
                    <ThemedText style={styles.customerSignupText}>Sign up as a vendor</ThemedText>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </>
        ) : (
          <>
            <View style={styles.dashboardContainer}>
              <ImageBackground
                source={require('@/assets/images/auth/signup-banner-2.png')}
                style={styles.dashboardImage}
              />
            </View>

            <View style={styles.content}>
              <ThemedText style={styles.title}>Setup Password</ThemedText>
              <ThemedText lightColor="#747778" darkColor="#fff" style={styles.subtitle}>
                Create a secure password for your account
              </ThemedText>

              <View style={styles.formContainer}>
                <ThemedInput
                  label="Password"
                  value={password}
                  onChangeText={handlePasswordChange}
                  isPassword={true}
                  placeholder="Enter your password"
                  style={
                    !passwordValidation.isValid && password.length > 0 ? { borderColor: 'red', borderWidth: 1 } : {}
                  }
                />

                <ThemedInput
                  label="Confirm Password"
                  value={confirmPassword}
                  onChangeText={handleConfirmPasswordChange}
                  isPassword={true}
                  placeholder="Confirm your password"
                  style={confirmPasswordError ? { borderColor: 'red', borderWidth: 1 } : {}}
                />

                <View style={styles.generalButtonContainer}>
                  <ThemedTouchableOpacity style={styles.previousButton} onPress={handlePrevious}>
                    <ThemedText style={styles.previousButtonText}>Previous</ThemedText>
                  </ThemedTouchableOpacity>
                  <ThemedTouchableOpacity style={{ ...styles.nextButton, width: '50%' }} onPress={handleSignup}>
                    <ThemedText lightColor="#fff" darkColor="#000" style={styles.nextButtonText}>
                      Sign Up
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
          </>
        )}
      </ScrollView>
    </ThemedView>
  );
}
