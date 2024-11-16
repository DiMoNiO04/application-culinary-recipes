import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import { useEffect } from 'react';
import '../global.css';
import { View } from 'react-native';

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

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;

  return <View className="font-playfairRegular text-2">1234</View>;
};

export default RootLayout;
