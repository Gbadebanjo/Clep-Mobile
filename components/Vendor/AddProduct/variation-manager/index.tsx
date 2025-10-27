import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { CreateProductForm, Variation } from "@/types/product";
import React, { useEffect, useState } from "react";
import {
    ScrollView,
    TextInput,
    TouchableOpacity,
    useColorScheme
} from "react-native";
import { VariationManagerStyles } from "./style";

interface VariationManagerProps {
  variations: Variation[];
  updateVariations: (variations: Variation[]) => void;
  setValues: (
    values: React.SetStateAction<CreateProductForm>,
    shouldValidate?: boolean
  ) => void | Promise<void>;
  productName?: string;
}

const defaultPlaceholders: Record<string, string> = {
  Color: "Blue",
  Size: "Small",
  Material: "Cotton",
};

const VariationManager: React.FC<VariationManagerProps> = ({
  variations = [],
  updateVariations,
  setValues,
  productName = "",
}) => {
  const [expanded, setExpanded] = useState<string[]>([]);

  // Initialize default variation
  useEffect(() => {
    if (variations.length === 0) {
      const newVariation: Variation = {
        id: Date.now().toString(),
        name: productName || "",
        price: 0,
        sale_price: 0,
        stock: 1,
        quantity: 0,
        sku: "",
        image: null,
        attributes: [],
        is_visible: true,
        low_stock_threshold: 5,
      };
      updateVariations([newVariation]);
      setExpanded([newVariation.id]);
    } else {
      setExpanded(variations.map((v) => v.id));
    }
  }, []);

  // Automatically update variation name when productName changes
  useEffect(() => {
    if (productName && variations.length > 0) {
      updateVariations(
        variations.map((v) => ({
          ...v,
          name: productName,
        }))
      );
    }
  }, [productName]);

  const updateVariation = (id: string, field: keyof Variation, value: any) => {
    updateVariations(
      variations.map((v) => (v.id === id ? { ...v, [field]: value } : v))
    );
  };

  const updateMultipleFields = (
    id: string,
    fields: Array<keyof Variation>,
    value: any
  ) => {
    updateVariations(
      variations.map((v) =>
        v.id === id
          ? { ...v, ...Object.fromEntries(fields.map((f) => [f, value])) }
          : v
      )
    );
  };

  const addAttribute = (variationId: string) => {
    const variation = variations.find((v) => v.id === variationId);
    if (!variation) return;
    const newAttr = { name: "", value: "" };
    const updated = [...(variation.attributes || []), newAttr];
    updateVariation(variationId, "attributes", updated);
  };

  const updateAttribute = (
    variationId: string,
    index: number,
    field: "name" | "value",
    value: string
  ) => {
    const variation = variations.find((v) => v.id === variationId);
    if (!variation || !variation.attributes) return;
    const updated = [...variation.attributes];
    updated[index][field] = value;
    updateVariation(variationId, "attributes", updated);
  };

  const removeAttribute = (variationId: string, index: number) => {
    const variation = variations.find((v) => v.id === variationId);
    if (!variation || !variation.attributes) return;
    const updated = variation.attributes.filter((_, i) => i !== index);
    updateVariation(variationId, "attributes", updated);
  };
  const colorScheme = useColorScheme() as 'light' | 'dark';
  const styles = VariationManagerStyles(colorScheme);

  return (
    <ScrollView style={styles.card}>
  

      {variations.map((variation) => (
        <ThemedView key={variation.id} style={styles.section}>
                <ThemedText style={styles.title}>Product Variations</ThemedText>
      <ThemedText style={styles.description}>
        Add details like different sizes, colors, or materials
      </ThemedText>
          {/* Product Name (auto-filled and not editable) */}
          <ThemedText style={styles.label}>Product Name</ThemedText>
          <TextInput
            style={[styles.input, { backgroundColor: "#f3f3f3" }]}
            value={productName || variation.name}
            editable={false}
          />

          {/* SKU */}
          <ThemedText style={styles.label}>SKU (auto-generated)</ThemedText>
          <TextInput
            style={[styles.input, { backgroundColor: "#f3f3f3" }]}
            editable={false}
            value={variation.sku || "Will be generated"}
          />

          {/* Price */}
          <ThemedText style={styles.label}>Original Price</ThemedText>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={variation.price.toString()}
            onChangeText={(text) =>
              updateVariation(variation.id, "price", Math.max(+text || 0, 0))
            }
          />

          {/* Sale Price */}
          <ThemedText style={styles.label}>Sale Price (Last Price)</ThemedText>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={variation.sale_price.toString()}
            onChangeText={(text) =>
              updateVariation(variation.id, "sale_price", Math.max(+text || 0, 0))
            }
          />

          {/* Stock */}
          <ThemedText style={styles.label}>Stock (Quantity)</ThemedText>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={variation?.stock?.toString()}
            onChangeText={(text) =>
              updateMultipleFields(variation.id, ["stock", "quantity"], +text || 0)
            }
          />

          {/* Low Stock */}
          <ThemedText style={styles.label}>Low Stock Threshold</ThemedText>
          <TextInput
            style={[styles.input, { backgroundColor: "#f3f3f3" }]}
            editable={false}
            value={(variation.low_stock_threshold || 5).toString()}
          />

          {/* Attributes */}
          <ThemedView style={styles.attrHeader}>
            <ThemedText style={{ fontSize: 14, fontWeight: "500", color: "#000" }}>
              Attributes{"\n"}
              <ThemedText style={{ fontSize: 12, color: "#9f0e42", fontWeight: "400" }}>
                Color: Red{"\n"}
                Size: Medium{"\n"}
                Material: Cotton
              </ThemedText>
            </ThemedText>

            <TouchableOpacity
              onPress={() => addAttribute(variation.id)}
              style={styles.addAttrBtn}
            >
              <ThemedText style={styles.addAttrText}>+ Add Attribute</ThemedText>
            </TouchableOpacity>
          </ThemedView>

          {(!variation.attributes || variation.attributes.length === 0) && (
            <ThemedText style={styles.noAttr}>No attributes added</ThemedText>
          )}

          {variation.attributes?.map((attr, attrIndex) => (
            <ThemedView key={attrIndex} style={styles.attrRow}>
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="Color"
                value={attr.name}
                onChangeText={(text) =>
                  updateAttribute(variation.id, attrIndex, "name", text)
                }
              />
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder={defaultPlaceholders[attr.name] || "Blue"}
                value={attr.value}
                onChangeText={(text) =>
                  updateAttribute(variation.id, attrIndex, "value", text)
                }
              />
              <TouchableOpacity
                onPress={() => removeAttribute(variation.id, attrIndex)}
                style={styles.deleteSmall}
              >
                <ThemedText style={{ color: "red", fontSize: 20 }}>×</ThemedText>
              </TouchableOpacity>
            </ThemedView>
          ))}
        </ThemedView>
      ))}
    </ScrollView>
  );
};

export default VariationManager;


