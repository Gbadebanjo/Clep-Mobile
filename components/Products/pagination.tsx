import { useThemeColor } from '@/hooks/useThemeColor';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { ThemedText } from '../ThemedText';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, handlePageChange }) => {
  const background = useThemeColor(
    {
      dark: '#7f1d1d',
      light: '#7f1d1d',
    },
    'background'
  );

  return (
    <Animated.View entering={FadeIn.delay(300)} style={styles.container}>
      {/* Previous button */}
      <TouchableOpacity
        onPress={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={[styles.arrowButton, currentPage === 1 ? styles.disabledButton : styles.activeArrow]}
      >
        <ChevronLeft size={20} color={currentPage === 1 ? '#9ca3af' : '#7f1d1d'} />
      </TouchableOpacity>

      {/* Page numbers */}
      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
        let pageToShow;
        if (totalPages <= 5) {
          pageToShow = i + 1;
        } else if (currentPage <= 3) {
          pageToShow = i + 1;
        } else if (currentPage >= totalPages - 2) {
          pageToShow = totalPages - 4 + i;
        } else {
          pageToShow = currentPage - 2 + i;
        }

        return (
          <TouchableOpacity
            key={pageToShow}
            onPress={() => handlePageChange(pageToShow)}
            style={[
              styles.pageButton,
              currentPage === pageToShow ? styles.activePage : styles.inactivePage,
              { backgroundColor: background },
            ]}
          >
            <ThemedText style={[styles.pageText, currentPage === pageToShow && styles.activePageText]}>
              {pageToShow}
            </ThemedText>
          </TouchableOpacity>
        );
      })}

      {/* Next button */}
      <TouchableOpacity
        onPress={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={[styles.arrowButton, currentPage === totalPages ? styles.disabledButton : styles.activeArrow]}
      >
        <ChevronRight size={20} color={currentPage === totalPages ? '#9ca3af' : '#7f1d1d'} />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    gap: 8,
  },
  arrowButton: {
    padding: 8,
    borderRadius: 999,
  },
  activeArrow: {
    backgroundColor: '#f3e8e8', // wine-100 equivalent
  },
  disabledButton: {
    backgroundColor: '#e5e7eb', // gray-100
  },
  pageButton: {
    width: 40,
    height: 40,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activePage: {
    backgroundColor: '#7f1d1d', // primary
  },
  inactivePage: {
    backgroundColor: '#e5e7eb', // gray-100
  },
  pageText: {
    fontSize: 14,
    color: '#070808ff', // gray-700
  },
  activePageText: {
    color: '#fff',
    fontWeight: '600',
  },
});
