import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { LogoIcon } from '@/components/icons';
import { MenuHeader, UserProfile, BurgerBtn } from '@/components/elements';
import { Socials } from '@/components/ui';
import { useHeader } from '@/hooks';

const Header: React.FC = () => {
  const { isScrolled, isOpenBurger, handleBurgerToggle } = useHeader();

  return (
    <View className={`fixed top-0 left-0 w-full z-10 bg-whiteDark ${isScrolled || (isOpenBurger && 'bg-white')}`}>
      <View className="flex flex-row justify-between items-center px-4 py-3">
        <TouchableOpacity>
          <LogoIcon />
        </TouchableOpacity>

        <View className="flex flex-row items-center gap-x-4">
          {/* <SearchToggle /> */}
          <UserProfile />
          <BurgerBtn isOpen={isOpenBurger} onClick={handleBurgerToggle} />
        </View>
      </View>

      {isOpenBurger && (
        <View className="bg-whiteDark flex flex-col items-center px-4 py-6 space-y-4 absolute top-24 left-0 w-full">
          <MenuHeader />
          <Socials />
        </View>
      )}
    </View>
  );
};

export default Header;
