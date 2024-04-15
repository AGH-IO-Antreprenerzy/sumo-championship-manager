import React from 'react';
import './../../styles/Molecules.css';

import ClubItem from './ClubItem';
type Club = {
    id: number;
    name: string;
    nationality: string;
};
type props = {
  clubs: Club[];
  grid?: boolean;
  style?: React.CSSProperties;
};

const ClubList: React.FC<props> = ({ clubs, grid, style }) => {
  if (clubs.length === 0) {
    return <p>No clubs available</p>;
  }

  return (
    <div
      className={grid ? 'nationalityGridList' : 'nationalityFlexList'}
      style={style}
    >
      {clubs.map((club, index) => (
        <ClubItem
          key={index}
          name={club.name}
          usedOnGrid={grid}
        />
      ))}
    </div>
  );
};

export default ClubList;
