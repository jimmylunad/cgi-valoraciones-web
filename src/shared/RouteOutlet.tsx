import React from 'react';
import { Route } from 'react-router-dom';
import { RoutePage } from 'types/global';

const RouterOutlet = (route: RoutePage) => {

  const render = (props: any) => {

    const component = (
      <route.component
        {...props}
        config={route}
      />
    );

    // if (route.protected && (props.staticContext !== undefined && !props.staticContext.login)) {
    //   return <Redirect to={{ pathname: '/' }} />;
    // }

    return component;
  };

  const routeProps = {
    path: route.path,
    render,
  };

  return <Route {...routeProps} />
}

export default RouterOutlet;