import { StyleSheet } from "react-native";


export const MediaFieldStyles = (colorScheme: "light" | "dark") =>
    StyleSheet.create({
    container: {  marginBottom:10,  
      paddingHorizontal:16 },
    card:{
      borderWidth: 1,
      borderColor: "#eee",
      borderRadius: 12,
      padding:16,
       backgroundColor: "#fff"
    },
    title: { fontSize: 18, fontWeight: "600", marginBottom: 12 },
    grid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
    imageWrapper: {
      width: "46%",
      aspectRatio: 1,
      borderRadius: 8,
      overflow: "hidden",
      position: "relative",
    },
    image: { width: "100%", height: "100%" },
    deleteButton: {
      position: "absolute",
      top: 6,
      right: 6,
      backgroundColor: "#EF4444",
      padding: 4,
      borderRadius: 50,
    },
    addBox: {
      width: "46%",
      aspectRatio: 1,
      borderWidth: 2,
      borderColor: "#D1D5DB",
      borderStyle: "dashed",
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    addText: { fontSize: 12, color: "#6B7280", marginTop: 6 },
  });
  