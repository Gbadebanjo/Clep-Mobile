import { StyleSheet } from "react-native";

export const CustomerMeasurementStyles = (colorScheme: "light" | "dark") =>
    StyleSheet.create({
    container: {
      // padding: 16,
    },
    tabsContainer: {
      flexDirection: "row",
      borderBottomWidth: 1,
      borderBottomColor: "#E5E7EB",
     
    },
    tabButton: {
      flex: 1,
      alignItems: "center",
      paddingVertical: 10,
      
    },
    tabText: {
      fontSize: 14,
      color: "#6B7280",
    },
    activeTab: {
      borderBottomWidth: 2,
      borderBottomColor: "#D84773",
      
    },
    activeTabText: {
      color: "#D84773",
      fontWeight: "600",
    },
    tabContent: {
      marginTop: 10,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    loadingText: {
      marginTop: 10,
      color: "#374151",
      fontSize: 14,
    },
  });