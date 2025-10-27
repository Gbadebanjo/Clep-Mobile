import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { CreateProductForm } from "@/types/product";
import React from "react";
import { TextInput, useColorScheme } from "react-native";
import { SeoFieldsStyles } from "./style";

interface IProps {
  values: CreateProductForm["seo"];
  setValues: React.Dispatch<React.SetStateAction<CreateProductForm>>;
  errors?: Partial<CreateProductForm>;
  touched?: Partial<CreateProductForm>;
}

const SeoFields: React.FC<IProps> = ({ values, setValues, errors, touched }) => {
    const colorScheme = useColorScheme() as 'light' | 'dark';
    const styles = SeoFieldsStyles(colorScheme);
  return (
    <ThemedView style={styles.card}>
   

      <ThemedView style={styles.cardContent}>
      <ThemedView style={styles.cardHeader}>
        <ThemedText style={styles.cardTitle}>SEO Settings</ThemedText>
        <ThemedText style={styles.cardDescription}>
          Optimize your product for search engines
        </ThemedText>
      </ThemedView>
        {/* SEO Title */}
        <ThemedView style={styles.field}>
          <ThemedText style={styles.label}>SEO Title</ThemedText>
          <TextInput
            style={styles.input}
            placeholder="SEO Title"
            value={values?.title || ""}
            onChangeText={(text) =>
              setValues((prev) => ({
                ...prev,
                seo: { ...prev.seo, title: text },
              }))
            }
          />
          {errors?.seo?.title && touched?.seo?.title && (
            <ThemedText style={styles.errorText}>{errors.seo.title}</ThemedText>
          )}
        </ThemedView>

        {/* SEO Description */}
        <ThemedView style={styles.field}>
          <ThemedText style={styles.label}>SEO Description</ThemedText>
          <TextInput
            style={[styles.input, styles.textarea]}
            placeholder="SEO Description"
            multiline
            value={values?.description || ""}
            onChangeText={(text) =>
              setValues((prev) => ({
                ...prev,
                seo: { ...prev.seo, description: text },
              }))
            }
          />
          {errors?.seo?.description && touched?.seo?.description && (
            <ThemedText style={styles.errorText}>{errors.seo.description}</ThemedText>
          )}
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
};

export default SeoFields;


