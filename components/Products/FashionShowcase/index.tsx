import { ThemedText } from '@/components/ThemedText';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import FashionShowStyles from './style';

interface Category {
  id: number;
  name: string;
  image: any;
  link: string;
  gradient: string[]; // we'll handle gradient separately
}

const categories: Category[] = [
  {
    id: 1,
    name: 'Dresses',
    image: require('@/assets/images/categories/dress.webp'),
    link: '/product-category/dresses',
    gradient: ['#ec4899', '#8b5cf6'],
  },
  {
    id: 2,
    name: 'Bags',
    image: require('@/assets/images/categories/bags.webp'),
    link: '/product-category/bags',
    gradient: ['#f59e0b', '#ea580c'],
  },
  {
    id: 3,
    name: 'Accessories',
    image: require('@/assets/images/categories/accessories.webp'),
    link: '/product-category/accessories',
    gradient: ['#3b82f6', '#6366f1'],
  },
  {
    id: 4,
    name: 'Shoes',
    image: require('@/assets/images/categories/shoes.webp'),
    link: '/product-category/shoes',
    gradient: ['#10b981', '#14b8a6'],
  },
  {
    id: 5,
    name: "Men's Wear",
    image: require('@/assets/images/categories/men-wear.webp'),
    link: '/product-category/mens-wear',
    gradient: ['#374151', '#111827'],
  },
];

type CategoryCardProps = {
  category: Category;
  index: number;
};

const CategoryCard: React.FC<CategoryCardProps> = ({ category, index }) => {
  const router = useRouter();

  return (
    <TouchableOpacity style={FashionShowStyles.cardWrapper} onPress={() => router.push(category.link as any)}>
      <View style={FashionShowStyles.card}>
        <Image source={category.image} style={FashionShowStyles.image}></Image>

        {/* Overlay Gradient */}
        <View style={[FashionShowStyles.overlay, { backgroundColor: 'rgba(0,0,0,0.1)' }]} />

        {/* Text + Button */}
        <View style={FashionShowStyles.cardContent}>
          <Text style={FashionShowStyles.title}>{category.name}</Text>

          {/* <TouchableOpacity
            style={FashionShowStyles.shopButton}
            onPress={() => router.push(category.link as any)}
            activeOpacity={0.8}
          >
            <Text style={FashionShowStyles.shopButtonText}>Shop Now</Text>
            <Svg width={16} height={16} fill="black" viewBox="0 0 20 20" style={{ marginLeft: 6 }}>
              <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 
                  4a1 1 0 010 1.414l-4 4a1 1 
                  0 01-1.414-1.414L12.586 11H5a1 
                  1 0 110-2h7.586l-2.293-2.293a1 
                  1 0 010-1.414z"
              />
            </Svg>
          </TouchableOpacity> */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const FashionShowcase: React.FC = () => {
  return (
    <View style={FashionShowStyles.container}>
      <ThemedText style={FashionShowStyles.heading}>Shop By Category</ThemedText>

      {/* <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={({ item, index }) => <CategoryCard category={item} index={index} />}
        contentContainerStyle={FashionShowStyles.grid}
      /> */}

      <View style={FashionShowStyles.grid}>
        {categories.map((category, index) => (
          <View key={category.id} style={FashionShowStyles.gridItem}>
            <CategoryCard category={category} index={index} />
          </View>
        ))}
      </View>
    </View>
  );
};

export default FashionShowcase;
