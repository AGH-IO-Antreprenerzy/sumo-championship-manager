import React, { useState } from 'react';
import './../../styles/Atoms.css';
import IconButton from './IconButton';

interface props {
  key: string;
  name: string;
  value: number;
  onEdit: (name: string, value: number) => void;
  onDelete: () => void;
}

const CategoryItem: React.FC<props> = ({
  key,
  name,
  value,
  onEdit,
  onDelete,
}) => {
  const [isEdited, setIsEdited] = useState(false);
  const [newName, setNewName] = useState(name);
  const [newValue, setNewValue] = useState(value);

  const handleEdit = () => {
    setNewName(name);
    setNewValue(value);
    setIsEdited(true);
  };

  const handleSave = (newName: string, newValue: number) => {
    console.log('handleSave');
    onEdit(newName, newValue);
    setIsEdited(false);
  };

  const handleCancel = () => {
    setIsEdited(false);
  };

  return (
    <div key={key} className="categoryItem">
      <div className="values">
        {isEdited ? (
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            style={{ width: '100%' }}
          />
        ) : (
          <p className="categoryName">{name}</p>
        )}
        {isEdited ? (
          <input
            type="number"
            value={newValue}
            onChange={(e) => setNewValue(Math.max(0, Number(e.target.value)))}
            style={{ width: '100%' }}
          />
        ) : (
          <p className="categoryValue">{value} kg</p>
        )}
      </div>

      {isEdited ? (
        <div className="actions">
          <IconButton
            name="check"
            size={20}
            onClick={() => {
              handleSave(newName, newValue);
            }}
          />
          <IconButton name="cross" size={20} onClick={handleCancel} />
        </div>
      ) : (
        <div className="actions">
          <IconButton name="edit" size={20} onClick={handleEdit} />
          <IconButton name="trash" size={20} onClick={onDelete} />
        </div>
      )}
    </div>
  );
};

export default CategoryItem;
