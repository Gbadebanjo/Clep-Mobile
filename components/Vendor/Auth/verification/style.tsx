import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

export const verificationStyles = (colorScheme: 'light' | 'dark') =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    scrollContainer: {
      flexGrow: 1,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingTop: 50,
      paddingBottom: 20,
      gap: 15,
    },
    searchContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#F5F5F5',
      borderRadius: 25,
      paddingHorizontal: 15,
      paddingVertical: 10,
      gap: 10,
    },
    searchInput: {
      flex: 1,
      fontSize: 14,
      color: '#000',
    },
    content: {
      paddingHorizontal: 20,
      paddingTop: 40,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      marginBottom: 16,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 16,
      lineHeight: 24,
      marginBottom: 40,
      textAlign: 'center',
    },
    codeContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 30,
      gap: 12,
    },
    codeInput: {
      flex: 1,
      height: 60,
      borderWidth: 2,
      borderColor: '#E5E5E5',
      borderRadius: 12,
      fontSize: 24,
      fontWeight: 'bold',
      color: '#000',
      maxWidth: 60,
      textAlign: 'center',
    },
    codeInputActive: {
      borderColor: '#E91E63',
    },
    resendText: {
      fontSize: 14,
      color: '#747778',
      marginBottom: 40,
    },
    verifyButton: {
      borderRadius: 25,
      paddingVertical: 16,
      alignItems: 'center',
      marginBottom: 20,
    },
    verifyButtonText: {
      fontSize: 16,
      fontWeight: '600',
    },
    resendContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    noEmailText: {
      fontSize: 14,
      color: '#747778',
    },
    resendLinkText: {
      fontSize: 14,
      fontWeight: '600',
      marginTop: -2,
    },
  });
