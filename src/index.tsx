import * as React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PeopleInfo } from './components/people-info/people-info';

import { Provider } from 'react-redux'
import store from './state/store';

const Root = () => <Provider store={store}><App/></Provider>

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
  },
  {
    path: '/more',
    element: <PeopleInfo />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<RouterProvider router={router} />);
