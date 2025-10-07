import React from 'react';
import { View, Text, TouchableOpacity, TextInput,  } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme.web';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // for close + timer icons
import { HeightStyles } from '@/components/Measurement/Height/styles';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import DynamicButton from '@/components/General/DynamicButton';

export default function Height() {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const styles = HeightStyles(colorScheme);


  return (
    <ThemedView style={styles.container}>
      <View style={styles.contentContainer}>
        <ThemedText style={styles.timerText}>
          What is your height?
        </ThemedText>
        {/* Description */}
        <ThemedText style={styles.description}>
          Please enter you  height to get your accurate measurement.
        </ThemedText>

        <TextInput
          style={styles.input}
          placeholder="Height (CM)"
          keyboardType="numeric"
        />
        <DynamicButton
          text="Next"
          href="/measurement/uploadPhoto"
          backgroundColor={Colors[colorScheme].text}
          textColor={Colors[colorScheme].background}
          size="large"
          buttonStyle={{ width: '50%', alignSelf: "center", height: 50 }}
        />
      </View>
    </ThemedView>
  );
}