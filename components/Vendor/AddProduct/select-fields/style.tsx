import { StyleSheet } from "react-native";


export const SelectFieldStyles = (colorScheme: "light" | "dark") =>
    StyleSheet.create({
    container: {
      marginBottom: 12,
    },
    label: {
      fontSize: 16,
      color: '#111',
      marginBottom: 6,
      fontWeight: '600',
    },
    trigger: {
      flexDirection: 'row',
      alignItems: 'center',
      borderColor: '#ddd',
      borderWidth: 1,
      borderRadius: 8,
      padding: 12,
      backgroundColor: '#fff',
    },
    valueText: {
      fontSize: 15,
      color: '#222',
    },
    placeholder: {
      color: '#999',
    },
    errorText: {
      marginTop: 4,
      color: 'red',
      fontSize: 12,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.3)',
      justifyContent: 'center',
      padding: 20,
    },
    modalContent: {
      backgroundColor: '#fff',
      borderRadius: 10,
      paddingVertical: 8,
      maxHeight: '70%',
    },
    option: {
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    optionText: {
      fontSize: 15,
      color: '#222',
    },
  });