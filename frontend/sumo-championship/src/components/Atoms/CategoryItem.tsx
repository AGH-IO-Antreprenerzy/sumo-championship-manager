import React from 'react';
import './../../styles/Atoms.css';
import IconButton from './IconButton';

interface props {
  key: string;
  name: string;
  value: number;
  onEdit?: () => void;
  onDelete?: () => void;
}

const CategoryItem: React.FC<props> = ({
  key,
  name,
  value,
  onEdit,
  onDelete,
}) => {
  return (
    <div key={key} className="categoryItem">
      <div className="values">
        <p className="categoryName">{name}</p>
        <p className="categoryValue">{value} kg</p>
      </div>
      <div className="actions">
        <IconButton name="edit" size={20} onClick={onEdit} />
        <IconButton name="trash" size={20} onClick={onDelete} />
      </div>
    </div>
  );
};

export default CategoryItem;
