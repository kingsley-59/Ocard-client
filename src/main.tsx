import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider, RouteObject, Outlet } from 'react-router-dom'
import Layout from './Layout'
import HomeScreen from './pages/HomeScreen'
import TransferScreen from './pages/TransferScreen'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <HomeScreen /> },
      { path: '/profile', element: <h1>Profile page</h1> },
      { path: '/transfer', element: <TransferScreen /> },
    ]
  }
]

const router = createBrowserRouter(routes)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
