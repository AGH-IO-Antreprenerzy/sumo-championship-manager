import React, { useMemo } from 'react';
import './../../styles/Organisms.css';
import { Season } from '../../types/Seasons';
import Tile from '../Atoms/Tile';
import SeasonItem from './SeasonItem';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../routes/ROUTES';

type props = {
  seasons: Season[];
};

const SeasonList: React.FC<props> = ({ seasons }) => {
  const navigate = useNavigate();

  const itemList = useMemo(() => {
    if (seasons.length === 0) {
      return (
        <p className="description">Currently there are no seasons ongoing</p>
      );
    }

    return seasons.map((season: Season, index: number) => {
      return (
        <SeasonItem
          key={`seasonItem=${index}`}
          name={season.name}
          startDate={season.start}
          endDate={season.end}
          onClick={() => {
            navigate(ROUTES.SEASON_PAGE.replace(':name', season.name));
          }}
        />
      );
    });
  }, [navigate, seasons]);

  return (
    <Tile>
      <div className="seasonList"> {itemList}</div>
    </Tile>
  );
};

export default SeasonList;
