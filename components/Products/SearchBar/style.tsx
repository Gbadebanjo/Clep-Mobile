import { Colors } from '@/constants/Colors';
import { StyleSheet } from 'react-native';

export const SearchStyles = (colorScheme: 'light' | 'dark') => {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      marginBottom: 20,
    },
    inputContainer: {
      flexDirection: 'row',
      flex: 1,
      borderWidth: 1,
      borderColor: Colors[colorScheme].primary400,
      backgroundColor: Colors[colorScheme].background,
      borderTopLeftRadius: 999,
      borderBottomLeftRadius: 999,
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingVertical: 8,
    },
    icon: {
      marginRight: 6,
    },
    input: {
      flex: 1,
      height: 40,
      color: Colors[colorScheme].text,
      fontSize: 14,
    },
    button: {
      backgroundColor: Colors.light.primary800,
      paddingHorizontal: 20,
      justifyContent: 'center',
      borderTopRightRadius: 999,
      borderBottomRightRadius: 999,
    },
    buttonText: {
      color: Colors[colorScheme].text,
      fontWeight: '600',
    },
  });
};
