import { StyleSheet } from "react-native";


export const SecuritySettingStyles = (colorScheme: "light" | "dark") =>
    StyleSheet.create({
    container: { flex: 1, paddingBottom: 20 },
    pageTitle: { fontSize: 22, fontWeight: "800", marginBottom: 16 },
    cardRow: { flexDirection: "column", justifyContent: "space-between" },
    card: {
      backgroundColor: "#fff",
      borderRadius: 12,
      borderWidth: 1,
      borderColor: "#eee",
      padding: 16,
      marginBottom: 20,
      elevation: 1,
    },
    cardHeader: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
    cardTitle: { fontSize: 16, fontWeight: "700", color: "#000", marginLeft: 6 },
    cardSubtitle: { fontSize: 13, color: "#555", marginBottom: 16, lineHeight: 20 },
    inputGroup: { marginBottom: 12 },
    inputLabel: { fontSize: 13, color: "#333", marginBottom: 6 },
    inputWrapper: { flexDirection: "row", alignItems: "center", position: "relative" },disabled2FAButton: { backgroundColor: "#eee", borderRadius: 8, paddingVertical: 10, alignItems: "center", marginTop: 16, }, disabled2FAButtonText: { color: "#666", fontWeight: "600", },
    input: {
      flex: 1,
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 8,
      paddingVertical: 10,
      paddingHorizontal: 12,
      fontSize: 13,
      backgroundColor: "#f9f9f9",
      color: "#444",
    },noticeBox: { flexDirection: "row", alignItems: "center", backgroundColor: "#fdf1f7", borderRadius: 8, paddingVertical: 8, paddingHorizontal: 10, alignSelf: "flex-start", marginBottom: 10, }, noticeText: { color: "#b30059", fontWeight: "600", marginLeft: 6, },
    eyeIcon: { position: "absolute", right: 12 },
    disabledButton: { backgroundColor: "#cf88a1", borderRadius: 8, paddingVertical: 12, alignItems: "center", marginTop: 8 },
    disabledButtonText: { color: "#fff", fontWeight: "600", fontSize: 14 },
  });
  