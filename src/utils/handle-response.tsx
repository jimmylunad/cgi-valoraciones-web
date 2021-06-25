/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from 'axios';
import { IResponse, IResponseError, IResponseSuccess } from 'types/http';

const handleSuccess = (response: IResponseSuccess<any>): IResponse<any> => {
  const data = Array.isArray(response.body.data)
    ? [...response.body.data]
    : { ...response.body.data };
  const message = response.body.successMessage;
  return { success: true, data, message };
};

const handleError = (response:IResponseError): IResponse<any> => {
  const data = { ...response.data.error };
  const { errorMessage } = response.data.error;
  return { success: false, data, message: errorMessage };
};

const handleResponse = (response: AxiosResponse) : IResponse<any> => {
  const { data } = response;
  const { success } = data;
  if (typeof success !== 'undefined') {
    if (success) {
      return handleSuccess(data);
    }
    return handleError(response);
  }
  return { success: true, data: response.data, message: '' };
};

export default handleResponse;
