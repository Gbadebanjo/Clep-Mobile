import { StyleSheet } from "react-native";

export const KycStyles = (colorScheme: "light" | "dark") =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    headerSection: {
      marginBottom: 10,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 8,
      color: "#000",
    },
    description: {
      fontSize: 16,
      color: "#666",
    },
    statusSection: {
      marginBottom: 24,
      backgroundColor: "#fff",
      padding: 10,
      borderRadius: 8,
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
      borderWidth: 1,
      borderColor: "#ddd",
    },
    statusContainer: {
      paddingVertical: 8,
    },
    tierText: {
      fontSize: 14,
      color: "#666",
    },
    progressContainer: {
      marginTop: 12,
    },
    progressLabel: {
      fontSize: 14,
      color: "#666",
      marginBottom: 4,
    },
    progressValue: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#000",
    },
    selectContainer: {
      marginBottom: 24,
    },
    card: {
      backgroundColor: "#fff",
      borderRadius: 8,
      padding: 16,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: "#e5e5e5",
    },
    disabledCard: {
      opacity: 0.6,
    },
    cardHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 12,
    },
    cardTitle: {
      fontSize: 14,
      fontWeight: "bold",
      marginLeft: 6,
      color: "#000",
    },
    cardDescription: {
      fontSize: 14,
      color: "#666",
      marginBottom: 12,
    },
    verifiedBadge: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#dcfce7",
      padding: 12,
      borderRadius: 6,
    },
    verifiedText: {
      marginLeft: 8,
      color: "#16a34a",
      fontWeight: "600",
    },
    verifiedTextDec: {
      color: "gray",
    },
    formContainer: {
      backgroundColor: "#fff",
      borderRadius: 8,
      // padding: 16,
      marginBottom: 24,
    },
    pickerContainer: {
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 24,
      backgroundColor: "#fff",
      height: 44,
      justifyContent: "center",
      paddingHorizontal: 10,
      marginBottom: 10,
    },
  
    picker: {
      color: "#000",
      fontSize: 12,
      height: 44,
    },
  
    label: {
      fontSize: 14,
      fontWeight: "600",
      marginBottom: 8,
      color: "#000",
    },
    input: {
      borderWidth: 1,
      borderColor: "#d5d5d5",
      borderRadius: 20,
      padding: 12,
      fontSize: 14,
      marginBottom: 8,
      backgroundColor: "#fff",
    },
    disabledInput: {
      backgroundColor: "#f5f5f5",
      color: "#999",
    },
    helperText: {
      fontSize: 12,
      color: "#999",
      marginBottom: 12,
    },
    picker: {
      borderWidth: 1,
      borderColor: "#d5d5d5",
      borderRadius: 6,
      marginBottom: 12,
      backgroundColor: "#fff",
    },
    infoBox: {
      flexDirection: "row",
      backgroundColor: "#dbeafe",
      padding: 12,
      borderRadius: 6,
      marginBottom: 16,
    },
    infoText: {
      marginLeft: 12,
      fontSize: 13,
      color: "#1e40af",
      flex: 1,
    },
    warningBox: {
      flexDirection: "row",
      backgroundColor: "#fefce8",
      paddingVertical: 10,
      borderRadius: 6,
      paddingHorizontal: 6,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: "#fef08a",
    },
    warningText: {
      marginLeft: 4,
      fontSize: 10,
      color: "#a16207",
      flex: 1,
    },
    warningHead: {
      marginLeft: 4,
      fontSize: 11,
      fontWeight: "600",
      color: "#a16207",
      flex: 1,
    },
    buttonGroup: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 16,
      gap: 12,
    },
    button: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#9f0e42",
      padding: 12,
      borderRadius: 6,
      flex: 1,
      gap: 8,
    },
    secondaryButton: {
      backgroundColor: "#fff",
      borderWidth: 1,
      borderColor: "#ddd",
    },
    disabledButton: {
      opacity: 0.5,
    },
    buttonText: {
      color: "#000",
      fontWeight: "600",
      fontSize: 14,
    },
    summaryBox: {
      backgroundColor: "#f9f9f9",
      borderWidth: 1,
      borderColor: "#e5e5e5",
      borderRadius: 6,
      padding: 16,
      marginBottom: 16,
    },
    summaryHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 12,
    },
    summaryTitle: {
      fontSize: 16,
      fontWeight: "bold",
      marginLeft: 8,
      color: "#000",
    },
    summaryContent: {
      gap: 12,
    },
    summaryRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: "#e5e5e5",
    },
    summaryLabel: {
      fontSize: 13,
      color: "#666",
    },
    summaryValue: {
      fontSize: 13,
      fontWeight: "600",
      color: "#000",
    },
    errorText: {
      color: "red",
      fontSize: 12,
      marginTop: 4,
    },
  })