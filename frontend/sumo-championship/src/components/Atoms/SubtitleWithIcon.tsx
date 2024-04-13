import React from 'react';
import './../../styles/Atoms.css';
import FaIcon from './FaIcon';
import * as FaIcons from 'react-icons/fa';

interface props {
  icon: keyof typeof FaIcons;
  text: string;
}

const SubtitleWithIcon: React.FC<props> = ({ icon, text }) => {
  return (
    <div className="subtitleWithIcon">
      <FaIcon name={icon} size={16} />
      <p>{text}</p>
    </div>
  );
};

export default SubtitleWithIcon;
