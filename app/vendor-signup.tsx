import { vendorSignupStyles } from '@/components/Auth/styles/vendor-signup-styles';
import SearchNavCompo from '@/components/General/search-nav';
import { ThemedInput } from '@/components/ThemedInput';
import { ThemedText } from '@/components/ThemedText';
import { ThemedTouchableOpacity } from '@/components/ThemedTouchableOpacity';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ImageBackground, ScrollView, TouchableOpacity, View } from 'react-native';

export default function VendorSignupScreen() {
  const [fullName, setFullName] = useState('E.g John Doe');
  const [email, setEmail] = useState('jubileefaith36@gmail.com');
  const [phoneNumber, setPhoneNumber] = useState('1234567890');
  const [showSetupPassword, setShowSetupPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [password, setPassword] = useState('**********');
  const [confirmPassword, setConfirmPassword] = useState('**********');

  const handleNext = () => {
    setShowSetupPassword(true);
  };

  const handlePrevious = () => {
    setShowSetupPassword(false);
  };

  const handleSignIn = () => {
    router.push('/vendor-login');
  };

  const handleFileUpload = () => {
    console.log('Upload CAC file');
  };

  return (
    <ThemedView style={vendorSignupStyles.container}>
      <ScrollView contentContainerStyle={vendorSignupStyles.scrollContainer}>
        <SearchNavCompo />
        {/* Dashboard Preview */}
        {!showSetupPassword ? (
          <>
            <View style={vendorSignupStyles.dashboardContainer}>
              <ImageBackground
                source={require('@/assets/images/auth/signup-banner-1.png')}
                style={vendorSignupStyles.dashboardImage}
              ></ImageBackground>
            </View>

            {/* Content */}
            <View style={vendorSignupStyles.content}>
              <ThemedText style={vendorSignupStyles.title}>Sign up as a Vendor</ThemedText>
              <ThemedText lightColor="#747778" darkColor="#fff" style={vendorSignupStyles.subtitle}>
                In order to sell your goods and services on Vazzel, you must be a verified member. Please enter your
                information to signup as a vendor
              </ThemedText>

              <View style={vendorSignupStyles.formContainer}>
                <ThemedInput label="Full Name" value={fullName} onChangeText={setFullName} />

                <ThemedInput
                  label="Email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />

                <ThemedInput
                  label="Phone Number"
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  keyboardType="phone-pad"
                />

                <View style={vendorSignupStyles.uploadSection}>
                  <View style={vendorSignupStyles.uploadHeader}>
                    <ThemedText style={vendorSignupStyles.uploadLabel}>Upload CAC</ThemedText>
                    <View style={vendorSignupStyles.optionalBadge}>
                      <Ionicons name="information-circle" size={16} color="#747778" />
                      <ThemedText style={vendorSignupStyles.optionalText}>(Optional)</ThemedText>
                    </View>
                  </View>

                  <TouchableOpacity style={vendorSignupStyles.uploadArea} onPress={handleFileUpload}>
                    <Ionicons name="cloud-upload-outline" size={24} color="#747778" />
                    <ThemedText style={vendorSignupStyles.uploadText}>
                      Drag and drop files or, or click to add file
                    </ThemedText>
                    <TouchableOpacity style={vendorSignupStyles.browseButton}>
                      <ThemedText style={vendorSignupStyles.browseButtonText}>Browse here</ThemedText>
                    </TouchableOpacity>
                  </TouchableOpacity>
                </View>

                <ThemedTouchableOpacity style={vendorSignupStyles.nextButton} onPress={handleNext}>
                  <ThemedText lightColor="#fff" darkColor="#000" style={vendorSignupStyles.nextButtonText}>
                    Next
                  </ThemedText>
                </ThemedTouchableOpacity>

                <View style={vendorSignupStyles.signInContainer}>
                  <ThemedText style={vendorSignupStyles.haveAccountText}>Already have an Account? </ThemedText>
                  <TouchableOpacity onPress={handleSignIn}>
                    <ThemedText style={vendorSignupStyles.signInText}>Sign In</ThemedText>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </>
        ) : (
          <>
            <View style={vendorSignupStyles.dashboardContainer}>
              <ImageBackground
                source={require('@/assets/images/auth/signup-banner-2.png')}
                style={vendorSignupStyles.dashboardImage}
              ></ImageBackground>
            </View>

            {/* Content */}
            <View style={vendorSignupStyles.content}>
              <ThemedText style={vendorSignupStyles.title}>Enter your Password</ThemedText>
              <ThemedText lightColor="#747778" darkColor="#fff" style={vendorSignupStyles.subtitle}>
                Please ensure your password is secure and contains at least 8 characters, including numbers and symbols
              </ThemedText>

              <View style={vendorSignupStyles.formContainer}>
                <ThemedInput label="Password" value={password} onChangeText={setPassword} isPassword={true} />

                <ThemedInput
                  label="Confirm Password"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  isPassword={true}
                />

                <View style={vendorSignupStyles.generalButtonContainer}>
                  <ThemedTouchableOpacity style={{ ...vendorSignupStyles.previousButton }} onPress={handlePrevious}>
                    <ThemedText style={vendorSignupStyles.previousButtonText}>Previous</ThemedText>
                  </ThemedTouchableOpacity>
                  <ThemedTouchableOpacity
                    style={{ ...vendorSignupStyles.nextButton, width: '50%' }}
                    onPress={() => {
                      router.push('/vendor-plan-selection');
                    }}
                  >
                    <ThemedText lightColor="#fff" darkColor="#000" style={vendorSignupStyles.nextButtonText}>
                      Next
                    </ThemedText>
                  </ThemedTouchableOpacity>
                </View>

                <View style={vendorSignupStyles.signInContainer}>
                  <ThemedText style={vendorSignupStyles.haveAccountText}>Already have an Account? </ThemedText>
                  <TouchableOpacity onPress={handleSignIn}>
                    <ThemedText style={vendorSignupStyles.signInText}>Sign In</ThemedText>
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
