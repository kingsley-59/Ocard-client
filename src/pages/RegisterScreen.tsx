import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FormEvent, useState } from "react";
import { useAuth } from '../context/AuthProvider';
import { BiLoaderCircle } from "react-icons/bi";


export default function RegisterScreen() {
    const [firstName, setFirstname] = useState('');
    const [lastName, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhone] = useState('');
    const [passcode, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const Auth = useAuth();
    const navigate = useNavigate();

    const submitRegisterForm = async function (e: FormEvent) {
        e.preventDefault();
        setLoading(true)

        if (await Auth?.register({
            email, firstName, lastName, passcode, phoneNumber
        })) setTimeout(() => navigate('/login'), 2500);
        setLoading(false);
    }

    return (
        <div className="w-full h-screen mx-auto flex flex-col justify-between items-center gap-5">
            <Navbar />
            <form className="w-full " onSubmit={submitRegisterForm}>
                <div className="w-full p-3">
                    <div className="max-w-lg mx-auto p-5 flex flex-col gap-3 lg:gap-5 border rounded-2xl">
                        <h3 className="mx-auto font-medium">Welcome to Ocard!</h3>
                        <div className="flex flex-col gap-1 lg:gap-2">
                            <label htmlFor="firstname-21">First name</label>
                            <input value={firstName} onChange={e => setFirstname(e.target.value)} type="text" className="p-3 w-full outline-none rounded-md" placeholder="at least 3 letters long" required />
                        </div>
                        <div className="flex flex-col gap-1 lg:gap-2">
                            <label htmlFor="lastname-21">Last name</label>
                            <input value={lastName} onChange={e => setLastname(e.target.value)} type="text" className="p-3 w-full outline-none rounded-md" placeholder="at least 3 letters long" required />
                        </div>
                        <div className="flex flex-col gap-1 lg:gap-2">
                            <label htmlFor="email-21">Email</label>
                            <input value={email} onChange={e => setEmail(e.target.value)} type="text" className="p-3 w-full outline-none rounded-md" placeholder="enter your email" required />
                        </div>
                        <div className="flex flex-col gap-1 lg:gap-2">
                            <label htmlFor="phone-21">Phone number</label>
                            <input value={phoneNumber} onChange={e => setPhone(e.target.value)} type="tel" className="p-3 w-full outline-none rounded-md" placeholder="your phone number" required />
                        </div>
                        <div className="flex flex-col gap-1 lg:gap-2">
                            <label htmlFor="password-21">Password</label>
                            <input value={passcode} onChange={e => setPassword(e.target.value)} type="password" className="p-3 w-full outline-none rounded-md" placeholder="6 digit passcode" maxLength={6} required />
                        </div>
                        <div className="flex">
                            <p>Already have an account? <Link to={'/login'}>Login</Link> </p>
                        </div>
                        <div className="flex justify-center ">
                            <button type="submit" className=" w-full p-3 bg-blue dark:bg-white dark:text-blue text-white font-medium rounded-lg text-center">
                                Register {loading && <BiLoaderCircle id="loader" />}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            <footer className="text-center text-gray-dark dark:text-gray-light ">
                &copy; {new Date().getFullYear()} Ocard Payments. All rights reserved.
            </footer>
        </div>
    )
}
