import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApiEndpoints, EMethods, TOKEN_KEY, TOKEN_NOT_FOUND, TRY_AGAIN } from '@/utils';
import apiRequest from '../apiRequest';

const useChangePassword = () => {
  const [isError, setIsError] = useState<boolean>(false);
  const [notificationMsg, setNotificationMsg] = useState<string>('');

  const handleChangePassword = async (currentPassword: string, newPassword: string, confirmPassword: string) => {
    setIsError(false);

    try {
      const token = await AsyncStorage.getItem(TOKEN_KEY);

      if (!token) {
        throw new Error(TOKEN_NOT_FOUND);
      }

      const body = { currentPassword, newPassword, confirmPassword };

      const result = await apiRequest(ApiEndpoints.CHANGE_PASSWORD, EMethods.PATCH, body);
      setNotificationMsg(result.message);
    } catch (error) {
      console.error(error);
      setIsError(true);
      setNotificationMsg(TRY_AGAIN);
    }
  };

  return { handleChangePassword, isError, notificationMsg };
};

export default useChangePassword;
