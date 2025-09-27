import { useCartStore } from '@/store';
import { useCallback } from 'react';

export const useCart = () => {
  const {
    items,
    totals,
    isLoading,
    error,
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleItemSelection,
    selectAllItems,
    clearCart,
    clearSelectedItems,
    getCartItemCount,
    getSelectedItemCount,
    isItemInCart,
    getCartItem,
    calculateTotals,
    setLoading,
    setError,
  } = useCartStore();

  // Memoized functions for better performance
  const addProductToCart = useCallback((product: any, variation?: any, quantity = 1) => {
    addToCart(product, variation, quantity);
  }, [addToCart]);

  const removeItemFromCart = useCallback((itemId: string) => {
    removeFromCart(itemId);
  }, [removeFromCart]);

  const changeQuantity = useCallback((itemId: string, quantity: number) => {
    updateQuantity(itemId, quantity);
  }, [updateQuantity]);

  const toggleSelection = useCallback((itemId: string) => {
    toggleItemSelection(itemId);
  }, [toggleItemSelection]);

  // Helper functions
  const isEmpty = items.length === 0;
  const hasSelectedItems = totals.selectedItemCount > 0;
  const cartItemCount = getCartItemCount();
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
    cartItemCount,
    selectedItemCount,

    // Actions
    addProductToCart,
    removeItemFromCart,
    changeQuantity,
    toggleSelection,
    selectAllItems,
    clearCart,
    clearSelectedItems,

    // Utilities
    isItemInCart,
    getCartItem,
    getItemDiscount,
    isOnSale,
    calculateTotals,
    setLoading,
    setError,
  };
};