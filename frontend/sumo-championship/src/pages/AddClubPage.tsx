import React from 'react';
import AddClubForm from '../components/organisms/AddClubForm';
import './../styles/Pages.css';
import Tile from '../components/Atoms/Tile';
const AddClubPage: React.FC = () => {
  return (
    <div className="page loginPageLayout">
      <img src={require('./../assets/icons/sumo.png')} alt="sumo" />
      <Tile style={{ position: 'absolute' }}>
        <p className="subtitle mb20">Add club form</p>
        <AddClubForm />
      </Tile>
      <img src={require('./../assets/icons/sumo.png')} alt="sumoIcon" />
    </div>
  );
};

export default AddClubPage;
