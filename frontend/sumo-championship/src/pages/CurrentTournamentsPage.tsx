import { FunctionComponent, useEffect, useState } from 'react';
import Button from '../components/Atoms/Button';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../routes/ROUTES';
import api from '../api/api';
import PageSwitcher from '../components/molecules/PageSwitcher';
import { PaginatedTournaments, Tournament } from '../types/Tournament';
import TournamentList from '../components/molecules/TournamentList';
import Tile from '../components/Atoms/Tile';

const CurrentTournamentsPage: FunctionComponent = () => {
  const navigate = useNavigate();
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const handleAddSeason = () => {
    navigate(ROUTES.TOURNAMENTS_ADD);
  };

  const getTournaments = async (page: number) => {
    try {
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
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getTournaments(0);
  }, []);

  return (
    <div className="page">
      <div className="pageTop">
        <p className="title">Current Tournaments:</p>
        <Button value="Add Tournament +" onClick={handleAddSeason} />
      </div>

      <Tile>
        <TournamentList tournaments={tournaments} />
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
