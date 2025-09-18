import { Colors } from '@/constants/Colors';
import { Dimensions, StyleSheet } from 'react-native';
const { width, height } = Dimensions.get('window');

export const sliderStyles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: Colors.light.background,
    paddingHorizontal: 0,
    paddingVertical: 60,
    height,
  },
  sliderContainer: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  slidesContainer: {
    flexDirection: 'row',
    width: width * 2,
    height: '100%',
  },
  slideContainer: {
    width,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  cardContainer: {
    width: '100%',
    height: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  imageSection: {
    width: '100%',
    height: '60%',
  },
  textSection: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: Colors.light.text,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
    color: Colors.light.text,
    opacity: 0.8,
  },
  actionButton: {
    backgroundColor: '#8B1538',
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 16,
    width: '100%',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationDotActive: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#8B1538',
    marginHorizontal: 4,
  },
  paginationDotInactive: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'rgba(139, 21, 56, 0.3)',
    marginHorizontal: 4,
  },
});
