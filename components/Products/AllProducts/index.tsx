import { useCategories } from '@/apis/categories/use-categories';
import { ProductAPI } from '@/apis/product-api';
import { product } from '@/types/product';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams, usePathname } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, Text, useWindowDimensions, View } from 'react-native';
import { ThemedLoader } from '../../ThemedLoader';
import { ThemedText } from '../../ThemedText';
import { ThemedView } from '../../ThemedView';
import Filters from '../Filter';
import { Pagination } from '../Pagination/pagination';
import ProductCard from '../ProductCard/product-card';
import { SearchBar } from '../SearchBar/search-bar';
import styles from './style';

const screenWidth = Dimensions.get('window').width;
const productCardWidth = (screenWidth - 36) / 2; // 12 padding + 12 margin between columns

export default function AllProducts({ slug }: { slug?: string }) {
  const pathname = usePathname();
  const { q, page, category, min_price, max_price, sort } = useLocalSearchParams();

  const { data: categoryData, isLoading, isError: categoryError } = useCategories();
  const categories = categoryData?.docs || [];
  const { width } = useWindowDimensions();
  const isLargeScreen = width >= 1024;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState<product[]>([]);
  const [searchQuery, setSearchQuery] = useState(q || '');
  const [currentPage, setCurrentPage] = useState(parseInt((page as any) || '1'));
  const [totalPages, setTotalPages] = useState(1);
  const [title, setTitle] = useState('');
  const [clause, setClause] = useState({});
  const [filters, setFilters] = useState({
    category: category || '',
    priceRange: {
      min: parseInt((min_price as any) || -1),
      max: parseInt((max_price as any) || -1),
    },
    sortBy: sort || 'newest',
  });
  const [showFilters, setShowFilters] = useState(false);

  // Custom createQueryString function
  const createQueryString = useCallback(
    (name: string, value: string, currentQuery: string = '') => {
      const params = new URLSearchParams(currentQuery);
      if (value && value !== '0' && value !== 'newest') {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [q, page, category, min_price, max_price, sort]
  );

  // Update URL with current filters
  const updateURL = useCallback(() => {
    let query = '';

    if (filters.sortBy !== 'newest') {
      query = createQueryString('sort', filters.sortBy as any, query);
    }

    if (filters.priceRange.min !== -1) {
      query = createQueryString('min_price', filters.priceRange.min.toString(), query);
    }

    if (filters.priceRange.max !== -1) {
      query = createQueryString('max_price', filters.priceRange.max.toString(), query);
    }

    if (filters.category) {
      query = createQueryString('category', filters.category as any, query);
    }

    if ((searchQuery as any).trim()) {
      query = createQueryString('q', searchQuery as any, query);
    }

    if (currentPage > 1) {
      query = createQueryString('page', currentPage.toString(), query);
    }

    const newUrl = query ? `${pathname}?${query}` : pathname;
    // router.push(newUrl as any);
    setShowFilters(false);
  }, [filters, searchQuery, currentPage, pathname, router, createQueryString]);

  const slugSearch = (slug: string) => {
    switch (slug) {
      case 'best-sellers':
        setTitle('Best Sellers');
        setClause({ best_sellers: true });
        break;
      case 'is-featured':
        setTitle('Featured');
        setClause({ is_featured: true });
        break;
      case 'new-arrivals':
        setTitle('New Arrivals');
        setClause({ is_featured: true });
        break;
      case 'sale':
        setTitle('On Sale');
        setClause({ is_on_sale: true });
        break;
      case 'trending':
        setTitle('Trending');
        setClause({ is_featured: true });
        break;
      default:
        setTitle('All Products');
        setClause({});
        break;
    }
  };

  useEffect(() => {
    if (slug) {
      slugSearch(slug);
    } else {
      setTitle('All Products');
      setClause({});
    }
  }, [slug]);

  const sortOptions = [
    { id: 'newest', name: 'Newest' },
    { id: 'price-low-high', name: 'Price: Low to High' },
    { id: 'price-high-low', name: 'Price: High to Low' },
    { id: 'rating', name: 'Highest Rated' },
  ];
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(false);

      const productAPI = new ProductAPI();

      let whereClause: Record<string, any> = { ...clause };

      if (filters.category) {
        whereClause['categories.category.slug'] = {
          equals: filters.category,
        };
      }

      let sortField = '-createdAt';
      if (filters.sortBy === 'price-low-high') {
        sortField = 'base_price';
      } else if (filters.sortBy === 'price-high-low') {
        sortField = '-base_price';
      } else if (filters.sortBy === 'rating') {
        sortField = '-average_rating';
      }

      if ((searchQuery as any).trim()) {
        whereClause.name = {
          contains: searchQuery,
        };
      }

      if (filters.priceRange.min > 0 || filters.priceRange.max > 0) {
        whereClause.base_sale_price = {};
        if (filters.priceRange.min > 0) whereClause.base_sale_price.greater_than_equal = filters.priceRange.min;
        if (filters.priceRange.max > 0) whereClause.base_sale_price.less_than_equal = filters.priceRange.max;
      }

      const results = await productAPI.getProducts({
        where: whereClause,
        sort: sortField,
        page: currentPage,
        limit: 12,
      });

      setProducts(results?.data?.docs || []);
      setTotalPages(results?.data?.totalPages || 1);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [currentPage, filters, clause]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProducts();

    setCurrentPage(1);
  };

  const handleFilterChange = (filterType: string, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // Update URL whenever filters, search, or page changes
  useEffect(() => {
    const timer = setTimeout(() => {
      updateURL();
    }, 300); // Debounce URL updates

    return () => clearTimeout(timer);
  }, [updateURL]);

  const { height } = Dimensions.get('window');

  if (loading)
    return (
      <View
        style={{
          height,
        }}
      >
        <ThemedLoader text="Loading products..." />;
      </View>
    );
  if (error) return <Text style={styles.errorText}>An error occurred. Please try again.</Text>;

  // Group products into rows of 2
  const rows = [];
  for (let i = 0; i < products.length; i += 2) {
    rows.push(products.slice(i, i + 2));
  }

  return (
    <ThemedView style={styles.scrollContainer}>
      {/* Heading */}
      <MaskedView maskElement={<ThemedText style={styles.title}>{title ?? 'All Products'}</ThemedText>}>
        <LinearGradient
          colors={['#7f1d1d', '#450a0a']} // wine-700 → wine-900
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <ThemedText style={[styles.title, { opacity: 0 }]}>{title ?? 'All Products'}</ThemedText>
        </LinearGradient>
      </MaskedView>

      {/* Subtitle */}
      <ThemedText style={styles.subtitle}>
        Browse our complete collection of fashion items. Use the filters and search to find exactly what you&apos;re
        looking for.
      </ThemedText>
      <View style={[styles.container, { flexDirection: isLargeScreen ? 'row' : 'column' }]}>
        <Filters
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          filters={filters}
          handleFilterChange={handleFilterChange}
          categories={[{ id: '', name: 'All Categories' }, ...categories.map((a) => ({ id: a.slug, name: a.name }))]}
          sortOptions={sortOptions}
          setFilters={setFilters}
          setSearchQuery={setSearchQuery}
        />

        <View style={[isLargeScreen ? styles.contentLg : styles.contentSm]}>
          <SearchBar searchQuery={searchQuery as any} setSearchQuery={setSearchQuery} handleSearch={handleSearch} />
          {/*Product grid */}
          {rows.map((row, rowIndex) => (
            <View style={styles.row} key={rowIndex}>
              {row.map((product, colIndex) => (
                <View key={colIndex} style={[styles.productWrapper, { width: productCardWidth }]}>
                  <ProductCard product={product} />
                </View>
              ))}
            </View>
          ))}
          {!loading && products.length > 0 && (
            <Pagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
          )}
        </View>
      </View>

      {products.length === 0 && (
        <View style={styles.noProductContainer}>
          <ThemedText>No products available at the moment</ThemedText>
          <ThemedText>Check back soon for our latest featured items!</ThemedText>
        </View>
      )}
    </ThemedView>
  );
}
