/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, useState } from 'react';
import './../../styles/Molecules.css';
import TextField from './TextField';
import MinMaxField from './MinMaxField';
import Button from '../Atoms/Button';
import SubtitleWithIcon from '../Atoms/SubtitleWithIcon';
import { Category } from '../../types/Seasons';

const errorPointsValues = {
  categoryName: 2,
  gender: 3,
  age: 5,
};

type props = {
  editedCategoryNumber: number;
  onSave: (categories: Category[]) => void;
  categories: Category[];
};

const checkIfNameIsUnique = (array: Category[], name: string) => {
  return !array.some((category) => category.name === name);
};

const AgeCategoryFrom: React.FC<props> = ({
  onSave,
  categories,
  editedCategoryNumber,
}) => {
  const [categoryName, setCategoryName] = useState('');
  const [errorPoints, setErrorPoints] = useState(1);
  const [minAge, setMinAge] = useState(6);
  const [maxAge, setMaxAge] = useState(100);
  const isEdited = editedCategoryNumber > -1;

  const resetCategoryForm = () => {
    setCategoryName('');
    setMinAge(6);
    setMaxAge(100);
    setErrorPoints(1);
  };

  const checkCategoryFormErrors = () => {
    let points = 1;
    if (!categoryName) {
      points *= errorPointsValues.categoryName;
    }

    if (minAge > maxAge) {
      points *= errorPointsValues.age;
    }

    setErrorPoints(points);
    return points;
  };

  const addCategory = () => {
    if (checkCategoryFormErrors() > 1) {
      return;
    }

    if (!checkIfNameIsUnique(categories, categoryName)) {
      alert('Category name must be unique');
      return;
    }
    const newCategories: Category[] = [
      {
        name: categoryName,
        minAge,
        maxAge,
        weightCategories: [],
      },
      ...categories,
    ];
    resetCategoryForm();
    onSave(newCategories);
  };

  const editCategory = () => {
    if (checkCategoryFormErrors() > 1) {
      return;
    }

    if (
      categories[editedCategoryNumber].name !== categoryName &&
      !checkIfNameIsUnique(categories, categoryName)
    ) {
      alert('Category name must be unique');
      return;
    }

    const newCategories: Category[] = categories.map((category, index) => {
      if (index === editedCategoryNumber) {
        return {
          name: categoryName,
          minAge,
          maxAge,
          weightCategories: category.weightCategories,
        };
      }
      return category;
    });

    resetCategoryForm();
    onSave(newCategories);
  };

  useEffect(() => {
    if (isEdited) {
      const category = categories[editedCategoryNumber];
      setCategoryName(category.name);
      setMinAge(category.minAge);
      setMaxAge(category.maxAge);
    }
  }, [categories, editedCategoryNumber, isEdited]);

  return (
    <div className="categoryForm">
      <SubtitleWithIcon icon="age" text="Age Category" />
      <TextField
        label="Category name"
        onChange={(e) => setCategoryName(e.target.value)}
        value={categoryName}
        errorMessage={
          errorPoints % errorPointsValues.categoryName === 0
            ? 'You need to provide a category name'
            : undefined
        }
      />

      <MinMaxField
        minValue={minAge}
        maxValue={maxAge}
        onMinChange={setMinAge}
        onMaxChange={setMaxAge}
        errorMessage={
          errorPoints % errorPointsValues.age === 0
            ? 'You need to provide valid min and max age range'
            : undefined
        }
      />
      <Button
        value={isEdited ? 'Save' : 'Add age category'}
        onClick={isEdited ? editCategory : addCategory}
        style={{
          width: '100%',
        }}
      />
    </div>
  );
};

export default AgeCategoryFrom;
