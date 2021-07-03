/* eslint-disable react-hooks/rules-of-hooks */
import { useContext, useEffect } from 'react';

import { IAuthState } from 'providers/Auth/reducer';
import { AuthDataContext } from 'providers/Auth/provider';

/**
 * HOC que permite almacenar en la Cookie la data
 * referente a la orden del usuario
 */
const ListenerProvider = () => (Component:any) => (props:any) => {
  const auth = useContext<IAuthState>(AuthDataContext);

  useEffect(() => {
    localStorage.setItem('auth', JSON.stringify(auth));
  }, [auth]);

  return <Component {...props} />;
};

export default ListenerProvider;
