/* eslint-disable no-case-declarations */
import { ActionsProps } from 'types/global';

function DBReducer(
  state: any,
  action: ActionsProps<any>,
): any | null {
  switch (action.type) {

    default:
      throw new Error();
  }
}

export default DBReducer;
