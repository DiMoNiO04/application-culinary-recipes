import React from 'react';
import { View, FlatList } from 'react-native';
import { ErrorFetch, Loading, NothingMessage, TitleSection } from '@/components/ui';
import { useGetRecipes } from '@/api/hooks';
import { SuperDeliciousCard } from '../cards';

const SuperDelicious: React.FC = () => {
  const { data: recipes, isError, isLoading, message } = useGetRecipes();

  return (
    <View className="p-4">
      <TitleSection title="Super Delicious" />

      {isLoading && !isError && <Loading />}
      {isError && !isLoading && <ErrorFetch />}

      {!isLoading && !isError && recipes && recipes.length > 0 ? (
        <FlatList
          data={recipes.slice(0, 6)}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          renderItem={({ item }) => <SuperDeliciousCard key={item.id} {...item} />}
          columnWrapperStyle={{ gap: 6 }}
          contentContainerStyle={{ gap: 12 }}
        />
      ) : (
        !isLoading &&
        !isError &&
        recipes &&
        recipes.length === 0 && <NothingMessage text={message || 'No recipes available at the moment.'} />
      )}
    </View>
  );
};

export default SuperDelicious;
