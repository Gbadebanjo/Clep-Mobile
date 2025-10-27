import { StyleSheet } from "react-native";


export const StatusFieldsStyles = (colorScheme: "light" | "dark") =>
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
      marginTop: 8,
      borderWidth: 1,
      borderColor: "#848484",
      borderRadius: 12,
      padding:16
    },
  });
  