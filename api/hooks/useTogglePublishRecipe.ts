import { useState } from 'react';
import { ApiEndpoints, EMethods, TOKEN_KEY, TOKEN_NOT_FOUND, TRY_AGAIN } from '@/utils';
import apiRequest from '../apiRequest';
import { mutate } from 'swr';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useTogglePublishRecipe = () => {
  const [isError, setIsError] = useState<boolean>(false);
  const [notificationMsg, setNotificationMsg] = useState<string>('');

  const handleTogglePublish = async (id: number) => {
    setIsError(false);

    try {
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      if (!token) {
        throw new Error(TOKEN_NOT_FOUND);
      }

      const result = await apiRequest(`${ApiEndpoints.TOGGLE_PUBLISH_RECIPE}/${id}`, EMethods.PATCH, undefined);
      setNotificationMsg(result.message);
      mutate(ApiEndpoints.GET_ALL_RECIPES);
    } catch (error) {
      console.error(error);
      setIsError(true);
      setNotificationMsg(TRY_AGAIN);
    }
  };

  return { handleTogglePublish, isError, notificationMsg };
};

export default useTogglePublishRecipe;
