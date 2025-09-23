import { useProductsStore } from '@/store';
import { ProductsService } from '@/services/products.service';

export const useProducts = () => {
  const {
    products,
    categories,
    isLoading,
    error,
    setProducts,
    setCategories,
  } = useProductsStore();

  const fetchProducts = async (params?: any) => {
    return await ProductsService.getProducts(params);
  };

  const createProduct = async (productData: any) => {
    return await ProductsService.createProduct(productData);
  };

  const updateProduct = async (id: string, productData: any) => {
    return await ProductsService.updateProduct(id, productData);
  };

  const deleteProduct = async (id: string) => {
    return await ProductsService.deleteProduct(id);
  };

  return {
    products,
    categories,
    isLoading,
    error,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    setProducts,
    setCategories,
  };
};