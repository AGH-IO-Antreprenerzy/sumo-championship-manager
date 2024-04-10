import React from 'react';
import './../../styles/Atoms.css';
import Icon from './Icon';

interface props {
  icon: string;
  text: string;
}

const SubtitleWithIcon: React.FC<props> = ({ icon, text }) => {
  return (
    <div className="subtitleWithIcon">
      <Icon
        src={require(`./../../assets/icons/${icon}.png`)}
        alt={icon}
        size={16}
      />
      <p>{text}</p>
    </div>
  );
};

export default SubtitleWithIcon;
