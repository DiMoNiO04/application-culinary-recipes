import React, { useEffect } from 'react';
import { FlatList, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Footer, Header } from '@/components/layouts';
import { LoginForm } from '@/components/forms';

const LoginPage: React.FC = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: 'About',
    });
  }, [navigation]);

  return (
    <SafeAreaView className="bg-white h-full">
      <Header />
      <FlatList
        data={[1]}
        renderItem={() => (
          <View className="my-16 px-4">
            <Text className="font-playfairBold text-black text-5xl pb-7 border-b border-greyLight mb-16">Login</Text>
            <LoginForm />
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

export default LoginPage;
