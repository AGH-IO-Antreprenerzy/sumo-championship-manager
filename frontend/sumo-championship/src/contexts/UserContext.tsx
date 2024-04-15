import React, { createContext, useContext, useState } from 'react';
import { Role, postLogin } from '../api/login';
import { loginInformation } from '../components/organisms/LoginForm';
import { useCookies } from 'react-cookie';

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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [cookie, setCookie, removeCookie] = useCookies(["Authorization"])
    const [userState, setUserState] = useState<UserContextType>(
        {
            user: defaultUser,

            signIn: async (loginInfo: loginInformation) => {
                try{
                    const response = await postLogin(loginInfo)

                    console.log(response)
                    setCookie("Authorization", `Bearer ${response.token}`, {path: "/"})

                    const user: User = {
                        isLogged: true,
                        name: response.firstname,
                        lastname: response.lastname,
                        email: response.email,
                        role: response.role
                    }
                    
                    setUserState(prev => ({...prev, user: user}));
                }catch(exception: unknown){
                    if (exception instanceof Response){
                        alert(await exception.text())
                    }
                }
            },

            signOut: () => {
                setUserState(prev => ({...prev, user: defaultUser}))
                removeCookie("Authorization", {path: "/"})
            }
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
