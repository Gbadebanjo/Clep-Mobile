import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Check, ChevronDown } from "lucide-react-native";
import React, { useState } from "react";
import {
    FlatList,
    Image,
    Modal,
    TouchableOpacity,
    useColorScheme
} from "react-native";
import { StoreSelectStyles } from "./style";

interface StoreSelectProps {
  options: { id: string; name: string; image: string }[];
  placeholder?: string;
  onChange: (store: any) => void;
}

const StoreSelect: React.FC<StoreSelectProps> = ({
  options = [],
  placeholder = "Select a store",
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const colorScheme = useColorScheme() as 'light' | 'dark';
    const styles = StoreSelectStyles  (colorScheme);
  
  const handleSelect = (option: any) => {
    setSelectedOption(option);
    setIsOpen(false);
    onChange(option);
  };

  return (
    <>
      {/* Selected Option Display */}
      <TouchableOpacity
        style={styles.selectorButton}
        onPress={() => setIsOpen(true)}
        activeOpacity={0.8}
      >
        <ThemedView style={styles.selectorContent}>
          <ThemedView style={styles.selectorLeft}>
            {selectedOption ? (
              <>
                <Image
                  source={{ uri: selectedOption.image }}
                  style={styles.storeImage}
                />
                <ThemedText style={styles.selectedText}>{selectedOption.name}</ThemedText>
              </>
            ) : (
              <ThemedText style={styles.placeholder}>{placeholder}</ThemedText>
            )}
          </ThemedView>
          <ChevronDown
            size={20}
            color="#9CA3AF"
            style={{ transform: [{ rotate: isOpen ? "180deg" : "0deg" }] }}
          />
        </ThemedView>
      </TouchableOpacity>

      {/* Dropdown Modal */}
      <Modal
        visible={isOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setIsOpen(false)}
      >
        <ThemedView style={styles.overlay}>
          <ThemedView style={styles.modal}>
            <ThemedText style={styles.modalTitle}>Select a Store</ThemedText>

            <FlatList
              data={options}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.optionItem,
                    selectedOption?.id === item.id && styles.optionSelected,
                  ]}
                  onPress={() => handleSelect(item)}
                  activeOpacity={0.7}
                >
                  <ThemedView style={styles.optionContent}>
                    <Image
                      source={{ uri: item.image }}
                      style={styles.optionImage}
                    />
                    <ThemedText style={styles.optionText}>{item.name}</ThemedText>
                  </ThemedView>
                  {selectedOption?.id === item.id && (
                    <Check size={20} color="#D84773" />
                  )}
                </TouchableOpacity>
              )}
            />

            {/* Cancel Button */}
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setIsOpen(false)}
            >
              <ThemedText style={styles.cancelText}>Cancel</ThemedText>
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      </Modal>
    </>
  );
};

export default StoreSelect;


