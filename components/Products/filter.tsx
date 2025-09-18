import { Colors } from '@/constants/Colors';
import { Picker } from '@react-native-picker/picker';
import { Filter } from 'lucide-react-native';
import React from 'react';
import { Animated, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

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

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: showFilters ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [showFilters]);

  return (
    <View>
      {/* Toggle button (mobile) */}
      <View style={{ marginBottom: 16 }}>
        <TouchableOpacity onPress={() => setShowFilters(!showFilters)} style={styles.toggleButton}>
          <Filter size={16} color="white" />
          <Text style={styles.toggleButtonText}>{showFilters ? 'Hide Filters' : 'Show Filters'}</Text>
        </TouchableOpacity>
      </View>

      {/* Sidebar */}
      {showFilters && (
        <Animated.View style={[styles.sidebar, { opacity: fadeAnim }]}>
          <Text style={styles.sidebarTitle}>Filters</Text>

          {/* Categories */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Categories</Text>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={styles.radioRow}
                onPress={() => handleFilterChange('category', category.id)}
              >
                <View style={[styles.radioCircle, filters.category === category.id && styles.radioSelected]} />
                <Text style={styles.radioLabel}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Price Range */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Price Range</Text>
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
              <Text>-</Text>
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
            <Text style={styles.sectionTitle}>Sort By</Text>
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
            <Text style={styles.resetButtonText}>Reset Filters</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
};

export default Filters;

const styles = StyleSheet.create({
  toggleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.primary800,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 50,
    maxWidth: 200,
    width: '100%',
  },
  toggleButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  sidebar: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
  },
  sidebarTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  radioCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: Colors.light.primary700,
    marginRight: 8,
  },
  radioSelected: {
    backgroundColor: Colors.light.primary700,
  },
  radioLabel: {
    fontSize: 14,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 6,
    fontSize: 14,
  },
  picker: {
    borderWidth: 2,
    borderColor: Colors.light.primary400,
    paddingHorizontal: 5,
  },
  resetButton: {
    backgroundColor: '#f3f4f6',
    paddingVertical: 10,
    borderRadius: 50,
    alignItems: 'center',
  },
  resetButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
});
