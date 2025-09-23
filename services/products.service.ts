import { api, showError, showSuccess } from './api';
import { useProductsStore } from '@/store';

export class ProductsService {
  static async getProducts(params?: any) {
    const { setProducts, setLoading, setError } = useProductsStore.getState();
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.get('/products', params);
      
      if (response.ok && response.data) {
        setProducts(response.data.docs || []);
        return { success: true, data: response.data };
      } else {
        setError('Failed to fetch products');
        return { success: false, error: response.data?.message };
      }
    } catch (error: any) {
      setError('Network error');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  }

  static async createProduct(productData: any) {
    const { addProduct } = useProductsStore.getState();
    
    try {
      const response = await api.post('/products', productData);
      
      if (response.ok && response.data) {
        addProduct(response.data);
        showSuccess('Product created successfully');
        return { success: true, data: response.data };
      } else {
        showError(response.data?.message || 'Failed to create product');
        return { success: false, error: response.data?.message };
      }
    } catch (error: any) {
      showError('Network error. Please try again.');
      return { success: false, error: error.message };
    }
  }

  static async updateProduct(id: string, productData: any) {
    const { updateProduct } = useProductsStore.getState();
    
    try {
      const response = await api.patch(`/products/${id}`, productData);
      
      if (response.ok && response.data) {
        updateProduct(id, response.data);
        showSuccess('Product updated successfully');
        return { success: true, data: response.data };
      } else {
        showError(response.data?.message || 'Failed to update product');
        return { success: false, error: response.data?.message };
      }
    } catch (error: any) {
      showError('Network error. Please try again.');
      return { success: false, error: error.message };
    }
  }

  static async deleteProduct(id: string) {
    const { removeProduct } = useProductsStore.getState();
    
    try {
      const response = await api.delete(`/products/${id}`);
      
      if (response.ok) {
        removeProduct(id);
        showSuccess('Product deleted successfully');
        return { success: true };
      } else {
        showError(response.data?.message || 'Failed to delete product');
        return { success: false, error: response.data?.message };
      }
    } catch (error: any) {
      showError('Network error. Please try again.');
      return { success: false, error: error.message };
    }
  }
}