import React from 'react';
import { AssignedChampion } from '../../../types/Champion';
import ChampionItem from './ChampionItem';

type props = {
  champions: AssignedChampion[];
  showOptions?: boolean;
  onAdd?: (champion: AssignedChampion) => void;
  onRemove?: (index: number) => void;
};

const ChampionTable: React.FC<props> = ({
  champions,
  showOptions,
  onAdd,
  onRemove,
}) => {
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
      {champions.map((champion, index) => {
        return (
          <ChampionItem
            key={`championItem${champion.id}`}
            name={champion.firstname + ' ' + champion.lastname}
            gender={champion.gender}
            birthYear={new Date(champion.birthday).getFullYear().toString()}
            clubName="Example"
            showOptions={showOptions}
            onAdd={
              onAdd
                ? () => {
                    onAdd(champion);
                  }
                : undefined
            }
            onRemove={
              onRemove
                ? () => {
                    onRemove(index);
                  }
                : undefined
            }
          />
        );
      })}
    </div>
  );
};

export default ChampionTable;
