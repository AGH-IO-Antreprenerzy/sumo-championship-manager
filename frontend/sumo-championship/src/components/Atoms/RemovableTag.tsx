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
      {onDelete && (
        <IconButton
          name="FaPlus"
          size={16}
          onClick={onDelete}
          color="white"
          iconSttyle={{ rotate: '45deg' }}
        />
      )}
    </div>
  );
};

export default RemovableTag;
