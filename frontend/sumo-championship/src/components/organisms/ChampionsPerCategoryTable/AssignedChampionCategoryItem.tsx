import { Gender } from '../../../types/Seasons';
import capitalizeFirstLetter from '../../../utils/stringMethods';

type Props = {
  name: string;
  gender?: Gender;
  clubName?: string;
};

const AssignedChampionCategoryItem = ({ name, gender, clubName }: Props) => {
  return (
    <div className="assignedChampionCategoryItem">
      <p style={{ width: 200 }}>{name}</p>
      {gender && (
        <p style={{ width: 80, textAlign: 'center' }}>
          {capitalizeFirstLetter(gender)}
        </p>
      )}
      {clubName && <p>{clubName}</p>}
    </div>
  );
};

export default AssignedChampionCategoryItem;
