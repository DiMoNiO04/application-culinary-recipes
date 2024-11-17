import useSWR from 'swr';
import { IApiResponse, IApiResponseReturn, OPTIONS } from '../interfaces';
import { fetcher } from '../fetcher';

const useFetchData = <T>(endpoint: string): IApiResponseReturn<T> => {
  const { data, error } = useSWR<IApiResponse<T>>(endpoint, fetcher, OPTIONS);

  if (error) {
    console.error(`Error fetching ${endpoint}`, error);
  }

  return {
    data: data?.data || null,
    code: data?.code || null,
    message: data?.message || null,
    isLoading: !error && !data,
    isError: !!error,
  };
};

export default useFetchData;
