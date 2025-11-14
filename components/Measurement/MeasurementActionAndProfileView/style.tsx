import { StyleSheet } from "react-native";

export const MeasurementActionStyles = (colorScheme: "light" | "dark") =>
  StyleSheet.create({
    container: {
      backgroundColor: "#fff",
      padding: 16,
    },
    headerContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      flexWrap: "wrap",
      marginBottom: 20,
    },
    headerText: {
      fontSize: 18,
      fontWeight: "600",
      color: "#111",
      marginBottom: 4,
    },
    headerDesc: {
      fontSize: 12,
      color: "gray",
      marginBottom: 8,
    },
    buttonGroup: {
      flexDirection: "column",
      alignItems: "flex-end",
      gap: 10,
    },
    button: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 20,
    },
    darkButton: {
      backgroundColor: "#000",
    },
    lightButton: {
      borderWidth: 1,
      borderColor: "#ba577a",
      backgroundColor: "#fff",
    },
    buttonText: {
      marginLeft: 8,
      fontSize: 14,
      fontWeight: "500",
    },
    detailsContainer: {
      marginTop: 10,
    },
    detailItem: {
      flexDirection: "row",
      marginBottom: 6,
    },
    detailLabel: {
      color: "#666",
      fontSize: 14,
      marginRight: 4,
    },
    detailValue: {
      color: "#111",
      fontSize: 14,
    },
  });