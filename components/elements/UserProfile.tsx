import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert } from 'react-native';
import { RelativePathString, useRouter } from 'expo-router';
import { ConfirmAction } from '../modals';
import { useAuthToken, useLogout } from '@/hooks';
import { EButtonClass, EButtonSize, EUrls } from '@/utils';
import ERoles from '@/utils/enums/roles';
import Button from '../ui/Button';
import { ProfileIcon } from '../icons';

const UserProfile: React.FC = () => {
  const { role } = useAuthToken();
  const { isAuth, handleLogout } = useLogout();
  const router = useRouter();

  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleLogoutModal = () => setLogoutModalOpen((prev) => !prev);

  const handleLogOut = async () => {
    try {
      const message = await handleLogout();
      Alert.alert('Logged out', message);
    } catch (error) {
      console.error('Logout failed:', error);
      Alert.alert('Error', 'An error occurred during logout.');
    } finally {
      setLogoutModalOpen(false);
    }
  };

  const renderProfileLinks = () => {
    const links = [];

    if (role === ERoles.ADMIN) {
      links.push({ title: 'Admin Users', url: EUrls.ADMIN_USERS }, { title: 'Admin Roles', url: EUrls.ADMIN_ROLES });
    } else if (role === ERoles.MODERATOR) {
      links.push(
        { title: 'Moderator Categories', url: EUrls.MODERATOR_CATEGORIES },
        { title: 'Moderator Recipes', url: EUrls.MODERATOR_RECIPES }
      );
    } else if (role === ERoles.USER) {
      links.push({ title: 'Favorites', url: EUrls.FAVORITES }, { title: 'Recipes', url: EUrls.PROFILE_RECIPES });
    }

    links.push({ title: 'Logout', action: toggleLogoutModal });

    return links;
  };

  const renderLink = ({ item }: { item: { title: string; url?: string; action?: () => void } }) => {
    return (
      <TouchableOpacity
        className="py-2 px-5 border-b border-gray-300"
        onPress={item.action ? item.action : () => router.push(item.url as RelativePathString)}
      >
        <Text className="text-black">{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View className="justify-center items-center">
      {isAuth ? (
        <View className="relative">
          <TouchableOpacity
            onPress={() => setIsDropdownOpen((prev) => !prev)}
            className="w-8 h-8 justify-center items-center"
          >
            <ProfileIcon />
          </TouchableOpacity>

          {isDropdownOpen && (
            <FlatList
              data={renderProfileLinks()}
              renderItem={renderLink}
              keyExtractor={(item) => item.title}
              className="w-52 absolute top-12 right-0 bg-white border border-gray-300 rounded-lg shadow-lg p-2 z-10"
            />
          )}
        </View>
      ) : (
        <Button text="Login" nameClass={EButtonClass.DEF} size={EButtonSize.SM} isLink={true} linkUrl={EUrls.LOGIN} />
      )}

      <ConfirmAction
        isModalOpen={isLogoutModalOpen}
        onClose={toggleLogoutModal}
        onConfirm={handleLogOut}
        title="Are you sure you want to log out of your account?"
        confirmText="Yes"
        cancelText="Cancel"
      />
    </View>
  );
};

export default UserProfile;
