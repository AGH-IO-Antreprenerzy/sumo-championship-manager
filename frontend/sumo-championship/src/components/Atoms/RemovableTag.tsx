import React from 'react';
import './../../styles/Atoms.css';
import IconButton from './IconButton';

interface props {
  name: string;
  onDelete?: () => void;
}

const RemovableTag: React.FC<props> = ({ name, onDelete }) => {
  return (
    <div className="tag">
      <p>{name}</p>
      <IconButton name="white-cross" size={12} onClick={onDelete} />
    </div>
  );
};

export default RemovableTag;
