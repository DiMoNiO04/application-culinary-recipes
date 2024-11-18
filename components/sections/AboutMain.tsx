import React from 'react';
import { View, Text, Image } from 'react-native';
import { TitleSection } from '../ui';

const AboutMain: React.FC = () => {
  return (
    <View className="mt-40 px-4 mb-16">
      <Text className="text-4xl font-playfairBold text-black pb-2 border-b border-gray-300 mb-4">About</Text>

      <View className="flex flex-col gap-4">
        <TitleSection title="We’re a group of foodies who love cooking and the internet" />

        <View className="w-full">
          <Image
            source={require('@/assets/images/templates/aboutMain.webp')}
            alt="Share your recipe"
            style={{ width: '100%', height: 'auto', aspectRatio: 1 }}
            className="rounded-lg"
          />
        </View>

        <Text className="font-interRegular text-grey">
          Food qualities braise chicken cuts bowl through slices butternut snack. Tender meat juicy dinners. One-pot low
          heat plenty of time adobo fat raw soften fruit. Sweet renders bone-in marrow richness kitchen, fricassee
          basted pork shoulder. Delicious butternut squash hunk.
        </Text>
      </View>
    </View>
  );
};

export default AboutMain;
