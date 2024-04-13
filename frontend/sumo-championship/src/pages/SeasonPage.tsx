import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Tile from '../components/Atoms/Tile';
import DetailItem from '../components/Atoms/DetailItem';
import api from '../api/api';
import { DetailedSeason } from '../types/Seasons';
import { isDateBetween } from '../utils/dateUtils';
import CategoryTable from '../components/organisms/CategoryTable';
import TournamentList from '../components/molecules/TournamentList';
import Button from '../components/Atoms/Button';
import ROUTES from '../routes/ROUTES';

const SeasonPage: React.FC = () => {
  const navigate = useNavigate();
  const { name } = useParams();
  const [seasonInfo, setSeasonInfo] = useState<DetailedSeason | null>(null);

  const getSeasonInfo = useCallback(async () => {
    try {
      const seasonInfo = await api.get<DetailedSeason>('v2/season/details', {
        name,
      })();
      setSeasonInfo(seasonInfo);
    } catch (error) {
      setSeasonInfo(null);
      alert('XD');
    }
  }, [name]);

  const handleAddTournament = () => {
    navigate(ROUTES.TOURNAMENTS_ADD_TO_SEASON.replace(':name', name ?? ''));
  };

  useEffect(() => {
    getSeasonInfo();
  }, [getSeasonInfo]);

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
            categories={seasonInfo?.ageCategories || []}
            showOptions={false}
            style={{ height: 300 }}
          />
        </Tile>
      </div>
      <div className="season_bottomPanel">
        <Tile>
          <div className="pageTop">
            <p className="subtitle mb20">Tournaments:</p>
            <Button value="Add Tournament +" onClick={handleAddTournament} />
          </div>
          <TournamentList tournaments={seasonInfo?.tournaments || []} />
        </Tile>
      </div>
    </div>
  );
};

export default SeasonPage;
