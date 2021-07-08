/* eslint-disable no-case-declarations */
import { ActionsProps } from 'types/global';

export interface IDBState {
  db: any,
  online: boolean
};

export const SET_ONLINE = 'SET_ONLINE';

function DBReducer(
  state: IDBState,
  action: ActionsProps<boolean>,
): IDBState | null {
  switch (action.type) {

    case SET_ONLINE: 
      return {
        ...state,
        online: action.payload
      };

    default:
      throw new Error();
  }
}

export default DBReducer;
