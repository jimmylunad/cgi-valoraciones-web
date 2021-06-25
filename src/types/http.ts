
export interface IError {
  errorCode: string;
  errorMessage: string;
  errorMessageDetail: string;
  name: string;
}

export interface IResponse<T> {
  success: boolean;
  data: T,
  message: string;
}

export interface IResponseSuccess<T> {
  body: {
    data: T,
    successMessage: string;
  },
  success: boolean,
}

export interface IResponseError {
  data: {
    error: IError
  }
}
