import { FunctionComponent, useEffect, useState } from 'react';
import Button from '../components/Atoms/Button';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../routes/ROUTES';
import api from '../api/api';
import SeasonList from '../components/molecules/SeasonList';
import PageSwitcher from '../components/molecules/PageSwitcher';
import { AllSeasons } from '../api/season';
import { Season } from '../types/Seasons';

const AllSeasonsPage: FunctionComponent = () => {
  const navigate = useNavigate();
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const handleAddSeason = () => {
    navigate(ROUTES.SEASONS_ADD);
  };

  const getSeasons = async (page: number) => {
    const seasons = await api.getPaginated<AllSeasons>('v1/season/all', 6, {
      historical: false,
    })(page);

    setTotalPages(seasons.totalPages);
    setCurrentPage(seasons.pageNo);
    setSeasons(seasons.seasonDtoList);
  };

  useEffect(() => {
    getSeasons(0);
  }, []);

  return (
    <div className="page">
      <div className="pageTop">
        <p className="title">Current Seasons:</p>
        <Button value="Add Season" onClick={handleAddSeason} />
      </div>

      <SeasonList seasons={seasons} />

      <PageSwitcher
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevClick={() => getSeasons(currentPage - 1)}
        onNextClick={() => getSeasons(currentPage + 1)}
      />
    </div>
  );
};

export default AllSeasonsPage;
