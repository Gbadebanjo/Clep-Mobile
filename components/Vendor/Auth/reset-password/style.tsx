import { Colors } from '@/constants/Colors';
import { StyleSheet } from 'react-native';

export const resetPasswordStyles = (colorScheme: 'light' | 'dark') =>
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
    updateButton: {
      backgroundColor: Colors[colorScheme].primary800 || '#000',
      borderRadius: 40,
      paddingVertical: 16,
      alignItems: 'center',
      marginTop: 20,
    },
    updateButtonText: {
      fontSize: 16,
      fontWeight: '600',
    },
  });
