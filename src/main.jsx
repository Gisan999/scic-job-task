import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './Home.jsx'
import './index.css'


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AuthProvider from './Provider/AuthProvider.jsx';
import Root from './Components/Root.jsx';
import Login from './Components/Login/Login.jsx';
import Registration from './Components/Registration/Registration.jsx';
// import AddTask from './Components/AddTask/AddTask.jsx';
import Dashboard from './Components/Dashboard/Dashboard.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MyTask from './Components/MyTask/MyTask.jsx';

const queryClient = new QueryClient()


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/registration',
        element: <Registration />
      },
      // {
      //   path: "/addTask",
      //   element: <AddTask />
      // },
      {
        path: "/dashboard",
        element: <Dashboard />
      },
      {
        path: "/myTask",
        element: <MyTask />
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
)
