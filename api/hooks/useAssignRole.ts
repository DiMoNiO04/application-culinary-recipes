import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApiEndpoints, EMethods, TOKEN_KEY, TOKEN_NOT_FOUND, TRY_AGAIN } from '@/utils';
import apiRequest from '../apiRequest';
import { mutate } from 'swr';

const useAssignRole = () => {
  const [isError, setIsError] = useState<boolean>(false);
  const [notificationMsg, setNotificationMsg] = useState<string>('');

  const handleAssignRole = async (userId: number, newRoleId: number) => {
    setIsError(false);

    try {
      const token = await AsyncStorage.getItem(TOKEN_KEY);

      if (!token) {
        throw new Error(TOKEN_NOT_FOUND);
      }

      const body = { userId, newRoleId };
      const result = await apiRequest(ApiEndpoints.ASSIGN_ROLE, EMethods.PATCH, body);

      setNotificationMsg(result.message);

      mutate([ApiEndpoints.GET_USERS, token]);
    } catch (error) {
      console.error(error);
      setIsError(true);
      setNotificationMsg(TRY_AGAIN);
    }
  };

  return { handleAssignRole, isError, notificationMsg };
};

export default useAssignRole;
