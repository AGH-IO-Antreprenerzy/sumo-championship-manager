import React, { useState } from 'react';
import TextField from '../molecules/TextField';
import "./../../styles/Organisms.css"
import Submit from '../Atoms/Submit';
interface props{}

interface loginInformation{
    email: string,
    password: string
}
const LoginForm: React.FC<props> = () => {
    const [loginInfo, setLoginInfo] = useState<loginInformation>({email: "", password: ""})
    
    const handleSubmit = () => {

    }
    return (
        <form onSubmit={handleSubmit}>
            <div className='loginForm'>
                <TextField
                    label='Email'
                    onChange={e => setLoginInfo(prev => ({...prev, email: e.target.value}))}
                    value={loginInfo.email}
                />
                <TextField
                    label='Password'
                    onChange={e => setLoginInfo(prev => ({...prev, password: e.target.value}))}
                    value={loginInfo.password}
                    type='password'
                />
                <Submit label='Login'/>
            </div>
        </form>
    );
};

interface props{}

export default LoginForm;