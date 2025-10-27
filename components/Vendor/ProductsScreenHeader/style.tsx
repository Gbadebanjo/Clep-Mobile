import { StyleSheet } from "react-native";
// export const ProductsScreenStyles = (colorScheme: "light" | "dark") =>
//   StyleSheet.create({
//   container: {
//     backgroundColor: "#fff",
//     paddingHorizontal: 16,
//     paddingVertical: 14,
//   },
//   headerRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: "700",
//     color: "#111827",
//   },
//   actionsRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 10,
//   },
//   exportButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#FDF2F8",
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 8,
//   },
//   exportText: {
//     marginLeft: 6,
//     fontSize: 13,
//     color: "#BE185D",
//     fontWeight: "600",
//   },
//   addButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#000",
//     paddingHorizontal: 14,
//     paddingVertical: 6,
//     borderRadius: 8,
//   },
//   addText: {
//     marginLeft: 6,
//     fontSize: 13,
//     color: "#fff",
//     fontWeight: "600",
//   },
//   tabsContainer: {
//     flexDirection: "row",
//     marginTop: 16,
//     gap: 22,
//   },
//   tabWrapper: {
//     alignItems: "center",
//   },
//   tabText: {
//     fontSize: 14,
//     color: "#6B7280",
//     fontWeight: "500",
//   },
//   tabTextActive: {
//     color: "#BE185D",
//     fontWeight: "700",
//   },
//   activeUnderline: {
//     height: 2,
//     width: "100%",
//     backgroundColor: "#BE185D",
//     marginTop: 4,
//     borderRadius: 2,
//   },
//   searchRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginTop: 16,
//     gap: 10,
//   },
//   searchBox: {
//     flex: 1,
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#F3F4F6",
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     height: 36,
//   },
//   searchInput: {
//     flex: 1,
//     color: "#111827",
//     fontSize: 14,
//     paddingVertical: 2,
//   },
//   iconButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#E5E7EB",
//     paddingVertical: 6,
//     paddingHorizontal: 10,
//     borderRadius: 8,
//   },
//   iconButtonText: {
//     marginLeft: 6,
//     fontSize: 13,
//     color: "#333",
//   },
// });

export const ProductsScreenStyles = (colorScheme: "light" | "dark") =>
  StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    // paddingTop: 16,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop:10
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 8,
  },
  exportButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FDF2F8",
    borderWidth: 1,
    borderColor: "#FBCFE8",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  exportText: {
    color: "#DB2777",
    fontWeight: "600",
    fontSize: 13,
    marginLeft: 4,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  addText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 13,
    marginLeft: 4,
  },
  tabsContainer: {
    flexDirection: "row",
    marginTop: 16,
    gap: 18,
  },
  tabButton: {
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
  filterRow: {
    flexDirection: "row",
    marginTop: 16,
    gap: 10,
    alignItems: "center",
  },
  searchBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 10,
    paddingHorizontal: 3,
    // paddingVertical: 1,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    height:36
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: "#111827",
  },
  datePicker: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  dateText: {
    marginLeft: 6,
    fontSize: 13,
    color: "#374151",
  },
});