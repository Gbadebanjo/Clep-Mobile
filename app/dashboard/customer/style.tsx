import { Dimensions, StyleSheet } from "react-native";
const { width } = Dimensions.get("window")



export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      paddingTop: "7%",
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: width * 0.05,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: "#f0f0f0",
    },
    logo: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    logoThemedText: {
      fontSize: 18,
      fontWeight: "700",
      letterSpacing: 1,
    },
    headerActions: {
      flexDirection: "row",
      gap: 16,
    },
    iconButton: {
      padding: 4,
    },
    content: {
      flex: 1,
    },
    contentContainer: {
      paddingHorizontal: width * 0.05,
      paddingBottom: 32,
    },
    welcomeSection: {
      backgroundColor: "#fff",
      paddingHorizontal: 20,
      paddingVertical: 2,
      marginBottom: 10,
      borderBottomWidth: 1,
      borderColor: "#848484",
      paddingBottom: 12,
    },
    welcomeTitle: {
      fontSize: 28,
      fontWeight: "700",
      color: "#000",
      marginBottom: 8,
    },
    welcomeSubtitle: {
      fontSize: 15,
      color: "#666",
      lineHeight: 22,
    },
    statsContainer: {
      gap: 16,
      marginBottom: 32,
    },
    statCard: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#f8f8f8",
      borderRadius: 12,
      padding: 20,
      borderWidth: 1,
      borderColor: "#f0f0f0",
    },
    statContent: {
      flex: 1,
    },
    statLabel: {
      fontSize: 14,
      color: "#666",
      marginBottom: 8,
    },
    statValue: {
      fontSize: 32,
      fontWeight: "700",
      color: "#000",
    },
    statIconContainer: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: "#fff",
      justifyContent: "center",
      alignItems: "center",
    },
    quickActionsSection: {
      gap: 16,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: "700",
      color: "#000",
      marginBottom: 8,
    },
    actionCard: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#f8f8f8",
      borderRadius: 12,
      padding: 20,
      gap: 16,
      borderWidth: 1,
      borderColor: "#f0f0f0",
    },
    actionIconContainer: {
      width: 48,
      height: 48,
      borderRadius: 24,
      backgroundColor: "#fff",
      justifyContent: "center",
      alignItems: "center",
    },
    actionContent: {
      flex: 1,
    },
    actionTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: "#000",
      marginBottom: 4,
    },
    actionSubtitle: {
      fontSize: 13,
      color: "#666",
      lineHeight: 18,
    },
  
  })