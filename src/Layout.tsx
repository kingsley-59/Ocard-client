import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Rightbar from "./components/Rightbar";
import Sidebar from "./components/Sidebar";


export default function Layout() {
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
