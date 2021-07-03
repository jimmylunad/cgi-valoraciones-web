/* eslint-disable no-case-declarations */
import { IAuth } from 'types/auth';
import { ActionsProps } from 'types/global';

export interface IAuthState extends IAuth {};

export const SET_AUTH = 'SET_AUTH_LOGIN';
export const SET_AUTH_LOGOUT = 'SET_AUTH_LOGOUT';

function AuthReducer(
  state: IAuthState,
  action: ActionsProps<IAuth>,
): IAuthState | null {
  switch (action.type) {
    case SET_AUTH: 
      return {
        ...action.payload,
      };

    case SET_AUTH_LOGOUT:
      return null;

    default:
      throw new Error();
  }
}

export default AuthReducer;
