import { StyleSheet } from "react-native";
export const AdressesStyles = (colorScheme: "light" | "dark") =>
  StyleSheet.create({
    container: {
      flexDirection: "column", 
      gap: 16,
    },
    cardWrapper: {
      width: "100%",
    },
  });