import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify';
import './index.css'
import 'react-toastify/dist/ReactToastify.css';
import { createBrowserRouter, RouterProvider, RouteObject, Outlet } from 'react-router-dom'
import Layout from './Layout'
import HomeScreen from './pages/HomeScreen'
import TransferScreen from './pages/TransferScreen'
import CardsScreen from './pages/CardsScreen';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <HomeScreen /> },
      { path: '/profile', element: <h1>Profile page</h1> },
      { path: '/transfer', element: <TransferScreen /> },
      { path: '/manage-cards', element: <CardsScreen /> },
    ]
  }
]

const router = createBrowserRouter(routes)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ToastContainer />
    <RouterProvider router={router} />
  </React.StrictMode>,
)
