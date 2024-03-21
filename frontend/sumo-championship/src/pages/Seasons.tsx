import React, { FunctionComponent, useState } from 'react';
import Button from '../components/Atoms/Button';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../routes/ROUTES';

const Seasons: FunctionComponent = () => {
  const navigate = useNavigate();
  const [seasons, setSeasons] = useState([]);

  const handleAddSeason = () => {
    navigate(ROUTES.SEASONS_ADD);
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
    </div>
  );
};

export default Seasons;
