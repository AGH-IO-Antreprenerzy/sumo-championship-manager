import React from 'react';

import { Champion } from '../../../types/Champion';
import ChampionItem from './ChampionItem';

type props = {
  champions: Champion[];
  showOptions?: boolean;
  onAdd?: () => void;
};

const ChampionTable: React.FC<props> = ({ champions, showOptions, onAdd }) => {
  return (
    <div className="championTable">
      <ChampionItem
        key={`championItemHeader`}
        name="Name"
        gender="Gender"
        birthYear="Birth year"
        clubName="Club name"
        showOptions={showOptions}
        header
      />
      {champions.map((champion) => {
        return (
          <ChampionItem
            key={`championItem${champion.id}`}
            name={champion.firstname + ' ' + champion.lastname}
            gender={champion.gender}
            birthYear={new Date(champion.birthday).getFullYear().toString()}
            clubName="Example"
            showOptions={showOptions}
            onAdd={() => {
              //
            }}
          />
        );
      })}
    </div>
  );
};

export default ChampionTable;
