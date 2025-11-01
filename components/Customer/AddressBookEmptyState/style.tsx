import { StyleSheet } from "react-native";
export const AdressBookEmptyStyles = (colorScheme: "light" | "dark") =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#ffffff",
      padding: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    content: {
      width: "100%",
      maxWidth: 470,
      alignItems: "center",
    },
    image: {
      width: 100,
      height: 100,
      marginBottom: 32,
      resizeMode: "contain",
    },
    title: {
      fontSize: 24,
      fontWeight: "500",
      textAlign: "center",
      marginBottom: 16,
      color: "#000",
    },
    subtitle: {
      fontSize: 18,
      fontWeight: "500",
      textAlign: "center",
      color: "#292D32",
      marginBottom: 32,
    },
    button: {
      backgroundColor: "#000",
      width: 400,
      maxWidth: "100%",
      height: 61,
      borderRadius: 30,
      justifyContent: "center",
      alignItems: "center",
    },
    buttonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "600",
    },
  });
  