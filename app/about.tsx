import React, { useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { AboutMain, Operating, SimpleRecipes, TalentTeam } from '@/components/sections';
import { Footer } from '@/components/layouts';

const AboutPage: React.FC = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: 'TasteBite',
    });
  }, [navigation]);

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View>
          <AboutMain />
          <SimpleRecipes />
          <TalentTeam />
          <Operating />
          <Footer />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#ffd7c9" style="light" />
    </SafeAreaView>
  );
};

export default AboutPage;
