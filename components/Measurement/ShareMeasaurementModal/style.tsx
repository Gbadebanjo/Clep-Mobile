import { StyleSheet } from "react-native";

export const SharedMeasurementModalStyles = (colorScheme: "light" | "dark") =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.4)",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 20,
    },
    modal: {
      backgroundColor: "#fff",
      borderRadius: 12,
      padding: 20,
      width: "100%",
      maxHeight: "80%",
    },
    title: {
      fontSize: 18,
      fontWeight: "600",
      marginBottom: 12,
      textAlign: "center",
      color: "#111827",
    },
    searchInput: {
      borderWidth: 1,
      borderColor: "#E5E7EB",
      borderRadius: 8,
      paddingVertical: 10,
      paddingHorizontal: 12,
      fontSize: 14,
      color: "#111827",
      marginBottom: 15,
    },
    storeItem: {
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: "#E5E7EB",
      borderRadius: 8,
      padding: 10,
      marginBottom: 10,
    },
    storeSelected: {
      borderColor: "#D84773",
      backgroundColor: "#FDECEF",
    },
    storeImage: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 10,
    },
    placeholderImage: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: "#E5E7EB",
      marginRight: 10,
    },
    storeName: {
      fontSize: 14,
      fontWeight: "500",
      color: "#111827",
    },
    footer: {
      marginTop: 10,
    },
    shareButton: {
      backgroundColor: "#D84773",
      borderRadius: 8,
      paddingVertical: 12,
      alignItems: "center",
    },
    shareButtonText: {
      color: "#fff",
      fontWeight: "600",
    },
    disabledButton: {
      opacity: 0.6,
    },
    cancelButton: {
      marginTop: 8,
      borderWidth: 1,
      borderColor: "#D1D5DB",
      borderRadius: 8,
      paddingVertical: 10,
      alignItems: "center",
    },
    cancelButtonText: {
      color: "#374151",
      fontWeight: "500",
    },
    emptyContainer: {
      alignItems: "center",
      marginVertical: 20,
    },
    emptyText: {
      color: "#6B7280",
      fontSize: 14,
    },
  });