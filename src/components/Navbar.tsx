import './Navbar.css';
import { MdOutlineNotificationsActive } from 'react-icons/md'


export default function Navbar() {
  return (
    <div className='w-full flex flex-row py-4 px-5 bg-blue'>
        <div className="w-full flex flex-row items-center py-0 px-3 justify-between">
            <div className="font-brand text-2xl">Ocard</div>
            <div className="">
                <MdOutlineNotificationsActive />
            </div>
        </div>
    </div>
  )
}
