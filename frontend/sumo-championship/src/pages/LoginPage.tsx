import React from 'react';
import LoginForm from '../components/organisms/LoginForm';
import './../styles/Pages.css'
const LoginPage: React.FC = () => {
    return (
        <div className='pageLayout'>
            <img src={require('./../assets/sumo.png')} alt='sumo'/>
            <LoginForm/>
            <img src={require('./../assets/sumo.png')} alt='sumoIcon'/>
        </div>
    );
};

export default LoginPage;