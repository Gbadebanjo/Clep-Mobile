import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF", padding: 16 },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    minHeight: 400,
    width:`100%`,
  },
  title: { fontSize: 20, fontWeight: "700", color: "#000", marginBottom: 16 },

  tabsContainer: { flexDirection: "row", gap: 12, marginBottom: 20 },
  tab: { borderBottomWidth: 2, borderBottomColor: "transparent", paddingVertical: 6 },
  activeTab: { borderBottomColor: "#E91E63" },
  tabText: { fontSize: 14, fontWeight: "500", color: "#777" },
  activeTabText: { color: "#E91E63", fontWeight: "600" },

  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },
  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#eee",
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 8,
    color: "#000",
  },
  iconButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
  },
  iconButtonText: { marginLeft: 4, fontSize: 13, color: "#333" },

  table: { minWidth: 950 },
  tableHeader: { backgroundColor: "#f5f5f5" },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    alignItems: "center",
  },
  tableBodyRow: { backgroundColor: "#fff" },
  headerText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#333",
    paddingVertical: 10,
  },
  cell: {
    fontSize: 13,
    color: "#333",
    paddingVertical: 16,
  },
  emptyText: { fontSize: 16, color: "#999", textAlign: "left" },

  dateCol: { flex: 1.2, minWidth: 100, paddingHorizontal: 8 },
  nameCol: { flex: 1.4, minWidth: 120, paddingHorizontal: 8 },
  emailCol: { flex: 1.8, minWidth: 150, paddingHorizontal: 8 },
  itemsCol: { flex: 1, minWidth: 90, textAlign: "center", paddingHorizontal: 8 },
  paymentCol: { flex: 1.3, minWidth: 110, paddingHorizontal: 8 },
  totalCol: { flex: 1.2, minWidth: 100, paddingHorizontal: 8 },
  returnCol: { flex: 1, minWidth: 80, textAlign: "center", paddingHorizontal: 8 },
  statusCol: { flex: 1, minWidth: 100, textAlign: "center", paddingHorizontal: 8 },
  actionCol: {
    flex: 0.8,
    minWidth: 70,
    alignItems: "center",
    justifyContent: "center",
  },

  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    gap: 8,
  },
  pageBox: {
    minWidth: 32,
    height: 32,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#E91E63",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  activePageBox: {
    backgroundColor: "#E91E63",
  },
  disabledBox: {
    opacity: 0.5,
  },
  pageNumber: {
    fontSize: 14,
    fontWeight: "600",
    color: "#E91E63",
  },
  activePageNumber: {
    color: "#fff",
  },
  pageArrow: {
    fontSize: 18,
    color: "#E91E63",
    fontWeight: "bold",
  },
});
