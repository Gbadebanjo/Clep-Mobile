import { Colors } from "@/constants/Colors";
import { Platform, StyleSheet } from "react-native";

export const cartStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
  },

  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  clearButton: {
    fontSize: 16,
    fontWeight: "600",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.light.primary800,
    color: "white",
  },

  // Empty state styles
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  emptyIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 60,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 32,
  },
  startShoppingButton: {
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 14,
    width: "100%",
    maxWidth: 300,
  },
  startShoppingText: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },

  totalsContainer: {
    padding: 16,

    borderRadius: 12,
    marginBottom: 20,
  },

  totalsTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
  totalsText: {
    fontSize: 16,
    marginBottom: 8,
  },

  // Cart with items styles
  scrollContainer: {
    flex: 1,
    marginBottom: 20,
  },
  checkoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    marginBottom: Platform.select({ ios: "13%", android: "0%" }),
    borderRadius: 8,
    gap: 8,
  },
  checkoutText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
