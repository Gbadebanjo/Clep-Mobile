import { StyleSheet } from "react-native";

export const StoreSelectStyles = (colorScheme: "light" | "dark") =>
  StyleSheet.create({
    selectorButton: {
      width: "100%",
      padding: 12,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "#D1D5DB",
      backgroundColor: "#fff",
    },
    selectorContent: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    selectorLeft: {
      flexDirection: "row",
      alignItems: "center",
    },
    placeholder: {
      color: "#9CA3AF",
      fontSize: 14,
    },
    storeImage: {
      width: 32,
      height: 32,
      borderRadius: 6,
      marginRight: 8,
    },
    selectedText: {
      fontSize: 14,
      color: "#111827",
      fontWeight: "500",
    },
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.4)",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 20,
    },
    modal: {
      backgroundColor: "#fff",
      width: "100%",
      borderRadius: 12,
      padding: 20,
      maxHeight: "80%",
    },
    modalTitle: {
      fontSize: 16,
      fontWeight: "600",
      marginBottom: 10,
      textAlign: "center",
      color: "#111827",
    },
    optionItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 10,
      paddingHorizontal: 8,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "#E5E7EB",
      marginBottom: 10,
    },
    optionSelected: {
      backgroundColor: "#FCE7F3",
      borderColor: "#D84773",
    },
    optionContent: {
      flexDirection: "row",
      alignItems: "center",
    },
    optionImage: {
      width: 36,
      height: 36,
      borderRadius: 6,
      marginRight: 10,
    },
    optionText: {
      fontSize: 14,
      color: "#111827",
      fontWeight: "500",
    },
    cancelButton: {
      marginTop: 10,
      backgroundColor: "#F3F4F6",
      paddingVertical: 10,
      borderRadius: 8,
    },
    cancelText: {
      textAlign: "center",
      fontWeight: "500",
      color: "#374151",
    },
  });