import { useContext } from 'react';
import { DBDispatchContext } from './provider';
import { SET_ONLINE } from './reducer';

const useDBActions = (): {
  setOnline: (payload: boolean) => void,
} => {
  const dispatch = useContext(DBDispatchContext);

  const setOnline = (payload: boolean): void => {
    dispatch({
      type: SET_ONLINE,
      payload,
    });
  };

  return {
    setOnline
  };
};

export default useDBActions;
