import './Sidebar.css';
import { RxAvatar } from 'react-icons/rx'


export default function Sidebar() {
  return (
    <div className='w-full hidden md:flex max-w-[180px] xl:max-w-[294px] min-h-[600px] flex-col justify-between items-start p-5 bg-white border-x-[1px] border-gray'>
        <div className="w-full flex flex-col items-start gap-3">
            <div className="">
                <RxAvatar size={60} className='w-full' />
            </div>
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
        <div className="w-full flex flex-row justify-center items-center shadow-md rounded font-normal py-4 bg-white">
            Sign out
        </div>
    </div>
  )
}
