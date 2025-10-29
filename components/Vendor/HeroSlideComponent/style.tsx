import { StyleSheet } from "react-native";
export const HeroSlideStyles = (colorScheme: "light" | "dark") =>
  StyleSheet.create({
    container: {
      paddingBottom: 100,
    },
    headerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
    },
    headerText: {
      fontSize: 18,
      fontWeight: "600",
    },
    saveBtn: {
      backgroundColor: "#000",
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 6,
    },
    saveBtnText: {
      color: "#fff",
      fontSize: 14,
    },
    slideContainer: {
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 10,
      padding: 12,
      position: "relative",
    },
    deleteBtn: {
      position: "absolute",
      top: 10,
      right: 10,
      backgroundColor: "red",
      borderRadius: 20,
      padding: 5,
      zIndex: 10,
    },
    slideTitle: {
      fontSize: 15,
      fontWeight: "500",
      marginBottom: 8,
    },
    label: {
      fontSize: 13,
      fontWeight: "500",
      marginTop: 10,
    },
    input: {
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 8,
      padding: 8,
      fontSize: 14,
      marginTop: 4,
    },
    addSlideBox: {
      borderWidth: 1,
      borderStyle: "dashed",
      borderColor: "#ccc",
      borderRadius: 10,
      padding: 30,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 20,
    },
    addSlideText: {
      color: "#666",
      fontSize: 14,
      marginTop: 6,
    },
  });
  