import { Feather } from '@expo/vector-icons';
import React, { useCallback, useEffect } from 'react';
import {
    Animated,
    FlatList,
    Modal,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    useColorScheme,
    View
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
  const colorScheme = useColorScheme() as 'light' | 'dark';
  const styles = SelectFieldStyles(colorScheme);
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

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TouchableOpacity
        style={[styles.trigger, disabled && { opacity: 0.6 }]}
        onPress={() => !disabled && setOpen(true)}
        activeOpacity={0.8}
      >
        {leftIcon && <View style={{ marginRight: 8 }}>{leftIcon}</View>}
        <View style={{ flex: 1 }}>
          <Text style={[styles.valueText, !selectedLabel && styles.placeholder]}>
            {selectedLabel || placeholder}
          </Text>
        </View>

        {/* Dropdown Icon */}
        <Animated.View style={{ transform: [{ rotate }] }}>
          <Feather name="chevron-down" size={20} color="#666" />
        </Animated.View>
      </TouchableOpacity>

      {error && <Text style={styles.errorText}>{error}</Text>}

      {/* Modal for list of options */}
      <Modal visible={open} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={() => setOpen(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <FlatList
                data={items}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.option}
                    onPress={() => handleSelect(item.value)}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        value === item.value && { fontWeight: '700', color: '#007AFF' },
                      ]}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default React.memo(SelectField);


