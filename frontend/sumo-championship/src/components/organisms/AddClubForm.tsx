import React, { useState, useEffect } from 'react';
import TextField from '../molecules/TextField';
import SelectField from '../molecules/SelectField';
import './../../styles/Organisms.css';
import Submit from '../Atoms/Submit';
import api from '../../api/api';
import { addClub } from '../../api/club';
export interface clubInformation {
    name: string;
    nationality: string;
  }
const AddClubForm: React.FC = () => {
  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [countries, setCountries] = useState<string[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const getCountries = async () => {
      try {
        const countries = await api.get<string[]>(
          'v1/country/all',
          {},
        )();
        setCountries(countries);
      } catch (error) {
        console.error('not working', error);
      }
    };
    getCountries();
  }, []);

  const handleSubmit = async () => {
    if (!name || !country || country=='Choose country') {
      if (!name) setErrorMessage('Name is required');
      if (!country) setErrorMessage('Country is required');
        return;
    }
    try {
        const clubInfo: clubInformation = { name, nationality: country };
        await addClub(clubInfo);
        setName('');
        setCountry('');
        setErrorMessage('');
        console.log('Club added successfully!');
    } catch (error) {
        console.error('Error while adding club:', error);
        setErrorMessage('Error while adding club');
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();  
      }}
    >
      <div className="AddClubForm">
        <TextField
          label="Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value)
            setErrorMessage('');
          }}
        />
        <div>
          <SelectField
            name = "Country"
            value={country}
            onChange={(e) => {
                setCountry(e.target.value)
                setErrorMessage('')
            }}
            options={['Choose country', ...countries]}
          />
        </div>
        <p className="error">{errorMessage}</p>
        <Submit label="Add Club" />
      </div>
    </form>
  );
};

export default AddClubForm;
