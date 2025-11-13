import { StyleSheet } from "react-native";

export const SavedManualMeasurementStyles = (colorScheme: "light" | "dark") =>
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
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 20,
      marginBottom: 16,
      flexWrap: "wrap",
    },
    title: {
      fontSize: 20,
      fontWeight: "600",
      color: "#111827",
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
    cardsWrapper: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 12,
    },
    emptyContainer: {
      width: "100%",
      paddingVertical: 40,
      alignItems: "center",
    },
    emptyText: {
      color: "#6b7280",
      fontSize: 16,
    },
    headerDesc: {
      fontSize: 12,
      color: "gray",
      marginBottom: 8,
    },
  });
  