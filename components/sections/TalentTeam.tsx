import React from 'react';
import { View, FlatList } from 'react-native';
import { team } from '@/data';
import { TeamCard } from '../cards';
import { TitleSection } from '../ui';

const TalentTeam: React.FC = () => {
  return (
    <View className="px-4 mb-16">
      <TitleSection title="An incredible team of talented chefs and foodies" />

      <FlatList
        data={team}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => <TeamCard {...item} />}
        contentContainerStyle={{
          gap: 20,
        }}
      />
    </View>
  );
};

export default TalentTeam;
