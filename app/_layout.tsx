import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import { Text, View, FlatList } from 'react-native';
import { useGetRecipes } from '@/api/hooks';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  const [fontsLoaded, error] = useFonts({
    'Inter-Regular': require('../assets/fonts/Inter/inter-v18-latin-regular.ttf'),
    'Inter-Medium': require('../assets/fonts/Inter/inter-v18-latin-500.ttf'),
    'Inter-Bold': require('../assets/fonts/Inter/inter-v18-latin-700.ttf'),
    'Playfair-Regular': require('../assets/fonts/Playfair/playfair-display-v37-latin-regular.ttf'),
    'Playfair-Medium': require('../assets/fonts/Playfair/playfair-display-v37-latin-500.ttf'),
    'Playfair-Bold': require('../assets/fonts/Playfair/playfair-display-v37-latin-700.ttf'),
  });

  const { data: recipes, isLoading, isError, message } = useGetRecipes(); // Use the custom hook to get recipes

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded || error) return null;

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (isError) {
    return <Text>{message || 'Error fetching recipes'}</Text>;
  }

  return (
    <View>
      <Text className="font-playfairRegular text-2">Recipes List</Text>

      <FlatList
        data={recipes || []}
        renderItem={({ item }) => (
          <View>
            <Text>{item.title}</Text>
            <Text>{item.shortDescription}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default RootLayout;
