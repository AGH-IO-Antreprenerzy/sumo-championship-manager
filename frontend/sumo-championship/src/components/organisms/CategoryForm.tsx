import React, { useRef, useState } from 'react';
import './../../styles/Organisms.css';
import { Category, Gender } from '../../types/Seasons';
import Button from '../Atoms/Button';
import CategoryTable from './CategoryTable';
import MinMaxField from '../molecules/MinMaxField';
import Checkbox from '../Atoms/Checkbox';
import TextField from '../molecules/TextField';
import Tile from '../Atoms/Tile';
import AgeCategoryFrom from '../molecules/AgeCategoryFrom';
import WeightCategoryFrom from '../molecules/WeightCategoryFrom';
type props = {
  onUpdate: (categories: Category[]) => void;
};

const errorPointsValues = {
  categoryName: 2,
  gender: 3,
  age: 5,
  weight: 7,
};

const checkIfNameIsUnique = (array: Category[], name: string) => {
  return !array.some((category) => category.name === name);
};

const CategoryForm: React.FC<props> = ({ onUpdate }) => {
  const [categoryName, setCategoryName] = useState('');
  const [minAge, setMinAge] = useState(6);
  const [maxAge, setMaxAge] = useState(100);
  const [minWeight, setMinWeight] = useState(40);
  const [maxWeight, setMaxWeight] = useState(200);
  const [categories, setCategories] = useState<Category[]>([]);
  const [errorPoints, setErrorPoints] = useState(1);
  const [editedCategoryNumber, setEditedCategoryNumber] = useState(-1);
  const isEdited = editedCategoryNumber > -1;

  const femaleCheckboxRef = useRef<HTMLInputElement>(null);
  const maleCheckboxRef = useRef<HTMLInputElement>(null);

  const handleSave = (newCategories: Category[]) => {
    setCategories(newCategories);
    setEditedCategoryNumber(-1);
  };

  const handleDelete = (category: Category) => {
    setCategories(categories.filter((c) => c.name !== category.name));
  };

  const handleEdit = (category: Category) => {
    setEditedCategoryNumber(
      categories.findIndex((c) => c.name === category.name),
    );
    setCategoryName(category.name);
    setMinAge(category.minAge);
    setMaxAge(category.maxAge);
  };

  const handleEditCancel = () => {
    setEditedCategoryNumber(-1);
  };

  return (
    <Tile className="categories categoriesLayout">
      <div style={{ flex: 1 }}>
        <p className="subtitle mb10">Categories</p>
        <div className="categoryForms">
          <AgeCategoryFrom
            isEdited={isEdited}
            onSave={handleSave}
            editedCategoryNumber={editedCategoryNumber}
            categories={categories}
          />
          <hr />
          <WeightCategoryFrom
            isEdited={isEdited}
            onSave={handleSave}
            editedCategoryNumber={editedCategoryNumber}
            categories={categories}
          />
        </div>
      </div>

      <div style={{ flex: 2 }}>
        <CategoryTable
          categories={categories}
          onDelete={handleDelete}
          onEdit={handleEdit}
          onEditCancel={handleEditCancel}
          showOptions
        />
      </div>
    </Tile>
  );
};

export default CategoryForm;
