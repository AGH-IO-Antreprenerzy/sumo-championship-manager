import React, { useRef, useState } from 'react';
import './../styles/Pages.css';
import Button from '../components/Atoms/Button';
import TextField from '../components/molecules/TextField';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../routes/ROUTES';
import Checkbox from '../components/Atoms/Checkbox';
import MinMaxField from '../components/molecules/MinMaxField';
import CategoryTable from '../components/organisms/CategoryTable';
import { Category, Gender } from '../types/Category';
import { set } from 'zod';

const errorPointsValues = {
  categoryName: 2,
  gender: 3,
  age: 5,
  weight: 7,
};

const checkIfNameIsUnique = (array: Category[], name: string) => {
  return !array.some((category) => category.name === name);
};

const AddSeason: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [minAge, setMinAge] = useState(16);
  const [maxAge, setMaxAge] = useState(100);
  const [minWeight, setMinWeight] = useState(40);
  const [maxWeight, setMaxWeight] = useState(200);
  const [categories, setCategories] = useState<Category[]>([]);
  const [errorPoints, setErrorPoints] = useState(1);
  const [editedCategoryNumber, setEditedCategoryNumber] = useState(-1);
  const isEdited = editedCategoryNumber > -1;

  const femaleCheckboxRef = useRef<HTMLInputElement>(null);
  const maleCheckboxRef = useRef<HTMLInputElement>(null);

  const addSeason = () => {
    console.log('Add season');
  };

  const resetCategoryForm = () => {
    setCategoryName('');
    setMinAge(16);
    setMaxAge(100);
    setMinWeight(40);
    setMaxWeight(200);
    setErrorPoints(1);
    setEditedCategoryNumber(-1);
  };

  const checkCategoryFormErrors = () => {
    let points = 1;
    if (!categoryName) {
      points *= errorPointsValues.categoryName;
    }

    if (minAge > maxAge) {
      points *= errorPointsValues.age;
    }

    if (minWeight > maxWeight) {
      points *= errorPointsValues.weight;
    }

    setErrorPoints(points);
    return points;
  };

  const getGender = () => {
    let gender: Gender = 'All';
    if (
      !!femaleCheckboxRef.current?.checked &&
      !!maleCheckboxRef.current?.checked
    ) {
      gender = 'All';
    } else if (femaleCheckboxRef.current?.checked) {
      gender = 'Female';
    } else if (maleCheckboxRef.current?.checked) {
      gender = 'Male';
    }
    return gender;
  };

  const addCategory = () => {
    if (checkCategoryFormErrors() > 1) {
      return;
    }

    if (!checkIfNameIsUnique(categories, categoryName)) {
      alert('Category name must be unique');
      return;
    }

    setCategories([
      {
        name: categoryName,
        gender: getGender(),
        minAge,
        maxAge,
        minWeight,
        maxWeight,
      },
      ...categories,
    ]);
    resetCategoryForm();
  };

  const editCategory = () => {
    if (checkCategoryFormErrors() > 1) {
      return;
    }

    if (!checkIfNameIsUnique(categories, categoryName)) {
      alert('Category name must be unique');
      return;
    }

    const newCategories: Category[] = categories.map((category, index) => {
      if (index === editedCategoryNumber) {
        return {
          name: categoryName,
          gender: getGender(),
          minAge,
          maxAge,
          minWeight,
          maxWeight,
        };
      }
      return category;
    });

    resetCategoryForm();
    setCategories(newCategories);
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
    setMinWeight(category.minWeight);
    setMaxWeight(category.maxWeight);
  };

  const handleEditCancel = () => {
    setEditedCategoryNumber(-1);
  };

  const handleCancel = () => {
    const response = confirm('Are you sure you want to cancel adding season?');
    if (response) {
      navigate(ROUTES.SEASONS);
    }
  };

  return (
    <div className="page">
      <div className="pageTop">
        <p className="title">Add season</p>
        <Button value="Cancel" onClick={handleCancel} />
      </div>

      <div className="addSeasonForm ">
        <div className="tile generalInfo">
          <p className="subtitle mb30">General information</p>

          <TextField
            label="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            errorMessage="You need to provide a name"
          />

          <TextField
            label="Start date"
            onChange={(e) => setStartDate(e.target.value)}
            value={startDate}
            type="date"
            errorMessage="You need to provide a start date"
          />

          <TextField
            label="End date"
            onChange={(e) => setEndDate(e.target.value)}
            value={endDate}
            type="date"
            errorMessage="You need to provide a end date"
          />
        </div>

        <div className="tile categories categoriesLayout">
          <div style={{ flex: 1 }}>
            <p className="subtitle mb30">Categories</p>
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
            <div className="gender">
              <p className="heading">Gender:</p>
              <div className="checkboxes">
                <Checkbox ref={femaleCheckboxRef} label="Female" />
                <Checkbox ref={maleCheckboxRef} label="Male" />
              </div>
            </div>

            <div className="age">
              <p className="heading">Age:</p>
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
            </div>

            <div className="weight">
              <p className="heading">Weight:</p>
              <MinMaxField
                minValue={minWeight}
                maxValue={maxWeight}
                onMinChange={setMinWeight}
                onMaxChange={setMaxWeight}
                errorMessage={
                  errorPoints % errorPointsValues.weight === 0
                    ? 'You need to provide valid min and max weight range'
                    : undefined
                }
              />
            </div>

            <Button
              value={isEdited ? 'Save' : 'Add category'}
              onClick={isEdited ? editCategory : addCategory}
              style={{
                width: '100%',
              }}
            />
          </div>

          <div style={{ flex: 2 }}>
            <CategoryTable
              categories={categories}
              onDelete={handleDelete}
              onEdit={handleEdit}
              onEditCancel={handleEditCancel}
            />
          </div>
        </div>
      </div>

      <Button onClick={addSeason} value="Add season" />
    </div>
  );
};

export default AddSeason;
