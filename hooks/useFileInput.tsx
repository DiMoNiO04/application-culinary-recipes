/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { launchImageLibrary } from 'react-native-image-picker';
import * as FileSystem from 'expo-file-system';
import { UseFormSetValue } from 'react-hook-form';

const useFileInput = (setValue: UseFormSetValue<any>, trigger: () => Promise<boolean>) => {
  const [filePreview, setFilePreview] = useState<string | null>(null);

  const handleFileSelect = async () => {
    launchImageLibrary({ mediaType: 'photo', quality: 1 }, async (response) => {
      if (response.assets && response.assets[0].uri) {
        const uri = response.assets[0].uri;

        try {
          const base64 = await FileSystem.readAsStringAsync(uri, {
            encoding: FileSystem.EncodingType.Base64,
          });

          setFilePreview(`data:image/jpeg;base64,${base64}`);
          setValue('image', `data:image/jpeg;base64,${base64}`);
          await trigger();
        } catch (error) {
          console.error('Error converting image to base64:', error);
        }
      }
    });
  };

  return {
    filePreview,
    handleFileSelect,
    setFilePreview,
  };
};

export default useFileInput;
