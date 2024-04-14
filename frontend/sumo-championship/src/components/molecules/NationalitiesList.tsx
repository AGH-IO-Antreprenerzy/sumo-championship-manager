import React from 'react';
import './../../styles/Molecules.css';
import ROUTES from '../../routes/allRoutes';
import { useNavigate } from 'react-router-dom';

import NationalityItem from './NationalityItem';
type Nationality = {
    name: string;
};
type props = {
  nationalities: Nationality[];
  grid?: boolean;
  style?: React.CSSProperties;
};

const NationalitiesList: React.FC<props> = ({ nationalities, grid, style }) => {
  const navigate = useNavigate();
  if (nationalities.length === 0) {
    return <p>No nationalities available</p>;
  }

  return (
    <div
      className={grid ? 'nationalityGridList' : 'nationalityFlexList'}
      style={style}
    >
      {nationalities.map((nationality, index) => (
        <NationalityItem
          key={index}
          name={nationality.name}
          usedOnGrid={grid}
          onClick={() => {
            navigate(ROUTES.CLUBS.replace(':countryName', nationality.name.toUpperCase()));
          }}
        />
      ))}
    </div>
  );
};

export default NationalitiesList;
