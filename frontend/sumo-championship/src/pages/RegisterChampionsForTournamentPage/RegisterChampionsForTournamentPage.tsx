import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api/api';
import ActivityIndicator from '../../components/Atoms/ActivityIndicator';
import Button from '../../components/Atoms/Button';
import Tile from '../../components/Atoms/Tile';
import ChampionTable from '../../components/organisms/EnrolledChampionTable/EnrolledChampionTable';
import capitalizeFirstLetter from '../../utils/stringMethods';
import { AssignedChampion } from '../../types/Champion';
import { DetailedTournament } from '../../types/Tournament';
import SelectField from '../../components/molecules/SelectField';
import TextField from '../../components/molecules/TextField';
import { Club } from '../../types/Club';
import RegisterPreviewPage from './RegisterPreviewPage';
import ROUTES from '../../routes/allRoutes';
import { AllRegisteredChampionsResponse } from '../../types/RegisteredChampions';
import { CategoryStep } from './types';

type WrestlersInfoResponse = {
  wrestlersInfo: AssignedChampion[];
};

const RegisterChampionsForTournamentPage: FunctionComponent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [tournamentInfo, setTournamentInfo] =
    useState<DetailedTournament | null>(null);
  const [steps, setSteps] = useState<CategoryStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [clubChampions, setClubChampions] = useState<AssignedChampion[]>([]);

  const [availableChampions, setAvailableChampions] = useState<
    AssignedChampion[]
  >([]);

  const [filteredAvailableChampions, setFilteredAvailableChampions] = useState<
    AssignedChampion[]
  >([]);
  const [searchValue, setSearchValue] = useState('');
  const [clubs, setClubs] = useState<Club[]>([]);
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);
  const [shouldShowPreview, setShouldShowPreview] = useState(false);
  const [alreadyEnrolledChampions, setAlreadyEnrolledChampions] = useState<
    AssignedChampion[]
  >([]);

  const getAllEnrolledChampions = useCallback(async () => {
    try {
      const response = await api.get<AllRegisteredChampionsResponse>(
        'v1/wrestler-enrollment/all/to-tournament',
        {
          tournamentId: id,
        },
      )();

      const enrolled: AssignedChampion[] = response.enrollments.map(
        (enrollment) => {
          return {
            id: enrollment.wrestler.id,
            firstname: enrollment.wrestler.firstname,
            lastname: enrollment.wrestler.lastname,
            gender: enrollment.wrestler.gender,
            birthday: enrollment.wrestler.birthday,
            categoryId: enrollment.categoryId,
            alreadyAssigned: true,
          };
        },
      );

      setAlreadyEnrolledChampions(enrolled);
      return enrolled;
    } catch (e) {
      throw new Error('Error while fetching enrolled champions');
    }
  }, [id]);

  const getTournamentInfo = useCallback(async () => {
    try {
      const tournamentDetails = await api.get<DetailedTournament>(
        'v1/tournament/details',
        {
          tournamentId: id,
        },
      )();
      setTournamentInfo(tournamentDetails);

      const enrolledChampions: AssignedChampion[] =
        await getAllEnrolledChampions();

      const categoriesToEnroll: CategoryStep[] = [];
      tournamentDetails.ageCategories.forEach((category) => {
        category.weightsAndGender.forEach((weightCategory) => {
          if (!weightCategory.categoryId) {
            return;
          }
          const alreadyEnrolled = enrolledChampions.filter((champ) => {
            return champ.categoryId === weightCategory.categoryId;
          });

          categoriesToEnroll.push({
            categoryId: weightCategory.categoryId,
            ageCategory: category.ageName,
            weightCategory,
            champions: alreadyEnrolled,
          });
        });
      });
      setSteps(categoriesToEnroll);
    } catch (error) {
      setTournamentInfo(null);
      setSteps([]);
    }
  }, [getAllEnrolledChampions, id]);

  const getAllClubs = async () => {
    // change endpoint to get all clubs for logged user
    try {
      const response = await api.get<Club[]>('v1/club/from-country', {
        countryName: 'POLAND',
      })();
      setClubs(response);
      setSelectedClub(response[0]);
    } catch (error) {
      setClubs([]);
    }
  };

  const getClubChampions = useCallback(async (clubId: number) => {
    try {
      const clubSumo = await api.get<WrestlersInfoResponse>(
        'v1/wrestler/to-club',
        {
          clubId,
        },
      )();

      setClubChampions(clubSumo.wrestlersInfo);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const filterAvaliableChampionsByName = useCallback(
    (value: string) => {
      setSearchValue(value);
      if (value === '') {
        setFilteredAvailableChampions(availableChampions);
        return;
      }
      const filteredChampions = availableChampions.filter((champ) => {
        const name = `${champ.firstname.toLocaleLowerCase()} ${champ.lastname.toLocaleLowerCase()}`;
        return name.includes(value.toLocaleLowerCase());
      });
      setFilteredAvailableChampions(filteredChampions);
    },
    [availableChampions],
  );

  const filterAvaliableChampions = useCallback(
    (stepNumber: number) => {
      if (!steps[stepNumber]) {
        return;
      }

      const championIds = steps[stepNumber].champions.map((champ) => champ.id);
      let newAvailableChampions = [...clubChampions];
      newAvailableChampions = newAvailableChampions.filter(
        (champ) => !championIds.includes(champ.id),
      );
      setAvailableChampions(newAvailableChampions);
    },
    [clubChampions, steps],
  );

  const handleClubChange = (clubName: string) => {
    const club = clubs.find((club) => club.name === clubName);

    if (!club) {
      return;
    }
    setSelectedClub(club);
    filterAvaliableChampions(currentStep);
  };

  const handleBack = () => {
    if (currentStep - 1 < 0) {
      return;
    }
    setCurrentStep(currentStep - 1);
    filterAvaliableChampions(currentStep - 1);
  };

  const handleNext = () => {
    if (currentStep + 1 > steps.length - 1) {
      return;
    }
    setCurrentStep(currentStep + 1);
    filterAvaliableChampions(currentStep + 1);
  };

  const handleAdd = (champion: AssignedChampion) => {
    console.log(JSON.stringify(champion, null, 2));
    const newSteps = [...steps];
    newSteps[currentStep].champions.push(champion);
    setSteps(newSteps);

    filterAvaliableChampions(currentStep);
  };

  const handleRemove = (index: number) => {
    const newSteps = [...steps];
    newSteps[currentStep].champions.splice(index, 1);
    setSteps(newSteps);
    filterAvaliableChampions(currentStep);
  };

  const handleSaveAndGoToPreview = () => {
    setShouldShowPreview(true);
  };

  useEffect(() => {
    getTournamentInfo();
    getAllClubs();
  }, [getAllEnrolledChampions, getTournamentInfo]);

  useEffect(() => {
    if (!selectedClub) {
      return;
    }
    getClubChampions(selectedClub.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedClub]);

  useEffect(() => {
    filterAvaliableChampions(currentStep);
  }, [clubChampions, currentStep, filterAvaliableChampions]);

  useEffect(() => {
    filterAvaliableChampionsByName(searchValue);
  }, [availableChampions, filterAvaliableChampionsByName, searchValue]);

  if (!tournamentInfo) {
    return (
      <div className="page">
        <ActivityIndicator />
      </div>
    );
  }

  if (shouldShowPreview) {
    return (
      <RegisterPreviewPage
        tournamentInfo={tournamentInfo}
        categoriesWithChampions={steps}
        onBack={() => setShouldShowPreview(false)}
        alreadyEnrolledChampions={alreadyEnrolledChampions}
      />
    );
  }

  return (
    <div className="page seasonPage">
      <div className="pageTop">
        <p className="title">Tournament: {tournamentInfo?.name ?? '-'}</p>
        <Button
          name="Cancel"
          onClick={() => {
            const response = confirm('Are you sure you want to cancel?');
            if (response) {
              navigate(ROUTES.HOME);
            }
          }}
        />
      </div>

      <div className="registerChampionsForTournamentPage">
        <Tile style={{ flex: 1, height: 700 }}>
          <div className="tileTop">
            <p className="subtitle mb10">Your champions</p>
            <div style={{ display: 'flex', columnGap: 10 }}>
              <SelectField
                style={{ width: 200 }}
                options={clubs.map((club) => club.name)}
                value={selectedClub?.name ?? ''}
                name="Club"
                onChange={(e) => {
                  handleClubChange(e.target.value);
                }}
              />
              <TextField
                style={{ width: 200 }}
                label="Champion search"
                placeholder="Search by name"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
          </div>
          <ChampionTable
            champions={filteredAvailableChampions}
            showOptions
            onAdd={handleAdd}
          />
        </Tile>
        <div style={{ flex: 1, height: 700 }}>
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
              name="Back"
              style={{
                width: 100,
              }}
              disabled={currentStep <= 0}
              onClick={handleBack}
            />
            {currentStep !== steps.length - 1 ? (
              <Button
                name="Next"
                style={{ width: 100 }}
                disabled={currentStep >= steps.length - 1}
                onClick={handleNext}
              />
            ) : (
              <Button
                name="Go to preview"
                style={{ width: 100 }}
                onClick={handleSaveAndGoToPreview}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterChampionsForTournamentPage;
