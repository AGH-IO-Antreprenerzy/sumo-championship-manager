/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useRef, useState } from 'react';
import './../../styles/Molecules.css';
import ValueField from './ValueField';
import Button from '../Atoms/Button';
import SubtitleWithIcon from '../Atoms/SubtitleWithIcon';
import { Category } from '../../types/Seasons';
import SelectField from './SelectField';
import Checkbox from '../Atoms/Checkbox';

type props = {
  onSave: (newCategories: Category[]) => void;
  categories: Category[];
};

const WeightCategoryFrom: React.FC<props> = ({ onSave, categories }) => {
  const [categoryName, setCategoryName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [maxWeight, setMaxWeight] = useState<number>(80);
  const femaleCheckboxRef = useRef<HTMLInputElement>(null);
  const maleCheckboxRef = useRef<HTMLInputElement>(null);

  const ageCategoriesNames = categories.map((category) => category.ageName);

  const resetCategoryForm = () => {
    setCategoryName('');
    setMaxWeight(80);
    setErrorMessage('');
  };

  const checkCategoryFormErrors = () => {
    if (!categoryName) {
      setErrorMessage('Please set category name');
      return true;
    }

    if (!maxWeight) {
      setErrorMessage('Please set max weight');
      return true;
    }

    return false;
  };

  const getGender = () => {
    if (
      femaleCheckboxRef.current?.checked &&
      maleCheckboxRef.current?.checked
    ) {
      return 'ALL';
    }
    if (femaleCheckboxRef.current?.checked) {
      return 'FEMALE';
    }
    if (maleCheckboxRef.current?.checked) {
      return 'MALE';
    }
    return 'ALL';
  };

  const addCategory = () => {
    if (checkCategoryFormErrors()) {
      return;
    }

    const ageCategoryIndex = categories.findIndex(
      (category) => category.ageName === categoryName,
    );

    if (ageCategoryIndex < 0) {
      return;
    }

    const gender = getGender();

    if (
      categories[ageCategoryIndex].weightsAndGender.some(
        (weightCategory) =>
          weightCategory.gender === gender &&
          weightCategory.maxWeight === maxWeight,
      )
    ) {
      setErrorMessage('Weight category already exists');
      return;
    }

    const newCategories = [...categories];
    newCategories[ageCategoryIndex].weightsAndGender.push({
      maxWeight,
      gender,
    });

    resetCategoryForm();
    onSave(newCategories);
  };

  return (
    <div className="categoryForm">
      <SubtitleWithIcon icon="FaWeightHanging" text="Weight Category" />

      <SelectField
        name="Age category"
        onChange={(e) => {
          setCategoryName(e.target.value);
        }}
        value={categoryName}
        options={ageCategoriesNames}
        placeholder="Choose age category"
      />

      <div className="gender">
        <p className="heading">Gender:</p>
        <div className="checkboxes">
          <Checkbox ref={femaleCheckboxRef} label="Female" name="gender" />
          <Checkbox ref={maleCheckboxRef} label="Male" name="gender" />
        </div>
      </div>

      <ValueField
        label="Max weight"
        value={maxWeight}
        onChange={(e) => setMaxWeight(Number(e.target.value))}
        min={0}
        max={500}
      />

      <p className="error">{errorMessage}</p>
      <Button
        value={'Add weight category'}
        onClick={addCategory}
        style={{
          width: '100%',
          marginTop: 5,
        }}
      />
    </div>
  );
};

export default WeightCategoryFrom;
