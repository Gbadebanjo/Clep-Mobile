import { ThemedText } from '@/components/ThemedText';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import FashionShowStyles from './style';

// const categories = [
//   { id: 1, name: 'Dresses', image: require('@/assets/images/categories/dress.webp'), link: '/product-category/dresses', gradient: ['#ec4899', '#8b5cf6'] },
//   { id: 2, name: 'Bags', image: require('@/assets/images/categories/bags.webp'), link: '/product-category/bags', gradient: ['#f59e0b', '#ea580c'] },
//   { id: 3, name: 'Accessories', image: require('@/assets/images/categories/accessories.webp'), link: '/product-category/accessories', gradient: ['#3b82f6', '#6366f1'] },
//   { id: 4, name: 'Shoes', image: require('@/assets/images/categories/shoes.webp'), link: '/product-category/shoes', gradient: ['#10b981', '#14b8a6'] },
//   { id: 5, name: "Men's Wear", image: require('@/assets/images/categories/men-wear.webp'), link: '/product-category/mens-wear', gradient: ['#374151', '#111827'] },
// ];

const categories = [
  {
    id: 1,
    name: 'Dresses',
    image: require('../../../assets/images/categories/Dresses.png'),
    link: '/product-category/dresses',
    gradient: ['#ec4899', '#8b5cf6'],
  },
  {
    id: 2,
    name: 'Bags',
    image: require('../../../assets/images/categories/Bags.png'),
    link: '/product-category/bags',
    gradient: ['#f59e0b', '#ea580c'],
  },
  {
    id: 3,
    name: 'Accessories',
    image: require('../../../assets/images/categories/Accessories.png'),
    link: '/product-category/accessories',
    gradient: ['#3b82f6', '#6366f1'],
  },
  {
    id: 4,
    name: 'Shoes',
    image: require('../../../assets/images/categories/Shoes.png'),
    link: '/product-category/shoes',
    gradient: ['#10b981', '#14b8a6'],
  },
  {
    id: 5,
    name: "Men's Wear",
    image: require('../../../assets/images/categories/Men-Wear.png'),
    link: '/product-category/mens-wear',
    gradient: ['#374151', '#111827'],
  },
];


const CategoryCard = ({ category }) => {
  const router = useRouter();
  return (
    <TouchableOpacity style={FashionShowStyles.cardWrapper} onPress={() => router.push(category.link)}>
      <View style={FashionShowStyles.card}>
        <Image source={category.image} style={FashionShowStyles.image} />
        <View style={[FashionShowStyles.overlay, { backgroundColor: 'rgba(0,0,0,0.1)' }]} />
        <View style={FashionShowStyles.cardContent}>
          <Text style={FashionShowStyles.title}>{category.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const FashionShowcase = () => {
  return (
    <View style={FashionShowStyles.container}>
      <ThemedText style={FashionShowStyles.heading}>Shop By Category</ThemedText>

      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={FashionShowStyles.gridItem}>
            <CategoryCard category={item} />
          </View>
        )}
        contentContainerStyle={FashionShowStyles.grid}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        scrollEnabled={false}
      />
    </View>
  );
};

export default FashionShowcase;
