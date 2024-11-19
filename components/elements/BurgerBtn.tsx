import React from 'react';
import { TouchableOpacity, View } from 'react-native';

interface IBurgerBtnProps {
  isOpen: boolean;
  onClick: () => void;
}

const BurgerBtn: React.FC<IBurgerBtnProps> = ({ isOpen, onClick }) => {
  return (
    <TouchableOpacity onPress={onClick} className="flex flex-col justify-around items-center w-6 h-6">
      <View
        className={`w-full h-[2px] bg-black transition-transform duration-300 ${
          isOpen ? 'rotate-45 translate-x-1 translate-y-1' : ''
        }`}
      />
      <View className={`w-full h-[2px] bg-black transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`} />
      <View
        className={`w-full h-[2px] bg-black transition-transform duration-300 ${
          isOpen ? 'rotate--45 translate-x-1 -translate-y-1' : ''
        }`}
      />
    </TouchableOpacity>
  );
};

export default BurgerBtn;
