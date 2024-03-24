import React, { createContext, useContext, useState } from 'react';
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

const userContext = createContext<UserContextType | undefined>(undefined);

const UserContext = (props: { children: string | JSX.Element | JSX.Element[]; }) => {
    const [userState, setUserState] = useState<UserContextType>(
        {
            user: defaultUser,

            signIn: async (loginInfo: loginInformation) => {
                try{
                    const response = await postLogin(loginInfo)

                    const user: User = {
                        isLogged: true,
                        name: response.firstname,
                        lastname: response.lastname,
                        email: response.email,
                        role: response.userRole
                    }
                    
                    setUserState(prev => ({...prev, user: user}));
                }catch(exception: unknown){
                    if (exception instanceof Response){
                        alert(await exception.text())
                    }
                }
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

export const useUser = (): UserContextType => {
    const context = useContext(userContext)
    
    if (context === undefined){
        throw new Error("Context is undefined, please use it inside userContext provider")
    }

    return context;
}

export default UserContext;
