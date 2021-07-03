import { AuthDataContext } from 'providers/Auth/provider';
import { IAuthState } from 'providers/Auth/reducer';
import { useContext, useEffect, useState } from 'react';
import { Switch } from 'react-router';
import ListenerProvider from 'shared/ListenerProvider';
import RouterOutlet from 'shared/RouteOutlet';
import { RoutePage } from 'types/global';
import routes from './routes';

const AdminModule: React.FC<{}> = () => {
  const { role } = useContext<IAuthState>(AuthDataContext); 
  const [activeRoutes, setActiveRoutes] = useState<RoutePage[] | null>(null);

  useEffect(() => {
    setActiveRoutes(routes[role]);
  }, [role]);

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
