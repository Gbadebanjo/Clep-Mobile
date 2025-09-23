import { Colors } from '@/constants/Colors';
import { StyleSheet } from 'react-native';

export const forgotPasswordVerificationStyles = (colorScheme: 'light' | 'dark') =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingBottom: 80,
    },
    scrollContainer: {
      flexGrow: 1,
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
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 16,
      lineHeight: 24,
      marginBottom: 40,
      textAlign: 'center',
    },
    codeContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
      paddingHorizontal: 20,
    },
    codeInput: {
      width: 60,
      height: 60,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: '#E5E5E5',
      fontSize: 24,
      fontWeight: 'bold',
      backgroundColor: colorScheme === 'dark' ? '#2A2A2A' : '#F5F5F5',
      color: colorScheme === 'dark' ? '#fff' : '#000',
    },
    codeInputFilled: {
      borderColor: '#007AFF',
      backgroundColor: colorScheme === 'dark' ? '#1A1A1A' : '#F0F8FF',
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
