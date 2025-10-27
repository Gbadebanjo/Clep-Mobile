import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { CreateProductForm } from "@/types/product";
import React, { useEffect, useRef } from "react";
import { TextInput, useColorScheme } from "react-native";
import { KeywordStyles } from "./style";

interface KeywordFieldProps {
  value?: string;
  setValues?: React.Dispatch<React.SetStateAction<CreateProductForm>>;
  error?: string;
  touched?: boolean;
}

const DEFAULT_KEYWORDS = "Vazzel, Fashion, NIN verify";

const KeywordField: React.FC<KeywordFieldProps> = ({
  value = "",
  setValues,
  error,
  touched,
}) => {
  const initialized = useRef(false);

  // ✅ Only apply default keywords on initial mount if empty
  useEffect(() => {
    if (!initialized.current && !value?.trim() && setValues) {
      setValues((prev: CreateProductForm) => ({
        ...prev,
        seo: {
          ...prev.seo,
          keywords: DEFAULT_KEYWORDS,
        },
      }));
      initialized.current = true;
    }
  }, [setValues]);

  const handleChange = (text: string) => {
    setValues?.((prev: CreateProductForm) => ({
      ...prev,
      seo: {
        ...prev.seo,
        keywords: text,
      },
    }));
  };
  const colorScheme = useColorScheme() as 'light' | 'dark';
  const styles = KeywordStyles(colorScheme);
  return (
    <ThemedView style={styles.card}>
    

      <ThemedView style={styles.content}>
      <ThemedView style={styles.header}>
        <ThemedText style={styles.title}>SEO Keywords</ThemedText>
        <ThemedText style={styles.description}>
          Add keywords to help customers find your product
        </ThemedText>
      </ThemedView>
        <ThemedText style={styles.label}>Keywords (comma separated)</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="e.g. sneakers, fashion, men’s shoes"
          value={value}
          onChangeText={handleChange}
          multiline
        />
        <ThemedText style={styles.hint}>
          Add relevant keywords separated by commas
        </ThemedText>
        {touched && error ? (
          <ThemedText style={styles.errorText}>{error}</ThemedText>
        ) : null}
      </ThemedView>
    </ThemedView>
  );
};

export default KeywordField;


