import { Dimensions, StyleSheet } from "react-native";
const { width, height } = Dimensions.get("window")

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff",  paddingTop: "4%", },
  scrollArea: { flex: 1, paddingHorizontal: width * 0.05 },
  titleSection: { marginTop: height * 0.01, marginBottom: height * 0.04,paddingHorizontal: width * 0.05  },
  title: { fontSize: 22, fontWeight: "700", color: "#000", marginBottom: 6 },
  subtitle: { fontSize: 14, color: "#666", lineHeight: 20 },

  // Storage
  storageCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: width * 0.05,
    marginBottom: height * 0.02,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  storageTitle: { fontSize: 16, fontWeight: "600", color: "#000", marginBottom: 8 },
  storageRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 4 },
  storageLabel: { fontSize: 14, color: "#666" },
  storageValue: { fontSize: 14, fontWeight: "600", color: "#000" },
  progressBarContainer: {
    height: 6,
    backgroundColor: "#e0e0e0",
    borderRadius: 4,
    overflow: "hidden",
    marginVertical: 8,
  },
  progressBar: { height: "100%", backgroundColor: "#3b82f6" },
  storageNote: { fontSize: 12, color: "#999", textAlign: "right" },

  // Controls
  controlsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: height * 0.02,
  },
  viewToggle: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 4,
  },
  toggleButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.012,
    borderRadius: 6,
    gap: 6,
  },
  toggleButtonActive: { backgroundColor: "#a91d3a" },
  toggleText: { fontSize: 14, fontWeight: "500", color: "#000" },
  toggleTextActive: { color: "#fff" },
  refreshButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
  },

  // Search
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    paddingHorizontal: width * 0.04,
    marginBottom: height * 0.02,
  },
  searchInput: { flex: 1, paddingVertical: height * 0.015, fontSize: 14, color: "#000" },
  searchButton: { padding: 6 },

  // Upload
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#a91d3a",
    paddingVertical: height * 0.015,
    borderRadius: 8,
    marginBottom: height * 0.02,
    gap: 8,
    paddingHorizontal:width * 0.05,
    width:"50%"
  },
  uploadButtonEmpty: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#a91d3a",
    paddingVertical: height * 0.015,
    borderRadius: 8,
    marginBottom: height * 0.02,
    gap: 8,
    paddingHorizontal:width * 0.10,
    marginTop:10
  },
  uploadButtonText: { fontSize: 14, fontWeight: "600", color: "#fff" },

  // Grid & List
  mediaGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginBottom: height * 0.02, },
  mediaItem: {
    width: (width - width * 0.1 - 12) / 2,
    aspectRatio: 1,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#f5f5f5",
  },
  mediaImage: { width: "100%", height: "100%" },
  mediaList: { marginBottom: height * 0.02 },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    justifyContent: "space-between",
  },
  listImage: { width: 60, height: 60, borderRadius: 8 },
  listTextContainer: { flex: 1, marginLeft: 12 },
  listTitle: { fontSize: 14, fontWeight: "600", color: "#000" },
  listSubtitle: { fontSize: 12, color: "#777" },
  listFileSize: { fontSize: 11, color: "#999", marginTop: 4 },

  // Pagination
  pagination: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: height * 0.02,
  },
  paginationText: { fontSize: 14, color: "#666" },
  paginationButtons: { flexDirection: "row", gap: 8 },
  paginationButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 6,
  },

  paginationButtonDisabled: { opacity: 0.5 },
  actionIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  iconButton: {
    padding: 6,
    borderRadius: 6,
    backgroundColor: "#f5f5f5",
  },
})
