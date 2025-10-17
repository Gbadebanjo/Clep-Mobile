import { Category } from '@/types/category';
import { product } from '@/types/product';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

// Auth Store
interface AuthState {
  user: any | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: any) => Promise<void>;
  logout: () => void;
  setUser: (user: any) => void;
  setToken: (token: string) => void;
  setLoading: (loading: boolean) => void;
  resetEmail: string;
  setResetEmail: (resetEmail: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (credentials) => {
        set({ isLoading: true });
        try {
          // API call will be handled in the service layer
          // This is just the state management part
        } catch (error) {
          console.error('Login error:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      setUser: (user) => {
        set({ user, isAuthenticated: !!user });
      },

      setToken: (token) => {
        set({ token, isAuthenticated: !!token });
      },

      setLoading: (isLoading) => {
        set({ isLoading });
      },
      resetEmail: '',
      setResetEmail: (resetEmail) => {
        set({ resetEmail });
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// App Store for general app state
interface AppState {
  isOnboarded: boolean;
  theme: 'light' | 'dark' | 'system';
  language: string;
  setOnboarded: (onboarded: boolean) => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setLanguage: (language: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      isOnboarded: false,
      theme: 'system',
      language: 'en',

      setOnboarded: (isOnboarded) => set({ isOnboarded }),
      setTheme: (theme) => set({ theme }),
      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

// Products Store
interface ProductsState {
  products: product[];
  categories: Category[];
  isLoading: boolean;
  error: string | null;
  setProducts: (products: any[]) => void;
  setCategories: (categories: any[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  addProduct: (product: any) => void;
  updateProduct: (id: string, product: any) => void;
  removeProduct: (id: string) => void;
}

export const useProductsStore = create<ProductsState>((set, get) => ({
  products: [],
  categories: [],
  isLoading: false,
  error: null,

  setProducts: (products) => set({ products }),
  setCategories: (categories) => set({ categories }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  addProduct: (product) => {
    const { products } = get();
    set({ products: [...products, product] });
  },

  updateProduct: (id, updatedProduct) => {
    const { products } = get();
    set({
      products: products.map((product) => (product.id === id ? { ...product, ...updatedProduct } : product)),
    });
  },

  removeProduct: (id) => {
    const { products } = get();
    set({ products: products.filter((product) => product.id !== id) });
  },
}));

// Cart Store
interface CartItem {
  id: string;
  product: {
    id: string;
    name: string;
    store?: { storeName: string; id: string };
    default_images?: { image: { url: string } }[];
    base_price: number;
    base_sale_price: number;
  };
  quantity: number;
  variation: {
    id: string;
    name: string;
    attributes?: {
      name: string;
      value: string;
      id?: string;
    }[];
  };
  price: number; // Current price (sale or base)
  selected: boolean;
}

interface CartTotals {
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  itemCount: number;
  selectedItemCount: number;
  selectedSubtotal: number;
}

interface CartState {
  items: CartItem[];
  totals: CartTotals;
  isLoading: boolean;
  error: string | null;

  // Actions
  addToCart: (product: any, variation?: any, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  toggleItemSelection: (itemId: string) => void;
  selectAllItems: (selected: boolean) => void;
  clearCart: () => void;
  clearSelectedItems: () => void;

  // Getters
  getCartItemCount: () => number;
  getSelectedItemCount: () => number;
  isItemInCart: (productId: string, variationId?: string) => boolean;
  getCartItem: (productId: string, variationId?: string) => CartItem | undefined;

  // Calculations
  calculateTotals: () => void;

  // Loading states
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totals: {
        subtotal: 0,
        tax: 0,
        shipping: 0,
        total: 0,
        itemCount: 0,
        selectedItemCount: 0,
        selectedSubtotal: 0,
      },
      isLoading: false,
      error: null,

      addToCart: (product, variation = { id: 'default', name: 'Default' }, quantity = 1) => {
        const { items } = get();
        const price = product.base_sale_price || product.base_price;

        // Check if item already exists
        const existingItemIndex = items.findIndex(
          (item) => item.product.id === product.id && item.variation.id === variation.id
        );

        let newItems;
        if (existingItemIndex >= 0) {
          // Update existing item quantity
          newItems = items.map((item, index) =>
            index === existingItemIndex ? { ...item, quantity: item.quantity + quantity } : item
          );
        } else {
          // Add new item
          const newItem: CartItem = {
            id: `${product.id}`,
            product: {
              id: product.id,
              name: product.name,
              store: product.store,
              default_images: product.default_images,
              base_price: product.base_price,
              base_sale_price: product.base_sale_price,
            },
            quantity,
            variation,
            price,
            selected: true,
          };
          newItems = [...items, newItem];
        }

        set({ items: newItems });
        get().calculateTotals();
      },

      removeFromCart: (itemId) => {
        const { items } = get();
        const newItems = items.filter((item) => item.product.id !== itemId);
        set({ items: newItems });
        get().calculateTotals();
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(itemId);
          return;
        }

        const { items } = get();
        const newItems = items.map((item) => (item.id === itemId ? { ...item, quantity } : item));
        set({ items: newItems });
        get().calculateTotals();
      },

      toggleItemSelection: (itemId) => {
        const { items } = get();
        const newItems = items.map((item) => (item.id === itemId ? { ...item, selected: !item.selected } : item));
        set({ items: newItems });
        get().calculateTotals();
      },

      selectAllItems: (selected) => {
        const { items } = get();
        const newItems = items.map((item) => ({ ...item, selected }));
        set({ items: newItems });
        get().calculateTotals();
      },

      clearCart: () => {
        set({ items: [] });
        get().calculateTotals();
      },

      clearSelectedItems: () => {
        const { items } = get();
        const newItems = items.filter((item) => !item.selected);
        set({ items: newItems });
        get().calculateTotals();
      },

      getCartItemCount: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.quantity, 0);
      },

      getSelectedItemCount: () => {
        const { items } = get();
        return items.filter((item) => item.selected).reduce((total, item) => total + item.quantity, 0);
      },

      isItemInCart: (productId, variationId = 'default') => {
        const { items } = get();
        return items.some((item) => item.product.id === productId && item.variation.id === variationId);
      },

      getCartItem: (productId, variationId = 'default') => {
        const { items } = get();
        return items.find((item) => item.product.id === productId && item.variation.id === variationId);
      },

      calculateTotals: () => {
        const { items } = get();

        const itemCount = items.reduce((total, item) => total + item.quantity, 0);
        const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

        const selectedItems = items.filter((item) => item.selected);
        const selectedItemCount = selectedItems.reduce((total, item) => total + item.quantity, 0);
        const selectedSubtotal = selectedItems.reduce((total, item) => total + item.price * item.quantity, 0);

        // Calculate tax (example: 7.5%)
        const tax = selectedSubtotal * 0.075;

        // Calculate shipping (example: free over 50000, otherwise 2000)
        const shipping = selectedSubtotal > 50000 ? 0 : 2000;

        const total = selectedSubtotal + tax + shipping;

        set({
          totals: {
            subtotal,
            tax,
            shipping,
            total,
            itemCount,
            selectedItemCount,
            selectedSubtotal,
          },
        });
      },

      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        items: state.items,
        totals: state.totals,
      }),
    }
  )
);

//Wishlist Store
interface WishlistItem {
  id: string;
  product: {
    id: string;
    name: string;
    store?: { storeName: string; id: string };
    default_images?: { image: { url: string } }[];
    base_price: number;
    base_sale_price: number;
  };
  quantity: number;
  variation: {
    id: string;
    name: string;
    attributes?: {
      name: string;
      value: string;
      id?: string;
    }[];
  };
  price: number; // Current price (sale or base)
  selected: boolean;
}

interface WishlistTotals {
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  itemCount: number;
  selectedItemCount: number;
  selectedSubtotal: number;
}

interface WishlistState {
  items: WishlistItem[];
  totals: WishlistTotals;
  isLoading: boolean;
  error: string | null;

  // Actions
  addToWishlist: (product: any, variation?: any, quantity?: number) => void;
  removeFromWishlist: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  toggleItemSelection: (itemId: string) => void;
  selectAllItems: (selected: boolean) => void;
  clearWishlist: () => void;
  clearSelectedItems: () => void;

  // Getters
  getWishlistItemCount: () => number;
  getSelectedItemCount: () => number;
  isItemInWishlist: (productId: string, variationId?: string) => boolean;
  getWishlistItem: (productId: string, variationId?: string) => WishlistItem | undefined;

  // Calculations
  calculateTotals: () => void;

  // Loading states
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      totals: {
        subtotal: 0,
        tax: 0,
        shipping: 0,
        total: 0,
        itemCount: 0,
        selectedItemCount: 0,
        selectedSubtotal: 0,
      },
      isLoading: false,
      error: null,

      addToWishlist: (product, variation = { id: 'default', name: 'Default' }, quantity = 1) => {
        const { items } = get();
        const price = product.base_sale_price || product.base_price;

        // Check if item already exists
        const existingItemIndex = items.findIndex(
          (item) => item.product.id === product.id && item.variation.id === variation.id
        );

        let newItems;
        if (existingItemIndex >= 0) {
          // Update existing item quantity
          newItems = items.map((item, index) =>
            index === existingItemIndex ? { ...item, quantity: item.quantity + quantity } : item
          );
        } else {
          // Add new item
          const newItem: CartItem = {
            id: `${product.id}`,
            product: {
              id: product.id,
              name: product.name,
              store: product.store,
              default_images: product.default_images,
              base_price: product.base_price,
              base_sale_price: product.base_sale_price,
            },
            quantity,
            variation,
            price,
            selected: true,
          };
          newItems = [...items, newItem];
        }

        set({ items: newItems });
        get().calculateTotals();
      },

      removeFromWishlist: (itemId) => {
        const { items } = get();
        const newItems = items.filter((item) => item.product.id !== itemId);
        set({ items: newItems });
        get().calculateTotals();
      },

      updateQuantity: (itemId, quantity) => {
        if (quantity <= 0) {
          get().removeFromWishlist(itemId);
          return;
        }

        const { items } = get();
        const newItems = items.map((item) => (item.id === itemId ? { ...item, quantity } : item));
        set({ items: newItems });
        get().calculateTotals();
      },

      toggleItemSelection: (itemId) => {
        const { items } = get();
        const newItems = items.map((item) => (item.id === itemId ? { ...item, selected: !item.selected } : item));
        set({ items: newItems });
        get().calculateTotals();
      },

      selectAllItems: (selected) => {
        const { items } = get();
        const newItems = items.map((item) => ({ ...item, selected }));
        set({ items: newItems });
        get().calculateTotals();
      },

      clearWishlist: () => {
        set({ items: [] });
        get().calculateTotals();
      },

      clearSelectedItems: () => {
        const { items } = get();
        const newItems = items.filter((item) => !item.selected);
        set({ items: newItems });
        get().calculateTotals();
      },

      getWishlistItemCount: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.quantity, 0);
      },

      getSelectedItemCount: () => {
        const { items } = get();
        return items.filter((item) => item.selected).reduce((total, item) => total + item.quantity, 0);
      },

      isItemInWishlist: (productId, variationId = 'default') => {
        const { items } = get();
        return items.some((item) => item.product.id === productId && item.variation.id === variationId);
      },

      getWishlistItem: (productId, variationId = 'default') => {
        const { items } = get();
        return items.find((item) => item.product.id === productId && item.variation.id === variationId);
      },

      calculateTotals: () => {
        const { items } = get();

        const itemCount = items.reduce((total, item) => total + item.quantity, 0);
        const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);

        const selectedItems = items.filter((item) => item.selected);
        const selectedItemCount = selectedItems.reduce((total, item) => total + item.quantity, 0);
        const selectedSubtotal = selectedItems.reduce((total, item) => total + item.price * item.quantity, 0);

        // Calculate tax (example: 7.5%)
        const tax = selectedSubtotal * 0.075;

        // Calculate shipping (example: free over 50000, otherwise 2000)
        const shipping = selectedSubtotal > 50000 ? 0 : 2000;

        const total = selectedSubtotal + tax + shipping;

        set({
          totals: {
            subtotal,
            tax,
            shipping,
            total,
            itemCount,
            selectedItemCount,
            selectedSubtotal,
          },
        });
      },

      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
    }),
    {
      name: 'wishlist-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        items: state.items,
        totals: state.totals,
      }),
    }
  )
);

// Measurement Store
interface MeasurementData {
  [key: string]: string;
}

interface MeasurementState {
  measurements: MeasurementData | null;
  setMeasurements: (data: MeasurementData) => void;
  clearMeasurements: () => void;
}

export const useMeasurementStore = create<MeasurementState>()(
  persist(
    (set) => ({
      measurements: null,

      setMeasurements: (data) => {
        set({ measurements: data });
      },

      clearMeasurements: () => {
        set({ measurements: null });
      },
    }),
    {
      name: 'measurement-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
