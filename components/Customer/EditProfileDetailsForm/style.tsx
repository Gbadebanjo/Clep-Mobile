import { StyleSheet } from "react-native";
export const EditProfileStyles = (colorScheme: "light" | "dark") =>
  StyleSheet.create({
    container: {
         borderWidth:1,
      borderColor:"#ddd",
      padding:12,
      borderRadius:12
 
    },
    inputContainer: {
      marginBottom: 16,
   
    },
    label: {
      fontSize: 14,
      fontWeight: "500",
      marginBottom: 6,
      color: "#333",
    },
    input: {
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 20,
      paddingVertical: 10,
      paddingHorizontal: 12,
      fontSize: 16,
      backgroundColor: "#fff",
    },
    disabledInput: {
      backgroundColor: "#f0f0f0",
      color: "#999",
    },
    button: {
      backgroundColor: "#000",
      paddingVertical: 16,
      borderRadius: 28,
      alignItems: "center",
      marginTop: 30,
    },
    buttonDisabled: {
      opacity: 0.6,
    },
    buttonText: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "600",
    },
  });