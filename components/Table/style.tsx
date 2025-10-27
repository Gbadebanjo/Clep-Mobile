import { StyleSheet } from "react-native";

export const TableStyles = (colorScheme: "light" | "dark") =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      borderRadius: 8,
      overflow: "hidden",
      borderWidth: 1,
      borderColor: "#e5e5e5",
      paddingTop:16,
      // padding:16
      paddingLeft:16,
      paddingRight:16
  
    },
    headerRow: {
      flexDirection: "row",
      backgroundColor: "#f5f5f5",
      borderBottomWidth: 1,
      borderColor: "#e5e5e5",
      paddingVertical: 14,
    },
    headerCell: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 8,
    },
    headerText: {
      fontWeight: "600",
      fontSize: 13,
      color: "#333",
    },
    row: {
      flexDirection: "row",
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderColor: "#f0f0f0",
    },
    rowAlt: {
      backgroundColor: "#fafafa",
    },
    cell: {
      justifyContent: "center",
      paddingHorizontal: 8,
     
    },
    cellText: {
      fontSize: 13,
      color: "#444",
    },
    loadingContainer: {
      paddingVertical: 20,
      alignItems: "center",
    },
    paginationContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 10,
      marginBottom: 20,
      gap: 12,
    },
    pageButton: {
      backgroundColor: "#6B0C2D",
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderRadius: 6,
    },
    pageButtonDisabled: {
      backgroundColor: "#ccc",
    },
    pageButtonText: {
      color: "#fff",
      fontSize: 14,
    },
    pageText: {
      fontSize: 14,
      color: "#333",
    },
  });