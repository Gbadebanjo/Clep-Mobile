import { StyleSheet } from "react-native";


export const VariationManagerStyles = (colorScheme: "light" | "dark") =>
    StyleSheet.create({
    card: {
      marginBottom:10,  
      paddingHorizontal:16
    },
    title: { fontSize: 18, fontWeight: "600", color: "#111" },
    description: { fontSize: 14, color: "#666", marginBottom: 12 },
    section: {
      borderWidth: 1,
      borderColor: "#848484",
      borderRadius: 10,
      padding: 12,
      marginBottom: 16,
    },
    label: { fontSize: 13, color: "#555", marginTop: 8 },
    input: {
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 8,
      padding: 10,
      marginTop: 4,
      color: "#111",
    },
    attrHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 12,
    },
    addAttrBtn: {
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderRadius: 6,
      borderWidth:1,
      borderColor:"#848484"
    },
    addAttrText: { fontSize: 13, color: "#333" },
    noAttr: { fontSize: 13, fontStyle: "italic", color: "#999", marginTop: 6 },
    attrRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      marginTop: 8,
    },
    deleteSmall: { paddingHorizontal: 6 },
  });