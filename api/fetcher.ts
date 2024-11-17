/* eslint-disable @typescript-eslint/no-explicit-any */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EFetchErrors, EStatusCode, TOKEN_KEY } from '../utils';

export const fetcher = async <T>(url: string, mockData?: T): Promise<T | null> => {
  if (!(url && !url.includes('undefined'))) return null;

  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    const token = await AsyncStorage.getItem(TOKEN_KEY);
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      headers,
    });

    if (!response.ok) {
      const error = new Error(`${EFetchErrors.ERROR_HTTP}${response.status}`);
      (error as any).status = response.status;

      if (response.status === EStatusCode.NO_AUTH) {
        return Promise.reject({ status: EStatusCode.NO_AUTH });
      }

      throw error;
    }

    return await response.json();
  } catch (error) {
    console.error(EFetchErrors.ERROR_FETCH, error);
    throw error;
  }
};
