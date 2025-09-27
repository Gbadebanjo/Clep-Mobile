import { Colors } from '@/constants/Colors';
import { StyleSheet } from 'react-native';

export const wishItemStyles = (colorScheme: 'light' | 'dark') =>
  StyleSheet.create({
    container: {
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: Colors[colorScheme].border,
    },
    containerUnselected: {
      backgroundColor: Colors[colorScheme].primary200,
    },
    selectionButton: {
      marginRight: 12,
      paddingTop: 4,
    },

    cartContainer: {
      flexDirection: 'row',
    },
    imageContainer: {
      width: 80,
      height: 80,
      borderRadius: 8,
      backgroundColor: Colors[colorScheme].background,
      overflow: 'hidden',
      marginRight: 12,
    },
    image: {
      width: '100%',
      height: '100%',
    },
    contentContainer: {
      flex: 1,
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: 12,
    },
    productInfo: {
      flex: 1,
      marginRight: 12,
    },
    productName: {
      fontSize: 16,
      fontWeight: '800',
      marginBottom: 4,
    },
    storeName: {
      fontSize: 12,
      fontWeight: '600',
    },
    deleteButton: {
      padding: 4,
    },
    bottomRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
    priceContainer: {
      flex: 1,
    },
    salePrice: {
      fontSize: 18,
      fontWeight: '700',
      marginBottom: 4,
    },
    originalPriceRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    originalPrice: {
      fontSize: 14,
      textDecorationLine: 'line-through',
      color: Colors[colorScheme].textMuted,
    },
    discountBadge: {
      backgroundColor: Colors[colorScheme].primary800,
      paddingHorizontal: 7,
      paddingVertical: 3,
      borderRadius: 20,
    },
    discountText: {
      color: 'white',
      fontSize: 10,
      fontWeight: '600',
    },
    quantityContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    footerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 12,
    },
    quantityButton: {
      width: 32,
      height: 32,
      borderRadius: 6,

      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
    },
    quantityButtonDisabled: {
      backgroundColor: Colors[colorScheme].background,
      borderColor: Colors[colorScheme].background,
    },
    quantityText: {
      fontSize: 16,
      fontWeight: '600',
      minWidth: 20,
      textAlign: 'center',
    },
  });
