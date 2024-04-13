import React from 'react';
import Tile from '../../components/Atoms/Tile';
import AddTrainerForm from '../../components/organisms/AddTrainerForm/AddTrainerForm';
import "./addTrainer.css"

const AddTrainer = () => {
    return (
        <div className='addTrainerPage'>
            <img src={require('./../../assets/icons/sumo.png')} alt="sumo" />
            <Tile style={{ position: 'absolute' }}>
                <p className="subtitle mb20">Add trainer</p>
                <AddTrainerForm/>
            </Tile>
            <img src={require('./../../assets/icons/sumo.png')} alt="sumo" />
        </div>
    );
};

export default AddTrainer;