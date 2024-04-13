import React, { useState } from 'react';
import './../styles/Pages.css';
import Button from '../components/Atoms/Button';
import TextField from '../components/molecules/TextField';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../routes/ROUTES';
import { Category } from '../types/Seasons';
import CategoryForm from '../components/organisms/CategoryForm';
import Tile from '../components/Atoms/Tile';
import api from '../api/api';

const errorPointsValues = {
  name: 2,
  startDate: 3,
  endDate: 5,
  startEndRange: 7,
};

const AddSeason: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);

  const [errorPoints, setErrorPoints] = useState(1);

  const addSeason = async () => {
    if (checkForGeneralInfoFormErrors() > 1) {
      alert('Please fill in all the required fields');
      return;
    }

    const newSeason = {
      name,
      startDate,
      endDate,
      ageCategories: categories,
    };

    try {
      console.log(newSeason);
      await api.post('v2/season/add', newSeason)();
      navigate(ROUTES.SEASONS);
    } catch (error) {
      console.error(error);
      alert('Failed to add season');
      return;
    }
  };

  const handleCancel = () => {
    const response = confirm('Are you sure you want to cancel adding season?');
    if (response) {
      navigate(ROUTES.SEASONS);
    }
  };

  const handleCategoriesUpdate = (categoryArray: Category[]) => {
    setCategories(categoryArray);
  };

  const checkForGeneralInfoFormErrors = () => {
    let points = 1;
    if (!name) {
      points *= errorPointsValues.name;
    }

    if (!startDate) {
      points *= errorPointsValues.startDate;
    }

    if (!endDate) {
      points *= errorPointsValues.endDate;
    }

    if (startDate > endDate) {
      points *= errorPointsValues.startEndRange;
    }

    setErrorPoints(points);
    return points;
  };

  return (
    <div className="page">
      <div className="pageTop">
        <p className="title">Add season</p>
        <Button value="Cancel" onClick={handleCancel} />
      </div>
      <div className="addSeasonForm ">
        <Tile className="generalInfo">
          <p className="subtitle mb30">General information</p>

          <TextField
            label="Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            errorMessage={
              errorPoints % errorPointsValues.name === 0
                ? 'You need to provide a name'
                : null
            }
          />

          <TextField
            label="Start date"
            onChange={(e) => setStartDate(e.target.value)}
            value={startDate}
            type="date"
            errorMessage={
              errorPoints % errorPointsValues.startDate === 0
                ? 'You need to provide a start date'
                : null
            }
          />

          <TextField
            label="End date"
            onChange={(e) => setEndDate(e.target.value)}
            value={endDate}
            type="date"
            errorMessage={
              errorPoints % errorPointsValues.endDate === 0
                ? 'You need to provide a end date'
                : errorPoints % errorPointsValues.startEndRange === 0
                  ? 'End date must be after start date'
                  : null
            }
          />
        </Tile>

        <CategoryForm onUpdate={handleCategoriesUpdate} />
      </div>
      <div className="addSeason_footer">
        <Button onClick={addSeason} value="Add season" style={{ width: 200 }} />
      </div>
    </div>
  );
};

export default AddSeason;
