import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FormEvent, useState } from "react";
import { useAuth } from "../context/AuthProvider";




export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const Auth = useAuth();

    const submitLoginForm = async function(e: FormEvent) {
        e.preventDefault();

        Auth?.login({password, email});
    }
    return (
        <div className="w-full h-screen mx-auto flex flex-col justify-between items-center gap-5">
            <Navbar />
            <form className="w-full " onSubmit={submitLoginForm}>
                <div className="w-full p-3">
                    <div className="max-w-lg mx-auto p-5 flex flex-col gap-5 border rounded-2xl">
                        <h3 className="mx-auto font-medium">Sign In</h3>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email-21">Email</label>
                            <input value={email} onChange={e => setEmail(e.target.value)} type="text" className="p-3 w-full outline-none rounded-md" placeholder="enter your email" required/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="password-21">Password</label>
                            <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="p-3 w-full outline-none rounded-md" placeholder="6 digit passcode" required/>
                        </div>
                        <div className="flex">
                            <p>Don't have an account? <Link to={'/register'}>Register</Link> </p>
                        </div>
                        <div className="flex justify-center ">
                            <input type="submit" value="Login" className=" w-full p-3 bg-blue dark:bg-white dark:text-blue text-white font-medium rounded-lg text-center" />
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
