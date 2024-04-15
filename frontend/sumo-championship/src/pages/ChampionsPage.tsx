import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Tile from '../components/Atoms/Tile';
import DetailItem from '../components/Atoms/DetailItem';
import api from '../api/api';
import { DetailedSeason } from '../types/Seasons';
import { isDateBetween } from '../utils/dateUtils';
import CategoryTable from '../components/organisms/CategoryTable';
import TournamentList from '../components/molecules/TournamentList';
import Button from '../components/Atoms/Button';
import ROUTES from '../routes/allRoutes';
import { useUser } from '../contexts/UserContext';
import { Role } from '../api/login';
import TextField from '../components/molecules/TextField';
import Checkbox from '../components/Atoms/Checkbox';
import ValueField from '../components/molecules/ValueField';
import AddChampionForm from '../components/molecules/AddChampionForm';
import { Club } from '../types/Club';

const ChampionsPage: React.FC = () => {
  const navigate = useNavigate();
  const [seasonInfo, setSeasonInfo] = useState<DetailedSeason | null>(null);
  const { user } = useUser();
  const [showAddChampion, setShowAddChampion] = useState(true);
  const [filterName, setFilterName] = useState('');
  const femaleCheckboxRef = useRef<HTMLInputElement>(null);
  const maleCheckboxRef = useRef<HTMLInputElement>(null);
  const [minAge, setMinAge] = useState(0);
  const [maxAge, setMaxAge] = useState(500);

  const [clubs, setClubs] = useState<Club[]>([]);

  const handleAddChampion = () => {
    setShowAddChampion(!showAddChampion);
  };

  const getClubs = useCallback(async () => {
    try {
      const response = await api.get<Club[]>('v1/club/from-country', {
        countryName: 'POLAND',
      })();
      setClubs(response);
    } catch (error) {
      console.error(error);
      setClubs([]);
    }
  }, []);

  useEffect(() => {
    getClubs();
  }, []);

  return (
    <div className="page championsPage">
      <div className="pageTop">
        <p className="title">Current Seasons:</p>
        {/* {user.role === Role.Admin && ( */}
        <Button
          name={showAddChampion ? 'Hide' : '+ Add Season'}
          onClick={handleAddChampion}
        />
        {/* )} */}
      </div>
      <div className="topPanel">
        <div className="sideBar">
          <Tile className="filter" style={{ flex: 1 }}>
            <p className="subtitle mb10">Filter</p>

            <TextField
              label="Name"
              value={filterName}
              onChange={(e) => setFilterName(e.target.value)}
            />

            <div className="gender">
              <p className="heading">Gender:</p>
              <div className="checkboxes">
                <Checkbox
                  ref={femaleCheckboxRef}
                  label="Female"
                  name="gender"
                />
                <Checkbox ref={maleCheckboxRef} label="Male" name="gender" />
              </div>
            </div>
            <div className="ageBox">
              <p className="heading">Age:</p>
              <div className="fields">
                <ValueField
                  label=""
                  value={minAge}
                  onChange={(e) => setMinAge(Number(e.target.value))}
                  min={0}
                  max={500}
                />

                <ValueField
                  label=""
                  value={maxAge}
                  onChange={(e) => setMaxAge(Number(e.target.value))}
                  min={0}
                  max={500}
                />
              </div>
            </div>
          </Tile>
          <div style={{ flex: 3 }}>
            {showAddChampion && (
              <Tile className="addChampion">
                <p className="subtitle mb10">Add champion</p>
                <AddChampionForm
                  onSubmit={() => {
                    //
                  }}
                  clubs={clubs}
                />
              </Tile>
            )}
          </div>
        </div>
        <Tile className="champions">
          <p className="subtitle mb10">Champions</p>
        </Tile>
      </div>
    </div>
  );
};

export default ChampionsPage;
