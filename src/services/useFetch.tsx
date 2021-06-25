/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { IResponse } from 'types/http';
import handleResponse from 'utils/handle-response';

type UseFetchProps = {
  loading: boolean;
  config?: AxiosRequestConfig;
}

type UseFecthFuction = {
  loading: boolean,
  fetch: (data: any) => Promise<IResponse<any>>
}

const initialProps: UseFetchProps = {
  loading: false,
};

const useFetch = (
  {
    loading: isLoading,
    config,
  }: UseFetchProps | any = initialProps,
): UseFecthFuction => {
  const [loading, setLoading] = useState(isLoading);
  const { CancelToken } = axios;
  const { token, cancel } = CancelToken.source();
  const [initialConfig] = useState(config);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => cancel('component unmount'), []);

  const fetch = async (config: AxiosRequestConfig) : Promise<IResponse<any>> => {
    setLoading(true);
    try {
      const response = await axios({
        cancelToken: token,
        ...initialConfig,
        ...config,
        url: process.env.REACT_APP_API + initialConfig.url, 
      });
      setTimeout(() => {
        setLoading(false);
      }, 100);

      return handleResponse(response);
    } catch (error: any) {
      return error;
    }
  };

  return {
    loading,
    fetch,
  };
};

export default useFetch;
