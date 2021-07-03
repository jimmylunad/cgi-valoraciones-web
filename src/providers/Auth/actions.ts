import { useContext } from 'react';
import { IAuth } from 'types/auth';
import { AuthDispatchContext } from './provider';
import { SET_AUTH } from './reducer';

const useAuthActions = (): {
  setAuthLogin: (payload: IAuth) => void,
  setAuthLogout: () => void,
} => {
  const dispatch = useContext(AuthDispatchContext);

  const setAuthLogin = (payload: IAuth): void => {
    dispatch({
      type: SET_AUTH,
      payload,
    });
  };

  const setAuthLogout = (): void => {
    dispatch({
      type: SET_AUTH,
    });
  };

  return {
    setAuthLogin,
    setAuthLogout,
  };
};

export default useAuthActions;
