import { StyleSheet } from "react-native";


export const SeoFieldsStyles = (colorScheme: "light" | "dark") =>
    StyleSheet.create({
    card: {
      marginBottom:10,  
      paddingHorizontal:16
    },
    cardHeader: {
      marginBottom: 12,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: "#111",
    },
    cardDescription: {
      fontSize: 14,
      color: "#555",
      marginTop: 4,
    },
    cardContent: {
      // marginTop: 8,
      borderWidth: 1,
      borderColor: "#848484",
      borderRadius: 12,
      padding:16
    },
    field: {
      marginBottom: 16,
    },
    label: {
      fontSize: 14,
      fontWeight: "500",
      marginBottom: 6,
      color: "#333",
    },
    input: {
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: 15,
      color: "#111",
    },
    textarea: {
      height: 100,
      textAlignVertical: "top",
    },
    errorText: {
      color: "red",
      fontSize: 13,
      marginTop: 4,
    },
  });