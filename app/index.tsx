import React, { useEffect } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
// import { Slider, ThroughCategories, SuperDelicious, ShareYourRecipe, LatestRecipes } from '@/components/sections';
import { StatusBar } from 'expo-status-bar';

const App: React.FC = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: 'TasteBite',
    });
  }, [navigation]);

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View>
          <Text>Tastebite</Text>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#ffd7c9" style="light" />
    </SafeAreaView>
  );
};

export default App;
