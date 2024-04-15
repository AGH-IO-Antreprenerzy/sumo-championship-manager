import React from 'react';
import './../../styles/Molecules.css';

type props = {
  name: string;
  startDate: string;
  endDate: string;
  onClick?: () => void;
};

const SeasonItem: React.FC<props> = ({ name, startDate, endDate, onClick }) => {
  return (
    <div className="seasonItem" onClick={onClick}>
      <img
        src={require('./../../assets/images/sumoFight.png')}
        alt="Season preview image"
        className="seasonItem_image"
      />

      <div className="seasonItem_content">
        <p
          className="heading"
          style={{
            marginBottom: 10,
          }}
        >
          {name}
        </p>
        <p className="text">Start date: {startDate}</p>
        <p className="text">End date: {endDate}</p>
      </div>
    </div>
  );
};

export default SeasonItem;
