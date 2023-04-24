import { To, useNavigate } from "react-router-dom"
import RecentTransactions from "../components/RecentTransactions";
import { CurrentUser, useAuth } from "../context/AuthProvider";
import { useEffect, useState } from "react";
import { BiLogOut } from "react-icons/bi";


const Services: { name: String, link: String }[] = [
    { name: 'Transfer Money', link: '/transfer' },
    { name: 'Buy Airtime', link: '/buy-airtime' },
    { name: 'Data Bundle', link: '/buy-data' }
]

export default function HomeScreen() {
    const navigate = useNavigate();
    const Auth = useAuth();

    const [user, setUser] = useState<CurrentUser | null>(null);

    const handleLogout = function () {
        Auth?.logout()
        navigate('/login');
    }

    useEffect(() => {
        let currentUser = Auth?.getCurrentUser();
        if (!currentUser) navigate('/login');
        else setUser(currentUser);
    }, [])
    return (
        <div className="container mx-auto px-5 py-6 flex flex-col gap-3">
            <div id="hello-name" className="flex justify-between">
                Hello {user?.firstName},
                <BiLogOut onClick={handleLogout} className="cursor-pointer" />
            </div>
            <div className="w-full min-h-[204px] relative rounded-lg bg-gray" id="ads-banner">
                <div className="absolute top-0 right-0 rounded-tr-lg bg-white text-center p-2">
                    <span className="mx-auto text-gray"> AD</span>
                </div>
            </div>
            <div id="start-text"> Alright, let's make payments!</div>
            <div className="flex flex-col gap-2">
                {Services.map((item, idx) => (
                    <div key={idx} onClick={() => navigate(item.link as To)} className="flex flex-row items-center justify-start gap-3 p-2 shadow rounded-2xl cursor-pointer active:bg-blue active:text-white transition-all">
                        <div className="font-brand font-medium text-2xl">O</div>
                        <div className="">{item.name}</div>
                    </div>
                ))}
            </div>
            <div className="lg:hidden">
                <RecentTransactions />
            </div>
        </div>
    )
}
