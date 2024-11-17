import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { RelativePathString, router } from 'expo-router';
import { EUrls } from '@/utils';
import { IRecipe } from '@/api';
import { formatDate } from '@/utils/functions';
import { Rating } from '../elements';
import { CalendarIcon, ProfileIcon } from '../icons';

const SuperDeliciousCard: React.FC<IRecipe> = ({ id, title, author, createdAt, image }) => {
  const handlePress = () => {
    router.push(`${EUrls.RECIPE}/${id}/` as RelativePathString);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="flex-col rounded-lg border border-gray-200 overflow-hidden shadow-lg"
    >
      <View className="w-[348px] h-[265px]">
        <Image
          source={{ uri: image }}
          alt={title}
          style={{
            width: 100,
            height: 100,
          }}
          resizeMode="cover"
        />
      </View>
      <View className="bg-white p-4">
        <View className="flex-col space-y-4">
          <Rating />
          <Text className="text-black font-semibold text-lg">{title}</Text>
          {author && (
            <View className="flex-row items-center space-x-2">
              <View className="w-8 h-8 rounded-full overflow-hidden">
                <ProfileIcon />
              </View>
              <Text className="text-black font-normal text-sm">
                {author.firstName} {author.lastName}
              </Text>
            </View>
          )}
        </View>
        <View className="mt-4 flex-row items-center space-x-2">
          <CalendarIcon />
          <Text className="text-gray-500 text-xs">{formatDate(createdAt)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SuperDeliciousCard;
