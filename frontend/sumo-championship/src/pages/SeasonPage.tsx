import React from 'react';
import { useParams } from 'react-router-dom';
import Tile from '../components/Atoms/Tile';

const SeasonPage: React.FC = () => {
  const { name } = useParams();

  return (
    <div className="page seasonPage">
      <div className="season_topPanel">
        <Tile className="generalInfo">SeasonPage {name}</Tile>
        <Tile className="categories">Dupa</Tile>
      </div>
      <div className="season_bottomPanel">
        <Tile>SeasonPage {name}</Tile>
      </div>
    </div>
  );
};

export default SeasonPage;
