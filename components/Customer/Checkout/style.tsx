import { Colors } from '@/constants/Colors';
import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

export const checkoutStyles = (colorScheme: 'light' | 'dark') => {
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 40,
      paddingHorizontal: 10,
      paddingBottom: 20,
    },
    scrollContainer: {
      flexGrow: 1,
      paddingBottom: 20,
    },
    content: {
      paddingHorizontal: 10,
      paddingTop: 10,
      flex: 1,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 30,
      color: colorScheme === 'dark' ? '#fff' : '#000',
    },
    sectionContainer: {
      marginBottom: 30,
    },
    sectionHeader: {
      marginBottom: 30,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 8,
      color: colorScheme === 'dark' ? '#fff' : '#000',
    },
    underline: {
      height: 2,
      width: 60,
      backgroundColor: Colors[colorScheme].primary800,
    },
    formContainer: {
      gap: 20,
    },
    inputContainer: {
       marginBottom: 12,
    },
    label: {
      fontSize: 16,
      fontWeight: '500',
      marginBottom: 8,
      color: colorScheme === 'dark' ? '#fff' : '#000',
    },
    input: {
      fontSize: 16,
      borderWidth: 1,
    },
    dropdown: {
      borderRadius: 40,
      paddingHorizontal: 16,
      paddingVertical: 16,
      borderWidth: 1,
      borderColor: Colors[colorScheme].border,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: Colors[colorScheme].inputBackground,
      color: Colors[colorScheme].text,
    },
    dropdownText: {
      fontSize: 16,
      color: Colors[colorScheme].text,
    },
    placeholder: {
      color: Colors[colorScheme].textMuted,
    },
    dropdownList: {
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      backgroundColor: Colors[colorScheme].background,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: Colors[colorScheme].border,
      maxHeight: 200,
      zIndex: 1000,
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      overflow: 'scroll',
    },
    dropdownScroll: {
      maxHeight: 200,
    },
    dropdownItem: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
    },
    dropdownItemText: {
      fontSize: 16,
    },
    continueButton: {
      borderRadius: 12,
      paddingVertical: 16,
      alignItems: 'center',
      marginTop: 20,
    },
    continueButtonText: {
      fontSize: 16,
      fontWeight: '600',
    },
     cartSection: {
      marginTop: 10,
      borderWidth: 1,
      borderColor: Colors[colorScheme].border,
      borderRadius: 12,
      padding: 15,
      backgroundColor: Colors[colorScheme].background,
    },
    cartItemsContainer: {
      marginTop: 10,
    },
    totalContainer: {
      marginTop: 10,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    totalText: {
      fontWeight: 'bold',
      fontSize: 16,
    },
  });
};
