import { Colors } from '@/constants/Colors';
import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageSection: {
    width: '100%',
    height: height * 0.5,
    justifyContent: 'flex-end',
  },
  imageOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 30,
    paddingBottom: 40,
    height: '100%',
  },
  imageTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
    marginTop: 0.2 * height,
  },
  imageSubtitle: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
  },
  contentSection: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 40,
    paddingBottom: 50,
  },
  formContainer: {
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 16,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: '#F8F8F8',
  },
  forgotText: {
    textAlign: 'right',
    color: '#666',
    fontSize: 14,
    marginBottom: 40,
  },
  submitButton: {
    backgroundColor: Colors.light.primary800,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelText: {
    textAlign: 'center',

    fontSize: 16,
  },
});
