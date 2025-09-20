import { Colors } from '@/constants/Colors';
import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

export const planSelectionStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 60,
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.5,
    zIndex: 0,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    zIndex: 1,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 12,
    lineHeight: 38,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 40,
  },
  plansContainer: {
    paddingHorizontal: 20,
    gap: 20,
  },
  planCard: {
    width: width - 80,
    height: 320,
    borderRadius: 20,
    borderWidth: 2,
    padding: 24,
    marginRight: 20,
    justifyContent: 'space-between',
  },
  planHeader: {
    alignItems: 'center',
  },
  planTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  planSubtitle: {
    fontSize: 14,
  },
  planPricing: {
    alignItems: 'center',
    marginVertical: 20,
  },
  planPrice: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  planCommission: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.light.primary700,
  },
  planProgress: {
    alignItems: 'center',
    marginVertical: 20,
    marginTop: 2,
    marginBottom: 40,
  },
  progressBar: {
    width: '80%',
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
  },
  trialButton: {
    backgroundColor: Colors.light.primary700,
    borderRadius: 25,
    paddingVertical: 8,
    alignItems: 'center',
  },
  trialButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '800',
  },
  continueButton: {
    borderRadius: 25,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
