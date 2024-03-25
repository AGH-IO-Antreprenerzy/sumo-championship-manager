import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Tile from '../components/Atoms/Tile';
import DetailItem from '../components/Atoms/DetailItem';
import api from '../api/api';
import { DetailedSeason } from '../types/Seasons';
import { isDateBetween } from '../utils/dateUtils';
import CategoryTable from '../components/organisms/CategoryTable';
import TournamentList from '../components/molecules/TournamentsList';

const SeasonPage: React.FC = () => {
  const { name } = useParams();
  const [seasonInfo, setSeasonInfo] = useState<DetailedSeason | null>(null);

  const getSeasonInfo = useCallback(async () => {
    try {
      const seasonInfo = await api.get<DetailedSeason>('v1/season/details', {
        name,
      })();
      setSeasonInfo(seasonInfo);
    } catch (error) {
      setSeasonInfo(null);
    }
  }, [name]);

  useEffect(() => {
    getSeasonInfo();
  }, [getSeasonInfo, name]);

  return (
    <div className="page seasonPage">
      <div className="season_topPanel">
        <Tile className="generalInfo">
          <p className="subtitle mb10">General information</p>

          <img
            src={require('./../assets/images/sumoFight.png')}
            alt="Season preview image"
            className="season_image"
          />

          <DetailItem name="Name:" info={name} />
          <DetailItem name="Start date:" info={seasonInfo?.start} />
          <DetailItem name="End date:" info={seasonInfo?.end} />
          <DetailItem
            name="Status:"
            info={
              isDateBetween(seasonInfo?.start, seasonInfo?.end)
                ? 'Active'
                : 'Inactive'
            }
          />
        </Tile>
        <Tile className="categories">
          <p className="subtitle mb10">Categories</p>
          <CategoryTable
            categories={seasonInfo?.categories || []}
            showOptions={false}
            style={{ height: 300 }}
          />
        </Tile>
      </div>
      <div className="season_bottomPanel">
        <Tile>
          <p className="subtitle mb20">Tournaments</p>
          <TournamentList tournaments={seasonInfo?.tournaments || []} />
        </Tile>
      </div>
    </div>
  );
};

export default SeasonPage;
