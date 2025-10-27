import { ThemedText } from '@/components/ThemedText';
import { ThemedTouchableOpacity } from '@/components/ThemedTouchableOpacity';
import { ThemedView } from '@/components/ThemedView';
import { Feather } from '@expo/vector-icons';
import React, { useCallback, useEffect } from 'react';
import {
    Animated,
    FlatList,
    Modal,
    TouchableWithoutFeedback,
    useColorScheme
} from 'react-native';
import { SelectFieldStyles } from './style';


export interface SelectItem {
  value: string;
  label: string;
}

interface IProps {
  leftIcon?: React.ReactNode;
  items: SelectItem[];
  placeholder?: string;
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  disabled?: boolean;
}

const SelectField: React.FC<IProps> = ({
  leftIcon,
  items,
  placeholder = 'Select...',
  label,
  value,
  onChange,
  error,
  disabled = false,
}) => {
  const [open, setOpen] = React.useState(false);
  const [selectedLabel, setSelectedLabel] = React.useState<string | undefined>(
    items.find((i) => i.value === value)?.label
  );

  const rotateAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setSelectedLabel(items.find((i) => i.value === value)?.label);
  }, [value, items]);

  // Animate chevron rotation
  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: open ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [open]);

  const handleSelect = useCallback(
    (val: string) => {
      setOpen(false);
      if (onChange) onChange(val);
    },
    [onChange]
  );

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });
  const colorScheme = useColorScheme() as 'light' | 'dark';
  const styles = SelectFieldStyles(colorScheme);
  return (
    <ThemedView style={styles.container}>
      {label && <ThemedText style={styles.label}>{label}</ThemedText>}

      <ThemedTouchableOpacity
        style={[styles.trigger, disabled && { opacity: 0.6 }]}
        onPress={() => !disabled && setOpen(true)}
        activeOpacity={0.8}
      >
        {leftIcon && <ThemedView style={{ marginRight: 8 }}>{leftIcon}</ThemedView>}
        <ThemedView style={{ flex: 1 }}>
          <ThemedText style={[styles.valueText, !selectedLabel && styles.placeholder]}>
            {selectedLabel || placeholder}
          </ThemedText>
        </ThemedView>

        {/* Dropdown Icon */}
        <Animated.View style={{ transform: [{ rotate }] }}>
          <Feather name="chevron-down" size={20} color="#666" />
        </Animated.View>
      </ThemedTouchableOpacity>

      {error && <ThemedText style={styles.errorText}>{error}</ThemedText>}

      {/* Modal for list of options */}
      <Modal visible={open} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={() => setOpen(false)}>
          <ThemedView style={styles.modalOverlay}>
            <ThemedView style={styles.modalContent}>
              <FlatList
                data={items}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => (
                  <ThemedTouchableOpacity
                    style={styles.option}
                    onPress={() => handleSelect(item.value)}
                  >
                    <ThemedText
                      style={[
                        styles.optionText,
                        value === item.value && { fontWeight: '700', color: '#007AFF' },
                      ]}
                    >
                      {item.label}
                    </ThemedText>
                  </ThemedTouchableOpacity>
                )}
              />
            </ThemedView>
          </ThemedView>
        </TouchableWithoutFeedback>
      </Modal>
    </ThemedView>
  );
};

export default React.memo(SelectField);


