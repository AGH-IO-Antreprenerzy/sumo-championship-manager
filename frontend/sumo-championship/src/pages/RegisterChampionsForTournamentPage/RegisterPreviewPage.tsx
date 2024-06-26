import { useCallback, useEffect, useState } from 'react';
import Button from '../../components/Atoms/Button';
import Tile from '../../components/Atoms/Tile';
import ChampionsPerCategoryTable from '../../components/organisms/ChampionsPerCategoryTable/ChampionsPerCategoryTable';
import { AssignedChampion } from '../../types/Champion';
import { DetailedTournament } from '../../types/Tournament';
import { CategoryStep } from './types';
import api from '../../api/api';
import { useNavigate } from 'react-router-dom';
import ROUTES from '../../routes/allRoutes';

type Props = {
  tournamentInfo: DetailedTournament | null;
  categoriesWithChampions: CategoryStep[];
  onBack: () => void;
  alreadyEnrolledChampions: AssignedChampion[];
};

const RegisterPreviewPage = ({
  tournamentInfo,
  categoriesWithChampions,
  onBack,
  alreadyEnrolledChampions,
}: Props) => {
  const navigate = useNavigate();
  const [enrolledChampions, setEnrolledChampions] = useState<
    AssignedChampion[]
  >([]);
  const getEnrolledChampions = useCallback(() => {
    const alreadyEnrolledIds = alreadyEnrolledChampions.map(
      (champ) => champ.id,
    );
    const champions: AssignedChampion[] = [];
    categoriesWithChampions.forEach((category) => {
      champions.push(
        ...category.champions
          .filter((champion) => !alreadyEnrolledIds.includes(champion.id))
          .map((champion) => ({
            ...champion,
            categoryId: category.categoryId,
          })),
      );
    });

    return champions;
  }, [alreadyEnrolledChampions, categoriesWithChampions]);

  const enroll = async () => {
    const body = enrolledChampions.map((champion) => ({
      tournamentId: tournamentInfo?.id,
      wrestlerId: champion.id,
      categoriesId: [champion.categoryId],
    }));

    try {
      await api.post('v1/wrestler-enrollment/enroll-wrestlers', body)();
      navigate(
        ROUTES.TOURNAMENT_PAGE.replace(
          ':id',
          tournamentInfo?.id.toString() ?? '',
        ),
      );
    } catch (error) {
      console.error(error);
      alert('Something went wrong');
    }
  };

  useEffect(() => {
    setEnrolledChampions(getEnrolledChampions());
  }, [getEnrolledChampions]);

  return (
    <div className="page seasonPage">
      <div className="pageTop">
        <p className="title">Tournament: {tournamentInfo?.name}</p>
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
          <ChampionsPerCategoryTable
            categories={tournamentInfo?.ageCategories ?? []}
            champions={enrolledChampions}
          />
        </Tile>
      </div>
      <div className="belowTile">
        <Button
          name="Back"
          style={{
            width: 100,
          }}
          onClick={onBack}
        />

        <Button name="Enroll" style={{ width: 100 }} onClick={enroll} />
      </div>
    </div>
  );
};

export default RegisterPreviewPage;
