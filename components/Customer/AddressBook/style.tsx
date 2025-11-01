import { StyleSheet } from "react-native";
export const AdressBookStyles = (colorScheme: "light" | "dark") =>
  StyleSheet.create({
    container: {
      padding: 16,
      paddingBottom: 32,
    },
    buttonWrapper: {
      marginBottom: 16,
      alignItems: "flex-end",
    },
    button: {
      backgroundColor: "#000",
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 25,
    },
    buttonText: {
      color: "#fff",
      fontWeight: "600",
      fontSize: 16,
    },
    center: {
      alignItems: "center",
      justifyContent: "center",
      marginVertical: 16,
    },
    errorText: {
      color: "red",
      fontWeight: "600",
      fontSize: 16,
    },
  });
  