import React from 'react';
import { Switch } from 'react-router';
import RouterOutlet from 'shared/RouteOutlet';
import routes from './routes';

const AuthModule: React.FC<{}> = () => {
  return (
    <Switch>
      {
        routes.map((route) => (
          <RouterOutlet key={route.path} {...route} />
        ))
      }
    </Switch>
  )
};

export default AuthModule;
