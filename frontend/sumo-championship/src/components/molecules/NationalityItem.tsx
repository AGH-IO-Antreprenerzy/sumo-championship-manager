import React from 'react';
import './../../styles/Molecules.css';


type props = {
  name: string;
  onClick?: () => void;
  usedOnGrid?: boolean;
};

const NationalityItem: React.FC<props> = ({
  name,
  onClick,
  usedOnGrid = false,
}) => {


  return (
    <div
      className="nationalityItem"
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
        src={require('./../../assets/images/nationalityPlaceholder.png')}
        alt="Nationality preview image"
        className="nationalityItem_image"
      />

      <div className="nationalityItem_content">
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

export default NationalityItem;
