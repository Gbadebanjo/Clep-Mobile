import { StyleSheet } from "react-native";

export const SavedAIMeasurementStyles = (colorScheme: "light" | "dark") =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      paddingHorizontal: 16,
    },
    scrollContent: {
      paddingBottom: 60,
    },
    loaderContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fff",
    },
    errorContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fff",
      paddingHorizontal: 16,
    },
    errorText: {
      color: "#ef4444",
      fontSize: 16,
      textAlign: "center",
    },
    header: {
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
      marginTop: 20,
      marginBottom: 16,
      flexWrap: "wrap",
    },
    addButton: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#000",
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
    },
    addButtonText: {
      color: "#fff",
      marginLeft: 8,
      fontSize: 14,
    },
    contentWrapper: {
      gap: 24, 
    },
    emptyContainer: {
      padding: 20,
      borderWidth: 1,
      borderColor: "#e5e7eb",
      borderRadius: 8,
      marginTop: 12,
      alignItems: "center",
    },
    emptyText: {
      color: "#6b7280",
      textAlign: "center",
      fontSize: 15,
    },
  });