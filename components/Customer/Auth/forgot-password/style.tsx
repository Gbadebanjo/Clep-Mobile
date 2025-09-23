import { Colors } from '@/constants/Colors';
import { StyleSheet } from 'react-native';

export const forgotPasswordStyles = (colorScheme: 'light' | 'dark') =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingBottom: 60,
    },
    scrollContainer: {
      flexGrow: 1,
    },
    imageContainer: {
      height: 300,
      marginBottom: 30,
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
    formContainer: {
      gap: 20,
    },
    resetButton: {
      backgroundColor: Colors[colorScheme].primary800 || '#000',
      borderRadius: 40,
      paddingVertical: 16,
      alignItems: 'center',
      marginTop: 20,
    },
    resetButtonText: {
      fontSize: 16,
      fontWeight: '600',
    },
    signInContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
    },
    rememberText: {
      fontSize: 14,
      color: '#747778',
    },
    signInText: {
      fontSize: 14,
      color: Colors[colorScheme].primary800 || '#E91E63',
      fontWeight: '600',
    },
  });
