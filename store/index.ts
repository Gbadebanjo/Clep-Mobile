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
