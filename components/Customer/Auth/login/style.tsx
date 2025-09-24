import { Colors } from '@/constants/Colors';
import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

export const vendorLoginStyles = (colorScheme: 'light' | 'dark') =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colorScheme === 'dark' ? '#000' : Colors[colorScheme].bgPrimary,
    },
    scrollContainer: {
      flexGrow: 1,
    },
    logoContainer: {
      alignItems: 'center',
      paddingTop: 60,
      // paddingBottom: 40,
    },
    logo: {
      width: 120,
      height: 40,
    },
    topSignUpContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginBottom: 40,
      marginRight: 20,
    },
    topSignUpText: {
      fontSize: 14,
      color: Colors[colorScheme].primary800,
      fontWeight: '600',
    },
    content: {
      paddingHorizontal: 20,
      flex: 1,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 40,
      color: colorScheme === 'dark' ? '#fff' : '#000',
    },
    formContainer: {
      width: '100%',
    },
    label: {
      fontSize: 16,
      fontWeight: '700',
      marginBottom: 8,
    },
    input: {
      backgroundColor: '#F5F5F5',
      borderRadius: 40,
      paddingHorizontal: 16,
      paddingVertical: 16,
      fontSize: 16,
      marginBottom: 20,
      color: '#000',
    },
    passwordContainer: {
      position: 'relative',
      marginBottom: 20,
    },
    passwordInput: {
      backgroundColor: '#F5F5F5',
      borderRadius: 40,
      paddingHorizontal: 16,
      paddingVertical: 16,
      paddingRight: 50,
      fontSize: 16,
      color: '#000',
    },
    eyeIcon: {
      position: 'absolute',
      right: 16,
      top: 18,
    },
    optionsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 40,
    },
    rememberContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    checkbox: {
      width: 20,
      height: 20,
      borderWidth: 2,
      borderColor: '#E5E5E5',
      borderRadius: 4,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
    },
    checkboxChecked: {
      backgroundColor: '#000',
      borderColor: '#000',
    },
    rememberText: {
      fontSize: 14,
      color: colorScheme === 'dark' ? '#fff' : '#000',
    },
    forgotText: {
      fontSize: 14,
      color: Colors[colorScheme].primary800,
      fontWeight: '600',
    },
    signInButton: {
      backgroundColor: '#000',
      borderRadius: 25,
      paddingVertical: 16,
      alignItems: 'center',
      marginBottom: 30,
    },
    signInButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#fff',
    },
    noAccountText: {
      fontSize: 14,
      color: colorScheme === 'dark' ? '#fff' : '#000',
      textAlign: 'right',
    },
    customerSignInContainer: {
      alignItems: 'center',
    },
    customerSignInText: {
      fontSize: 14,
      fontWeight: '600',
      color: Colors[colorScheme].primary800,
    },
    bottomBanner: {
      height: 150,
      marginTop: 40,
    },
    bannerImage: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    bannerOverlay: {
      padding: 20,
      alignItems: 'center',
      height: '100%',
    },
    bannerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#fff',
      textAlign: 'center',
      marginBottom: 8,
    },
    bannerSubtitle: {
      fontSize: 14,
      color: '#fff',
      textAlign: 'center',
      lineHeight: 20,
    },
  });
