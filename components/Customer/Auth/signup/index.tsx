import { ThemedInput } from '@/components/ThemedInput';
import { ThemedLoader } from '@/components/ThemedLoader';
import { ThemedText } from '@/components/ThemedText';
import { ThemedTouchableOpacity } from '@/components/ThemedTouchableOpacity';
import { ThemedView } from '@/components/ThemedView';
import { showError } from '@/services/api';
import { AuthService } from '@/services/auth.service';
import { useAuthStore } from '@/store';
import { RegisterVendorForm } from '@/types/auth';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Image, ScrollView, TouchableOpacity, useColorScheme, View } from 'react-native';
import { customerSignupStyles } from './style';

export default function VendorSignupComponent() {
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({
    isValid: false,
    hasMinLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

  const colorScheme = useColorScheme() as 'light' | 'dark';
  const styles = customerSignupStyles(colorScheme);
  const { setUser } = useAuthStore();

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    const validation = AuthService.validatePassword(text);
    console.log(validation);
    setPasswordValidation(validation);
  };

  const handleSignUp = async () => {
    if (!firstName || !surname || !email || !password || !confirmPassword) {
      showError('Please fill in all required fields');
      return;
    }

    if (password !== confirmPassword) {
      showError('Passwords do not match');
      return;
    }

    if (!passwordValidation.isValid) {
      showError('Please ensure your password meets all requirements');
      return;
    }

    setIsLoading(true);

    try {
      const signupData: Omit<RegisterVendorForm, 'ninNumber' | 'businessName' | 'businessDetails' | 'currentPlan'> = {
        email,
        name: `${firstName} ${surname}`,
        phoneNumber: '',
        role: 'customer',
        password,
        isActive: true,
      };

      const response = await AuthService.registerVendor(signupData as any);

      if (response.success && response.data) {
        setUser(response.data.data.doc);
        router.push('/customer/verification');
      } else {
        showError(response?.error || 'Registration failed');
      }
    } catch (error: any) {
      console.log(error);
      showError(error || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignIn = () => {
    router.push('/vendor/login');
  };

  if (isLoading) {
    return <ThemedLoader text="Creating your account..." />;
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image source={require('@/assets/images/logo.webp')} style={styles.logo} resizeMode="contain" />
        </View>

        {/* Sign In Link */}
        <View style={styles.topSignInContainer}>
          <ThemedText style={styles.haveAccountText}>Already have an account? </ThemedText>
          <TouchableOpacity onPress={handleSignIn}>
            <ThemedText style={styles.topSignInText}>Sign In</ThemedText>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <ThemedText style={styles.title}>Sign up as a Customer</ThemedText>

          <View style={styles.formContainer}>
            <View>
              <ThemedInput label="First Name" value={firstName} onChangeText={setFirstName} placeholder="John" />
              {!firstName && <ThemedText style={styles.errorText}>First Name is required</ThemedText>}
            </View>

            <View>
              <ThemedInput label="Surname" value={surname} onChangeText={setSurname} placeholder="Doe" />
              {!surname && <ThemedText style={styles.errorText}>Last Name is required</ThemedText>}
            </View>

            <ThemedInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <View>
              <ThemedInput
                label="Password"
                value={password}
                onChangeText={handlePasswordChange}
                isPassword={true}
                placeholder="Enter your password"
              />

              {/* Password Strength Indicator */}
              <View style={styles.passwordStrengthContainer}>
                <View style={styles.passwordStrengthHeader}>
                  <ThemedText style={styles.passwordStrengthLabel}>Password strength:</ThemedText>
                  <ThemedText
                    style={[
                      styles.passwordStrengthValue,
                      { color: passwordValidation.isValid ? '#4CAF50' : '#FF9800' },
                    ]}
                  >
                    {passwordValidation.isValid ? 'Strong' : 'Weak'}
                  </ThemedText>
                </View>
                <View style={styles.passwordRequirements}>
                  <View style={styles.requirementRow}>
                    <View style={styles.requirementItem}>
                      <Ionicons
                        name={passwordValidation.hasMinLength ? 'checkmark-circle' : 'close-circle'}
                        size={16}
                        color={passwordValidation.hasMinLength ? '#4CAF50' : '#E5E5E5'}
                      />
                      <ThemedText
                        style={[
                          styles.requirementText,
                          { color: passwordValidation.hasMinLength ? '#4CAF50' : '#999' },
                        ]}
                      >
                        At least 8 characters
                      </ThemedText>
                    </View>
                    <View style={styles.requirementItem}>
                      <Ionicons
                        name={passwordValidation.hasUppercase ? 'checkmark-circle' : 'close-circle'}
                        size={16}
                        color={passwordValidation.hasUppercase ? '#4CAF50' : '#E5E5E5'}
                      />
                      <ThemedText
                        style={[
                          styles.requirementText,
                          { color: passwordValidation.hasUppercase ? '#4CAF50' : '#999' },
                        ]}
                      >
                        Uppercase letter
                      </ThemedText>
                    </View>
                  </View>
                  <View style={styles.requirementRow}>
                    <View style={styles.requirementItem}>
                      <Ionicons
                        name={passwordValidation.hasLowercase ? 'checkmark-circle' : 'close-circle'}
                        size={16}
                        color={passwordValidation.hasLowercase ? '#4CAF50' : '#E5E5E5'}
                      />
                      <ThemedText
                        style={[
                          styles.requirementText,
                          { color: passwordValidation.hasLowercase ? '#4CAF50' : '#999' },
                        ]}
                      >
                        Lowercase letter
                      </ThemedText>
                    </View>
                    <View style={styles.requirementItem}>
                      <Ionicons
                        name={passwordValidation.hasNumber ? 'checkmark-circle' : 'close-circle'}
                        size={16}
                        color={passwordValidation.hasNumber ? '#4CAF50' : '#E5E5E5'}
                      />
                      <ThemedText
                        style={[styles.requirementText, { color: passwordValidation.hasNumber ? '#4CAF50' : '#999' }]}
                      >
                        Number
                      </ThemedText>
                    </View>
                  </View>
                  <View style={styles.requirementRow}>
                    <View style={styles.requirementItem}>
                      <Ionicons
                        name={passwordValidation.hasSpecialChar ? 'checkmark-circle' : 'close-circle'}
                        size={16}
                        color={passwordValidation.hasSpecialChar ? '#4CAF50' : '#E5E5E5'}
                      />
                      <ThemedText
                        style={[
                          styles.requirementText,
                          { color: passwordValidation.hasSpecialChar ? '#4CAF50' : '#999' },
                        ]}
                      >
                        Special character
                      </ThemedText>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View>
              <ThemedInput
                label="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                isPassword={true}
                placeholder="Confirm your password"
              />
              {confirmPassword && password !== confirmPassword && (
                <ThemedText style={styles.errorText}>Passwords do not match</ThemedText>
              )}
            </View>

            <ThemedTouchableOpacity
              lightColor="#000"
              darkColor="#fff"
              style={styles.createButton}
              onPress={handleSignUp}
            >
              <ThemedText lightColor="#fff" darkColor="#000" style={styles.createButtonText}>
                Create Account
              </ThemedText>
            </ThemedTouchableOpacity>

            <View style={styles.termsContainer}>
              <ThemedText style={styles.termsText}>
                By signing up, you agree to our <ThemedText style={styles.termsLink}>Terms of Service</ThemedText> and{' '}
                <ThemedText style={styles.termsLink}>Privacy Policy</ThemedText>
              </ThemedText>
            </View>
          </View>
        </View>

        <LinearGradient
          colors={['#E85E90', '#9F0E42']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.bottomBanner}
        >
          <View style={styles.bannerOverlay}>
            <ThemedText style={styles.bannerTitle}>Join Vazzel Today</ThemedText>
            <ThemedText style={styles.bannerSubtitle}>Create an account to start shopping and exploring</ThemedText>
          </View>
        </LinearGradient>
      </ScrollView>
    </ThemedView>
  );
}
