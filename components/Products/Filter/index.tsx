import { useColorScheme } from '@/hooks/useColorScheme';
import { Picker } from '@react-native-picker/picker';
import { Filter } from 'lucide-react-native';
import React from 'react';
import { Animated, TextInput, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '../../ThemedText';
import { ThemedView } from '../../ThemedView';
import { FilterStyles } from './style';

type FiltersProps = {
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  filters: any;
  handleFilterChange: (filterType: string, value: any) => void;
  categories: { id: string; name: string }[];
  sortOptions: { id: string; name: string }[];
  setFilters: (filters: any) => void;
  setSearchQuery: (query: string) => void;
};

const Filters: React.FC<FiltersProps> = ({
  showFilters,
  setShowFilters,
  filters,
  handleFilterChange,
  categories,
  sortOptions,
  setFilters,
  setSearchQuery,
}) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  const colorScheme = useColorScheme() as 'light' | 'dark';
  const styles = FilterStyles(colorScheme);

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: showFilters ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [showFilters]);

  return (
    <ThemedView>
      {/* Toggle button (mobile) */}
      <View style={{ marginBottom: 16 }}>
        <TouchableOpacity onPress={() => setShowFilters(!showFilters)} style={styles.toggleButton}>
          <Filter size={16} color="white" />
          <ThemedText style={styles.toggleButtonText}>{showFilters ? 'Hide Filters' : 'Show Filters'}</ThemedText>
        </TouchableOpacity>
      </View>

      {/* Sidebar */}
      {showFilters && (
        <Animated.View style={[styles.sidebar, { opacity: fadeAnim }]}>
          <ThemedText style={styles.sidebarTitle}>Filters</ThemedText>

          {/* Categories */}
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Categories</ThemedText>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={styles.radioRow}
                onPress={() => handleFilterChange('category', category.id)}
              >
                <View style={[styles.radioCircle, filters.category === category.id && styles.radioSelected]} />
                <ThemedText style={styles.radioLabel}>{category.name}</ThemedText>
              </TouchableOpacity>
            ))}
          </View>

          {/* Price Range */}
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Price Range</ThemedText>
            <View style={styles.priceRow}>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Min"
                value={filters.priceRange.min === -1 ? '' : String(filters.priceRange.min)}
                onChangeText={(text) =>
                  handleFilterChange('priceRange', {
                    ...filters.priceRange,
                    min: Number(text) || 0,
                  })
                }
              />
              <ThemedText>-</ThemedText>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                placeholder="Max"
                value={filters.priceRange.max === -1 ? '' : String(filters.priceRange.max)}
                onChangeText={(text) =>
                  handleFilterChange('priceRange', {
                    ...filters.priceRange,
                    max: Number(text) || -1,
                  })
                }
              />
            </View>
          </View>

          {/* Sort By */}
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Sort By</ThemedText>
            <Picker
              selectedValue={filters.sortBy}
              onValueChange={(value: any) => handleFilterChange('sortBy', value)}
              style={styles.picker}
            >
              {sortOptions.map((option) => (
                <Picker.Item key={option.id} label={option.name} value={option.id} />
              ))}
            </Picker>
          </View>

          {/* Reset */}
          <TouchableOpacity
            style={styles.resetButton}
            onPress={() => {
              setFilters({
                category: '',
                priceRange: { min: -1, max: -1 },
                sortBy: 'newest',
              });
              setSearchQuery('');
            }}
          >
            <ThemedText style={styles.resetButtonText}>Reset Filters</ThemedText>
          </TouchableOpacity>
        </Animated.View>
      )}
    </ThemedView>
  );
};

export default Filters;
