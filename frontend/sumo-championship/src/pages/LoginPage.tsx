import React from 'react';
import LoginForm from '../components/organisms/LoginForm';
import './../styles/Pages.css';
import Tile from '../components/Atoms/Tile';
const LoginPage: React.FC = () => {
  return (
    <div className="page loginPageLayout">
      <img src={require('./../assets/icons/sumo.png')} alt="sumo" />
      <Tile>
        <LoginForm />
      </Tile>
      <img src={require('./../assets/icons/sumo.png')} alt="sumoIcon" />
    </div>
  );
};

export default LoginPage;
