import { StyleSheet, useColorScheme } from "react-native";
  const colorScheme = useColorScheme()
  const isDark = colorScheme === "dark"
export const AccountInfoStyles = () =>
    
  StyleSheet.create({
    container: {
      flex: 1,
    //   backgroundColor: isDark ? "#1a1a1a" : "#f9fafb",
    },
    scrollContent: {
    //   padding: 16,
    },
    card: {
      backgroundColor: isDark ? "#262626" : "#ffffff",
      borderRadius: 12,
      padding: 6,
      marginBottom: 16,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
      borderWidth:1,
      borderColor:"#ddd"
    },
    wcard:{
        flexDirection: "row",
        backgroundColor: "#eff6ff",
        paddingVertical: 10,
        borderRadius: 6,
        paddingHorizontal: 6,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#bfdbfe",
    },
    cardHeader: {
      marginBottom: 12,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: isDark ? "#ffffff" : "#000000",
      marginBottom: 4,
    },
    cardDescription: {
      fontSize: 12,
      color: isDark ? "#a0aec0" : "#6b7280",
    },
    alertBox: {
        flexDirection: "row",
        backgroundColor: "#fefce8",
        paddingVertical: 10,
        borderRadius: 6,
        paddingHorizontal: 6,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#fef08a",
    },
    alertIcon: {
      marginRight: 12,
      marginTop: 2,
    },
    alertText: {
      flex: 1,
    },
    alertTextBold: {
      color: isDark ? "#fef3c7" : "#92400e",
      fontWeight: "600",
      fontSize: 14,
      marginBottom: 4,
    },
    alertTextRegular: {
      color: isDark ? "#fef3c7" : "#92400e",
      fontSize: 13,
    },
    blueAlert: {
      backgroundColor: isDark ? "#1e3a8a" : "#dbeafe",
      borderLeftColor: "#3b82f6",
    },
    blueAlertIcon: {
      color: "#3b82f6",
    },
    blueAlertText: {
      color: isDark ? "#93c5fd" : "#1e40af",
    },
    commissionBox: {
      flexDirection: "row",
      backgroundColor: isDark ? "#262626" : "#ffffff",
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
         borderWidth:1,
      borderColor:"#ddd"
    },
    commissionIcon: {
      marginRight: 16,
      marginTop: 4,
    },
    commissionContent: {
      flex: 1,
      
    },
    commissionTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: "#9f0e42",
      marginBottom: 8,
    },
    commissionText: {
      fontSize: 14,
      color: isDark ? "#a0aec0" : "#6b7280",
      lineHeight: 20,
    },
    formContainer: {
      marginTop: 12,
    },
    formGroup: {
      marginBottom: 16,
    },
    label: {
      fontSize: 14,
      fontWeight: "600",
      color: isDark ? "#ffffff" : "#000000",
      marginBottom: 8,
    },
    input: {
      backgroundColor: isDark ? "#1f2937" : "#f3f4f6",
      borderRadius: 8,
      padding: 12,
      fontSize: 14,
      color: isDark ? "#ffffff" : "#000000",
      borderWidth: 1,
      borderColor: isDark ? "#374151" : "#e5e7eb",
    },
    pickerContainer: {
      backgroundColor: isDark ? "#1f2937" : "#f3f4f6",
      borderRadius: 8,
      borderWidth: 1,
      borderColor: isDark ? "#374151" : "#e5e7eb",
      overflow: "hidden",
    },
    picker: {
      color: isDark ? "#ffffff" : "#000000",
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "flex-end",
      gap: 12,
      marginTop: 20,
    },
    button: {
      backgroundColor: "#9f0e42",
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 8,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
    },
    buttonDisabled: {
      opacity: 0.5,
    },
    buttonText: {
      color: "#ffffff",
      fontSize: 14,
      fontWeight: "600",
    },
    updateButton: {
      backgroundColor: "#9f0e42",
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 6,
    },
    updateButtonText: {
      color: "#ffffff",
      fontSize: 13,
      fontWeight: "600",
    },
    bankDetailContainer: {
      marginTop: 16,
    },
    bankDetailHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 12,
    },
    bankDetailTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: isDark ? "#ffffff" : "#000000",
      flexDirection: "row",
      alignItems: "center",
    },
    bankDetailBox: {
      backgroundColor: isDark ? "#1f2937" : "#f3f4f6",
      borderRadius: 8,
      padding: 15,
    },
    bankDetailRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 12,
      paddingBottom: 12,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? "#374151" : "#e5e7eb",
      
    },
    bankDetailRowLast: {
      borderBottomWidth: 0,
      marginBottom: 0,
      paddingBottom: 0,
    },
    bankDetailLabel: {
      fontSize: 12,
      color: isDark ? "#9ca3af" : "#6b7280",
      fontWeight: "500",
      marginLeft:10
    },
    bankDetailValue: {
      fontSize: 14,
      color: isDark ? "#ffffff" : "#000000",
      fontWeight: "500",
      marginTop: 4,
    },
    loadingOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: isDark ? "rgba(0, 0, 0, 0.7)" : "rgba(255, 255, 255, 0.9)",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 12,
      zIndex: 10,
    },
    spinnerContainer: {
      alignItems: "center",
    },
    spinnerText: {
      marginTop: 12,
      fontSize: 16,
      fontWeight: "600",
      color: isDark ? "#ffffff" : "#000000",
    },
  })