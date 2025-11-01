import { StyleSheet } from "react-native";
export const AdressBookCardStyles = (colorScheme: "light" | "dark") =>
  StyleSheet.create({
    card: {
      borderRadius: 10,
      width: '100%',
      marginBottom: 20,
      overflow: 'hidden',
    },
    defaultCard: {
      borderWidth: 2,
      borderColor: '#9f0e42',
    },
    normalCard: {
      borderWidth: 1,
      borderColor: '#ccc',
    },
    content: {
      padding: 20,
    },
    addressName: {
      fontSize: 18,
      fontWeight: '500',
      marginBottom: 10,
    },
    addressDetails: {
      marginTop: 10,
    },
    label: {
      fontWeight: '300',
      marginBottom: 4,
    },
    actionsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 20,
      borderTopWidth: 1,
      borderTopColor: '#ccc',
      backgroundColor: 'transparent',
      flexWrap: 'wrap',
    },
    defaultButton: {
      backgroundColor: '#000',
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 15,
    },
    defaultButtonText: {
      color: '#fff',
    },
    rightActions: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 20,
      marginTop:20
    },
    actionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 15,
    },
    actionButtonText: {
      color: '#fff',
      marginRight: 5,
    },
    editButton: {
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#ddd',
    },
    editButtonText: {
      color: '#000',
      marginRight: 5,
    },
    deleteButton: {
      backgroundColor: '#390518',
    },
  });