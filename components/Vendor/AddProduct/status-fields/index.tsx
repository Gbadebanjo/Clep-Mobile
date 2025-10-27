import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { CreateProductForm } from "@/types/product";
import React from "react";
import { useColorScheme } from "react-native";
import SelectField from "../select-field";
import { StatusFieldsStyles } from "./style";

interface IProps {
  value: string;
  setValues: (
    values: React.SetStateAction<CreateProductForm>,
    shouldValidate?: boolean
  ) => void | Promise<void>;
}

const StatusFields: React.FC<IProps> = ({ value, setValues }) => {
    const colorScheme = useColorScheme() as 'light' | 'dark';
    const styles = StatusFieldsStyles(colorScheme);
  
  return (
    <ThemedView style={styles.card}>
  
      <ThemedView style={styles.cardContent}>
      <ThemedView style={styles.cardHeader}>
        <ThemedText style={styles.cardTitle}>Status</ThemedText>
        <ThemedText style={styles.cardDescription}>
          Set the status of your product
        </ThemedText>
      </ThemedView>
        <SelectField
          label="Status"
          value={value}
          items={[
            { value: "draft", label: "Draft" },
            { value: "published", label: "Published" },
          ]}
          placeholder="Select status"
          onChange={(val: string) =>
            setValues((prev: CreateProductForm) => ({
              ...prev,
              status: val,
            }))
          }
        />
      </ThemedView>
    </ThemedView>
  );
};

export default StatusFields;

