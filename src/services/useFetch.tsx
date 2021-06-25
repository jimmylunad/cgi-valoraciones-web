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
  config: {
    headers: {
      'content-type': 'application/json',
    },
  },
};

const useFetch = (
  {
    loading: isLoading,
    config,
  }: UseFetchProps | any = initialProps,
): UseFecthFuction => {
  const [loading, setLoading] = useState(isLoading);
  const [_config, setConfig] = useState<any>(config);
  const { CancelToken } = axios;
  const { token, cancel } = CancelToken.source();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => () => cancel('component unmount'), []);

  const fetch = async (config: AxiosRequestConfig) : Promise<IResponse<any>> => {
    setLoading(true);
    try {
      setConfig(config);
      const response = await axios({
        cancelToken: token,
        ..._config,
        ...config,
        url: process.env.REACT_APP_API + _config.url, 
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
