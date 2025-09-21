import { vendorLoginStyles } from '@/components/Vendor/Auth/login/style';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { TextInput, TouchableOpacity, useColorScheme, View } from 'react-native';

export default function SearchNavCompo() {
  const colorScheme = useColorScheme() as 'light' | 'dark';
  const styles = vendorLoginStyles(colorScheme);

  return (
    <View style={styles.searchNavContainer}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="menu" size={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search For Products, Brands And More!"
            placeholderTextColor="#999"
          />
        </View>
        <TouchableOpacity
          style={{
            borderRadius: 100,
            borderColor: '#E5E5E5',
            borderWidth: 1,
            padding: 4,
          }}
        >
          <Ionicons name="bag-outline" size={20} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
