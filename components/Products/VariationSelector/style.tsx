import { Colors } from "@/constants/Colors";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");
const CARD_MARGIN = 8;
export const NUM_COLUMNS = 2;
const CARD_WIDTH = Math.floor(
  (width - CARD_MARGIN * (NUM_COLUMNS + 1)) / NUM_COLUMNS
);

export const variationSelectorStyles = (colorScheme: "light" | "dark") =>
  StyleSheet.create({
    container: {
      paddingHorizontal: CARD_MARGIN,
      paddingBottom: 12,
    },
    title: {
      fontSize: 18,
      fontWeight: "600",
      marginBottom: 8,
    },
    debugRow: {
      backgroundColor: "#f3f4f6",
      padding: 6,
      borderRadius: 6,
      marginBottom: 8,
    },
    debugText: {
      color: "#6b7280",
      fontSize: 12,
    },
    listContent: {
      paddingBottom: 12,
    },
    columnWrapper: {
      marginBottom: CARD_MARGIN,
      flexWrap: 'wrap',
      flexDirection: 'column',
      gap: CARD_MARGIN,
    },
    card: {
      width: "100%",
      height: 200,
      borderRadius: 10,
      borderWidth: 2,
      overflow: "hidden",
      backgroundColor: "#fff",
    },
    cardInner: {
      paddingBottom: 12,
      position: "relative",
    },
    cardDefault: {
      borderColor: "#e5e7eb",
    },
    cardSelected: {
      borderColor: "#7c3aed",
      backgroundColor: "#fbf7ff",
    },
    cardDisabled: {
      opacity: 0.55,
      backgroundColor: "#f8fafc",
    },
    image: {
      width: "100%",
      height: 110,
      backgroundColor: "#f3f4f6",
    },
    cardContent: {
      paddingHorizontal: 10,
      paddingTop: 8,
    },
    variationName: {
      fontSize: 13,
      fontWeight: "600",
      color: "#111827",
    },
    attributesWrap: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 6,
      marginTop: 6,
    },
    badge: {
      backgroundColor: "#eef2ff",
      paddingVertical: 4,
      paddingHorizontal: 6,
      borderRadius: 12,
      marginRight: 6,
      marginBottom: 6,
    },
    badgeText: {
      fontSize: 11,
      color: "#3730a3",
    },
    rowSpace: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 8,
    },
    priceText: {
      fontWeight: "700",
      color: "#9f0e42",
      fontSize: 14,
    },
    strikedPrice: {
      fontSize: 11,
      color: "#6b7280",
      textDecorationLine: "line-through",
    },
    stockBadge: {
      backgroundColor: "#ecfdf5",
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 10,
    },
    stockBadgeDestructive: {
      backgroundColor: "#fee2e2",
    },
    stockText: {
      color: "#065f46",
      fontSize: 11,
    },
    lowStockText: {
      color: "#c2410c",
      marginTop: 6,
      fontSize: 12,
    },
    checkWrapper: {
      position: "absolute",
      top: 8,
      right: 8,
      backgroundColor: "#7c3aed",
      width: 28,
      height: 28,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
    },
    summaryCard: {
      marginTop: 12,
      padding: 12,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "#ede9fe",
      backgroundColor: "#fbf7ff",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    summaryLeft: {
      flex: 1,
    },
    summaryTitle: {
      fontWeight: "600",
      marginBottom: 6,
    },
    selectedAttributes: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 6,
    },
    outlineBadge: {
      borderWidth: 1,
      borderColor: "#e6e6f0",
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 10,
      marginRight: 6,
      marginBottom: 6,
    },
    outlineBadgeText: {
      fontSize: 11,
      color: "#374151",
    },
    summaryRight: {
      justifyContent: "center",
      alignItems: "flex-end",
      marginLeft: 12,
    },
    summaryPrice: {
      fontSize: 16,
      fontWeight: "700",
      color: "#9f0e42",
    },
  });
