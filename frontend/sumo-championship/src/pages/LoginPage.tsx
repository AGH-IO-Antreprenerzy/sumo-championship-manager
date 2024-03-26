import React from 'react';
import LoginForm from '../components/organisms/LoginForm';
import './../styles/Pages.css';
import Tile from '../components/Atoms/Tile';
const LoginPage: React.FC = () => {
  return (
    <div className="page loginPageLayout">
      <img src={require('./../assets/icons/sumo.png')} alt="sumo" />
      <Tile style={{ position: 'absolute' }}>
        <p className="subtitle mb20">Log in form</p>
        <LoginForm />
      </Tile>
      <img src={require('./../assets/icons/sumo.png')} alt="sumoIcon" />
    </div>
  );
};

export default LoginPage;
