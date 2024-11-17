import React from 'react';
import { View } from 'react-native';
import { StarIcon } from '../icons';

interface IRating {
  rating?: number;
}

const Rating: React.FC<IRating> = ({ rating = 5 }) => {
  return (
    <View className="flex-row items-center space-x-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <StarIcon key={index} color={index < rating ? '#FF642F' : '#7f7f7f'} />
      ))}
    </View>
  );
};

export default Rating;
