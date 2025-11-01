import { StyleSheet } from "react-native";
export const AddAdressStyles = (colorScheme: "light" | "dark") =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#ffffff",
    },
    backRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 16,
      marginBottom: 20,
    },
    arrowIcon: {
      width: 24, 
      height: 24,
      resizeMode: "contain",
    },
    backText: {
      fontSize: 22,
      fontWeight: "500",
      color: "#000",
    },
  });
  