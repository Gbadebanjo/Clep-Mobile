import { StyleSheet } from "react-native";


export const AddProductsStyles = (colorScheme: "light" | "dark") =>
    StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", paddingTop: "4%" },
    scrollView: { flex: 1 },
    card:{
      backgroundColor: "#fff",
      borderWidth: 1,
      borderColor: "#eee",
      borderRadius: 12,
      padding:16
    },
    section: {
    //   marginBottom:10,  
      paddingHorizontal:16,
    //   marginTop:15
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "600",
      color: "#000",
      marginBottom: 8,
    },
    formGroup: { marginBottom: 16 },
    label: { fontSize: 14, fontWeight: "500", color: "#000", marginBottom: 8 },
    input: {
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 15,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: 14,
      color: "#000",
      backgroundColor: "#f9f9f9",
    },
    textArea: { minHeight: 100, textAlignVertical: "top" },
    inputError: { borderColor: "#ff4444" },
    errorText: { color: "#ff4444", fontSize: 12, marginTop: 4 },
    actionButtons: { margin: 16, gap: 12 },
    previewButton: {
      borderWidth: 1,
      borderColor: "#ddd",
      paddingVertical: 12,
      alignItems: "center",
      borderRadius: 6,
      width:"40%",
    
      flexDirection: "row",       
    
      justifyContent: "center",
      backgroundColor: "#f3f3f3",
    
      marginLeft: 8,
  
      
    },
    previewBtn: {
    flexDirection:"row",
    
      justifyContent:"flex-end"
      
    },
    previewButtonText: { fontWeight: "600", color: "#000" },
    createButton: {
      backgroundColor: "#6B0C2D",
      paddingVertical: 14,
      borderRadius: 6,
      alignItems: "center",
    },
    createButtonText: { fontSize: 16, fontWeight: "600", color: "#fff" },
  });