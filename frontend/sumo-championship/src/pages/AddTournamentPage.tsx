import React, { useEffect, useState } from 'react';
import './../styles/Pages.css';
import GeneralTrounamentInformation from '../components/organisms/AddTournamentForms/GeneralTrounamentInformation';
import {
  GeneralInformation,
  GeneralInformationError,
  defaultGeneralInformation,
  defaultGeneralInformationErrors,
} from '../types/Tournaments';
import { getCategoriesForSeason, mapCategoriesByGender } from '../api/category';
import TournamentCategoriesInformation from '../components/organisms/AddTournamentForms/TournamentCategoriesInformation';
import Button from '../components/Atoms/Button';
import { useNavigate, useParams } from 'react-router-dom';
import ROUTES from '../routes/routes';
import { addTournament } from '../api/tournament';
import { ChoosableAgeCategory, Gender } from '../types/Category';
import Tile from '../components/Atoms/Tile';

export interface CategoriesPerSex {
  isChoosen: boolean;
  categories: ChoosableAgeCategory[];
}

const AddTournamentPage = () => {
  const { name } = useParams();

  const [generalInformation, setGeneralInformation] =
    useState<GeneralInformation>(defaultGeneralInformation);
  const [generalInformationErrors, setGeneralInformationErrors] =
    useState<GeneralInformationError>(defaultGeneralInformationErrors);

  const [maleCategories, setMaleCategories] = useState<CategoriesPerSex>({
    isChoosen: false,
    categories: [],
  });
  const [femaleCategories, setFemaleCategories] = useState<CategoriesPerSex>({
    isChoosen: false,
    categories: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    const getCategories = async () => {
      const categories = await getCategoriesForSeason(
        generalInformation.seasonName,
      );

      const maleCategories = mapCategoriesByGender(categories, Gender.MALE)

      const femaleCategories = mapCategoriesByGender(categories, Gender.FEMALE)

      setMaleCategories({ isChoosen: true, categories: maleCategories });
      setFemaleCategories({
        isChoosen: true,
        categories: femaleCategories,
      });
    };

    getCategories();
  }, [generalInformation.seasonName]);

  const toggleMaleCategory = (name: string, id: number, value: boolean) => {
    const newCategories = maleCategories.categories;
    const searchedAgeCategory = newCategories.find(cat => cat.ageName === name)
    const searchedWeightCategory = searchedAgeCategory?.categories.find(cat => cat.id === id)

    if (searchedWeightCategory !== undefined){
      searchedWeightCategory.isChoosen = value
    }

    setMaleCategories((prev) => ({ ...prev, categories: newCategories }));
  };

  const toggleFemaleCategory = (name: string, id: number, value: boolean) => {
    const newCategories = femaleCategories.categories;
    const searchedAgeCategory = newCategories.find(cat => cat.ageName === name)
    const searchedWeightCategory = searchedAgeCategory?.categories.find(cat => cat.id === id)

    if (searchedWeightCategory !== undefined){
      searchedWeightCategory.isChoosen = value
    }
    
    setFemaleCategories((prev) => ({ ...prev, categories: newCategories }));
  };

  const setChoosenForMaleAgeCategories = (
    name: string,
    value: boolean,
  ) => {
    const newCategories = maleCategories.categories;
    const changedCategory = newCategories.find(cat => cat.ageName === name)
    
    if (changedCategory !== undefined){
      changedCategory.isChoosen = value
    }

    setMaleCategories((prev) => ({ ...prev, categories: newCategories }));
  };

  const setChoosenForFemaleAgeCategories = (
    name: string,
    value: boolean,
  ) => {
    const newCategories = femaleCategories.categories;
    const changedCategory = newCategories.find(cat => cat.ageName === name)
    
    if (changedCategory !== undefined){
      changedCategory.isChoosen = value
    }

    setFemaleCategories((prev) => ({ ...prev, categories: newCategories }));
  };

  const handleAddTournament = async () => {
    let isSuccesful = true;
    setGeneralInformationErrors(defaultGeneralInformationErrors);

    if (generalInformation.registerEnd < generalInformation.registerStart) {
      isSuccesful = false;
      setGeneralInformationErrors((prev) => ({
        ...prev,
        registerStart: 'Start of registration must be before end',
      }));
    }

    if (generalInformation.registerEnd < generalInformation.registerStart) {
      isSuccesful = false;
      setGeneralInformationErrors((prev) => ({
        ...prev,
        registerStart: 'Start of registration must be before end',
      }));
    }

    if (generalInformation.contestStart < generalInformation.registerEnd) {
      isSuccesful = false;
      setGeneralInformationErrors((prev) => ({
        ...prev,
        contestStart: 'Content must start after end of registration',
      }));
    }

    if (generalInformation.name.trim() === '') {
      isSuccesful = false;
      setGeneralInformationErrors((prev) => ({
        ...prev,
        name: 'You need to provide a name',
      }));
    }

    if (generalInformation.contestStart.trim() === '') {
      isSuccesful = false;
      setGeneralInformationErrors((prev) => ({
        ...prev,
        contestStart: 'You need to provide a Start of contest date',
      }));
    }

    if (generalInformation.contestEnd.trim() === '') {
      isSuccesful = false;
      setGeneralInformationErrors((prev) => ({
        ...prev,
        contestEnd: 'You need to provide a end of contest date',
      }));
    }

    if (generalInformation.country.trim() === '') {
      isSuccesful = false;
      setGeneralInformationErrors((prev) => ({
        ...prev,
        country: 'You need to provide a country',
      }));
    }

    if (generalInformation.city.trim() === '') {
      isSuccesful = false;
      setGeneralInformationErrors((prev) => ({
        ...prev,
        city: 'You need to provide a city',
      }));
    }

    if (generalInformation.street.trim() === '') {
      isSuccesful = false;
      setGeneralInformationErrors((prev) => ({
        ...prev,
        street: 'You need to provide a street',
      }));
    }

    if (generalInformation.nr === undefined) {
      isSuccesful = false;
      setGeneralInformationErrors((prev) => ({
        ...prev,
        nr: 'You need to provide a street number',
      }));
    }

    if (generalInformation.registerEnd.trim() === '') {
      isSuccesful = false;
      setGeneralInformationErrors((prev) => ({
        ...prev,
        registerEnd: 'You need to provide a end of register date',
      }));
    }

    if (generalInformation.registerStart.trim() === '') {
      isSuccesful = false;
      setGeneralInformationErrors((prev) => ({
        ...prev,
        registerStart: 'You need to provide a start of register date',
      }));
    }

    if (!isSuccesful) {
      alert('Form contains errors');
      return;
    }

    try {
      await addTournament(generalInformation, maleCategories, femaleCategories);
      navigate(ROUTES.SEASON_PAGE.replace(":name", generalInformation.seasonName));
    } catch (ex: unknown) {
      if (ex instanceof Error){
        alert(`Something went wrong: ${ex.message}`);
      }

      if (ex instanceof Response){
        alert(`Something went wrong: ${await ex.text()}`)
      }
    }
  };

  return (
    <div className="page">
      <h1 style={{ fontSize: '50px' }}>Add tournament</h1>
      <br/>
      <div className="addTournamentPage">
        <Tile>
          <GeneralTrounamentInformation
            values={generalInformation}
            errors={generalInformationErrors}
            changeValues={setGeneralInformation}
            defaultSeason={name}
          />
        </Tile>
        <Tile>
          <TournamentCategoriesInformation
            label="Men Competition"
            values={maleCategories.categories}
            toggleWeightCategory={toggleMaleCategory}
            onPerSexCheckboxToggle={(value: boolean) =>
              setMaleCategories((prev) => ({ ...prev, isChoosen: value }))
            }
            onPerAgeCheckboxToggle={setChoosenForMaleAgeCategories}
            isPerSexCheckboxChecked={maleCategories.isChoosen}
          />
        </Tile>
        <Tile>
          <TournamentCategoriesInformation
            label="Women Competition"
            values={femaleCategories.categories}
            toggleWeightCategory={toggleFemaleCategory}
            onPerSexCheckboxToggle={(value: boolean) =>
              setFemaleCategories((prev) => ({ ...prev, isChoosen: value }))
            }
            onPerAgeCheckboxToggle={setChoosenForFemaleAgeCategories}
            isPerSexCheckboxChecked={femaleCategories.isChoosen}
          />
        </Tile>
        
        
      </div>
      <Button
        name="Add tournament"
        style={{ marginTop: '20px' }}
        onClick={handleAddTournament}
      />
    </div>
  );
};

export default AddTournamentPage;
