import { useEffect } from 'react'
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Rightbar from "./components/Rightbar";
import Sidebar from "./components/Sidebar";
import { useAuth } from "./context/AuthProvider";


export default function Layout() {
  const Auth = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!Auth?.getCurrentUser()) navigate('/login');
  }, [])
  return (
    <div className="w-full flex flex-col items-start">
      {/* <Navbar /> */}
      <div className="w-full flex flex-row justify-between gap-5">
        <Sidebar />
        <div className="grow">
          <Outlet />
        </div>
        <Rightbar />
      </div>
    </div>
  )
}
