import React from 'react';
import './../../styles/Atoms.css';

interface props {
  name?: string;
  info?: string;
}

const DetailItem: React.FC<props> = ({ name, info }) => {
  return (
    <div className="detailItem">
      <div className="left">{name}</div>
      <div className="right">{info}</div>
    </div>
  );
};

export default DetailItem;
