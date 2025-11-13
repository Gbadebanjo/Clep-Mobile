import React, { useMemo, useState } from "react";
import {
    FlatList,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
} from "react-native";

import NoDataField from "../NoData";
import { TableStyles } from "../Table/style";


export interface Column<T> {
  header: string | React.ReactNode;
  accessor?: keyof T;
  cell?: (row: T, index: number) => React.ReactNode;
  sorting?: boolean;
  width?: number;
}

export interface CustomTableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  onRowClick?: (row: T) => void;
  totalPages?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
}

const CardTable = <T,>({
  columns,
  data,
  isLoading = false,
  onRowClick,
  totalPages = 1,
  currentPage = 1,
  onPageChange,
}: CustomTableProps<T>) => {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const colorScheme = useColorScheme() as "light" | "dark";
  const styles = TableStyles(colorScheme);

  const sortedData = useMemo(() => {
    if (!sortColumn) return data;
    const copy = [...data];
    copy.sort((a, b) => {
      const aVal = (a as any)[sortColumn];
      const bVal = (b as any)[sortColumn];
      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
      }
      return sortDirection === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
    return copy;
  }, [sortColumn, sortDirection, data]);

  const renderPagination = () => {
    if (!onPageChange) return null;
    const hasPrev = currentPage > 1;
    const hasNext = currentPage < totalPages;

    return (
      <View style={styles.paginationContainer}>
        <TouchableOpacity
          disabled={!hasPrev}
          onPress={() => hasPrev && onPageChange(currentPage - 1)}
          style={[styles.pageButton, !hasPrev && styles.pageButtonDisabled]}
        >
          <Text style={styles.pageButtonText}>Prev</Text>
        </TouchableOpacity>

        <Text style={styles.pageText}>
          Page {currentPage} of {totalPages}
        </Text>

        <TouchableOpacity
          disabled={!hasNext}
          onPress={() => hasNext && onPageChange(currentPage + 1)}
          style={[styles.pageButton, !hasNext && styles.pageButtonDisabled]}
        >
          <Text style={styles.pageButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderCard = ({ item, index }: { item: T; index: number }) => (
    <TouchableOpacity
      onPress={() => onRowClick?.(item)}
      style={{
        backgroundColor: colorScheme === "dark" ? "#1E1E1E" : "#fff",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 10,
        marginBottom: 12,
        padding: 14,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
      }}
    >
      {columns.map((col, colIndex) => {
        const value = col.cell
          ? col.cell(item, index)
          : col.accessor
          ? (item as any)[col.accessor]
          : "";

        return (
          <View
            key={colIndex}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 6,
            }}
          >
            <Text
              style={{
                fontWeight: "600",
                color: colorScheme === "dark" ? "#ccc" : "#333",
              }}
            >
              {typeof col.header === "string" ? col.header : ""}
            </Text>
            <View style={{ flexShrink: 1, alignItems: "flex-end" }}>
              {typeof value === "string" || typeof value === "number" ? (
                <Text style={{ color: "#555" }}>{String(value)}</Text>
              ) : (
                value
              )}
            </View>
          </View>
        );
      })}
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text>Loading...</Text>
        </View>
      ) : sortedData.length === 0 ? (
        <NoDataField
          title="Not found!"
          description="Try adjusting filters or switching tabs."
        />
      ) : (
        <FlatList
          data={sortedData}
          renderItem={renderCard}
          keyExtractor={(_, i) => i.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      )}
      {renderPagination()}
    </View>
  );
};

export default CardTable;
