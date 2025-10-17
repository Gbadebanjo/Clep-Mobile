import { StyleSheet } from "react-native";

export const DataStyles = (colorScheme: "light" | "dark") =>
  StyleSheet.create({
    root: {
      flex: 1,
      flexDirection: "row",
      backgroundColor: "#fff",
    },
    howToImage: {
      width: 350,
      height: "100%",
    },
    rightPanel: {
      flexGrow: 1,
      flex: 1,
      paddingHorizontal: 24,
      paddingTop: 32,
      backgroundColor: "#fff",
    },
    title: {
      fontSize: 24,
      fontWeight: "500",
      marginTop: 38,
      marginBottom: 8,
    },
    bold: {
      fontWeight: "bold",
    },
    sectionTitle: {
      fontSize: 20,
      marginTop: 24,
      marginBottom: 8,
      fontWeight: "400",
    },
    table: {
      marginTop: 12,
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 8,
      overflow: "hidden",
    },
    tableRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      borderBottomWidth: 1,
      borderBottomColor: "#eee",
      paddingVertical: 12,
      paddingHorizontal: 16,
      backgroundColor: "#fafafa",
    },
    tableLabel: {
      fontWeight: "500",
      fontSize: 16,
      color: "#222",
    },
    tableValue: {
      fontSize: 16,
      color: "#444",
    },
    recommendation: {
      fontSize: 18,
      marginTop: 24,
      marginBottom: 16,
    },
    saveButton: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#000",
      paddingVertical: 16,
      paddingHorizontal: 32,
      borderRadius: 32,
      alignSelf: "center",
      marginTop: 8,
    },
    saveButtonDisabled: {
      backgroundColor: "#aaa",
      paddingVertical: 16,
      paddingHorizontal: 32,
      borderRadius: 32,
      alignSelf: "center",
      flexDirection: "row",
      alignItems: "center",
    },
    saveButtonText: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "600",
      marginRight: 12,
    },
  });
