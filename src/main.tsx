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
import LoginScreen from './pages/LoginScreen';
import RegisterScreen from './pages/RegisterScreen';
import { AuthProvider } from './context/AuthProvider';

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
  },
  {
    path: '/login',
    element: <LoginScreen />,
  },
  {
    path: '/register',
    element: <RegisterScreen />
  }
]

const router = createBrowserRouter(routes)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <ToastContainer />
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
