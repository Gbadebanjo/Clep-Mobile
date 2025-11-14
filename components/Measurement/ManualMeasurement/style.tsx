import { StyleSheet } from "react-native";

export const ManualMeasurementStyles = (colorScheme: "light" | "dark") =>
  StyleSheet.create({
    container: {
      padding: 16,
      backgroundColor: '#fff',
    },
    addRow: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginBottom: 16,
    },
    addButton: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 6,
      paddingVertical: 6,
      paddingHorizontal: 12,
    },
    addButtonText: {
      fontSize: 14,
      color: '#333',
    },
    inputRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    inputContainer: {
      flex: 1,
      marginHorizontal: 4,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 6,
      paddingHorizontal: 10,
      paddingVertical: 8,
      fontSize: 14,
    },
    removeButton: {
      backgroundColor: '#f5f5f5',
      borderRadius: 20,
      width: 28,
      height: 28,
      alignItems: 'center',
      justifyContent: 'center',
    },
    removeText: {
      color: 'red',
      fontSize: 18,
      fontWeight: 'bold',
    },
    emptyText: {
      fontStyle: 'italic',
      color: '#888',
      textAlign: 'center',
      marginBottom: 10,
    },
    submitButton: {
      backgroundColor: '#8B1538',
      borderRadius: 8,
      paddingVertical: 12,
      marginTop: 16,
      alignItems: 'center',
      marginBottom:15
    },
    submitText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    errorText: {
      fontSize: 12,
      color: 'red',
      marginTop: 4,
    },
  });
  