import React, { useRef, useState } from 'react';
import './../styles/Pages.css';
import Button from '../components/Atoms/Button';
import TextField from '../components/molecules/TextField';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../routes/ROUTES';
import Checkbox from '../components/Atoms/Checkbox';
import ValueField from '../components/molecules/ValueField';
import MinMaxField from '../components/molecules/MinMaxField';
import CategoryTable from '../components/organisms/CategoryTable';
import { Category, Gender } from '../types/Category';

const checkIfNameIsUnique = (array: Category[], name: string) => {
  return !array.some((category) => category.name === name);
};

const AddSeason: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [minAge, setMinAge] = useState(0);
  const [maxAge, setMaxAge] = useState(0);
  const [minWeight, setMinWeight] = useState(0);
  const [maxWeight, setMaxWeight] = useState(0);
  const [categories, setCategories] = useState<Category[]>([]);

  const femaleCheckboxRef = useRef<HTMLInputElement>(null);
  const maleCheckboxRef = useRef<HTMLInputElement>(null);

  const addSeason = () => {
    console.log('Add season');
  };

  const addCategory = () => {
    console.log(femaleCheckboxRef.current, maleCheckboxRef.current);

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

    setCategories([
      {
        name: categoryName,
        gender: gender,
        minAge,
        maxAge,
        minWeight,
        maxWeight,
      },
      ...categories,
    ]);
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
              errorMessage="You need to provide a category name"
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
              />
            </div>

            <div className="weight">
              <p className="heading">Weight:</p>
              <MinMaxField
                minValue={minWeight}
                maxValue={maxWeight}
                onMinChange={setMinWeight}
                onMaxChange={setMaxWeight}
              />
            </div>

            <Button
              value="Add category"
              onClick={addCategory}
              style={{
                width: '100%',
              }}
            />
          </div>

          <div style={{ flex: 2 }}>
            <CategoryTable
              categories={categories}
              onUpdate={() => {
                //
              }}
            />
          </div>
        </div>
      </div>

      <Button onClick={addSeason} value="Add season" />
    </div>
  );
};

export default AddSeason;
