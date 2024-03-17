import React, { useState } from 'react';
import TextField from '../molecules/TextField';

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
        <form onSubmit={handleSubmit} className='loginForm'>
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
        </form>
    );
};

interface props{}

export default LoginForm;