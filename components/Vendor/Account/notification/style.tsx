import { StyleSheet } from "react-native";


export const NotificationStyles = (colorScheme: "light" | "dark") =>
    StyleSheet.create({
    safe: {
      flex: 1,
      backgroundColor: "#fff",
    },
    container: {},
    header: {
      fontSize: 22,
      fontWeight: "700",
      // marginTop: 10,
      marginBottom: 20,
      color: "#111827",
    },
    banner: {
      flexDirection: "row",
      backgroundColor: "#fefce8",
      paddingVertical: 10,
      borderRadius: 6,
      paddingHorizontal: 6,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: "#fef08a",
    },
    bannerTextWrapper: {
      flex: 1,
      marginLeft: 10,
    },
    bannerTitle: {
      color: "#B45309",
      fontWeight: "700",
      fontSize: 16,
      marginBottom: 5,
    },
    bannerDesc: {
      color: "#92400E",
      fontSize: 14,
      lineHeight: 20,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: "700",
      color: "#111827",
      marginBottom: 10,
      marginTop: 15,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 14,
    },
    rowLabel: {
      fontSize: 15,
      color: "#374151",
    },
  });
  