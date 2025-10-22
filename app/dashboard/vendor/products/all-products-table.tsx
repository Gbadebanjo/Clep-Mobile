import React from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
// import ProductsTable, { ProductsTableType } from './ProductsTable';
import { amountFormatter } from '@/helpers/data-utils';
import { productResponse } from '@/types/product';
import ProductsTable, { ProductsTableType } from './products-table';

interface IProps {
  queryData: productResponse | undefined;
  isLoading: boolean;
  status: string;
}

const AllOrdersStatusTable: React.FC<IProps> = ({
  queryData,
  isLoading,
  status,
}) => {
  // Filter products based on status
  const filteredProducts =
    status === 'all_products'
      ? queryData?.docs
      : queryData?.docs?.filter((item) => item?.status === status);

  // Map backend data to table item shape
  const products: ProductsTableType[] =
    filteredProducts?.map((product) => ({
      productId: product.id.toString(),
      image: product?.default_images?.[0]?.image?.url ?? '',
      product: product?.name,
      sku:
        product?.variations?.length >= 1
          ? product?.variations?.[0]?.sku
          : '',
      count: product?.quantity_in_stock,
      category: product?.categories?.[0]?.category?.name ?? '—',
      varaintsAmount: product?.variations?.length || 0,
      added: product?.createdAt,
      price: amountFormatter(product?.variations?.[0]?.price ?? 0),
      status: product?.status,
      slug: product?.id,
    })) || [];

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center py-10">
        <ActivityIndicator size="large" color="#9F0E42" />
      </View>
    );
  }

  return (
    <View className="flex-1">
      <FlatList
        data={products}
        keyExtractor={(item) => item.productId}
        renderItem={({ item }) => <ProductsTable products={[item]} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
};

export default AllOrdersStatusTable;
