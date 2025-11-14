import { StyleSheet } from "react-native";

export const ManualMeasurementCardStyles = (colorScheme: "light" | "dark") =>
  StyleSheet.create({
    card: {
      backgroundColor: "#fff",
      borderRadius: 12,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 5,
      elevation: 3,
      padding: 16,
      width: "100%",
      maxWidth: 400,
      alignSelf: "center",
    },
    measurementRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 10,
      paddingHorizontal: 8,
      backgroundColor: "#F9FAFB",
      borderRadius: 8,
      marginBottom: 10,
    },
    measurementLeft: {
      flexDirection: "row",
      alignItems: "center",
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: "#D84773", 
      marginRight: 8,
    },
    measurementName: {
      fontSize: 14,
      fontWeight: "500",
      color: "#374151",
    },
    measurementRight: {
      flexDirection: "row",
      alignItems: "center",
    },
    measurementValue: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#1F2937",
      marginRight: 4,
    },
    unit: {
      fontSize: 12,
      color: "#6B7280",
    },
    button: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 8,
      paddingVertical: 10,
      paddingHorizontal: 16,
      marginTop: 5,
    },
    shareButton: {
      borderWidth: 1,
      borderColor: "#ba577a",
      borderStyle: "dashed",
      backgroundColor: "#fff",
    },
    shareText: {
      color: "#D84773",
      fontWeight: "600",
      marginLeft: 8,
    },
    updateButton: {
      backgroundColor: "#FDECEF",
      borderWidth: 2,
      borderColor: "#D84773",
      marginTop: 10,
    },
    updateText: {
      color: "#D84773",
      fontWeight: "600",
      textAlign: "center",
    },
  });