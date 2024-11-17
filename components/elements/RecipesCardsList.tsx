import React from 'react';
import { FlatList, View } from 'react-native';
import { NothingMessage, Loading, ErrorFetch } from '@/components/ui';
import { IRecipe } from '@/api';
import { RecipeCard } from '../cards';

interface IRecipesCardsList {
  cards: IRecipe[] | undefined;
  isLoading?: boolean;
  isError?: boolean;
  msg?: string | null;
}

const RecipesCardsList: React.FC<IRecipesCardsList> = ({ cards, isLoading, isError, msg }) => {
  if (isLoading) return <Loading />;
  if (isError) return <ErrorFetch message={msg} />;

  if (!cards || cards.length === 0) {
    return <NothingMessage text={msg!} />;
  }

  return (
    <View className="mb-10">
      <FlatList
        data={cards}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ gap: 24 }}
        renderItem={({ item }) => <RecipeCard {...item} />}
        contentContainerStyle={{ gap: 24 }}
      />
    </View>
  );
};

export default RecipesCardsList;
