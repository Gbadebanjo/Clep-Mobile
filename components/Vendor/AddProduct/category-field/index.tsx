import { CategoryAPI } from '@/apis/category-api';
import { ThemedView } from '@/components/ThemedView';
import { useAuthStore } from '@/store';
import { Category } from '@/types/category';
import { CreateProductForm } from '@/types/product';
import React, { useCallback, useEffect, useState } from 'react';
import { Text, useColorScheme } from 'react-native';
import SelectField from '../select-field';
import { CategoryFieldStyles } from './style';

interface IProps {
  setValues: React.Dispatch<React.SetStateAction<CreateProductForm>>;
  error?: Record<string, any>;
  categoryVal: { category: string }[];
}

const CategoryFields: React.FC<IProps> = ({ setValues, error, categoryVal }) => {
  const categoryAPI = new CategoryAPI();
  const user = useAuthStore((store) => store.user);
  const storeId = user?.store?.id;
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const colorScheme = useColorScheme() as 'light' | 'dark';
  const styles = CategoryFieldStyles(colorScheme);
  const getCategories = useCallback(async () => {
    if (!storeId) return;
    try {
      setLoading(true);
      const result = await categoryAPI.getCategories();
      setCategories(result?.data?.docs || []);
    } catch (err) {
      console.error('❌ Error fetching categories:', err);
    } finally {
      setLoading(false);
    }
  }, [storeId]);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const handleCategoryChange = useCallback(
    (value: string) => {
      if (value !== categoryVal[0]?.category) {
        setValues((prev: CreateProductForm) => ({
          ...prev,
          categories: [{ category: value }],
        }));
      }
  
      // ✅ Clear the category error automatically when a valid category is chosen
      if (error?.categories) {
        error.categories = "";
      }
    },
    [setValues, categoryVal, error]
  );
  

  const formError =
  typeof error?.categories === 'string' ? error.categories : undefined;

  return (
    <ThemedView style={styles.container}>
    <ThemedView style={styles.card}>

      <Text style={styles.heading}>Category</Text>

      <ThemedView >
        <SelectField
          label="Product Category"
          placeholder={loading ? 'Loading categories...' : 'Select a category'}
          items={categories.map((cat) => ({
            value: cat.id,
            label: cat.name,
          }))}
          value={categoryVal[0]?.category}
          onChange={handleCategoryChange}
          error={formError}
          disabled={loading}
        />
      </ThemedView>
    </ThemedView>    
    </ThemedView>

  );
};

export default CategoryFields;


