import { CategoryAPI } from '@/apis/category-api';
import { useQuery } from '@tanstack/react-query';

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const categoryAPI = new CategoryAPI();
      const response = await categoryAPI.getCategories();
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
