import { FunctionComponent, useEffect, useState } from 'react';
import Button from '../components/Atoms/Button';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../routes/ROUTES';
import api from '../api/api';
import NationalitiesList from '../components/molecules/NationalitiesList';
import Tile from '../components/Atoms/Tile';
import ActivityIndicator from '../components/Atoms/ActivityIndicator';
const AllNationalitiesPage: FunctionComponent = () => {
  const navigate = useNavigate();
  const [nationalities, setNationalities] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleAddClub = () => {
    navigate(ROUTES.CLUBS_ADD);
  };

  const getNationalities = async () => {
    try {
      setIsLoading(true);
      const nationalities = await api.get<string[]>(
        'v1/country/all',
        {},
      )();

      setNationalities(nationalities);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getNationalities();
  }, []);

  if (isLoading) {
    return (
      <div className="page">
        <ActivityIndicator />
      </div>
    );
  }

  return (
    <div className="page">
      <div className="pageTop">
        <p className="title">Nationalities:</p>
        <Button value="Add Club +" onClick={handleAddClub} />
      </div>

      <Tile>
        <NationalitiesList
            nationalities={nationalities.map(name => {
              const words = name.split(" ");
              const formattedWords = words.map(word => {
                if (word.length <= 2) {
                  return word.toUpperCase();
                } else {
                  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
                }
              });
              return { name: formattedWords.join(" ") };
            })}
            grid
        />
      </Tile>

    </div>
  );
};

export default AllNationalitiesPage;
