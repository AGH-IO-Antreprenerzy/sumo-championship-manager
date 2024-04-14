import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DetailedTournament } from '../types/Tournament';
import api from '../api/api';
import ActivityIndicator from '../components/Atoms/ActivityIndicator';
import Button from '../components/Atoms/Button';
import Tile from '../components/Atoms/Tile';
import ChampionTable from '../components/organisms/ChampionTable/ChampionTable';
import { WeightCategory } from '../types/Seasons';
import capitalizeFirstLetter from '../utils/stringMethods';
import { AssignedChampion } from '../types/Champion';

type CategoryStep = {
  categoryId: number;
  ageCategory: string;
  weightCategory: WeightCategory;
  champions: AssignedChampion[];
};

const RegisterChampionsForTournamentPage: FunctionComponent = () => {
  const { id } = useParams();
  const [tournamentInfo, setTournamentInfo] =
    useState<DetailedTournament | null>(null);
  const [steps, setSteps] = useState<CategoryStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  const [selectedClub, setSelectedClub] = useState('');
  const [clubChampions, setClubChampions] = useState<AssignedChampion[]>([
    {
      id: 1,
      firstname: 'John',
      lastname: 'John',
      gender: 'FEMALE',
      birthday: '2002-06-22',
    },
  ]);

  const [availableChampions, setAvailableChampions] = useState<
    AssignedChampion[]
  >([]);

  const getTournamentInfo = useCallback(async () => {
    try {
      const tournamentDetails = await api.get<DetailedTournament>(
        'v1/tournament/details',
        {
          tournamentId: id,
        },
      )();
      setTournamentInfo(tournamentDetails);
      const categoriesToEnroll: CategoryStep[] = [];
      tournamentDetails.ageCategories.forEach((category) => {
        category.weightsAndGender.forEach((weightCategory) => {
          if (!weightCategory.categoryId) {
            return;
          }
          categoriesToEnroll.push({
            categoryId: weightCategory.categoryId,
            ageCategory: category.ageName,
            weightCategory,
            champions: [],
          });
        });
      });
      setSteps(categoriesToEnroll);
    } catch (error) {
      setTournamentInfo(null);
      setSteps([
        {
          categoryId: -1,
          ageCategory: 'test',
          weightCategory: {
            gender: 'MALE',
            maxWeight: 60,
          },
          champions: [],
        },
      ]);
    }
  }, [id]);

  const filterAvaiableChampions = (stepNumber: number) => {
    const championIds = steps[stepNumber].champions.map((champ) => champ.id);
    let newAvailableChampions = [...clubChampions];
    newAvailableChampions = newAvailableChampions.filter(
      (champ) => !championIds.includes(champ.id),
    );
    setAvailableChampions(newAvailableChampions);
  };

  const handleBack = () => {
    if (currentStep - 1 < 0) {
      return;
    }
    setCurrentStep(currentStep - 1);
    filterAvaiableChampions(currentStep - 1);
  };

  const handleNext = () => {
    if (currentStep + 1 > steps.length - 1) {
      return;
    }
    setCurrentStep(currentStep + 1);
    filterAvaiableChampions(currentStep + 1);
  };

  const handleAdd = (champion: AssignedChampion) => {
    const newSteps = [...steps];
    newSteps[currentStep].champions.push(champion);
    setSteps(newSteps);

    filterAvaiableChampions(currentStep);
  };

  const handleRemove = (index: number) => {
    const newSteps = [...steps];
    newSteps[currentStep].champions.splice(index, 1);
    setSteps(newSteps);
    filterAvaiableChampions(currentStep);
  };

  useEffect(() => {
    getTournamentInfo();
  }, [getTournamentInfo]);

  useEffect(() => {
    setAvailableChampions(clubChampions);
  }, [clubChampions]);

  if (!tournamentInfo) {
    return (
      <div className="page">
        <ActivityIndicator />
      </div>
    );
  }

  return (
    <div className="page seasonPage">
      <div className="pageTop">
        <p className="title">Tournament: {tournamentInfo?.name ?? '-'}</p>
        <Button
          value="Cancel"
          onClick={() => {
            //
          }}
        />
      </div>

      <div className="registerChampionsForTournamentPage">
        <Tile style={{ flex: 1, height: 700 }}>
          <div className="tileTop">
            <p className="subtitle mb10">Your champions</p>
          </div>
          <ChampionTable
            champions={availableChampions}
            showOptions
            onAdd={handleAdd}
          />
        </Tile>
        <div>
          <Tile style={{ flex: 1, height: 700 }}>
            <div className="tileTop">
              <p className="subtitle mb10">Selected champions</p>

              <div className="categoryInfo">
                <p className="key">Age category: </p>
                <p className="value">
                  {steps.length > 0 ? steps[currentStep].ageCategory : '-'}
                </p>
              </div>

              <div className="categoryInfo">
                <p className="key">Weight category: </p>
                <p className="value">
                  {steps.length > 0
                    ? `${capitalizeFirstLetter(steps[currentStep].weightCategory.gender)} < ${steps[currentStep].weightCategory.maxWeight}kg`
                    : '-'}
                </p>
              </div>
            </div>

            <ChampionTable
              champions={steps.length > 0 ? steps[currentStep].champions : []}
              showOptions
              onRemove={handleRemove}
            />
          </Tile>
          <div className="belowTile">
            <Button
              value="Back"
              style={{
                width: 100,
              }}
              disabled={currentStep <= 0}
              onClick={handleBack}
            />
            <Button
              value="Next"
              style={{ width: 100 }}
              disabled={currentStep >= steps.length - 1}
              onClick={handleNext}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterChampionsForTournamentPage;
