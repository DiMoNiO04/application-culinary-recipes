import React, { useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
// import { Slider, ThroughCategories, SuperDelicious, ShareYourRecipe, LatestRecipes } from '@/components/sections';
import { StatusBar } from 'expo-status-bar';
import { SuperDelicious, ThroughCategories } from '@/components/sections';

const App: React.FC = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: 'TasteBite',
    });
  }, [navigation]);

  return (
    <SafeAreaView className="bg-primary h-full">
      <View>
        <ThroughCategories />
        <SuperDelicious />
      </View>
      <StatusBar backgroundColor="#ffd7c9" style="light" />
    </SafeAreaView>
  );
};

export default App;
