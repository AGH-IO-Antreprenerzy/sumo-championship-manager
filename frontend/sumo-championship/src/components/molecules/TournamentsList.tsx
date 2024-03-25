import React from 'react';
import './../../styles/Molecules.css';

import TournamentItem from './TournamentItem';
import { Tournament } from '../../types/Tournament';

type props = {
  tournaments: Tournament[];
  style?: React.CSSProperties;
};

const TournamentList: React.FC<props> = ({ tournaments, style }) => {
  console.log(tournaments);

  if (tournaments.length === 0) {
    return <p>No tournaments available</p>;
  }

  return (
    <div className="tournamentList" style={style}>
      {tournaments.map((tournament, index) => (
        <TournamentItem
          key={index}
          name={tournament.name}
          date={tournament.contestStart}
          location={tournament.location.city}
          registrationDate={tournament.registerStart}
        />
      ))}
    </div>
  );
};

export default TournamentList;
