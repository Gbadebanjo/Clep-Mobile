import { StyleSheet } from "react-native";

export const MeasurementTableAndNotesStyles = (colorScheme: "light" | "dark") =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    section: {
      // marginHorizontal: 16,
      marginTop: 20,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "600",
      marginBottom: 10,
      color: "#111",
    },
    tableContainer: {
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 8,
      overflow: "hidden",
    },
    row: {
      flexDirection: "row",
      borderBottomWidth: 1,
      borderBottomColor: "#eee",
      paddingVertical: 10,
      paddingHorizontal: 8,
      backgroundColor: "#fff",
    },
    headerRow: {
      backgroundColor: "#f5f5f5",
    },
    cell: {
      fontSize: 14,
      color: "#333",
    },
    headerCell: {
      fontWeight: "600",
      color: "#000",
    },
    noDataBox: {
      padding: 20,
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 8,
      marginTop: 10,
      alignItems: "center",
    },
    noDataText: {
      color: "#666",
      fontSize: 14,
    },
    headerDesc: {
      fontSize: 12,
      color: "gray",
      marginBottom: 8,
    },
  });