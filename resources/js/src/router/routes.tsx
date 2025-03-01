import React from 'react';
import { lazy } from 'react';

const App = lazy(() => import('../components/FormBuilder/App'));
const BuilderList = lazy(() => import('../pages/Builder/BuilderList'));

const Index = lazy(() => import('../pages/Index'));
const ProductList = lazy(() => import('../pages/Product/List'));
const ProductForm = lazy(() => import('../pages/Product/Form'));
const ItemList = lazy(() => import('../pages/Item/List'));
const ItemForm = lazy(() => import('../pages/Item/Form'));
const CategoryList = lazy(() => import('../pages/Category/List'));
const CategoryForm = lazy(() => import('../pages/Category/Form'));

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
        path: '/Product',
        element: <ProductList />,
        layout: 'default',
    },
    {
        path: '/Product/create',
        element: <ProductForm />,
        layout: 'default',
    },
    {
        path: '/Product/:id',
        element: <ProductForm />,
        layout: 'default',
    },
    {
        path: '/Item',
        element: <ItemList />,
        layout: 'default',
    },
    {
        path: '/Item/create',
        element: <ItemForm />,
        layout: 'default',
    },
    {
        path: '/Item/:id',
        element: <ItemForm />,
        layout: 'default',
    },
    {
        path: '/Category',
        element: <CategoryList />,
        layout: 'default',
    },
    {
        path: '/Category/create',
        element: <CategoryForm />,
        layout: 'default',
    },
    {
        path: '/Category/:id',
        element: <CategoryForm />,
        layout: 'default',
    },
];

export { routes };