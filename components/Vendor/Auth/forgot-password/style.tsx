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
    },
    subtitle: {
      fontSize: 16,
      lineHeight: 24,
      marginBottom: 40,
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
  });
