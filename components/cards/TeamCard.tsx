import React from 'react';
import { View, Text, Image } from 'react-native';

interface ITeamCard {
  name: string;
  description: string;
  img: string;
}

const TeamCard: React.FC<ITeamCard> = ({ name, description, img }) => {
  return (
    <View className="items-center w-1/2 px-2 ">
      <View className="w-full aspect-square rounded-full">
        <Image source={{ uri: img.uri }} alt={name} className="w-full h-full" resizeMode="cover" />
      </View>
      <Text className="text-[14px] font-interRegular text-black my-2 text-center">{name}</Text>
      <Text className="text-[12px] text-grey text-center">{description}</Text>
    </View>
  );
};

export default TeamCard;
