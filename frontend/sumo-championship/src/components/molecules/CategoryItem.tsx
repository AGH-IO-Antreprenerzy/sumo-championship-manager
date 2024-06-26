import React, { useEffect, useState } from 'react';
import './../../styles/Atoms.css';
import IconButton from '../Atoms/IconButton';
import { WeightCategory } from '../../types/Seasons';
import WeightCategoryList from './CategoryForm/WeightCategoryList';

interface props {
  keyValue?: string;
  name: string;
  minAge: number;
  maxAge: number;
  weightCategories: WeightCategory[];
  isEdited: boolean;
  onEdit: () => void;
  onEditCancel: () => void;
  onDelete?: () => void;
  onWeightCategoryDelete?: (weightCategory: WeightCategory) => void;
  showOptions?: boolean;
}

const CategoryItem: React.FC<props> = ({
  keyValue,
  name,
  minAge,
  maxAge,
  weightCategories,
  isEdited,
  onEdit,
  onEditCancel,
  onDelete,
  onWeightCategoryDelete,
  showOptions,
}) => {
  const [femaleCategories, setFemaleCategories] = useState<WeightCategory[]>(
    [],
  );
  const [maleCategories, setMaleCategories] = useState<WeightCategory[]>([]);
  const [allGenderCategories, setAllGenderCategories] = useState<
    WeightCategory[]
  >([]);

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
    <div key={keyValue} className="categoryItem">
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
                <IconButton name="FaPlus" size={16} onClick={onEditCancel} />
              </div>
            ) : (
              <div className="actions">
                <IconButton name="FaEdit" size={20} onClick={onEdit} />
                <IconButton name="FaTrashAlt" size={20} onClick={onDelete} />
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
            showOptions={showOptions}
          />
          <WeightCategoryList
            name="Male"
            categories={maleCategories}
            onDelete={(maxWeight) => {
              onWeightCategoryDelete?.({ gender: 'MALE', maxWeight });
            }}
            showOptions={showOptions}
          />
          <WeightCategoryList
            name="All"
            categories={allGenderCategories}
            onDelete={(maxWeight) => {
              onWeightCategoryDelete?.({ gender: 'ALL', maxWeight });
            }}
            showOptions={showOptions}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryItem;
