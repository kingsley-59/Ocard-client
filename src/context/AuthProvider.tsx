import { createContext, useContext, useMemo } from 'react'

interface CurrentUser {
    firstname: string;
    lastname: string;
    email: string;
    token?: string;
}

interface RegisterOptions extends CurrentUser {
    phoneNumber: string;
    password: string;
}

type AuthContextType = {
    currentUser: CurrentUser | null;
    register: (user: RegisterOptions) => void;
    login: (user: {phone?: string, email?: string, password: string}) => void;
    setCurrentUser: (user: CurrentUser) => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = function({children}: any) {
    const currentUser = useMemo<CurrentUser | null>(() => {
        const userStr = localStorage.getItem('oc_current-user');
        if (!userStr) return null;
        return JSON.parse(userStr);
    }, [])

    function setCurrentUser(user: CurrentUser) {
        localStorage.setItem('oc_current-user', JSON.stringify(user));
    }

    function register(user: RegisterOptions) {
        console.log({...user});
    }

    function login(user: {phone?: string, email?: string, password: string}) {
        console.log({...user});
    }

    return (
        <AuthContext.Provider value={{
            currentUser, register, login, setCurrentUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);