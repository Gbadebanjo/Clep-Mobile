import { Colors } from '@/constants/Colors';
import { Search } from 'lucide-react-native'; // React Native version of lucide icons
import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e?: any) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery, handleSearch }) => {
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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    flex: 1,
    borderWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: '#fff',
    borderTopLeftRadius: 999,
    borderBottomLeftRadius: 999,
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  icon: {
    marginRight: 6,
  },
  input: {
    flex: 1,
    height: 40,
    color: '#111827',
    fontSize: 14,
  },
  button: {
    backgroundColor: Colors.light.primary800,
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderTopRightRadius: 999,
    borderBottomRightRadius: 999,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
