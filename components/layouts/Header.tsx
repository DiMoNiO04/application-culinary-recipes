import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { LogoIcon } from '@/components/icons';
import { MenuHeader, UserProfile, BurgerBtn } from '@/components/elements';
import { Socials } from '@/components/ui';
import { useHeader } from '@/hooks';

const Header: React.FC = () => {
  const { isScrolled, isOpenBurger, handleBurgerToggle } = useHeader();

  return (
    <View
      className={`fixed top-0 left-0 w-full z-10 bg-white ${
        isScrolled ? 'bg-gray-100' : ''
      } ${isOpenBurger ? 'h-screen' : 'h-auto'}`}
    >
      <View className="flex flex-row justify-between items-center px-4 py-3">
        <TouchableOpacity>
          <LogoIcon />
        </TouchableOpacity>

        <View className="flex flex-row space-x-4">
          {/* <SearchToggle /> */}
          {/* <UserProfile /> */}
          <BurgerBtn isOpen={isOpenBurger} onClick={handleBurgerToggle} />
        </View>
      </View>

      {isOpenBurger && (
        <View className="bg-gray-100 flex flex-col items-center px-4 py-6 space-y-4">
          <MenuHeader />
          <Socials />
        </View>
      )}
    </View>
  );
};

export default Header;
