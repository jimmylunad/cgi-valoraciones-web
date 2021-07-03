import { createContext, useReducer } from 'react';
import { ProvideProps } from 'types/global';
import AuthReducer, { IAuthState } from './reducer';

export const AuthDataContext = createContext<IAuthState | any>(null);
export const AuthDispatchContext = createContext<any>({});

const AuthProvider: React.FC<ProvideProps> = ({ children }: ProvideProps) => {
  const localStorageData: string | {} = String(localStorage.getItem('auth')); 
  const initialState = typeof window !== 'undefined'
    ? JSON.parse(String(localStorageData)) : null;

  const [AuthData, AuthDispatch] = useReducer<any>(AuthReducer, initialState);
  return (
    <AuthDispatchContext.Provider value={AuthDispatch}>
      <AuthDataContext.Provider value={AuthData}>
        {children}
      </AuthDataContext.Provider>
    </AuthDispatchContext.Provider>
  );
};

export default AuthProvider;
