import { FunctionComponent, useEffect, useState } from 'react';
import Button from '../components/Atoms/Button';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../routes/allRoutes';
import api from '../api/api';
import PageSwitcher from '../components/molecules/PageSwitcher';
import { PaginatedTournaments, Tournament } from '../types/Tournament';
import TournamentList from '../components/molecules/TournamentList';
import Tile from '../components/Atoms/Tile';
import ActivityIndicator from '../components/Atoms/ActivityIndicator';
import { useUser } from '../contexts/UserContext';
import { Role } from '../api/login';

const CurrentTournamentsPage: FunctionComponent = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const handleAddSeason = () => {
    navigate(ROUTES.TOURNAMENTS_ADD);
  };

  const getTournaments = async (page: number) => {
    try {
      setIsLoading(true);
      const tournaments = await api.getPaginated<PaginatedTournaments>(
        'v1/tournament/all',
        6,
        {
          historical: false,
        },
      )(page);

      setTotalPages(tournaments.totalPages);
      setCurrentPage(tournaments.pageNo);
      setTournaments(tournaments.tournamentDtoList);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getTournaments(0);
  }, []);

  if (isLoading) {
    return (
      <div className="page">
        <ActivityIndicator />
      </div>
    );
  }

  return (
    <div className="page">
      <div className="pageTop">
        <p className="title">Current Tournaments:</p>
        {user.role === Role.Admin && (
          <Button name="Add Tournament +" onClick={handleAddSeason} />
        )}
      </div>

      <Tile>
        <TournamentList tournaments={tournaments} grid />
      </Tile>

      <PageSwitcher
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevClick={() => getTournaments(currentPage - 1)}
        onNextClick={() => getTournaments(currentPage + 1)}
      />
    </div>
  );
};

export default CurrentTournamentsPage;
