import { StyleSheet } from "react-native";

export const EditManualMeasurementStyles = (colorScheme: "light" | "dark") =>
    StyleSheet.create({
    container: {
      padding: 16,
      backgroundColor: '#FFFFFF',
    },
    headerContainer: {
      marginBottom: 24,
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#8B1538',
      marginBottom: 6,
    },
    subtitle: {
      fontSize: 14,
      color: '#555',
    },
    loaderContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });