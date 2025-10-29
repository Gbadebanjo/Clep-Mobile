import { StyleSheet } from "react-native";
export const AdvertComponentStyles = (colorScheme: "light" | "dark") =>
  StyleSheet.create({
  container: {
    flex: 1,

  },
  header: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 16,
  },
  card: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  imageBox: {
    width: "100%",
    aspectRatio: 7 / 4,
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  imagePlaceholder: {
    borderStyle: "dashed",
    backgroundColor: "#f9fafb",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderContent: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  placeholderText: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 6,
  },
  recommendText: {
    fontSize: 12,
    color: "#9ca3af",
    marginTop: 4,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginTop: 6,
    fontSize: 14,
    color: "#000",
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 12,
  },
  switchLabel: {
    marginLeft: 8,
    fontSize: 14,
    color: "#000",
  },
  saveBtn: {
    backgroundColor: "#111",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  saveBtnText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
  },
  changeBtn: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
  },
  changeBtnText: {
    color: "#333",
    fontSize: 14,
    fontWeight: "500",
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    backgroundColor: "#fff",
  },
  checkboxChecked: {
    backgroundColor: "#111", 
    borderColor: "#111",
  },
  checkboxLabel: {
    fontSize: 14,
    color: "#000",
  },
  removeBtn: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: "#f87171",
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: "center",
    backgroundColor: "#fee2e2",
  },
  removeBtnText: {
    color: "#b91c1c",
    fontSize: 14,
    fontWeight: "500",
  },
  
  
});