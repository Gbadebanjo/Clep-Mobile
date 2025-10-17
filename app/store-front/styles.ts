import { StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";

export const VendorStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.light.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 16,
    color: "red",
  },
  goBackText: {
    marginTop: 10,
    color: "blue",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },
  storeName: {
    fontSize: 20,
    fontWeight: "700",
  },
  description: {
    textAlign: "center",
    color: "#666",
    marginTop: 6,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 10,
  },
  categoryCard: {
    backgroundColor: "#f1f1f1",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 14,
  },
  emptyText: {
    color: "#777",
    fontStyle: "italic",
  },
  productCard: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 6,
    borderRadius: 8,
    padding: 8,
    alignItems: "center",
    elevation: 2,
  },
  productImage: {
    width: "100%",
    height: 120,
    borderRadius: 6,
    marginBottom: 6,
  },
  productName: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  productPrice: {
    color: "#000",
    fontWeight: "600",
    marginTop: 4,
  },
});
