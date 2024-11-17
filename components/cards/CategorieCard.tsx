import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { RelativePathString, router } from 'expo-router';
import { EUrls } from '@/utils';

interface ICategorieCard {
  name: string;
  image: string;
}

const CategorieCard: React.FC<ICategorieCard> = ({ name, image }) => {
  const handlePress = () => {
    router.push(`${EUrls.CATEGORIES}/${name.toLowerCase()}` as RelativePathString);
  };

  return (
    <TouchableOpacity onPress={handlePress} className="flex-col items-center justify-center gap-3 w-full">
      <View className="w-[255px] h-[255px] rounded-full overflow-hidden">
        <Image source={{ uri: image }} alt={name} className="w-full h-full object-cover" />
      </View>
      <Text className="font-interMedium text-lg text-black text-center">{name}</Text>
    </TouchableOpacity>
  );
};

export default CategorieCard;
