import React, { useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { LatestRecipes, ShareYourRecipe, SuperDelicious, ThroughCategories } from '@/components/sections';

const App: React.FC = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: 'TasteBite',
    });
  }, [navigation]);

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View>
          <ThroughCategories />
          <SuperDelicious />
          <ShareYourRecipe />
          <LatestRecipes />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#ffd7c9" style="light" />
    </SafeAreaView>
  );
};

export default App;
