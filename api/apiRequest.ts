/* eslint-disable @typescript-eslint/no-explicit-any */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EMethods, TOKEN_KEY } from '../utils';
import { IErrorResponse } from './interfaces';

const apiRequest = async (url: string, method: EMethods, body?: Record<string, any>): Promise<any> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  try {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
      const errorData: IErrorResponse = await response.json();
      throw new Error(errorData.message);
    }

    return await response.json();
  } catch (error) {
    console.error('Error in apiRequest:', error);
    throw error;
  }
};

export default apiRequest;
