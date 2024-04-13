import React, { useEffect, useState } from 'react';
import './../../styles/Atoms.css';
import IconButton from '../Atoms/IconButton';
import { WeightCategory } from '../../types/Seasons';
import WeightCategoryList from './WeightCategoryList';

interface props {
  key?: string;
  name: string;
  minAge: number;
  maxAge: number;
  weightCategories: WeightCategory[];
  onEdit: () => void;
  onEditCancel: () => void;
  onDelete?: () => void;
  onWeightCategoryDelete?: (weightCategory: WeightCategory) => void;
  showOptions?: boolean;
}

const CategoryItem: React.FC<props> = ({
  key,
  name,
  minAge,
  maxAge,
  weightCategories,
  onEdit,
  onEditCancel,
  onDelete,
  onWeightCategoryDelete,
  showOptions,
}) => {
  const [isEdited, setIsEdited] = useState(false);
  const [femaleCategories, setFemaleCategories] = useState<WeightCategory[]>(
    [],
  );
  const [maleCategories, setMaleCategories] = useState<WeightCategory[]>([]);
  const [allGenderCategories, setAllGenderCategories] = useState<
    WeightCategory[]
  >([]);

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
  }, [name, minAge, maxAge, weightCategories, weightCategories.length]);

  useEffect(() => {
    setFemaleCategories(
      weightCategories.filter((category) => category.gender === 'FEMALE'),
    );
    setMaleCategories(
      weightCategories.filter((category) => category.gender === 'MALE'),
    );
    setAllGenderCategories(
      weightCategories.filter((category) => category.gender === 'ALL'),
    );
  }, [weightCategories, weightCategories.length]);

  return (
    <div key={key} className="categoryItem">
      <div className="heading">
        <div className="field" style={{ flex: 3, justifyContent: 'start' }}>
          {name}
        </div>
        <div className="field">
          {minAge} - {maxAge}
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
      <div className="body">
        <p className="h6">Weight categories:</p>
        <div className="weightCategories">
          <WeightCategoryList
            name="Female"
            categories={femaleCategories}
            onDelete={(maxWeight) => {
              onWeightCategoryDelete?.({ gender: 'FEMALE', maxWeight });
            }}
          />
          <WeightCategoryList
            name="Male"
            categories={maleCategories}
            onDelete={(maxWeight) => {
              onWeightCategoryDelete?.({ gender: 'MALE', maxWeight });
            }}
          />
          <WeightCategoryList
            name="All"
            categories={allGenderCategories}
            onDelete={(maxWeight) => {
              onWeightCategoryDelete?.({ gender: 'ALL', maxWeight });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryItem;
