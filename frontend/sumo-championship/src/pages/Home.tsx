import React, { FunctionComponent } from 'react';
import Tile from '../components/Atoms/Tile';
import Button from '../components/Atoms/Button';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../routes/ROUTES';

const Home: FunctionComponent = () => {
  const navigate = useNavigate();

  return (
    <div className="page loginPageLayout">
      <img src={require('./../assets/icons/sumo.png')} alt="sumo" />
      <Tile style={{ position: 'absolute' }}>
        <div className="homeContent">
          <h1 className="centeredText bigTitle mb40">
            Official European Sumo Federation Website
          </h1>
          <p className="centeredText">
            Click here to check out incoming tournaments
          </p>
          <Button
            value="Let's fight!"
            onClick={() => {
              navigate(ROUTES.TOURNAMENTS);
            }}
            style={{ width: 250 }}
          />
        </div>
      </Tile>
      <img src={require('./../assets/icons/sumo.png')} alt="sumoIcon" />
    </div>
  );
};

export default Home;
