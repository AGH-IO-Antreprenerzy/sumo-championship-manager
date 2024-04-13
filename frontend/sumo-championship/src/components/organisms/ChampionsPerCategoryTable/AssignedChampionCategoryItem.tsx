import { Gender } from '../../../types/Seasons';

type Props = {
  name: string;
  gender?: Gender;
  clubName?: string;
};

const AssignedChampionCategoryItem = ({ name, gender, clubName }: Props) => {
  return (
    <div className="assignedChampionCategoryItem">
      <p style={{ width: 250 }}>{name}</p>
      {gender && <p style={{ width: 50 }}>{gender}</p>}
      {clubName && <p>{clubName}</p>}
    </div>
  );
};

export default AssignedChampionCategoryItem;
