import { FunctionComponent, useEffect, useState } from 'react';
import Button from '../components/Atoms/Button';
import { useNavigate, useParams } from 'react-router-dom';
import ROUTES from '../routes/allRoutes';
import api from '../api/api';
import { getClubsForCountry } from '../api/club';
import ClubList from '../components/molecules/ClubList';
import Tile from '../components/Atoms/Tile';
import ActivityIndicator from '../components/Atoms/ActivityIndicator';
type Club = {
  id: number;
  name: string;
  nationality: string;
};
const AllClubsPage: FunctionComponent = () => {
  const navigate = useNavigate();
  const { countryName } = useParams();
  const [clubs, setClubs] = useState<Club[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleAddClub = () => {
    navigate(ROUTES.CLUBS_ADD);
  };

  const getClubs = async () => {
    try {
      setIsLoading(true);
      if (countryName ){
        const clubs = await getClubsForCountry(countryName);
        setClubs(clubs);
        setIsLoading(false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getClubs();
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
        <p className="title">Clubs:</p>
        <Button name="Add Club +" onClick={handleAddClub} />
      </div>

      <Tile>
        <ClubList clubs={clubs} grid />
      </Tile>

    </div>
  );
};

export default AllClubsPage;
