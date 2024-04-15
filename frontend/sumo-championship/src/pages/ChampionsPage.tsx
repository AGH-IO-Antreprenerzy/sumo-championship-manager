import React, { useCallback, useEffect, useState } from 'react';
import Tile from '../components/Atoms/Tile';
import api from '../api/api';
import AddChampionForm from '../components/molecules/AddChampionForm';
import { Club } from '../types/Club';
import { AssignedChampion, Champion } from '../types/Champion';
import ChampionTable from '../components/organisms/ChampionTable/ChampionTable';

type WrestlersResponse = {
  wrestlersInfo: Champion[];
  pageNo: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
};

const ChampionsPage: React.FC = () => {
  const [champions, setChampions] = useState<AssignedChampion[]>([]);
  const [clubs, setClubs] = useState<Club[]>([]);
  const [editedChampion, setEditedChampion] = useState<Champion | null>(null);

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

  const getAllChampions = useCallback(async () => {
    try {
      const response = await api.get<WrestlersResponse>('v1/wrestler/all')();
      setChampions(response.wrestlersInfo ?? []);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleAddChampion = async (champion: Champion) => {
    try {
      await api.post('v1/wrestler/add', champion)();
      getAllChampions();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateChampion = async (champion: Champion) => {
    try {
      const clubId = clubs.find((club) => club.name === champion.clubName)?.id;
      await api.put(`v1/wrestler/modify?id=${clubId}`, {
        firstname: champion.firstname,
        lastname: champion.lastname,
        gender: champion.gender,
        birthday: champion.birthday,
        clubId: champion.clubId,
      })();
      getAllChampions();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllChampions();
    getClubs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="page championsPage">
      <div className="pageTop">
        <p className="title">Champions:</p>
      </div>
      <div className="topPanel">
        <Tile className="addChampion" style={{ height: 520 }}>
          <p className="subtitle mb10">Add champion</p>
          <AddChampionForm
            onSubmit={handleAddChampion}
            onEditSave={handleUpdateChampion}
            clubs={clubs}
            editedChampion={editedChampion}
          />
        </Tile>

        <Tile className="champions">
          <p className="subtitle mb10">Champions</p>
          <ChampionTable
            champions={champions}
            showOptions
            onEdit={(champion) => {
              setEditedChampion(champion as Champion);
            }}
          />
        </Tile>
      </div>
    </div>
  );
};

export default ChampionsPage;
