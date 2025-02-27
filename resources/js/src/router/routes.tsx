import React from 'react';
import { lazy } from 'react';

const Index = lazy(() => import('../pages/Index'));
import App from '../components/FormBuilder/App';
const BuilderList = lazy(() => import('../pages/Builder/BuilderList'));
const CompanyList = lazy(() => import('../pages/Company/List'));
const StoreList = lazy(() => import('../pages/Store/List'));

const routes = [
    // Dashboard
    {
        path: '/',
        element: <Index />,
        layout: 'default',
    },
    {
        path: '/form-builder',
        element: <App />,
        layout: 'default',
    },

    {
        path: '/builders/:form_name',
        element: <App />,
        layout: 'default',
    },

    // Rute untuk setiap tabel
    {
        path: '/builders',
        element: <BuilderList />,
        layout: 'default',
    },
    {
        path: '/companies',
        element: <CompanyList />,
        layout: 'default',
    },
    {
        path: '/stores',
        element: <StoreList />,
        layout: 'default',
    },
];

export { routes };