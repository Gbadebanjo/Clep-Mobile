import { StyleSheet } from "react-native";
export const OrderScreenStyles = (colorScheme: "light" | "dark") =>
  StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  actionsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  exportButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FDF2F8",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  exportText: {
    marginLeft: 6,
    fontSize: 13,
    color: "#BE185D",
    fontWeight: "600",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
  },
  addText: {
    marginLeft: 6,
    fontSize: 13,
    color: "#fff",
    fontWeight: "600",
  },
  tabsContainer: {
    flexDirection: "row",
    marginTop: 16,
    gap: 22,
  },
  tabWrapper: {
    alignItems: "center",
  },
  tabText: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
  tabTextActive: {
    color: "#BE185D",
    fontWeight: "700",
  },
  activeUnderline: {
    height: 2,
    width: "100%",
    backgroundColor: "#BE185D",
    marginTop: 4,
    borderRadius: 2,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    gap: 10,
  },
  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 36,
  },
  searchInput: {
    flex: 1,
    color: "#111827",
    fontSize: 14,
    paddingVertical: 2,
  },
  iconButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E5E7EB",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  iconButtonText: {
    marginLeft: 6,
    fontSize: 13,
    color: "#333",
  },
});