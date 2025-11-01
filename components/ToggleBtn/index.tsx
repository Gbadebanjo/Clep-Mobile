import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, TouchableOpacity } from "react-native";

interface ToggleButtonProps {
  isEnabled?: boolean;
  onToggle: (value: boolean) => void;
  disabled?: boolean;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  isEnabled = false,
  onToggle,
  disabled = false,
}) => {
  const translateX = useRef(new Animated.Value(isEnabled ? 24 : 0)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: isEnabled ? 24 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isEnabled]);

  const toggleSwitch = () => {
    if (!disabled) {
      onToggle(!isEnabled);
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.toggleContainer,
        isEnabled && styles.enabled,
        disabled && styles.disabledContainer,
      ]}
      onPress={toggleSwitch}
      activeOpacity={disabled ? 1 : 0.7}
      disabled={disabled}
    >
      <Animated.View
        style={[
          styles.toggleCircle,
          { transform: [{ translateX }] },
          disabled && styles.disabledCircle,
        ]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  toggleContainer: {
    width: 50,
    height: 28,
    borderRadius: 20,
    backgroundColor: "#B0B0B0",
    justifyContent: "center",
    padding: 3,
  },
  enabled: {
    backgroundColor: "#7A5AF8",
  },
  disabledContainer: {
    opacity: 0.5,
  },
  toggleCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#FFFFFF",
  },
  disabledCircle: {
    backgroundColor: "#E5E5E5",
  },
});

export default ToggleButton;
