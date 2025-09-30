import { Colors } from '@/constants/Colors';
import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

export const customerSignupStyles = (colorScheme: 'light' | 'dark') => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colorScheme === 'dark' ? '#000' : Colors[colorScheme].bgPrimary,
    },
    scrollContainer: {
      flexGrow: 1,
      paddingBottom: 0,
    },
    logoContainer: {
      alignItems: 'center',
      paddingTop: 60,
      paddingBottom: 30,
    },
    logo: {
      width: 120,
      height: 40,
    },
    topSignInContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginBottom: 30,
      marginRight: 20,
    },
    topSignInText: {
      fontSize: 14,
      color: Colors[colorScheme].primary800,
      fontWeight: '600',
    },
    content: {
      paddingHorizontal: 20,
      flex: 1,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      color: colorScheme === 'dark' ? '#fff' : '#000',
    },
    infoBox: {
      backgroundColor: '#FCE4EC',
      borderRadius: 8,
      padding: 15,
      marginBottom: 30,
    },
    infoText: {
      fontSize: 14,
      color: '#C2185B',
      marginBottom: 5,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 20,
      color: colorScheme === 'dark' ? '#fff' : '#000',
    },
    formContainer: {
      width: '100%',
    },
    errorText: {
      fontSize: 12,
      color: '#FF5722',
      marginTop: -15,
      marginBottom: 15,
    },
    passwordStrengthContainer: {
      marginTop: -15,
      marginBottom: 20,
    },
    passwordStrengthHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    passwordStrengthLabel: {
      fontSize: 14,
      color: '#666',
    },
    passwordStrengthValue: {
      fontSize: 14,
      fontWeight: '600',
    },
    passwordRequirements: {
      gap: 8,
    },
    requirementRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    requirementItem: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      flex: 1,
    },
    requirementText: {
      fontSize: 12,
    },
    createButton: {
      borderRadius: 25,
      paddingVertical: 16,
      alignItems: 'center',
      marginTop: 20,
      marginBottom: 20,
    },
    createButtonText: {
      fontSize: 16,
      fontWeight: '600',
    },
    termsContainer: {
      alignItems: 'center',
      marginBottom: 30,
    },
    termsText: {
      fontSize: 12,
      textAlign: 'center',
      color: colorScheme === 'dark' ? '#ccc' : '#666',
      lineHeight: 18,
    },
    termsLink: {
      color: Colors[colorScheme].primary800,
      fontWeight: '600',
    },
    haveAccountText: {
      fontSize: 14,
      color: colorScheme === 'dark' ? '#fff' : '#000',
    },
    bottomBanner: {
      height: 150,
      marginTop: 20,
    },
    bannerImage: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    bannerOverlay: {
      padding: 20,
      alignItems: 'center',
    },
    bannerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#fff',
      textAlign: 'center',
      marginBottom: 8,
    },
    bannerSubtitle: {
      fontSize: 14,
      color: '#fff',
      textAlign: 'center',
      lineHeight: 20,
    },
  });
};
