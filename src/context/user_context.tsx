import {createContext, useContext, useState, useEffect } from 'react';
import { useAuth0, User } from '@auth0/auth0-react';
import { ChildrenProps } from '../model/children';



const initialState = {
    myUser: User,
    isAuthenticated: false,
    loginWithRedirect: () => Promise<void>, 
    logout: () => null, 
    isLoading: false, 
    error: false,
}

const UserContext = createContext<User>({
   authState: initialState,
});
export const  UserProvider = ({children}:ChildrenProps) => {
    const { loginWithRedirect, logout, user, isLoading, error, isAuthenticated} = useAuth0();
    const [myUser, setMyUser] = useState<User | null>(null);

    useEffect(() => {
        user&&setMyUser(user);
    }, [user])
    return (
        <UserContext.Provider value={{
            myUser,
            isAuthenticated,
            loginWithRedirect, 
            logout, 
            isLoading, 
            error,
        }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => {
    return useContext(UserContext);
}
