import React from 'react';
import './../../styles/Molecules.css';


type props = {
  name: string;
  onClick?: () => void;
  usedOnGrid?: boolean;
};

const ClubItem: React.FC<props> = ({
  name,
  onClick,
  usedOnGrid = false,
}) => {


  return (
    <div
      className="clubItem"
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
        src={require('./../../assets/images/clubPlaceholder.png')}
        alt="Club preview image"
        className="clubItem_image"
      />

      <div className="clubItem_content">
        <p
          className="heading"
          style={{
            marginBottom: 10,
          }}
        >
          {name}
        </p>
      </div>
    </div>
  );
};

export default ClubItem;
