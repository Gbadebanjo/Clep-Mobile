import { Colors } from '@/constants/Colors';
import { StyleSheet } from 'react-native';

export const PaginationStyles = (colorScheme: 'light' | 'dark') => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
      gap: 8,
    },
    arrowButton: {
      padding: 8,
      borderRadius: 999,
    },
    activeArrow: {
      backgroundColor: Colors[colorScheme].primary100, // wine-100 equivalent
    },
    disabledButton: {
      backgroundColor: Colors[colorScheme].primary400, // gray-100
    },
    pageButton: {
      width: 40,
      height: 40,
      borderRadius: 999,
      justifyContent: 'center',
      alignItems: 'center',
    },
    activePage: {
      backgroundColor: Colors[colorScheme].primary800, // primary
    },
    inactivePage: {
      backgroundColor: Colors[colorScheme].primary400, // gray-100
    },
    pageText: {
      fontSize: 14,
      color: Colors[colorScheme].text, // gray-700
    },
    activePageText: {
      color: Colors[colorScheme].text,
      fontWeight: '600',
    },
  });
};
