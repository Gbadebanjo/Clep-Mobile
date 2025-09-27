import { Colors } from '@/constants/Colors';
import { StyleSheet } from 'react-native';

export const paymentStyles = (colorScheme: 'light' | 'dark') => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colorScheme === 'dark' ? Colors[colorScheme].background : Colors[colorScheme].bgPrimary,
    },
    content: {
      paddingHorizontal: 20,
      paddingTop: 40,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 30,
      color: Colors[colorScheme].text,
      textAlign: 'center',
    },
    paymentInfo: {
      alignItems: 'center',
      marginBottom: 40,
    },
    amountText: {
      fontSize: 32,
      fontWeight: 'bold',
      color: Colors[colorScheme].primary800,
      marginBottom: 10,
    },
    emailText: {
      fontSize: 16,
      color: Colors[colorScheme].textMuted,
    },
    payButton: {
      backgroundColor: Colors[colorScheme].primary800,
      borderRadius: 12,
      paddingVertical: 16,
      paddingHorizontal: 40,
      alignItems: 'center',
      minWidth: 200,
    },
    disabledButton: {
      backgroundColor: Colors[colorScheme].primary400,
    },
    payButtonText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#fff',
    },
  });
};
