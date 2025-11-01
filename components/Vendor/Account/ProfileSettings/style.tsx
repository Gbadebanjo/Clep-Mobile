import { StyleSheet } from "react-native";


export const ProfileSettingStyles = (colorScheme: "light" | "dark") =>
    StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f8f9fa",
    },
    content: {
      // padding: 16,
    },
    profileSection: {
      alignItems: "center",
      backgroundColor: "#fff",
      padding: 20,
      borderRadius: 12,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: "#e0e0e0",
    },
    profileImage: {
      width: 100,
      height: 100,
      borderRadius: 50,
      marginBottom: 12,
    },
    profileImagePlaceholder: {
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: "#f0f0f0",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 12,
    },
    uploadButton: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#9f0e42",
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 8,
      marginBottom: 8,
      gap: 8,
    },
    uploadButtonText: {
      color: "#fff",
      fontSize: 14,
      fontWeight: "600",
    },
    uploadHint: {
      fontSize: 12,
      color: "#999",
      marginTop: 8,
    },
    section: {
      backgroundColor: "#fff",
      borderRadius: 12,
      padding: 16,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: "#e0e0e0",
    },
    sectionHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 16,
      gap: 8,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: "#000",
    },
    formGroup: {
      marginBottom: 16,
    },
    label: {
      fontSize: 14,
      fontWeight: "500",
      color: "#333",
      marginBottom: 6,
    },
    input: {
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 24,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: 14,
      color: "#000",
      backgroundColor: "#fff",
    },
    disabledInput: {
      backgroundColor: "#f5f5f5",
      color: "#999",
    },
    multilineInput: {
      textAlignVertical: "top",
      paddingTop: 12,
    },
    errorText: {
      fontSize: 12,
      color: "#dc3545",
      marginTop: 4,
    },
    row: {
      flexDirection: "row",
      gap: 12,
    },
    flex1: {
      flex: 1,
    },
    button: {
      backgroundColor: "#9f0e42",
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 12,
      flexDirection: "row",
      gap: 8,
    },
    buttonDisabled: {
      opacity: 0.6,
    },
    buttonText: {
      color: "#fff",
      fontSize: 14,
      fontWeight: "600",
    },
    pickerContainer: {
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 24,
      backgroundColor: "#fff",
      height: 44,
      justifyContent: "center",
    },
    picker: {
      fontSize: 11,
      color: "#000",
      textAlign: "center",
      height: 80,
    },
  })