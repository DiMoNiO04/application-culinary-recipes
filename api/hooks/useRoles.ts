import { useState } from 'react';
import { ApiEndpoints, EActionType, EMethods, TOKEN_KEY, TOKEN_NOT_FOUND, TRY_AGAIN } from '@/utils';
import apiRequest from '../apiRequest';
import { mutate } from 'swr';
import { IRoleInputs } from '@/components/forms';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useRoles = (actionType: EActionType, id?: number) => {
  const [isError, setIsError] = useState<boolean>(false);
  const [notificationMsg, setNotificationMsg] = useState<string>('');

  const submitRole = async (roleData?: IRoleInputs) => {
    setIsError(false);

    try {
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      if (!token) {
        throw new Error(TOKEN_NOT_FOUND);
      }

      let endpoint: string;
      let method: EMethods;

      if (actionType === EActionType.CREATE) {
        endpoint = ApiEndpoints.CREATE_ROLE;
        method = EMethods.POST;
      } else if (actionType === EActionType.UPDATE) {
        endpoint = `${ApiEndpoints.UPDATE_ROLE}/${id}`;
        method = EMethods.PATCH;
      } else if (actionType === EActionType.DELETE) {
        endpoint = `${ApiEndpoints.DELETE_ROLE}/${id}`;
        method = EMethods.DELETE;
      } else {
        throw new Error('Invalid action type');
      }

      const result = await apiRequest(endpoint, method, roleData);
      setNotificationMsg(result.message);
      mutate([ApiEndpoints.GET_ROLES, token]);
    } catch (error) {
      console.error(error);
      setIsError(true);
      setNotificationMsg(TRY_AGAIN);
    }
  };

  return { submitRole, isError, notificationMsg };
};

export default useRoles;
