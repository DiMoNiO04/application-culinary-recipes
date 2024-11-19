import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { ConfirmAction } from '../modals';

const UserProfile: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleLogout = () => {
    console.log('Logged out');
    setModalOpen(false);
  };

  return (
    <View className="flex-1 justify-center items-center bg-gray-100">
      <TouchableOpacity onPress={() => setModalOpen(true)} className="bg-blue-500 px-4 py-2 rounded-lg">
        <Text className="text-white font-bold">Logout</Text>
      </TouchableOpacity>

      <ConfirmAction
        isModalOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleLogout}
        title="Are you sure you want to log out?"
      />
    </View>
  );
};

export default UserProfile;
