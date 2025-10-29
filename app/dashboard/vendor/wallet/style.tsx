import { Colors } from "@/constants/Colors";
import { StyleSheet } from "react-native";

export const WalletStyles = (colorScheme: "light" | "dark") =>
  StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "7%",
  },
  container: { flex: 1, backgroundColor: Colors[colorScheme].background,  paddingTop: "7%", },
  balanceContainer: {
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 24,
    paddingTop: "7%",
  },
  balanceCard: { backgroundColor: "#000", borderRadius: 12, padding: 20 },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    backgroundColor: "#000",
  },
  cardTitle: { color: "#fff", fontSize: 14, fontWeight: "600" },
  switchCircle: {
    width: 18,
    height: 18,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  balanceAmount: {
    color: "#FFF",
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 20,
  },
  withdrawalButton: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
  },
  withdrawalButtonText: { color: "#000", fontSize: 16, fontWeight: "600" },
  balanceCardLight: {
    // backgroundColor: "#EFEFEF",
    borderRadius: 12,
    padding: 16,
    height: 120,
    backgroundColor: Colors[colorScheme].background,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitleLight: { fontSize: 14, fontWeight: "600", },
  balanceAmountLight: {
    fontSize: 24,
    fontWeight: "700",
    color: "#000",
    marginTop: 8,
  },
  totalBalanceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
   
  },
  transactionSection: {  marginHorizontal:16 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
    marginBottom: 16,
  },
  tabsContainer: { flexDirection: "row", gap: 8, marginBottom: 16 },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E91E63",
    backgroundColor: "#fff",
  },
  activeTab: { backgroundColor: "#E91E63" },
  tabText: { color: "#E91E63", fontWeight: "600", fontSize: 14 },
  activeTabText: { color: "#FFF" },
  empty: { textAlign: "center", color: "#777", marginTop: 16 },
});
