import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

export const storeSetupStyles = (colorScheme: 'light' | 'dark') =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingBottom: 60,
    },
    gradientOverlay: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: height * 0.3,
      zIndex: 0,
    },
    scrollView: {
      flex: 1,
      zIndex: 1,
    },
    content: {
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 40,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      marginBottom: 16,
      textAlign: 'center',
      marginTop: 20,
    },
    subtitle: {
      fontSize: 16,
      lineHeight: 24,
      marginBottom: 40,
      textAlign: 'center',
    },
    formContainer: {
      width: '100%',
    },
    label: {
      fontSize: 16,
      fontWeight: '800',
      marginBottom: 12,
    },
    input: {
      backgroundColor: '#F5F5F5',
      borderRadius: 40,
      paddingHorizontal: 30,
      paddingVertical: 16,
      fontSize: 16,
      marginBottom: 24,
      color: '#000',
    },
    urlContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#F5F5F5',
      borderRadius: 40,
      marginBottom: 24,
      paddingHorizontal: 30,
      paddingVertical: 8,
    },
    urlPrefix: {
      fontSize: 16,
      color: '#747778',
      marginRight: 4,
    },
    urlInput: {
      flex: 1,
      fontSize: 16,
      color: '#000',
    },
    descriptionInput: {
      backgroundColor: '#F5F5F5',
      borderRadius: 40,
      paddingHorizontal: 20,
      paddingVertical: 16,
      fontSize: 16,
      marginBottom: 40,
      minHeight: 200,
    },
    customizeSection: {
      marginBottom: 40,
    },
    customizeTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
    },
    customizeOptions: {
      flexDirection: 'row',
      gap: 15,
      justifyContent: 'center',
      alignItems: 'center',
    },
    customizeButton: {
      flex: 1,
      backgroundColor: 'transparent',
      borderRadius: 25,
      paddingVertical: 12,
      alignItems: 'center',
      width: '100%',
      maxWidth: 100,
      borderColor: '#000',
      borderWidth: 1,
      textAlign: 'center',
    },
    customizeButtonActive: {
      backgroundColor: '#000',
      color: '#fff',
    },
    customizeButtonText: {
      fontSize: 16,
      fontWeight: '600',
    },
    customizeButtonTextActive: {
      color: '#fff',
    },
    buttonContainer: {
      flexDirection: 'row',
      gap: 15,
    },
    previousButton: {
      flex: 1,
      backgroundColor: 'transparent',
      borderRadius: 25,
      paddingVertical: 16,
      alignItems: 'center',
      borderColor: '#000',
      borderWidth: 1,
      width: '50%',
      textAlign: 'center',
    },
    previousButtonText: {
      fontSize: 16,
      fontWeight: '600',
    },
    nextButton: {
      flex: 1,
      borderRadius: 25,
      paddingVertical: 16,
      alignItems: 'center',
    },
    nextButtonText: {
      fontSize: 16,
      fontWeight: '600',
    },
    switchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 40,
    },
    switchLabel: {
      fontSize: 16,
      fontWeight: '600',
    },
  });
