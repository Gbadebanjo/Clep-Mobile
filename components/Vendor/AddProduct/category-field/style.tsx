import { StyleSheet } from "react-native";


export const CategoryFieldStyles = (colorScheme: "light" | "dark") =>
    StyleSheet.create({
    container: {
      marginBottom:10,  
      paddingHorizontal:16
    },
    heading: {
      fontSize: 18,
      fontWeight: '600',
      color: '#111',
      marginBottom: 8,
    },
    card:{
      borderWidth: 1,
      borderColor: "#eee",
      borderRadius: 12,
      padding:16,
      backgroundColor: "#fff"
    },
  });