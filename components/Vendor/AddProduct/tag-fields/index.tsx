import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { CreateProductForm } from '@/types/product';
import { X } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import {
    Keyboard,
    TextInput,
    TouchableOpacity,
    useColorScheme
} from 'react-native';
import { TagFieldsStyles } from './style';

interface TagFieldProps {
  setValues?: (
    values: React.SetStateAction<CreateProductForm>,
    shouldValidate?: boolean
  ) => Promise<void>;
  errors?: Record<string, any>;
  touched?: Record<string, any>;
  tags?: { tag: string }[];
}

const DEFAULT_TAGS = [{ tag: 'Vazzel' }, { tag: 'Fashion' }, { tag: 'NIN Verify' }];

const TagField: React.FC<TagFieldProps> = ({
  setValues,
  errors,
  touched,
  tags = [],
}) => {
  const [newTag, setNewTag] = useState('');

  // ✅ Add default tags when there are none
  useEffect(() => {
    if (tags.length === 0 && setValues) {
      setValues((prev: CreateProductForm) => ({
        ...prev,
        tags: DEFAULT_TAGS,
      }));
    }
  }, [tags, setValues]);

  const addTag = () => {
    if (newTag.trim()) {
      const tagToAdd = { tag: newTag.trim() };
      setValues?.((prev: CreateProductForm) => ({
        ...prev,
        tags: [...prev.tags, tagToAdd],
      }));
      setNewTag('');
      Keyboard.dismiss();
    }
  };

  const removeTag = (index: number) => {
    setValues?.((prev: CreateProductForm) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };
  const colorScheme = useColorScheme() as 'light' | 'dark';
  const styles = TagFieldsStyles(colorScheme);

  return (
    <ThemedView style={styles.card}>
    <ThemedView style={styles.innerCard}>       
        
      <ThemedText style={styles.title}>Product Tags</ThemedText>
      <ThemedText style={styles.description}>Add tags to categorize your product</ThemedText>

      <ThemedView style={styles.tagsContainer}>
        {tags.map((item, index) => (
          <ThemedView key={index.toString()} style={styles.tag}>
            <ThemedText style={styles.tagText}>{item.tag}</ThemedText>
            <TouchableOpacity
              onPress={() => removeTag(index)}
              style={styles.removeBtn}
            >
              <X size={14} color="#333" />
            </TouchableOpacity>
          </ThemedView>
        ))}
      </ThemedView>

      {/* Input Row */}
      <ThemedView style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Add a tag..."
          value={newTag}
          onChangeText={setNewTag}
          onSubmitEditing={addTag}
          returnKeyType="done"
        />
        <TouchableOpacity
          onPress={addTag}
          disabled={!newTag.trim()}
          style={[
            styles.addButton,
            !newTag.trim() && { opacity: 0.5 },
          ]}
        >
          <ThemedText style={styles.addButtonText}>Add</ThemedText>
        </TouchableOpacity>
      </ThemedView>

      <ThemedText style={styles.helperText}>Press “Done” to add a tag</ThemedText>

      {errors?.tags && touched?.tags && (
        <ThemedText style={styles.errorText}>Please add at least one tag</ThemedText>
      )}
    </ThemedView>
    </ThemedView>
  );
};

export default TagField;


