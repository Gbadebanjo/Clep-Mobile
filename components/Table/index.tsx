import { ArrowDown, ArrowUp } from "lucide-react-native";
import React, { isValidElement, useMemo, useState } from "react";
import {
    FlatList,
    ScrollView,
    Text,
    TouchableOpacity,
    useColorScheme,
    View
} from "react-native";
import NoDataField from "../NoData";
import { TableStyles } from "./style";

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

const Table = <T,>({
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
  const colorScheme = useColorScheme() as 'light' | 'dark';
  const styles = TableStyles(colorScheme);
  const handleSort = (col: Column<T>, index: number) => {
    const sortKey = col.accessor ? String(col.accessor) : `col-${index}`;
    if (sortColumn === sortKey) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(sortKey);
      setSortDirection("asc");
    }
  };

  const sortedData = useMemo(() => {
    if (!sortColumn) return data;
    const copy = [...data];

    copy.sort((a, b) => {
      let aVal: any;
      let bVal: any;

      if (sortColumn.startsWith("col-")) {
        const index = parseInt(sortColumn.replace("col-", ""));
        const col = columns[index];
        const getVal = (row: T) => {
          if (col.cell) {
            const rendered = col.cell(row, index);
            if (typeof rendered === "string" || typeof rendered === "number")
              return rendered;
            if (isValidElement(rendered)) return (rendered as React.ReactElement<any>).props.children || "";
          }
          return col.accessor ? row[col.accessor] : "";
        };
        aVal = getVal(a);
        bVal = getVal(b);
      } else {
        aVal = (a as any)[sortColumn];
        bVal = (b as any)[sortColumn];
      }

      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
      }
      return sortDirection === "asc"
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });
    return copy;
  }, [sortColumn, sortDirection, data]);

  const renderHeader = () => (
    <View style={styles.headerRow}>
      {columns.map((col, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.headerCell, { width: col.width || 150 }]}
          onPress={() => col.sorting && handleSort(col, index)}
          activeOpacity={col.sorting ? 0.6 : 1}
        >
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.headerText}
          >
            {typeof col.header === "string" ? col.header : col.header}
          </Text>
          {col.sorting && (
            <View style={{ marginLeft: 4 }}>
              {sortColumn === (col.accessor ?? `col-${index}`) ? (
                sortDirection === "asc" ? (
                  <ArrowUp size={14} color="#007bff" />
                ) : (
                  <ArrowDown size={14} color="#007bff" />
                )
              ) : (
                <ArrowDown size={14} color="#ccc" />
              )}
            </View>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderItem = ({ item, index }: { item: T; index: number }) => (
    <TouchableOpacity
      onPress={() => onRowClick?.(item)}
      style={[styles.row, index % 2 === 0 && styles.rowAlt]}
    >
      {columns.map((col, colIndex) => (
        <View key={colIndex} style={[styles.cell, { width: col.width || 150 }]}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.cellText}
          >
            {col.cell
              ? col.cell(item, index)
              : col.accessor
              ? String(item[col.accessor] ?? "")
              : ""}
          </Text>
        </View>
      ))}
    </TouchableOpacity>
  );

  const renderPagination = () => {
    if (!onPageChange) return null;

    const hasPrev = currentPage > 1;
    const hasNext = currentPage < totalPages;

    return (
      <View style={styles.paginationContainer}>
        <TouchableOpacity
          disabled={!hasPrev}
          onPress={() => hasPrev && onPageChange(currentPage - 1)}
          style={[
            styles.pageButton,
            !hasPrev && styles.pageButtonDisabled,
          ]}
        >
          <Text style={styles.pageButtonText}>Prev</Text>
        </TouchableOpacity>

        <Text style={styles.pageText}>
          Page {currentPage} of {totalPages}
        </Text>

        <TouchableOpacity
          disabled={!hasNext}
          onPress={() => hasNext && onPageChange(currentPage + 1)}
          style={[
            styles.pageButton,
            !hasNext && styles.pageButtonDisabled,
          ]}
        >
          <Text style={styles.pageButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View>
          {renderHeader()}

          {isLoading ? (
            <View style={styles.loadingContainer}>
              {/* <ActivityIndicator size="small" color="#007bff" /> */}
            </View>
          ) : data?.length === 0 ? (
            <NoDataField title="No data available" description="Try adjusting filters." />
          ) : (
            <FlatList
              data={sortedData}
              keyExtractor={(_, i) => i.toString()}
              renderItem={renderItem}
              ListFooterComponent={<View style={{ height: 80 }} />}
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          )}
        </View>
      </ScrollView>

      {renderPagination()}
    </View>
  );
};

export default Table;

