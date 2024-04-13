import React from 'react';
import './../../styles/Atoms.css';
import IconButton from './IconButton';

interface props {
  value: string | number;
  onRemove: () => void;
}

const WeightBox: React.FC<props> = ({ value, onRemove }) => {
  return (
    <div className="weightBox">
      <div> {`< ${value} kg`}</div>
      <IconButton name="FaPlus" size={16} onClick={onRemove} />
    </div>
  );
};

export default WeightBox;
