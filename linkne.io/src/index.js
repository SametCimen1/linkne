import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';



import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";



import Home from './routes/Home'
import Layout from './components/Layout'
import Signup  from './routes/Signup'
import Signin from './routes/Signin';
import PublicProfile from './routes/PublicProfile';
import Dashboard from './routes/Dashboard';
import Redirect from './components/Redirect.js'
import EditLink from './routes/EditLink'
import Privacy from './routes/Privacy'
import Terms from './routes/Terms'
import Verification from './routes/Verification'
import Recoveraccount from './routes/Recoveraccount';

import store from'./services/store';
import { Provider } from 'react-redux'
import ErrorPage from './routes/ErrorPage'


const router = createBrowserRouter([
  {
    path:"/",
    element: <Home/>,
    errorElement: <ErrorPage></ErrorPage>
  },
  {
    path:"/home",
    element: <Home/>,
    errorElement: <ErrorPage></ErrorPage>
  },
  {
    path:"/ref/:ref",
    element: <Home/>,
    errorElement: <ErrorPage></ErrorPage>
  },
  {
    path:"/signup",
    element: <Signup/>,
    errorElement: <ErrorPage></ErrorPage>
  },
  {
    path:"/signin",
    element: <Signin/>,
    errorElement: <ErrorPage></ErrorPage>
  },
  {
    path:"/verification",
    element: <Verification/>,
    errorElement: <ErrorPage></ErrorPage>
  },
  {
    path:"/recoveraccount",
    element: <Recoveraccount/>,
    errorElement: <ErrorPage></ErrorPage>
  },
  {
    path:"/:name",
    element: <PublicProfile />,
    errorElement: <ErrorPage></ErrorPage>
  },
  {
    path:"/dashboard",
    element: <Dashboard/>,
    errorElement: <ErrorPage></ErrorPage>
  },
  {
    path:"/editlink/:id",
    element: <EditLink/>,
    errorElement: <ErrorPage></ErrorPage>
  },
  {
    path:"/privacy",
    element: <Privacy/>,
    errorElement: <ErrorPage></ErrorPage>
  },
  {
    path:"/termsofuse",
    element: <Terms/>,
    errorElement: <ErrorPage></ErrorPage>
  },
  {
    path:"/404",
    element: <ErrorPage/>,
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Layout>
      <RouterProvider router = {router}></RouterProvider>
    </Layout>
  </Provider>
  
);


