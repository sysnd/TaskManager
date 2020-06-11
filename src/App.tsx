import React, { useEffect } from 'react';
import './App.css';
import { SnackbarProvider } from 'notistack';
import { SnackbarOrigin } from '@material-ui/core';
import { Route, Switch, withRouter } from 'react-router-dom';
import { routes, IRoute } from './settings/routes';
import { routeRequiresAuth } from './utils/auth/routeRequiresAuth';
import ContainerHeader from './components/common/header/ContainerHeader';

const snackbarProps = {
  maxSnackCount: 4,
  anchorOriginPosition: { vertical: 'top', horizontal: 'right' } as SnackbarOrigin,
  autoHideDurationMs: 5000
}

const App: React.FC = (props: any) => {

  const { location, history } = props || {};

  useEffect(() => {
    if (!localStorage.getItem('loggedInUser')) {
      if (routeRequiresAuth(location.pathname)) {
        history.push('/login');
      }
    }
    else {
      if (location.pathname.includes('login')) {
        history.push('/');
      }
    }
  }, [location.pathname, history]);

  return (
    <SnackbarProvider
      maxSnack={snackbarProps.maxSnackCount}
      anchorOrigin={snackbarProps.anchorOriginPosition}
      autoHideDuration={snackbarProps.autoHideDurationMs}
    >
      <div className="app">
        <ContainerHeader />
        <Switch location={location}>
          {routes.map((item: IRoute, index) => {
            return (
              <Route exact path={item.path} key={index}>
                {item.container}
              </Route>
            );
          })}
        </Switch>
      </div>
    </SnackbarProvider>
  )
};

export default (withRouter(App));

