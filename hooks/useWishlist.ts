import { useWishlistStore } from '@/store';
import { useCallback } from 'react';

export const useWishlist = () => {
  const {
    items,
    totals,
    isLoading,
    error,
    addToWishlist,
    removeFromWishlist,
    updateQuantity,
    toggleItemSelection,
    selectAllItems,
    clearWishlist,
    clearSelectedItems,
    getWishlistItemCount,
    getSelectedItemCount,
    isItemInWishlist,
    getWishlistItem,
    calculateTotals,
    setLoading,
    setError,
  } = useWishlistStore();

  // Memoized functions for better performance
  const addProductToWishlist = useCallback(
    (product: any, variation?: any, quantity = 1) => {
      addToWishlist(product, variation, quantity);
    },
    [addToWishlist]
  );

  const removeItemFromWishlist = useCallback(
    (itemId: string) => {
      removeFromWishlist(itemId);
    },
    [removeFromWishlist]
  );

  const changeQuantity = useCallback(
    (itemId: string, quantity: number) => {
      updateQuantity(itemId, quantity);
    },
    [updateQuantity]
  );

  const toggleSelection = useCallback(
    (itemId: string) => {
      toggleItemSelection(itemId);
    },
    [toggleItemSelection]
  );

  // Helper functions
  const isEmpty = items.length === 0;
  const hasSelectedItems = totals.selectedItemCount > 0;
  const wishlistItemCount = getWishlistItemCount();
  const selectedItemCount = getSelectedItemCount();

  const getItemDiscount = useCallback((item: any) => {
    const { product } = item;
    if (product.base_sale_price >= product.base_price) return 0;
    return Math.round(((product.base_price - product.base_sale_price) / product.base_price) * 100);
  }, []);

  const isOnSale = useCallback((item: any) => {
    return item.product.base_sale_price < item.product.base_price;
  }, []);

  return {
    // State
    items,
    totals,
    isLoading,
    error,
    isEmpty,
    hasSelectedItems,
    wishlistItemCount,
    selectedItemCount,

    // Actions
    addProductToWishlist,
    removeItemFromWishlist,
    changeQuantity,
    toggleSelection,
    selectAllItems,
    clearWishlist,
    clearSelectedItems,

    // Utilities
    isItemInWishlist,
    getWishlistItem,
    getItemDiscount,
    isOnSale,
    calculateTotals,
    setLoading,
    setError,
  };
};
