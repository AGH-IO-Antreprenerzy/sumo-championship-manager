import React, { useState } from 'react';
import TextField from '../molecules/TextField';
import "./../../styles/Organisms.css"
import Submit from '../Atoms/Submit';
interface props{}

interface loginInformation{
    email: string,
    password: string
}

interface loginInformationError{
    email: string,
    password: string
}

const LoginForm: React.FC<props> = () => {
    const emptyLoginInfo: loginInformation = {email: "", password: ""}
    const emptyLoginInfoError: loginInformationError = {email: "", password: ""}

    const [loginInfo, setLoginInfo] = useState<loginInformation>(emptyLoginInfo)
    const [loginInfoError, setLoginInfoError] = useState<loginInformationError>(emptyLoginInfoError)
    
    const checkForEmail = (email: string) => {
        const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/

        if (email === ""){
            setLoginInfoError(prev => ({...prev, email: "You need to provide an email"}))
            return
        }

        if (!regex.test(email)){
            setLoginInfoError(prev => ({...prev, email: "Provide a valid email"}))
        }
    }

    const checkForPassword = (password: string) => {
        if (password === ""){
            setLoginInfoError(prev => ({...prev, password: "You need to provide a password"}))
        }
    }

    const handleSubmit = () => {
        setLoginInfoError(emptyLoginInfoError);

        checkForEmail(loginInfo.email);
        checkForPassword(loginInfo.password);

        if (loginInfoError !== emptyLoginInfoError){
            console.log("No nie pasuje")
            return;
        }
        
        console.log(loginInfo);
        setLoginInfo(emptyLoginInfo)
    }
    return (
        <form onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }} action='POST'>
            <div className='loginForm'>
                <TextField
                    label='Email'
                    onChange={e => setLoginInfo(prev => ({...prev, email: e.target.value.trim()}))}
                    value={loginInfo.email}
                    errorMessage={loginInfoError.email}
                />
                <TextField
                    label='Password'
                    onChange={e => setLoginInfo(prev => ({...prev, password: e.target.value.trim()}))}
                    value={loginInfo.password}
                    errorMessage={loginInfoError.password}
                    type='password'
                />
                <Submit label='Login'/>
            </div>
        </form>
    );
};

export default LoginForm;