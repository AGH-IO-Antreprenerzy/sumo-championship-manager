import React from 'react';
import './../../styles/Molecules.css';
import DetailItem from '../Atoms/DetailItem';

type props = {
  name: string;
  date: string;
  location: string;
  registrationDate: string;
  onClick?: () => void;
  usedOnGrid?: boolean;
};

const TournamentItem: React.FC<props> = ({
  name,
  date,
  location,
  registrationDate,
  onClick,
  usedOnGrid = false,
}) => {
  const tournamentDate = new Date(date);
  const registrationStartDate = new Date(registrationDate);

  const getStatus = () => {
    const currentDate = new Date();
    if (currentDate < registrationStartDate) {
      return 'Registration not started';
    }
    if (currentDate < tournamentDate) {
      return 'Registration started';
    }
    return 'Registration ended';
  };

  return (
    <div
      className="tournamentItem"
      onClick={onClick}
      style={
        usedOnGrid
          ? {
              maxWidth: '100%',
              minWidth: '300px',
            }
          : {}
      }
    >
      <img
        src={require('./../../assets/images/tournamentPlaceholder.png')}
        alt="Season preview image"
        className="tournamentItem_image"
      />

      <div className="tournamentItem_content">
        <p
          className="heading"
          style={{
            marginBottom: 10,
          }}
        >
          {name}
        </p>

        <DetailItem name="Date:" info={date} />
        <DetailItem name="Location:" info={location} />
        <DetailItem name="Status:" info={getStatus()} />
      </div>
    </div>
  );
};

export default TournamentItem;
