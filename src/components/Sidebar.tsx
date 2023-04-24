import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import './Sidebar.css';
import { RxAvatar } from 'react-icons/rx'


export default function Sidebar() {

    return (
        <div className='w-full hidden md:flex max-w-[180px] xl:max-w-[294px] play flex-col justify-between items-start p-5 border-r-[2px] border-gray dark:border-r-gray-dark'>
            <div className="w-full flex flex-col items-start gap-3">
                <header className='w-full flex flex-row py-4 border-b-2 border-gray-dark'>
                    <div className="w-full flex flex-row items-center justify-start">
                        <div className="font-brand text-2xl">Ocard</div>
                    </div>
                </header>
                <div className="w-full grid ">
                    <div className="flex flex-row items-start gap-4 p-3">
                        <p>Profile</p>
                    </div>
                    <div className="flex flex-row items-start gap-4 p-3">
                        <p>History</p>
                    </div>
                    <div className="flex flex-row items-start gap-4 p-3">
                        <p>Cards</p>
                    </div>

                </div>
            </div>
        </div>
    )
}
