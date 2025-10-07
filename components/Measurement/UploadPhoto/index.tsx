import React, { useState } from 'react';
import { View, Text, Image, Modal, TouchableOpacity } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme.web';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useMutation } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';
import { useAuthStore } from '@/store';
import { ThemedView } from '@/components/ThemedView';
import { UploadPhotoStyles } from './style';
import { AIScanAnimation } from '@/components/General/AIScanAnimationProps';
import { SubmitButton } from '@/components/General/SubmitButton';
import { MeasurementAPI } from '@/apis/measurement-api';

export default function UploadPhoto() {
  const colorScheme = useColorScheme();
  const styles = UploadPhotoStyles(colorScheme);
  const router = useRouter();
  const user = useAuthStore((store) => store.user);

  const [imageUri, setImageUri] = useState<string | null>(null);
  const [showOptions, setShowOptions] = useState(false);

  const measurementAPI = new MeasurementAPI(user?.token);

  const uploadImage = useMutation({
    mutationFn: async ({
      username,
      height,
      imageUri,
    }: {
      username: string;
      height: string;
      imageUri: string;
    }) => {
      const imageFile: any = {
        uri: imageUri,
        name: 'photo.jpg',
        type: 'image/jpeg',
      };

      return measurementAPI.uploadAIMeasurement({
        username,
        height,
        image: imageFile,
      });
    },
    onSuccess: () => {
      Toast.show({
        type: 'success',
        text1: 'Image uploaded successfully!',
      });
      
      setTimeout(() => {  
        router.push('/measurement/data');
      }, 500);
    },
    onError: (error: any) => {
      Toast.show({
        type: 'error',
        text1: error?.message || 'Upload failed',
      });
      setImageUri(null);
    },
  });

  // Handles both camera and gallery
  const handlePickOption = async (fromCamera: boolean) => {
    setShowOptions(false);
    setTimeout(async () => {
      let result;
      if (fromCamera) {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          Toast.show({
            type: 'error',
            text1: 'Camera permission denied',
          });
          return;
        }
        result = await ImagePicker.launchCameraAsync({
          mediaTypes: ['images'],
          allowsEditing: true,
          aspect: [9, 16],
          quality: 0.5, 
        });
      } else {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Toast.show({
            type: 'error',
            text1: 'Gallery permission denied',
          });
          return;
        }
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images'], 
          allowsEditing: true,
          aspect: [9, 16],
          quality: 0.5,
        });
      }
      if (!result.canceled) {
        const uri = result.assets[0].uri;
        setImageUri(uri);
        uploadImage.mutate({
          username: user?.id ?? '',
          height: '180',
          imageUri: uri,
        });
      }
    }, 300); 
  };

  return (
    <ThemedView style={styles.container}>
      {/* Title */}
      {!uploadImage.isPending ? (
        <>
          <Text style={styles.title}>Unlock Your True Measurements</Text>
          <Text style={styles.subtitle}>
            Upload a full-body photo, and our AI will calculate your exact body
            dimensions for the perfect fit.
          </Text>
        </>
      ) : (
        <>
          <Text style={styles.title}>Analyzing Your Image</Text>
          <Text style={styles.subtitle}>
            Our AI is processing your photo to extract precise body measurements.
            This may take a few seconds. Sit tight!
          </Text>
        </>
      )}

      {/* Image or Animation */}
      <View style={styles.imageContainer}>
        {uploadImage.isPending ? (
          <AIScanAnimation imageUrl={imageUri || ''} />
        ) : (
          <Image
            source={require('@/assets/images/human-size.png')}
            style={styles.placeholderImage}
            resizeMode="cover"
          />
        )}
      </View>

      {/* Upload Button */}
      {!uploadImage.isPending && (
        <>
          <SubmitButton
            text={imageUri ? 'Re-upload Photo' : 'Upload Photo'}
            onPress={() => setShowOptions(true)}
            isLoading={uploadImage.isPending}
            buttonStyle={styles.uploadButton}
            textStyle={{}}
          />
          <Modal
            visible={showOptions}
            transparent
            animationType="fade"
            onRequestClose={() => setShowOptions(false)}
          >
            <View style={{ flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'rgba(0,0,0,0.5)' }}>
              <View style={{ backgroundColor:'#fff', borderRadius:10, padding:24, width:280 }}>
                <Text style={{ fontSize:18, marginBottom:16, color: '#3E071A' }}>Select Option</Text>
                <TouchableOpacity
                  onPress={() => {
                    setShowOptions(false);
                    setTimeout(() => handlePickOption(false), 300);
                  }}
                  style={{ marginBottom:16 }}
                >
                  <Text style={{ fontSize:16 }}>Choose from Gallery</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setShowOptions(false);
                    setTimeout(() => handlePickOption(true), 300);
                  }}
                >
                  <Text style={{ fontSize:16 }}>Take Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setShowOptions(false)} style={{ marginTop:16 }}>
                  <Text style={{ color:'red', textAlign:'center' }}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </>
      )}

      <Toast />
    </ThemedView>
  );
}