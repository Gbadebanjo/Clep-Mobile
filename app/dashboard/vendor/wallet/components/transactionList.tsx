import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { amountFormatter } from '@/helpers/data-utils';
import React from 'react';
import { FlatList, } from 'react-native';
import { styles } from './style';

export default function TransactionList({ data }: { data: any[] }) {
  if (!data || data.length === 0) {
    return (
      <ThemedView style={styles.emptyContainer}>
        <ThemedText style={styles.empty}>No transactions found</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.listContainer}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        renderItem={({ item }) => (
          <ThemedView style={styles.card}>
            <ThemedView style={styles.row}>
              <ThemedText style={styles.label}>ID:</ThemedText>
              <ThemedText style={styles.value}>{item.transactionId || 'N/A'}</ThemedText>
            </ThemedView>


            <ThemedView style={styles.row}>
              <ThemedText style={styles.label}>Date:</ThemedText>
              <ThemedText style={styles.value}>{item.createdAt ? item.createdAt.split('T')[0] : 'N/A'}
              </ThemedText>
            </ThemedView>

            <ThemedView style={styles.row}>
              <ThemedText style={styles.label}>Amount:</ThemedText>
              <ThemedText style={styles.value}>{amountFormatter(item.netAmount)}</ThemedText>
            </ThemedView>

            <ThemedView style={styles.row}>
              <ThemedText style={styles.label}>Type:</ThemedText>
              <ThemedText style={styles.value}>{item.type || '-'}</ThemedText>
            </ThemedView>

            <ThemedView style={styles.row}>
              <ThemedText style={styles.label}>Status:</ThemedText>
              <ThemedText
                style={[
                  styles.value,

                  { color: item.status === 'completed' ? 'green' : 'orange' },
                ]}
              >
                {item.status || 'Pending'}
              </ThemedText>
            </ThemedView>
          </ThemedView>
        )}
        contentContainerStyle={styles.flatListContent}
      />
    </ThemedView>
  );
}


