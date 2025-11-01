import { StyleSheet } from "react-native";
export const ProfileImageCompStyles = (colorScheme: "light" | "dark") =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      flexWrap: "wrap",
      alignItems: "center",
      gap: 16,
      borderWidth:1,
      borderColor:"#ddd",
      padding:12,
      borderRadius:12,
      marginBottom:12
    },
    imageWrapper: {
      overflow: "hidden",
      backgroundColor: "#000",
    },
    image: {
      width: "100%",
      height: "100%",
    },
    placeholder: {
      flex: 1,
      backgroundColor: "#000",
    },
    textWrapper: {
      flexDirection: "column",
      gap: 4,
    },
    nameText: {
      fontSize: 18,
      fontWeight: "500",
      color: "#000",
    },
    center: {
      alignItems: "center",
      justifyContent: "center",
    },
    errorText: {
      color: "red",
      fontSize: 14,
    },
  });