import React from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
// import moment from 'moment';
import { useMutation } from '@tanstack/react-query';
// import { toast } from '@/shared/components/Toast';
// import { ProductAPI } from '@/connection/product-api';
import { useRouter } from 'expo-router';
// import { ProductStatusType } from '@/types';
import { ProductAPI } from '@/apis/product-api';
import { Feather } from '@expo/vector-icons';

export  interface ProductsTableType  {
  product: string;
  image: string;
  sku: string;
  count: number;
  category: string;
  price: string;
  added: string;
  status: keyof ProductsTableType;
  varaintsAmount: number;
  productId: string;
  slug: string;
};

interface IProps {
  products: ProductsTableType[];
  isLoading: boolean;
}

const statusVariants: Record<keyof ProductsTableType, { bg: string; color: string }> = {
  draft: { bg: '#F0F1F3', color: '#667085' },
  'out of stock': { bg: '#FEECEE', color: '#EB3D4D' },
  published: { bg: '#E9FAF7', color: '#1A9882' },
};

const ProductsTable = ({ products, isLoading }: IProps) => {
  const router = useRouter();
  const productAPI = new ProductAPI();

  const deleteProduct = useMutation({
    mutationFn: (values: { productId: string }) => productAPI.deleteProduct(values.productId),
    onSuccess: (response) => {
    //   toast.success(response.data.message);
    },
    onError: (error: any) => {
    //   toast.error(error?.message || 'Failed to delete product');
    },
  });

  const handleDelete = (productId: string) => {
    Alert.alert(
      'Delete Product?',
      "If you delete this product, you won't be able to retrieve it back.",
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: () => deleteProduct.mutate({ productId }),
        },
      ]
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading products...</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: ProductsTableType }) => {
    const { product, image, category, price, sku, added, status, varaintsAmount, slug, productId } =
      item;

    const statusStyle = statusVariants[status];

    return (
      <View style={styles.card}>
        {/* Image + Product info */}
        <View style={styles.row}>
          {/* <Image
            source={image ? { uri: image } : require('@/assets/images/placeholder.png')}
            style={styles.image}
          /> */}
          <View style={{ flex: 1 }}>
            <Text style={styles.productName} numberOfLines={1}>
              {product}
            </Text>
            <Text style={styles.variantText}>+{varaintsAmount} Variants</Text>
          </View>
        </View>

        {/* Info row */}
        <View style={styles.infoRow}>
          <Text style={styles.label}>SKU:</Text>
          <Text style={styles.value}>{sku}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Category:</Text>
          <Text style={styles.value}>{category}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Price:</Text>
          <Text style={styles.value}>{price}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Added:</Text>
          {/* <Text style={styles.value}>{moment(added).calendar()}</Text> */}
        </View>

        {/* Status */}
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: statusStyle.bg },
          ]}
        >
          <Text style={[styles.statusText, { color: statusStyle.color }]}>
            {status}
          </Text>
        </View>

        {/* Actions */}
        <View style={styles.actionsRow}>
          <TouchableOpacity>
            <Feather name="eye" size={18} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity >
            <Feather name="edit" size={18} color="#007AFF" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDelete(productId)}>
            {deleteProduct.isPending ? (
              <ActivityIndicator size="small" color="#EB3D4D" />
            ) : (
              <Feather name="trash" size={18} color="#EB3D4D" />
            )}
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.productId}
      renderItem={renderItem}
      contentContainerStyle={{ padding: 16 }}
      ListEmptyComponent={
        <Text style={styles.emptyText}>No products available.</Text>
      }
    />
  );
};

export default ProductsTable;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 10,
    color: '#777',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 6,
    backgroundColor: '#EEE',
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
  },
  variantText: {
    fontSize: 12,
    color: '#999',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  label: {
    color: '#667085',
    fontSize: 13,
    fontWeight: '500',
  },
  value: {
    color: '#444',
    fontSize: 13,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginTop: 6,
  },
  statusText: {
    fontSize: 13,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 18,
    marginTop: 10,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 50,
  },
});
