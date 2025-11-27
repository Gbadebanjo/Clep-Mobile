import React, { useEffect, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  useColorScheme,
  ListRenderItemInfo,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { Variation } from '@/types/product';
import {
  variationSelectorStyles,
  NUM_COLUMNS,
} from './style';

type Props = {
  variations: Variation[];
  selectedVariation?: Variation & { image?: string | null };
  onVariationSelect: (variation: Variation & { image?: string | null }) => void;
  containerStyle?: any;
};

const PLACEHOLDER =
  'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';

function getVariationImage(variation: Variation): string | undefined {
  if (variation?.images && Array.isArray(variation.images) && variation.images.length > 0) {
    const first = variation.images[0];
    if (!first) return undefined;

    const img = first.image;
    if (typeof img === 'string') return img;
    if (img?.url) return img.url;
  }

  if (variation?.image) {
    const img = variation.image;
    if (typeof img === 'string') return img;
    if (img?.url) return img.url;
  }

  return undefined;
}

const isVariationAvailable = (variation: Variation): boolean =>
  (variation.quantity ?? 0) > 0 && variation.is_visible !== false;

const VariationCard: React.FC<{
  item: Variation;
  isSelected: boolean;
  onPress: (v: Variation) => void;
  styles: any;
}> = ({ item, isSelected, onPress, styles }) => {
  const image = getVariationImage(item) ?? PLACEHOLDER;
  const available = isVariationAvailable(item);

  return (
    <TouchableOpacity
      activeOpacity={available ? 0.8 : 1}
      onPress={() => available && onPress(item)}
      style={[
        styles.card,
        isSelected ? styles.cardSelected : styles.cardDefault,
        !available && styles.cardDisabled,
      ]}
    >
      <View style={styles.cardInner}>
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="cover"
        />

        <View style={styles.cardContent}>
          <Text style={styles.variationName} numberOfLines={1}>
            {item.name}
          </Text>

          {item.attributes?.length > 0 && (
            <View style={styles.attributesWrap}>
              {item.attributes.map((attr, idx) => (
                <View style={styles.badge} key={`${item.id}-attr-${idx}`}>
                  <Text style={styles.badgeText}>
                    {attr.name}: {attr.value}
                  </Text>
                </View>
              ))}
            </View>
          )}

          <View style={styles.rowSpace}>
            <View>
              <Text style={styles.priceText}>
                ₦{item.sale_price ?? item.price}
              </Text>

              {item.sale_price && item.sale_price < item.price && (
                <Text style={styles.strikedPrice}>₦{item.price}</Text>
              )}
            </View>

            <View
              style={[
                styles.stockBadge,
                !available && styles.stockBadgeDestructive,
              ]}
            >
              <Text style={styles.stockText}>
                {available ? 'In Stock' : 'Out of Stock'}
              </Text>
            </View>
          </View>

          {available && item.quantity && item.quantity < 10 && (
            <Text style={styles.lowStockText}>
              Only {item.quantity} left
            </Text>
          )}
        </View>

        {isSelected && (
          <View style={styles.checkWrapper}>
            <Feather name="check" size={16} color="#fff" />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const VariationSelector: React.FC<Props> = ({
  variations,
  selectedVariation,
  onVariationSelect,
  containerStyle,
}) => {
  const colorScheme = useColorScheme() ?? 'light';
  const styles = variationSelectorStyles(colorScheme);

  const normalizedVariations = useMemo(() => variations || [], [variations]);

  useEffect(() => {
    if (!selectedVariation && normalizedVariations.length > 0) {
      const first = normalizedVariations[0];
      onVariationSelect({
        ...first,
        image: getVariationImage(first) ?? null,
      });
    }
  }, [selectedVariation, normalizedVariations, onVariationSelect]);

  const handleSelect = (variation: Variation) => {
    onVariationSelect({
      ...variation,
      image: getVariationImage(variation) ?? null,
    });
  };

  const renderItem = ({ item }: ListRenderItemInfo<Variation>) => (
    <VariationCard
      item={item}
      isSelected={selectedVariation?.id === item.id}
      onPress={handleSelect}
      styles={styles}
    />
  );

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.title}>Select Variant</Text>

      <View style={styles.debugRow}>
        <Text style={styles.debugText}>
          {normalizedVariations.length} Variants available
        </Text>
      </View>

      <FlatList
        data={normalizedVariations}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={NUM_COLUMNS}
        scrollEnabled={false}
        columnWrapperStyle={NUM_COLUMNS > 1 ? styles.columnWrapper : undefined}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />

      {selectedVariation && (
        <View style={styles.summaryCard}>
          <View style={styles.summaryLeft}>
            <Text style={styles.summaryTitle}>
              Selected: {selectedVariation.name}
            </Text>

            {selectedVariation.attributes?.length > 0 && (
              <View style={styles.selectedAttributes}>
                {selectedVariation.attributes.map((attr, i) => (
                  <View key={`sel-${i}`} style={styles.outlineBadge}>
                    <Text style={styles.outlineBadgeText}>
                      {attr.name}: {attr.value}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          <View style={styles.summaryRight}>
            <Text style={styles.summaryPrice}>
              ₦{selectedVariation.sale_price ?? selectedVariation.price}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default VariationSelector;


