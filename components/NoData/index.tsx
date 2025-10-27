import React from "react";
import {
    Text,
    TextStyle,
    TouchableOpacity,
    useColorScheme,
    View,
    ViewStyle
} from "react-native";
import { NoDataStyles } from "./style";

interface NoDataProps {
  icon?: React.ReactNode;
  title?: string;
  subtitle?: string;
  description?: string;
  buttonText?: string;
  onButtonClick?: () => void;
  onButtonClickRight?: () => void;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  descriptionStyle?: TextStyle;
}

export default function NoDataField({
  icon,
  title = "No Data Available",
  subtitle = "",
  description = "There is no data to display at the moment.",
  buttonText = "Retry",
  onButtonClick,
  onButtonClickRight,
  containerStyle,
  titleStyle,
  descriptionStyle,
}: NoDataProps) {
    const colorScheme = useColorScheme() as 'light' | 'dark';
    const styles = NoDataStyles(colorScheme);
  return (
    <View style={[styles.container, containerStyle]}>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}

      {onButtonClickRight ? (
        <TouchableOpacity
          style={styles.rightButton}
          onPress={onButtonClickRight}
        >
          <Text style={styles.rightButtonText}>{buttonText}</Text>
        </TouchableOpacity>
      ) : null}

      <View style={styles.iconContainer}>{icon}</View>

      <Text style={[styles.title, titleStyle]}>{title}</Text>
      <Text style={[styles.description, descriptionStyle]}>{description}</Text>

      {onButtonClick ? (
        <TouchableOpacity style={styles.button} onPress={onButtonClick}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}


