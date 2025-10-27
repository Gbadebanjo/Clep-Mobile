import { StyleSheet } from "react-native";


export const TagFieldsStyles = (colorScheme: "light" | "dark") =>
    StyleSheet.create({
    card: {
    marginBottom:10,  
      paddingHorizontal:16
    },
    innerCard:{
      borderWidth: 1,
      borderColor: "#848484",
      borderRadius: 12,
      padding:16,
    },
    title: {
      fontSize: 18,
      fontWeight: '600',
      color: '#111',
      marginBottom: 4,
    },
    description: {
      fontSize: 14,
      color: '#666',
      marginBottom: 12,
    },
    tagsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: 12,
  
      borderRadius: 12,
      padding:10
    },
    tag: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#F2F3F5',
      paddingVertical: 6,
      paddingHorizontal:5,
      borderRadius: 16,
      marginRight: 8,
      marginBottom: 8,
    },
    tagText: {
      fontSize: 14,
      color: '#333',
    },
    removeBtn: {
      marginLeft: 6,
    },
    inputRow: {
      flexDirection: 'row',
      gap: 8,
    },
    input: {
      flex: 1,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 8,
      fontSize: 15,
    },
    addButton: {
      backgroundColor: '#6B0C2D',
      paddingHorizontal: 14,
      justifyContent: 'center',
      borderRadius: 8,
    },
    addButtonText: {
      color: '#fff',
      fontSize: 15,
      fontWeight: '500',
    },
    helperText: {
      fontSize: 12,
      color: '#888',
      marginTop: 6,
    },
    errorText: {
      color: 'red',
      fontSize: 13,
      marginTop: 6,
    },
  });