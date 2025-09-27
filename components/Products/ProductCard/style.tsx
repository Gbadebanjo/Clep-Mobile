import { Colors } from '@/constants/Colors';
import { StyleSheet } from 'react-native';

export const ProductCardStyles = StyleSheet.create({
  cardContainer: {
    backgroundColor: Colors.light.background,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 3,
  },
  imageContainer: {
    width: '100%',
    aspectRatio: 1,
    position: 'relative',
    backgroundColor: '#f3f4f6',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  actionButtons: {
    position: 'absolute',
    top: 10,
    right: 10,
    gap: 8,
    flexDirection: 'column',
  },
  iconButton: {
    padding: 8,
    backgroundColor: Colors.light.background,
    borderRadius: 20,
    elevation: 3,
  },
  badge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: Colors.light.primary700,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  badgeText: {
    color: Colors.light.background,
    fontSize: 10,
    fontWeight: '600',
  },
  infoContainer: {
    padding: 12,
    paddingHorizontal: 6,
  },
  productName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  storeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 6,
  },
  storeName: {
    fontSize: 12,
    color: Colors.light.primary700,

    flexShrink: 1,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  salePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  originalPrice: {
    fontSize: 14,
    color: '#6b7280',
    textDecorationLine: 'line-through',
  },
  cartButtonWrapper: {
    marginTop: 10,
  },
  outOfStock: {
    textAlign: 'center',
    color: Colors.light.primary700,
    fontWeight: 'bold',
  },
  addToCartButton: {
    flexDirection: 'row',
    backgroundColor: Colors.light.primary700,
    paddingVertical: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToCartText: {
    color: 'white',
    marginLeft: 8,
    fontWeight: '600',
  },
});
