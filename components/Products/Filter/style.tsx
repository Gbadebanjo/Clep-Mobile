import { Colors } from '@/constants/Colors';
import { StyleSheet } from 'react-native';

export const FilterStyles = (colorScheme: 'light' | 'dark') => {
  return StyleSheet.create({
    toggleButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: Colors[colorScheme].primary800,
      paddingVertical: 20,
      paddingHorizontal: 16,
      borderRadius: 50,
      maxWidth: 200,
      width: '100%',
    },
    toggleButtonText: {
      color: 'white',
      fontSize: 14,
      fontWeight: '600',
      marginLeft: 8,
    },
    sidebar: {
      // backgroundColor: 'white',
      padding: 16,
      borderRadius: 12,
      // elevation: 2,
      borderWidth: 1,
      borderColor: Colors[colorScheme].primary400,
    },
    sidebarTitle: {
      fontSize: 18,
      fontWeight: '700',
      marginBottom: 16,
    },
    section: {
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: '600',
      marginBottom: 8,
    },
    radioRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 6,
    },
    radioCircle: {
      width: 16,
      height: 16,
      borderRadius: 8,
      borderWidth: 2,
      borderColor: Colors[colorScheme].primary700,
      marginRight: 8,
    },
    radioSelected: {
      backgroundColor: Colors[colorScheme].primary700,
    },
    radioLabel: {
      fontSize: 14,
    },
    priceRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    input: {
      flex: 1,
      borderWidth: 1,
      borderColor: Colors[colorScheme].primary400,
      padding: 8,
      borderRadius: 6,
      fontSize: 14,
    },
    picker: {
      borderWidth: 2,
      borderColor: Colors[colorScheme].primary400,
      paddingHorizontal: 5,
      borderRadius: 50,
      paddingVertical: 10,
      color: Colors[colorScheme].text,
    },
    resetButton: {
      backgroundColor: Colors[colorScheme].primary400, // gray-100
      paddingVertical: 10,
      borderRadius: 50,
      alignItems: 'center',
    },
    resetButtonText: {
      fontSize: 14,
      fontWeight: '600',
      color: Colors[colorScheme].text, // gray-700
    },
  });
};
