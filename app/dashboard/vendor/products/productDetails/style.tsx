import { StyleSheet } from "react-native";

export const ProductDetailsStyles = (colorScheme: "light" | "dark") =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      marginBottom: 10,
      paddingHorizontal: 16,
    },
    loaderContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    image: { width: "100%", height: 300 },
    imgContainer: {
      borderWidth: 1,
      borderColor: "#eee",
      borderRadius: 12,
      padding: 16,
      marginTop: 20,
      backgroundColor: "#fff",
    },
    content: { padding: 16 },
    header: { flexDirection: "row", alignItems: "center", gap: 10 },
    name: { fontSize: 22, fontWeight: "bold", flex: 1 },
    statusTag: {
      borderRadius: 12,
      paddingVertical: 4,
      paddingHorizontal: 10,
    },
    statusText: {
      color: "#000",
      fontWeight: "600",
      textTransform: "capitalize",
    },
    price: { fontSize: 18, marginTop: 10 },
    strike: { textDecorationLine: "line-through", color: "#9CA3AF" },
    description: { marginTop: 10, color: "#4B5563" },
    meta: { marginTop: 16 },
    actions: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 24,
    },
    button: {
      flexDirection: "row",
      alignItems: "center",
      padding: 12,
      borderRadius: 50,
      flex: 0.48,
      justifyContent: "center",
      borderColor: "#000",
      borderWidth: 1,
      marginTop: 20,
      backgroundColor:"#fff"
    },
    btnText: { color: "#000", fontWeight: "600", marginLeft: 6 },
    center: { flex: 1, justifyContent: "center", alignItems: "center" },
    cellText: {
      color: "#374151",
      maxWidth: 150,
    },
  });
