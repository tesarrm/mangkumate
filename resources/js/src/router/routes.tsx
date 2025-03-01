import React from 'react';
import { lazy } from 'react';
import MyForm from '../pages/Product/Form';

const App = lazy(() => import('../components/FormBuilder/App'));
const BuilderList = lazy(() => import('../pages/Builder/BuilderList'));

const Index = lazy(() => import('../pages/Index'));
const BeratList = lazy(() => import('../pages/Berat/List'));
const CategoryList = lazy(() => import('../pages/Category/List'));
const ProductList = lazy(() => import('../pages/Product/List'));

const routes = [
    // Dashboard
    {
        path: '/',
        element: <Index />,
        layout: 'default',
    },
    {
        path: '/builders/:form_name',
        element: <App />,
        layout: 'default',
    },
    {
        path: '/builders',
        element: <BuilderList />,
        layout: 'default',
    },

    // Rute untuk setiap tabel
    {
        path: '/Berat',
        element: <BeratList />,
        layout: 'default',
    },
    {
        path: '/Category',
        element: <CategoryList />,
        layout: 'default',
    },
    {
        path: '/Product',
        element: <ProductList />,
        layout: 'default',
    },
    {
        path: '/Product/create',
        element: <MyForm/>,
        layout: 'default',
    },
];

export { routes };