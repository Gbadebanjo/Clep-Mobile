import { Colors } from '@/constants/Colors';
import { StyleSheet } from 'react-native';

export const settingsStyles = (colorScheme: 'light' | 'dark') =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollContainer: {
      paddingTop: 20,
      paddingHorizontal: 16,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      marginBottom: 24,
    },
    section: {
      marginBottom: 24,
      borderWidth: 1,
      borderColor: Colors[colorScheme].border,
      borderRadius: 12,
      overflow: 'hidden',
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 16,
      paddingHorizontal: 16,
      backgroundColor: 'transparent',
      borderBottomWidth: 1,
      borderBottomColor: Colors[colorScheme].border,
    },
    rowLabelContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    icon: {
      marginRight: 16,
    },
    rowLabel: {
      fontSize: 16,
    },
    logoutButton: {
      marginTop: 20,
      backgroundColor: Colors[colorScheme].primary600,
      padding: 16,
      borderRadius: 99,
      alignItems: 'center',
      marginBottom: 40,
    },
    logoutButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
  });
