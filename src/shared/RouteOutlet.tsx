import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { RoutePage } from 'types/global';
import { useCookies } from 'react-cookie';

const RouterOutlet = (route: RoutePage) => {

  const [cookies] = useCookies(['token']);

  const render = (props: any) => {
    
    const component = (
      <route.component
        {...props}
        config={route}
      />
    );

    if (route.protected && !cookies["token"]) {
      return <Redirect to={{ pathname: '/auth/login' }} />;
    } 
    
    return component;
  };

  const routeProps = {
    path: route.path,
    render,
  };

  return <Route {...routeProps} />
}

export default RouterOutlet;