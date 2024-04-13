import React from 'react';
import './../../styles/Molecules.css';

import TournamentItem from './TournamentItem';
import { Tournament } from '../../types/Tournament';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../routes/ROUTES';

type props = {
  tournaments: Tournament[];
  grid?: boolean;
  style?: React.CSSProperties;
};

const TournamentList: React.FC<props> = ({ tournaments, grid, style }) => {
  const navigate = useNavigate();

  if (tournaments.length === 0) {
    return <p>No tournaments available</p>;
  }

  return (
    <div
      className={grid ? 'tournamentGridList' : 'tournamentFlexList'}
      style={style}
    >
      {tournaments.map((tournament, index) => (
        <TournamentItem
          key={index}
          name={tournament.name}
          date={tournament.contestStart}
          location={tournament.location.city}
          registrationDate={tournament.registerStart}
          usedOnGrid={grid}
          onClick={() =>
            navigate(
              ROUTES.TOURNAMENT_PAGE.replace(':id', String(tournament.id)),
            )
          }
        />
      ))}
    </div>
  );
};

export default TournamentList;
