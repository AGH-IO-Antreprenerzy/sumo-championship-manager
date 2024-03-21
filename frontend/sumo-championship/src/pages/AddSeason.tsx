import React, { useState } from 'react';
import './../styles/Pages.css';
import Button from '../components/Atoms/Button';
import TextField from '../components/molecules/TextField';
import CategoryForm from '../components/organisms/CategoryForm';
import CategoryTable from '../components/organisms/CategoryTable';

type Category = {
  name: string;
  value: number;
};

const AddSeason: React.FC = () => {
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [weightCategories, setWeightCategories] = useState<Category[]>([]);
  const [ageCategories, setAgeCategories] = useState<Category[]>([]);

  const addSeason = () => {
    console.log('Add season');
  };

  const handleAddWeightCategory = (name: string, value: string) => {
    if (!name || !value) return;
    const newCategories = [{ name, value: Number(value) }, ...weightCategories];
    setWeightCategories(newCategories);
  };

  const handleAddAgeCategory = (name: string, value: string) => {
    if (!name || !value) return;
    const newCategories = [{ name, value: Number(value) }, ...ageCategories];
    setAgeCategories(newCategories);
  };

  return (
    <div className="page">
      <p className="title">Add season</p>

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
            onSubmit={handleAddWeightCategory}
          />
          <CategoryTable categories={weightCategories} />
        </div>

        <div className="addSeasonFormColumn">
          <p className="subtitle centeredText mb30">Age categories</p>
          <CategoryForm
            inputTitle="Category name"
            subinputTitle="Max age"
            onSubmit={handleAddAgeCategory}
          />
          <CategoryTable categories={ageCategories} />
        </div>
      </div>

      <Button onClick={addSeason} value="Add season" />
    </div>
  );
};

export default AddSeason;
