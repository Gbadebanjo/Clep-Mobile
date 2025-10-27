import { StyleSheet } from "react-native";


export const KeywordStyles = (colorScheme: "light" | "dark") =>
    StyleSheet.create({
    card: {
      marginBottom:5,  
      paddingHorizontal:16
    },
    header: {
      marginBottom: 12,
    },
    title: {
      fontSize: 18,
      fontWeight: "600",
      color: "#111",
    },
    description: {
      fontSize: 14,
      color: "#555",
      marginTop: 2,
    },
    content: {
      borderWidth: 1,
      borderColor: "#848484",
      borderRadius: 12,
      padding:16
    },
    label: {
      fontSize: 15,
      color: "#222",
      marginBottom: 6,
    },
    input: {
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 8,
      padding: 12,
      fontSize: 15,
      color: "#333",
      backgroundColor: "#fff",
      textAlignVertical: "top",
    },
    hint: {
      marginTop: 6,
      fontSize: 12,
      color: "#777",
    },
    errorText: {
      marginTop: 4,
      color: "red",
      fontSize: 13,
    },
  });