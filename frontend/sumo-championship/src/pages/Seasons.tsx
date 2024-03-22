import React, { FunctionComponent, useEffect, useState } from 'react';
import Button from '../components/Atoms/Button';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../routes/ROUTES';
import api from '../api/api';

const Seasons: FunctionComponent = () => {
  const navigate = useNavigate();
  const [seasons, setSeasons] = useState([]);

  const handleAddSeason = () => {
    navigate(ROUTES.SEASONS_ADD);
  };

  const getSeasons = async () => {
    const seasons = await api.getPaginated('v1/season/all', 6, {
      historical: false,
    })(0);
    console.log(seasons);
  };

  return (
    <div className="page">
      <div className="pageTop">
        <p className="title">Current Seasons:</p>
        <Button value="Add Season" onClick={handleAddSeason} />
      </div>

      <div className="seasons">
        {seasons.length === 0 ? (
          <p className="description">Currently there are no seasons ongoing</p>
        ) : null}
      </div>

      <Button value="Test API" onClick={getSeasons} />
    </div>
  );
};

export default Seasons;
