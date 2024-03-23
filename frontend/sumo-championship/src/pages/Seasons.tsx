import React, { FunctionComponent, useEffect, useState } from 'react';
import Button from '../components/Atoms/Button';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../routes/ROUTES';
import api from '../api/api';
import IconButton from '../components/Atoms/IconButton';

const iconStyle = {
  border: 'none',
  backgroundColor: 'transparent',
};

const Seasons: FunctionComponent = () => {
  const navigate = useNavigate();
  const [seasons, setSeasons] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const handleAddSeason = () => {
    navigate(ROUTES.SEASONS_ADD);
  };

  const getSeasons = async (page: number) => {
    const seasons = await api.getPaginated('v1/season/all', 6, {
      historical: false,
    })(page);

    setTotalPages(seasons.totalPages);
    setCurrentPage(seasons.pageNo);
    setSeasons(seasons.seasonDtoList);
  };

  useEffect(() => {
    getSeasons(currentPage);
  }, [currentPage]);

  return (
    <div className="page">
      <div className="pageTop">
        <p className="title">Current Seasons:</p>
        <Button value="Add Season" onClick={handleAddSeason} />
      </div>

      <div className="tile">
        {seasons.length === 0 ? (
          <p className="description">Currently there are no seasons ongoing</p>
        ) : null}
      </div>
      <div className="pageSwitcher">
        <IconButton
          name="left-arrow"
          size={20}
          style={iconStyle}
          disabled={totalPages === 0 || currentPage === 0}
        />
        <p className="pageNumber nonSelectable">
          {currentPage + totalPages === 0 ? 0 : 1}
        </p>
        <IconButton
          name="right-arrow"
          size={20}
          style={iconStyle}
          disabled={totalPages === 0 || currentPage === totalPages - 1}
        />
      </div>
    </div>
  );
};

export default Seasons;
