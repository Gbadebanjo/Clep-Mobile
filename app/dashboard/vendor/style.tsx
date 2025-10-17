import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: "5%",
    },
    scrollView: {
      flex: 1,
    },
    scrollContent: {
      paddingBottom: 40,
    },
    imageIcon: {
      width: 24,
      height: 24,
    },
    welcomeSection: {
      backgroundColor: "#fff",
      paddingHorizontal: 20,
      paddingVertical: 2,
      marginBottom: 10,
      borderBottomWidth: 1,
      borderColor: "#eee",
      paddingBottom: 12,
    },
    welcomeTitle: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 4,
    },
    welcomeSubtitle: {
      fontSize: 14,
      color: "#666",
      marginBottom: 16,
    },
    dateButton: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      paddingVertical: 10,
      paddingHorizontal: 16,
      backgroundColor: "#F5F5F5",
      borderRadius: 8,
      alignSelf: "flex-start",
    
    },
    dateButtonThemedText: {
      fontSize: 14,
      color: "#666",
    },
    statsContainer: {
      paddingHorizontal: 20,
      gap: 12,
      marginBottom: 16,
    },
    statCard: {
      borderRadius: 12,
      padding: 16,
      height: 120,
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: "#848484",
    },
    statCardContent: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    statCardLeft: {
      flex: 1,
    },
    statCardTitle: {
      fontSize: 14,
      color: "#707070",
      marginBottom: 4,
      fontWeight: "500",
    },
    statCardValue: {
      fontSize: 24,
      fontWeight: "bold",
    },
    statCardIcon: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      justifyContent: "center",
      alignItems: "center",
    },
    walletCard: {
      backgroundColor: "#000",
      marginHorizontal: 20,
      borderRadius: 12,
      padding: 20,
      marginBottom: 16,
    },
    walletContent: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    walletLabel: {
      fontSize: 14,
      color: "#fff",
      marginBottom: 4,
    },
    walletAmount: {
      fontSize: 28,
      fontWeight: "bold",
      color: "#fff",
    },
    section: {
      backgroundColor: "#fff",
      paddingHorizontal: 20,
      paddingVertical: 16,
      marginBottom: 16,
    },
    sectionHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: "600",
    },
    viewAllButton: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },
    viewAllThemedText: {
      fontSize: 14,
      color: "#6B0C2D",
      fontWeight: "500",
    },
    ordersList: {
      gap: 12,
    },
    orderItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 8,
    },
    orderItemLeft: {
      flex: 1,
    },
    orderItemId: {
      fontSize: 15,
      fontWeight: "600",
      marginBottom: 2,
    },
    orderItemDate: {
      fontSize: 13,
      color: "#666",
    },
    orderItemRight: {
      alignItems: "flex-end",
    },
    orderItemAmount: {
      fontSize: 15,
      fontWeight: "600",
      marginBottom: 2,
    },
    orderItemStatus: {
      fontSize: 13,
      color: "#2196F3",
    },
    productItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 8,
    },
    productName: {
      fontSize: 15,
      fontWeight: "500",
    },
    productSold: {
      fontSize: 14,
      color: "#4CAF50",
      fontWeight: "500",
    },
    insightsRow: {
      flexDirection: "row",
      gap: 32,
      marginTop: 12,
    },
    insightItem: {
      flex: 1,
      backgroundColor: "#F2F2F2",
      borderRadius: 10,
      flexDirection: "column",
      alignItems: "center",
      padding: 10,
    },
    insightLabel: {
      fontSize: 13,
      color: "#666",
      marginBottom: 4,
    },
    insightValue: {
      fontSize: 24,
      fontWeight: "bold",
    },
    card: {
      backgroundColor: "#FFF",
      borderColor: "#848484",
      borderWidth: 1,
      borderRadius: 10,
      paddingVertical: 22,
      paddingHorizontal: 32,
      marginVertical: 10,
      alignSelf: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginBottom: 16,
    },
    headerThemedText: {
      fontSize: 16,
      fontWeight: "600",
      color: "#000",
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginVertical: 6,
    },
    label: {
      fontSize: 14,
      color: "#000",
      fontWeight: "500",
    },
    value: {
      fontSize: 14,
      color: "#999",
    },
    progressContainer: {
      backgroundColor: "#E8F7FD",
      height: 8,
      borderRadius: 10,
      overflow: "hidden",
      marginVertical: 8,
    },
    progressFill: {
      height: "100%",
      backgroundColor: "#B3E5FC",
      borderRadius: 10,
    },
    fileCount: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    fileThemedText: {
      fontSize: 14,
      color: "#000",
      fontWeight: "500",
    },
    percentThemedText: {
      fontSize: 14,
      color: "#666",
    },
    manageButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: "#848484",
      borderRadius: 10,
      paddingVertical: 12,
      marginTop: 12,
      gap: 8,
    },
    manageThemedText: {
      fontSize: 14,
      fontWeight: "500",
      color: "#000",
    },
    bottomSpacer: {
      height: 32,
    },
  });