import { Colors } from '@/constants/Colors';
import { StyleSheet } from 'react-native';

export const forgotPasswordVerificationStyles = (colorScheme: 'light' | 'dark') =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingBottom: 80,
      paddingTop: 40,
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
      marginTop: 10,
    },
    topSignUpText: {
      fontSize: 14,
      color: Colors[colorScheme].primary800,
      fontWeight: '600',
    },
    noAccountText: {
      fontSize: 14,
      color: colorScheme === 'dark' ? '#fff' : '#000',
      textAlign: 'right',
    },
    imageContainer: {
      height: 300,
      marginBottom: 30,
      position: 'relative',
    },
    heroImage: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },

    content: {
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    subtitle: {
      fontSize: 16,
      lineHeight: 24,
      marginBottom: 40,
    },

    passwordStrengthContainer: {
      marginTop: -15,
      marginBottom: 20,
    },
    passwordStrengthHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    passwordStrengthLabel: {
      fontSize: 14,
      color: '#666',
    },
    passwordStrengthValue: {
      fontSize: 14,
      fontWeight: '600',
    },
    passwordRequirements: {
      gap: 8,
    },
    requirementRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    requirementItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      flex: 1,
    },
    requirementText: {
      fontSize: 12,
    },
    codeInputActive: {
      borderColor: Colors[colorScheme].primary800 || '#E91E63',
    },
    resendText: {
      fontSize: 14,
      color: '#747778',
      textAlign: 'center',
      marginBottom: 30,
    },
    verifyButton: {
      backgroundColor: Colors[colorScheme].primary800 || '#000',
      borderRadius: 40,
      paddingVertical: 16,
      alignItems: 'center',
      marginBottom: 20,
    },
    verifyButtonText: {
      fontSize: 16,
      fontWeight: '600',
    },
    resendContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    noEmailText: {
      fontSize: 14,
      color: '#747778',
    },
    resendLinkText: {
      fontSize: 14,
      color: Colors[colorScheme].primary800 || '#E91E63',
      fontWeight: '600',
    },
  });
