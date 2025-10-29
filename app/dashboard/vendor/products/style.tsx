import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";


export const ProductsStyles = (colorScheme: "light" | "dark") =>
    StyleSheet.create({
      container: { flex: 1, backgroundColor: Colors[colorScheme].background,  paddingTop: "7%", },
    centered: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 40,
    },
    retryButton: {
      marginTop: 10,
      paddingHorizontal: 12,
      paddingVertical: 8,
      backgroundColor: "#2563EB",
      color: "#fff",
      borderRadius: 8,
    },
    header: {
      // backgroundColor: "#fff",
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: "#E5E7EB",
    },
    title: {
      fontSize: 20,
      fontWeight: "700",
      color: "#111827",
    },
    subtitle: {
      fontSize: 12,
      color: "#6B7280",
      marginTop: 2,
    },
    searchInput: {
      marginTop: 10,
      backgroundColor: "#F3F4F6",
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 8,
      color: "#111827",
    },
    tabsContainer: {
      flexDirection: "row",
      marginTop: 12,
      gap: 8,
    },
    tabButton: {
      flex: 1,
      backgroundColor: "#F3F4F6",
      paddingVertical: 8,
      borderRadius: 8,
      alignItems: "center",
    },
    tabButtonActive: {
      backgroundColor: "#2563EB",
    },
    tabText: {
      fontSize: 14,
      color: "#374151",
      fontWeight: "500",
    },
    tabTextActive: {
      color: "#fff",
    },
    cellText: {
      color: "#374151",
      maxWidth: 150,
    },
    actions:{
      flexDirection:"row",
      gap:20
    }
  });