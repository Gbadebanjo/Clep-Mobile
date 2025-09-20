import { vendorLoginStyles } from '@/components/Auth/styles/vendor-login-styles';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';

export default function SearchNavCompo() {
  return (
    <View style={vendorLoginStyles.searchNavContainer}>
      <View style={vendorLoginStyles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="menu" size={24} color="#000" />
        </TouchableOpacity>
        <View style={vendorLoginStyles.searchContainer}>
          <Ionicons name="search" size={20} color="#999" />
          <TextInput
            style={vendorLoginStyles.searchInput}
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
