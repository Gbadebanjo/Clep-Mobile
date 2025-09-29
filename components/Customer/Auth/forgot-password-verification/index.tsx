import { SubmitButton } from '@/components/General/SubmitButton';
import { ThemedInput } from '@/components/ThemedInput';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { showError } from '@/services/api';
import { AuthService } from '@/services/auth.service';
import { useAuthStore } from '@/store';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, useColorScheme, View } from 'react-native';
import { forgotPasswordVerificationStyles } from './style';

export default function CustomerForgotPasswordVerificationComponent() {
  const [code, setCode] = useState('');
  const [countdown, setCountdown] = useState(59);
  const colorScheme = useColorScheme() as 'light' | 'dark';
  const styles = forgotPasswordVerificationStyles(colorScheme);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { resetEmail } = useAuthStore();
  const [passwordValidation, setPasswordValidation] = useState({
    isValid: false,
    hasMinLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecialChar: false,
  });

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    const validation = AuthService.validatePassword(text);
    setPasswordValidation(validation);
  };

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCodeChange = (value: string) => {
    setCode(value);
  };

  const handleVerifyCode = async () => {
    try {
      if (!code || !password || !confirmPassword) {
        showError('Fill all fields');
        return;
      }

      if (password !== confirmPassword) {
        showError('Passwords do not match');
        return;
      }
      setIsLoading(true);

      const response = await AuthService.resetPassword(code, password, resetEmail);
      if (response.success) {
        router.push('/customer/login' as any);
      } else {
        showError(response.error);
      }
      setIsLoading(false);
    } catch (error) {
      showError('Something went wrong');
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    try {
      if (!resetEmail) {
        showError('Reset email not found');
        router.push('/customer/forgot-password' as any);
        return;
      }
      setIsLoading(true);
      const response = await AuthService.forgotPassword(resetEmail);
      if (response.success) {
        setCountdown(59);

        return;
      } else {
        showError(response.error);
      }
    } catch (error) {
      showError('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.logoContainer}>
          <Image source={require('@/assets/images/logo.webp')} style={styles.logo} resizeMode="contain" />
        </View>

        {/* Sign Up Link */}
        <View style={styles.topSignUpContainer}>
          <ThemedText style={styles.noAccountText}>Remember your password? </ThemedText>
          <TouchableOpacity
            onPress={() => {
              router.push('/customer/login' as any);
            }}
          >
            <ThemedText style={styles.topSignUpText}>Sign In</ThemedText>
          </TouchableOpacity>
        </View>
        {/* <SearchNavCompo /> */}

        {/* Hero Image */}
        {/* <View style={styles.imageContainer}>
          <ImageBackground
            source={require('@/assets/images/auth/forgot-password-2.png')}
            style={styles.heroImage}
            resizeMode="cover"
          />
        </View> */}

        {/* Content */}
        <View style={styles.content}>
          <ThemedText style={styles.title}>Reset Password</ThemedText>
          <ThemedText lightColor="#747778" darkColor="#fff" style={styles.subtitle}>
            We sent a reset code to your email.
          </ThemedText>

          <ThemedInput
            label="OTP Code"
            value={code}
            onChangeText={handleCodeChange}
            isPassword={false}
            placeholder="Enter the OTP code"
          />

          <ThemedInput
            label="Password"
            value={password}
            onChangeText={handlePasswordChange}
            isPassword={true}
            placeholder="Enter your password"
          />

          <View style={styles.passwordStrengthContainer}>
            <View style={styles.passwordStrengthHeader}>
              <ThemedText style={styles.passwordStrengthLabel}>Password strength:</ThemedText>
              <ThemedText
                style={[styles.passwordStrengthValue, { color: passwordValidation.isValid ? '#4CAF50' : '#FF9800' }]}
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
                    style={[styles.requirementText, { color: passwordValidation.hasMinLength ? '#4CAF50' : '#999' }]}
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
                    style={[styles.requirementText, { color: passwordValidation.hasUppercase ? '#4CAF50' : '#999' }]}
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
                    style={[styles.requirementText, { color: passwordValidation.hasLowercase ? '#4CAF50' : '#999' }]}
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
                    style={[styles.requirementText, { color: passwordValidation.hasSpecialChar ? '#4CAF50' : '#999' }]}
                  >
                    Special character
                  </ThemedText>
                </View>
              </View>
            </View>
          </View>

          <ThemedInput
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={handleConfirmPasswordChange}
            isPassword={true}
            placeholder="Enter your password again"
          />

          {countdown > 0 && <ThemedText style={styles.resendText}>Resend after {countdown} seconds</ThemedText>}

          <SubmitButton
            text="Reset Password"
            isLoading={isLoading}
            onPress={handleVerifyCode}
            disabled={!code || !password || password !== confirmPassword}
            buttonStyle={styles.verifyButton}
            textStyle={styles.verifyButtonText}
          />

          {countdown === 0 && (
            <View style={styles.resendContainer}>
              <ThemedText style={styles.noEmailText}>Haven&apos;t gotten the email yet? </ThemedText>
              <TouchableOpacity onPress={handleResendCode}>
                <ThemedText style={styles.resendLinkText}>Resend email</ThemedText>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </ThemedView>
  );
}
