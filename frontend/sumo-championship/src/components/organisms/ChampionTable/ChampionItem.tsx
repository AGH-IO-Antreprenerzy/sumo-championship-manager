import React from 'react';
import { Gender } from '../../../types/Seasons';
import IconButton from '../../Atoms/IconButton';

type props = {
  name: string;
  gender?: Gender | string;
  birthYear?: string;
  clubName?: string;
  showOptions?: boolean;
  onAdd?: () => void;
  onRemove?: () => void;
  onEdit?: () => void;
  header?: boolean;
};

const ChampionItem: React.FC<props> = ({
  name,
  gender,
  birthYear,
  clubName,
  showOptions,
  onAdd,
  onRemove,
  onEdit,
  header,
}) => {
  const fieldClass = header ? 'headerField' : 'field';
  return (
    <div className={'championItem'}>
      <div className="content">
        <p
          className={fieldClass}
          style={{ flex: 2, justifyContent: header ? 'center' : 'flex-start' }}
        >
          {name}
        </p>
        <p className={fieldClass}>{gender}</p>
        <p className={fieldClass}>{birthYear}</p>
        <p className={fieldClass} style={{ flex: 2 }}>
          {clubName}
        </p>
      </div>

      <div className="options">
        {!header && showOptions && onAdd && (
          <IconButton name="FaPlus" size={24} color="#ff8b38" onClick={onAdd} />
        )}
        {!header && showOptions && onRemove && (
          <IconButton
            name="FaMinus"
            size={24}
            color="#ff8b38"
            onClick={onRemove}
          />
        )}
        {!header && showOptions && onEdit && (
          <IconButton
            name="FaEdit"
            size={24}
            color="#ff8b38"
            onClick={onEdit}
          />
        )}
      </div>
    </div>
  );
};

export default ChampionItem;
