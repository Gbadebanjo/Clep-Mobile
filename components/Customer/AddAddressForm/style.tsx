import { StyleSheet } from "react-native";
export const AddAdressFormStyles = (colorScheme: "light" | "dark") =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    fieldContainer: {
      marginBottom: 20,
    },
    label: {
      fontWeight: '500',
      marginBottom: 5,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: 16,
    },
    textarea: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: 16,
      height: 120,
      textAlignVertical: 'top',
    },
    pickerContainer: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
    },
    submitButton: {
      backgroundColor: '#000',
      paddingVertical: 16,
      borderRadius: 50,
      alignItems: 'center',
      marginTop: 20,
    },
    disabledButton: {
      opacity: 0.5,
    },
    submitButtonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: '600',
    },
    errorText: {
      color: 'red',
      marginTop: 5,
    },
    errorInput: {
      borderColor: 'red',
    },
  });
  