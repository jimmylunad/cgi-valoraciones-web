import { AuthDataContext } from 'providers/Auth/provider';
import { IAuthState } from 'providers/Auth/reducer';
import useDBActions from 'providers/DB/actions';
import { useContext, useEffect, useState } from 'react';
import { Switch } from 'react-router';
import ListenerProvider from 'shared/ListenerProvider';
import RouterOutlet from 'shared/RouteOutlet';
import { RoutePage } from 'types/global';
import routes from './routes';

const AdminModule: React.FC<{}> = () => {
  const { role } = useContext<IAuthState>(AuthDataContext); 
  const [activeRoutes, setActiveRoutes] = useState<RoutePage[] | null>(null);

  const { setOnline } = useDBActions();

  useEffect(() => {
    setActiveRoutes(routes[role]);
  }, [role]);

  useEffect(() => {
    window.addEventListener('offline', () => {
      setOnline(false)
    });

    return () => window.removeEventListener("offline", () => {
      setOnline(false);
    })
  },[setOnline])

  useEffect(() => {
    window.addEventListener('online', () => {
      setOnline(true)
    });

    return () => window.removeEventListener("online", () => {
      setOnline(true);
    })
  },[setOnline]);

  return (
    activeRoutes &&
    <Switch>
      {
        activeRoutes.map((route) => (
          <RouterOutlet key={route.path} {...route} />
        ))
      }
    </Switch>
  )
};

export default ListenerProvider()(AdminModule);
