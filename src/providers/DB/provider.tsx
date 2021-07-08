import { createContext, useReducer } from 'react';
import { ProvideProps } from 'types/global';
import DBReducer from './reducer';
import Dexie from 'dexie';

export const DBDataContext = createContext<any>(null);
export const DBDispatchContext = createContext<any>({});

const DBProvider: React.FC<ProvideProps> = ({ children }: ProvideProps) => {
  const db = new Dexie('igcAssignment');
  db.version(1).stores({
    assignments:"id, addresName, availableOptions, code, contractor, dateAttended, detail.addresName, detail.code, detail.contractor, management, routeName, scheduledDate, status",
    rating: "++id, id_assignment, id_option, observation, latitud, longitud, file",
  });

  const [DBData, DBDispatch] = useReducer<any>(DBReducer, db);

  return (
    <DBDispatchContext.Provider value={DBDispatch}>
      <DBDataContext.Provider value={DBData}>
        {children}
      </DBDataContext.Provider>
    </DBDispatchContext.Provider>
  );
};

export default DBProvider;
