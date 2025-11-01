import { ThemedLoader } from "@/components/ThemedLoader";
import React from "react";
import { Image, Text, useColorScheme, View } from "react-native";
import { ProfileImageCompStyles } from "./style";

interface ProfileImageCompProps {
  style?: object;
  imageSize?: number;
  firstName?: string;
  lastName?: string;
  profileImageUrl?: string | null;
  isLoading?: boolean;
  error?: string | null;
}

const ProfileImageComp: React.FC<ProfileImageCompProps> = ({
  style,
  imageSize = 54,
  firstName = "",
  lastName = "",
  profileImageUrl = null,
  isLoading = false,
  error = null,
}) => {
  const hasProfile = !!profileImageUrl;
  const colorScheme = useColorScheme() as "light" | "dark";
  const styles =ProfileImageCompStyles (colorScheme);
  if (isLoading) {
    return (
  <ThemedLoader/>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    
    <View style={[styles.container, style]}>
      {/* Profile Image */}
      <View
        style={[
          styles.imageWrapper,
          { width: imageSize, height: imageSize, borderRadius: imageSize / 2 },
        ]}
      >
        {hasProfile ? (
          <Image source={{ uri: profileImageUrl }} style={styles.image} />
        ) : (
          <View style={[styles.placeholder, { borderRadius: imageSize / 2 }]} />
        )}
      </View>

      {/* User Name */}
      <View style={styles.textWrapper}>
        <Text style={styles.nameText}>
          {firstName} {lastName}
        </Text>
      </View>
    </View>
  );
};

export default ProfileImageComp;


