import React, { useEffect } from 'react';
import { Switch, useHistory } from 'react-router';
import RouterOutlet from 'shared/RouteOutlet';
import routes from './routes';
import { useCookies } from 'react-cookie';
import './styles.scss'
import ListenerProvider from 'shared/ListenerProvider';

const AuthModule: React.FC<{}> = () => {
  const [cookies] = useCookies(["token"]);
  const history = useHistory();

  useEffect(() => {
    if (cookies['token']) {
      history.push('/');
    }
  }, [cookies, history]);
  
  return (
    <div className="bg_login">
      <Switch>
        {
          routes.map((route) => (
            <RouterOutlet key={route.path} {...route} />
            ))
          }
      </Switch>
    </div>
  )
};

export default ListenerProvider()(AuthModule);
