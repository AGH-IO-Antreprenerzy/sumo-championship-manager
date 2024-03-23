import React, { useEffect, useState } from 'react';
import './../../styles/Atoms.css';
import IconButton from './IconButton';
import { Gender } from '../../types/Category';

interface props {
  key?: string;
  name: string;
  gender: Gender;
  minAge: number;
  maxAge: number;
  minWeight: number;
  maxWeight: number;
  onEdit: () => void;
  onEditCancel: () => void;
  onDelete?: () => void;
}

const CategoryItem: React.FC<props> = ({
  key,
  name,
  gender,
  minAge,
  maxAge,
  minWeight,
  maxWeight,
  onEdit,
  onEditCancel,
  onDelete,
}) => {
  const [isEdited, setIsEdited] = useState(false);

  const handleEdit = () => {
    onEdit();
    setIsEdited(true);
  };

  const handleCancel = () => {
    onEditCancel();
    setIsEdited(false);
  };

  useEffect(() => {
    setIsEdited(false);
  }, [name, gender, minAge, maxAge, minWeight, maxWeight]);

  return (
    <div key={key} className="categoryItem">
      <div className="field" style={{ flex: 3, justifyContent: 'start' }}>
        {name}
      </div>
      <div className="field">{gender}</div>
      <div className="field">
        {minAge} - {maxAge}
      </div>
      <div className="field">
        {minWeight} - {maxWeight}
      </div>
      <div className="field">
        {isEdited ? (
          <div className="actions">
            <IconButton name="cross" size={16} onClick={handleCancel} />
          </div>
        ) : (
          <div className="actions">
            <IconButton name="edit" size={20} onClick={handleEdit} />
            <IconButton name="trash" size={20} onClick={onDelete} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryItem;
