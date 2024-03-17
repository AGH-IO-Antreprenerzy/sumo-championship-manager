import React, { createContext, useState } from 'react';
import { Role, postLogin } from '../api/login';
import { loginInformation } from '../components/organisms/LoginForm';

interface User{
    isLogged: boolean,
    name: string,
    lastname: string,
    email: string,
    role: Role | null
}

const defaultUser: User = {
    isLogged: false,
    name: "",
    lastname: "",
    email: "",
    role: null
}

interface UserContextType{
    user: User,
    signIn: (user: loginInformation) => Promise<void>,
    signOut: () => void
}

export const userContext = createContext<UserContextType>({
    user: defaultUser,
    signIn: (user: loginInformation) => new Promise((res, rej) => {}),
    signOut: () => {}
});

const UserContext = (props: { children: any; }) => {
    const [userState, setUserState] = useState<UserContextType>(
        {
            user: defaultUser,

            signIn: async (loginInfo: loginInformation) => {
                const response = await postLogin(loginInfo)

                const user: User = {
                    isLogged: true,
                    name: response.name,
                    lastname: response.lastname,
                    email: response.email,
                    role: response.role
                }
                
                setUserState(prev => ({...prev, user: user}));
            },

            signOut: () => setUserState(prev => ({...prev, user: defaultUser}))
        }
    );

    return(
        <userContext.Provider value = {userState}>
            {props.children}
        </userContext.Provider>
    )

};

export default UserContext;
