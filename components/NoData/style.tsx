import { StyleSheet } from "react-native";

export const NoDataStyles = (colorScheme: "light" | "dark") =>
  StyleSheet.create({
    container: {
      height: 400,
      borderRadius: 12,
      padding: 20,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#fff",
      position: "relative",
    },
    subtitle: {
      position: "absolute",
      top: 16,
      left: 16,
      fontSize: 14,
      fontWeight: "600",
      color: "#666",
    },
    rightButton: {
      position: "absolute",
      top: 16,
      right: 16,
      backgroundColor: "#007bff",
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderRadius: 8,
    },
    rightButtonText: {
      color: "#fff",
      fontWeight: "600",
    },
    iconContainer: {
      backgroundColor: "#E3F2FD",
      padding: 16,
      borderRadius: 50,
      marginBottom: 16,
    },
    title: {
      fontSize: 18,
      fontWeight: "700",
      color: "#222",
      marginBottom: 6,
    },
    description: {
      fontSize: 13,
      textAlign: "center",
      color: "#555",
    },
    button: {
      marginTop: 16,
      backgroundColor: "#007bff",
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 8,
    },
    buttonText: {
      color: "#fff",
      fontWeight: "600",
    },
  });