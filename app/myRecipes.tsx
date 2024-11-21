import React, { useEffect } from 'react';
import { FlatList, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Footer, Header } from '@/components/layouts';
import { RecipesUser } from '@/components/sections';

const MyRecipesPage: React.FC = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: 'My Recipes',
    });
  }, [navigation]);

  return (
    <SafeAreaView className="bg-white h-full">
      <Header />
      <FlatList
        data={[1]}
        renderItem={() => (
          <View>
            <RecipesUser />
          </View>
        )}
        keyExtractor={(item) => item.toString()}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<Footer />}
      />
      <StatusBar backgroundColor="#ffd7c9" style="light" />
    </SafeAreaView>
  );
};

export default MyRecipesPage;
