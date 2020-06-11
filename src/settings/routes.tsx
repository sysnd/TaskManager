import React, { lazy, Suspense } from 'react';
import { CircularProgress } from '@material-ui/core';

const ContainerTasksPageImport = lazy(() => import('../pages/tasks/ContainerTasksPage'));
const ContainerUsersPageImport = lazy(() => import('../pages/users/ContainerUsersPage'));
const ContainerLoginPageImport = lazy(() => import('../pages/login/ContainerLoginPage'));
const ContainerRegisterPageImport = lazy(() => import('../pages/register/ContainerRegisterPage'));

const renderLoader = () => <CircularProgress />;

const ContainerTasksPage = () => (
  <Suspense fallback={renderLoader()}>
    <ContainerTasksPageImport />
  </Suspense>
);

const ContainerUsersPage = () => (
  <Suspense fallback={renderLoader()}>
    <ContainerUsersPageImport />
  </Suspense>
);

const ContainerLoginPage = () => (
  <Suspense fallback={renderLoader()}>
    <ContainerLoginPageImport />
  </Suspense>
);

const ContainerRegisterPage = () => (
  <Suspense fallback={renderLoader()}>
    <ContainerRegisterPageImport />
  </Suspense>
);

export interface IRoute {
  auth: boolean;
  path: string;
  container: JSX.Element;
  modal?: boolean;
  sidebar?: {
    side: string;
  };
}

export const routes = [

  { path: '/', auth: true, container: <ContainerTasksPage /> },
  { path: '/users', auth: true, container: <ContainerUsersPage /> },
  { path: '/login', auth: false, container: <ContainerLoginPage /> },
  { path: '/register', auth: false, container: <ContainerRegisterPage /> },
];
