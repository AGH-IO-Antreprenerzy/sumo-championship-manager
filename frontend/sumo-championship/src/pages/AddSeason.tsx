import React, { useState } from 'react';
import './../styles/Pages.css';
import Button from '../components/Atoms/Button';
import TextField from '../components/molecules/TextField';
import CategoryForm from '../components/organisms/CategoryForm';
import CategoryTable from '../components/organisms/CategoryTable';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../routes/ROUTES';

type Category = {
  name: string;
  value: number;
};

const checkIfNameIsUnique = (array: Category[], name: string) => {
  return !array.some((category) => category.name === name);
};

const addCategory = (
  array: Category[],
  name: string,
  value: string,
  callback: (newCategories: Category[]) => void,
) => {
  if (!name || !value) return;
  if (!checkIfNameIsUnique(array, name)) {
    return alert('Name already exists');
  }
  const newCategories = [{ name, value: Number(value) }, ...array];
  callback(newCategories);
};

const AddSeason: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [weightCategories, setWeightCategories] = useState<Category[]>([]);
  const [ageCategories, setAgeCategories] = useState<Category[]>([]);

  const addSeason = () => {
    console.log('Add season');
  };

  const handleCancel = () => {
    const response = confirm('Are you sure you want to cancel?');
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

      <div className="addSeasonForm">
        <div className="addSeasonFormColumn">
          <p className="subtitle centeredText mb30">General information</p>

          <TextField
            label="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            errorMessage="You need to provide a name"
            small
            style={{ marginBottom: 16 }}
          />

          <TextField
            label="Start date"
            onChange={(e) => setStartDate(e.target.value)}
            value={startDate}
            type="date"
            errorMessage="You need to provide a start date"
            small
            style={{ marginBottom: 16 }}
          />

          <TextField
            label="End date"
            onChange={(e) => setEndDate(e.target.value)}
            value={endDate}
            type="date"
            errorMessage="You need to provide a end date"
            small
            style={{ marginBottom: 16 }}
          />
        </div>

        <div className="addSeasonFormColumn">
          <p className="subtitle centeredText mb30">Weight categories</p>

          <CategoryForm
            inputTitle="Category name"
            subinputTitle="Max [kg]"
            onSubmit={(name, value) => {
              addCategory(weightCategories, name, value, setWeightCategories);
            }}
          />
          <CategoryTable
            categories={weightCategories}
            onUpdate={setWeightCategories}
          />
        </div>

        <div className="addSeasonFormColumn">
          <p className="subtitle centeredText mb30">Age categories</p>
          <CategoryForm
            inputTitle="Category name"
            subinputTitle="Max age"
            onSubmit={(name, value) => {
              addCategory(ageCategories, name, value, setAgeCategories);
            }}
          />
          <CategoryTable
            categories={ageCategories}
            onUpdate={setAgeCategories}
          />
        </div>
      </div>

      <Button onClick={addSeason} value="Add season" />
    </div>
  );
};

export default AddSeason;
