import React, { useEffect, useState } from 'react';
import './../../styles/Atoms.css';
import IconButton from '../Atoms/IconButton';
import { Gender } from '../../types/Seasons';
import capitalizeFirstLetter from '../../utils/stringMethods';

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
  showOptions?: boolean;
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
  showOptions,
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
      <div className="field">{capitalizeFirstLetter(gender)}</div>
      <div className="field">
        {minAge} - {maxAge}
      </div>
      <div className="field">
        {minWeight} - {maxWeight}
      </div>
      {showOptions && (
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
      )}
    </div>
  );
};

export default CategoryItem;
