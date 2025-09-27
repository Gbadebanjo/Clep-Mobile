import { useColorScheme } from '@/hooks/useColorScheme';
import { Search } from 'lucide-react-native'; // React Native version of lucide icons
import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SearchStyles } from './style';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e?: any) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery, handleSearch }) => {
  const colorScheme = useColorScheme() as 'light' | 'dark';
  const styles = SearchStyles(colorScheme);
  return (
    <Animated.View entering={FadeInDown.duration(400)} style={styles.container}>
      <View style={styles.inputContainer}>
        <Search size={24} color="#9ca3af" style={styles.icon} />
        <TextInput
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search products..."
          placeholderTextColor="#9ca3af"
          style={styles.input}
        />
      </View>
      <TouchableOpacity onPress={handleSearch} style={styles.button}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};
