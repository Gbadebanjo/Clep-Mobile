import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

export const ShareStyles = (colorScheme: "light" | "dark") =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors[colorScheme].background,
      padding: 16,
    },

    searchBar: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 20,
      paddingHorizontal: 12,
      marginTop: 46,
      marginBottom: 16,
    },

    searchInput: {
      flex: 1,
      height: 40,
    },

    storeCard: {
      backgroundColor: Colors[colorScheme].background,
      padding: 12,
      borderColor: Colors[colorScheme].border,
      paddingBottom: 22,
      borderBottomWidth: 1,
    },

    storeHeader: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 8,
      display: "flex",
    },

    storeLogo: {
      width: 100,
      height: 100,
      borderRadius: 4,
    },

    storeName: {
      fontSize: 16,
      fontWeight: "700",
    },

    verifiedText: {
      color: "green",
      marginTop: 4,
      backgroundColor: "#e0f7e9",
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
    },

    shareButton: {
      backgroundColor: Colors[colorScheme].text,
      paddingVertical: 15,
      borderRadius: 50,
      alignItems: "center",
    },

    shareButtonText: {
      color: Colors[colorScheme].background,
      fontWeight: "600",
    },

    viewProfileButton: {
      backgroundColor: Colors[colorScheme].background,
      paddingVertical: 10,
      borderRadius: 50,
      borderWidth: 1,
      borderColor: Colors[colorScheme].text,
      marginTop: 8,
      alignItems: "center",
    },

    viewProfileButtonText: {
      color: Colors[colorScheme].text,
      fontWeight: "600",
    },
  });
