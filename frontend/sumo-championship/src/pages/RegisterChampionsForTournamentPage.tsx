import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DetailedTournament } from '../types/Tournament';
import api from '../api/api';
import ActivityIndicator from '../components/Atoms/ActivityIndicator';
import Button from '../components/Atoms/Button';
import Tile from '../components/Atoms/Tile';
import ChampionTable from '../components/organisms/ChampionTable/ChampionTable';

const RegisterChampionsForTournamentPage: FunctionComponent = () => {
  const { id } = useParams();
  const [tournamentInfo, setTournamentInfo] =
    useState<DetailedTournament | null>(null);
  const [steps, setSteps] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);

  const getTournamentInfo = useCallback(async () => {
    try {
      const tournamentDetails = await api.get<DetailedTournament>(
        'v1/tournament/details',
        {
          tournamentId: id,
        },
      )();
      setTournamentInfo(tournamentDetails);
    } catch (error) {
      setTournamentInfo(null);
    }
  }, [id]);

  //   useEffect(() => {
  //     getTournamentInfo();
  //   }, [getTournamentInfo]);

  //   if (!tournamentInfo) {
  //     return (
  //       <div className="page">
  //         <ActivityIndicator />
  //       </div>
  //     );
  //   }

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
        <Tile style={{ flex: 1 }}>
          <p className="subtitle mb10">Your champions</p>
          <ChampionTable
            champions={[
              {
                id: 1,
                firstname: 'John',
                lastname: 'John',
                gender: 'FEMALE',
                birthday: '2002-06-22',
                clubId: 1,
              },
            ]}
            showOptions
          />
        </Tile>
        <Tile style={{ flex: 1 }}>
          <p className="subtitle mb10">Selected champions</p>
          <ChampionTable champions={[]} showOptions />
        </Tile>
      </div>
    </div>
  );
};

export default RegisterChampionsForTournamentPage;
