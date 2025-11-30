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




loadingContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 20,
},
loadingText: {
  marginTop: 10,
  fontSize: 16,
  color: colorScheme === 'dark' ? '#fff' : '#666',
},
addressListContainer: {
  marginTop: 16,
  gap: 12,
},
addressCard: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: 16,
  borderWidth: 1,
  borderColor: colorScheme === 'dark' ? '#333' : '#e0e0e0',
  borderRadius: 8,
  backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#fff',
},
addressCardSelected: {
  borderColor: '#9F0E42',
  borderWidth: 2,
},
addressCardContent: {
  flex: 1,
},
addressStreet: {
  fontSize: 16,
  fontWeight: '600',
  marginBottom: 4,
},
addressDetails: {
  fontSize: 14,
  color: colorScheme === 'dark' ? '#999' : '#666',
},
manualEntryButton: {
  marginTop: 16,
  padding: 12,
  alignItems: 'center',
},
manualEntryText: {
  fontSize: 14,
  fontWeight: '600',
},
backButton: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 16,
  gap: 8,
},
backButtonText: {
  fontSize: 14,
  fontWeight: '600',
},
disabledButton: {
  opacity: 0.5,
},
  });
};
