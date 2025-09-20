import { Colors } from '@/constants/Colors';
import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

export const vendorSignupStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 40,
  },
  scrollContainer: {
    flexGrow: 1,
  },

  dashboardContainer: {
    height: 200,
    marginHorizontal: 0,
    marginBottom: 30,
    borderRadius: 0,
    overflow: 'hidden',
  },
  dashboardImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },

  statsCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 12,
    padding: 15,
    alignSelf: 'flex-start',
  },
  statsNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  statsLabel: {
    fontSize: 12,
    color: '#747778',
  },
  content: {
    paddingHorizontal: 20,
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
    marginBottom: 30,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 40,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    marginBottom: 20,
    color: '#000',
  },
  passwordContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  passwordInput: {
    backgroundColor: '#F5F5F5',
    borderRadius: 40,
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingRight: 50,
    fontSize: 16,
    color: '#000',
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
    top: 18,
  },
  uploadSection: {
    marginBottom: 30,
  },
  uploadHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  uploadLabel: {
    fontSize: 20,
    fontWeight: '700',
  },
  optionalBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  optionalText: {
    fontSize: 14,
    color: '#747778',
  },
  uploadArea: {
    backgroundColor: '#faf9faff',
    borderRadius: 40,
    borderWidth: 0,
    borderColor: '#',
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    gap: 12,
  },
  uploadText: {
    fontSize: 14,
    color: '#747778',
    textAlign: 'center',
  },
  browseButton: {
    backgroundColor: '#ece6e8ff',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderColor: '#000',
    borderWidth: 1,
    textAlign: 'center',
  },
  browseButtonText: {
    color: Colors.light.primary800,
    fontSize: 14,
    fontWeight: '700',
  },
  nextButton: {
    borderRadius: 40,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  previousButton: {
    backgroundColor: 'transparent',
    borderRadius: 40,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
    borderColor: '#000',
    borderWidth: 1,
    width: '50%',
  },
  generalButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: 10,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  previousButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  haveAccountText: {
    fontSize: 14,
    fontWeight: '700',
  },
  signInText: {
    fontSize: 14,
    color: Colors.light.primary800,
    fontWeight: '700',
  },
});
