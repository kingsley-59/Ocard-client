import axios from 'axios';
import { createContext, useContext, useMemo } from 'react'
import { toast } from 'react-toastify';

export interface CurrentUser {
    firstName: string;
    lastName: string;
    email: string;
    token?: string;
}

export interface RegisterOptions extends CurrentUser {
    phoneNumber: string;
    passcode: string;
}

export type AuthContextType = {
    register: (user: RegisterOptions) => Promise<any>;
    login: (user: { phone?: string, email?: string, passcode: string }) => Promise<any>;
    logout: () => void;
    setCurrentUser: (user: CurrentUser) => void;
    getCurrentUser: () => CurrentUser | null;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = function ({ children }: any) {
    const apiUrl = 'http://localhost:3000/auth';

    function setCurrentUser(user: CurrentUser) {
        localStorage.setItem('oc_current-user', JSON.stringify(user));
    }

    function getCurrentUser(): CurrentUser | null {
        const userStr = localStorage.getItem('oc_current-user');
        if (!userStr) return null;
        return JSON.parse(userStr);
    }

    async function register(user: RegisterOptions) {
        try {
            const { data } = await axios.post(`${apiUrl}/register`, { ...user });
            toast.success(data.message);
            return data;
        } catch (error: any) {
            processAuthErrors(error);
        }
    }

    async function login(user: { phone?: string, email?: string, passcode: string }) {
        try {
            const { data } = await axios.post(`${apiUrl}/login`, { ...user });
            const { email, firstName, lastName, token } = data.data;
            setCurrentUser({
                email, firstName, lastName, token
            })
            toast.success(data.message);
            return data;
        } catch (error: any) {
            processAuthErrors(error);
        }
    }

    function logout() {
        localStorage.removeItem('oc_current-user');
    }

    function processAuthErrors(error: any) {
        const errResponse = error?.response;
            if (errResponse) {
                String(errResponse.status).startsWith('4') 
                ? toast.error(errResponse?.data?.message) 
                : console.log(errResponse?.data?.message);
            }
            else toast.error(error.message);
    }

    return (
        <AuthContext.Provider value={{
            register, login, logout, setCurrentUser, getCurrentUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);