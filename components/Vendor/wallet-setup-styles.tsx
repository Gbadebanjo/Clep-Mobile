import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

export const walletSetupStyles = StyleSheet.create({
  container: {
    flex: 1,
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
  bankSelector: {
    backgroundColor: '#F5F5F5',
    borderRadius: 40,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  bankText: {
    fontSize: 16,
  },
  bankDropdown: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginTop: -20,
    marginBottom: 24,
    maxHeight: 200,
  },
  bankOption: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  bankOptionText: {
    fontSize: 16,
    color: '#000',
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 40,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    marginBottom: 24,
    color: '#000',
  },
  verificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E8',
    borderRadius: 49,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 40,
    gap: 8,
  },
  accountName: {
    fontSize: 16,

    fontWeight: '700',
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
    backgroundColor: '#000',
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  nextButtonDisabled: {
    backgroundColor: '#ccc',
  },
});
