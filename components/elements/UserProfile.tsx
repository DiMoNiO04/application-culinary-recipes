import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { RelativePathString, useRouter } from 'expo-router';
import { ConfirmAction } from '../modals';
import { useAuthToken, useLogout } from '@/hooks';
import { EButtonClass, EButtonSize, EUrls, SUCCESS_AUTH } from '@/utils';
import ERoles from '@/utils/enums/roles';
import NotificationMsg from '../ui/NotificationMsg';
import Button from '../ui/Button'; // Импортируем компонент Button

const UserProfile: React.FC = () => {
  const { token, role } = useAuthToken();
  const { isAuth, handleLogout } = useLogout();
  const router = useRouter();

  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);
  const [notification, setNotification] = useState<{ isOpen: boolean; isSuccess: boolean; message: string }>({
    isOpen: false,
    isSuccess: false,
    message: '',
  });

  useEffect(() => {
    if (token && isAuth) {
      setNotification({ isOpen: true, isSuccess: true, message: SUCCESS_AUTH });
    }
  }, [token, isAuth]);

  const toggleLogoutModal = () => setLogoutModalOpen((prev) => !prev);

  const handleLogOut = async () => {
    try {
      const message = await handleLogout();
      setNotification({ isOpen: true, isSuccess: false, message });
    } catch (error) {
      console.error('Logout failed:', error);
      setNotification({ isOpen: true, isSuccess: false, message: 'An error occurred during logout.' });
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
        className="py-2 px-4 border-b border-gray-300"
        onPress={item.action ? item.action : () => router.push(item.url! as RelativePathString)}
      >
        <Text className="text-black">{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View className="justify-center items-center">
      {notification.isOpen && (
        <NotificationMsg
          isSuccess={notification.isSuccess}
          msg={notification.message}
          onClose={() => setNotification({ isOpen: false, isSuccess: false, message: '' })}
        />
      )}

      {isAuth ? (
        <View className="w-full items-center">
          <TouchableOpacity className="p-2">
            <Image source={{ uri: '/icons/profile.svg' }} style={{ width: 50, height: 50 }} className="rounded-full" />
          </TouchableOpacity>
          <FlatList
            data={renderProfileLinks()}
            renderItem={renderLink}
            keyExtractor={(item) => item.title}
            style={{ width: '80%', marginTop: 10 }}
          />
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
