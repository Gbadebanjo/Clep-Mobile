import { StyleSheet } from "react-native";


 export const styles = StyleSheet.create({
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center',   paddingTop: "5%", },
  container: { flex: 1, backgroundColor: '#FAFAFA',  paddingTop: "5%",   },
  balanceContainer: { paddingHorizontal: 16, gap: 12, marginBottom: 24,  paddingTop: "5%", },
  balanceCard: { backgroundColor: '#000', borderRadius: 12, padding: 20 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  cardTitle: { color: '#FFF', fontSize: 14, fontWeight: '600' },
  switchCircle: { width: 18, height: 18, borderRadius: 5, backgroundColor: '#fff' },
  balanceAmount: { color: '#FFF', fontSize: 32, fontWeight: '700', marginBottom: 20 },
  withdrawalButton: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  withdrawalButtonText: { color: '#000', fontSize: 16, fontWeight: '600' },
  balanceCardLight: { backgroundColor: '#fff', borderRadius: 12, padding: 16, height: 120 },
  cardTitleLight: { fontSize: 14, fontWeight: '600', color: '#fff' },
  balanceAmountLight: { fontSize: 24, fontWeight: '700', color: '#000', marginTop: 8 },
  totalBalanceHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  transactionSection: { marginTop: 20 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#000', marginBottom: 16 },
  tabsContainer: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E91E63',
    backgroundColor: '#fff',
  },
  activeTab: { backgroundColor: '#E91E63' },
  tabText: { color: '#E91E63', fontWeight: '600', fontSize: 14 },
  activeTabText: { color: '#FFF' },
  empty: { textAlign: 'center', color: '#777', marginTop: 16 },
});