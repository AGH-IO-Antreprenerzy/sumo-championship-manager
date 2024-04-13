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
import { DetailedTournament } from '../types/Tournament';

const TournamentPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [tournamentInfo, setTournamentInfo] =
    useState<DetailedTournament | null>(null);
  const currentDate = new Date();

  const getTournamentInfo = useCallback(async () => {
    try {
      const tournamentDetails = await api.get<DetailedTournament>(
        'v1/tournament/details',
        {
          tournamentId: id,
        },
      )();
      setTournamentInfo(tournamentDetails);
    } catch (error) {
      setTournamentInfo(null);
    }
  }, []);

  const getStatus = () => {
    if (
      isDateBetween(tournamentInfo?.contestStart, tournamentInfo?.contestEnd)
    ) {
      return 'Active';
    }
    if (
      tournamentInfo?.registerStart &&
      currentDate < new Date(tournamentInfo?.registerStart)
    ) {
      return 'Registration not started';
    } else if (
      isDateBetween(tournamentInfo?.registerStart, tournamentInfo?.registerEnd)
    ) {
      return 'Registration started';
    } else if (
      tournamentInfo?.registerEnd &&
      tournamentInfo?.contestStart &&
      currentDate > new Date(tournamentInfo?.registerEnd) &&
      currentDate < new Date(tournamentInfo?.contestStart)
    ) {
      return 'Registration ended';
    }
    if (
      isDateBetween(tournamentInfo?.contestStart, tournamentInfo?.contestEnd)
    ) {
      return 'Active';
    } else {
      return 'Inactive';
    }
  };

  useEffect(() => {
    getTournamentInfo();
  }, [getTournamentInfo]);

  return (
    <div className="page seasonPage">
      <div className="pageTop">
        <p className="title">Tournament: {tournamentInfo?.name ?? '-'}</p>
        <Button
          value="Export"
          onClick={() => {
            // TODO: Implement export functionality
          }}
        />
      </div>
      <div className="season_topPanel">
        <Tile className="generalInfo">
          <p className="subtitle mb10">General information</p>

          <img
            src={require('./../assets/images/tournamentPlaceholder.png')}
            alt="Season preview image"
            className="season_image"
          />

          <DetailItem name="Name:" info={tournamentInfo?.name} />
          <DetailItem
            name="Date:"
            info={`${tournamentInfo?.contestStart} - ${tournamentInfo?.contestEnd}`}
          />
          <DetailItem
            name="Registration:"
            info={`${tournamentInfo?.registerStart} - ${tournamentInfo?.registerEnd}`}
          />
          <DetailItem name="Status:" info={getStatus()} />
        </Tile>
        <Tile className="categories">
          <p className="subtitle mb10">Tournament categories</p>
          <CategoryTable
            categories={tournamentInfo?.ageCategories || []}
            showOptions={false}
            style={{ height: 380 }}
          />
        </Tile>
      </div>
      <div className="season_bottomPanel">
        <Tile>
          <div className="pageTop">
            <p className="subtitle mb20">Registered champions</p>
          </div>
        </Tile>
      </div>
    </div>
  );
};

export default TournamentPage;
