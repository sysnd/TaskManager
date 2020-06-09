import React, { lazy, Suspense } from 'react';
import { CircularProgress } from '@material-ui/core';
// import { RedirectOptions } from '../enums/RedirectOptions';

// const ContainerCustomerSearchPageImport = lazy(() => import('../pages/customersearch/ContainerCustomerSearchPage'));
const ContainerLoginPageImport = lazy(() => import('../pages/login/ContainerLoginPage'));
const ContainerRegisterPageImport = lazy(() => import('../pages/register/ContainerRegisterPage'));
// const ContainerRedirectImport = lazy(() => import('../components/redirect/ContainerRedirect'));

const renderLoader = () => <CircularProgress />;

// const ContainerCustomerSearchPage = () => (
//   <Suspense fallback={renderLoader()}>
//     <ContainerCustomerSearchPageImport />
//   </Suspense>
// );

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

  // { path: '/', auth: true, container: <ContainerCustomerSearchPage /> },
  { path: '/login', auth: false, container: <ContainerLoginPage /> },
  { path: '/register', auth: false, container: <ContainerRegisterPage /> },
];
