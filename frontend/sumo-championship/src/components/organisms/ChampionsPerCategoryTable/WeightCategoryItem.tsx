import { ChampionsWeightCategory } from '../../../types/Champion';
import FaIcon from '../../Atoms/FaIcon';
import AssignedChampionCategoryItem from './AssignedChampionCategoryItem';

type Props = {
  weightCategory: ChampionsWeightCategory;
};

const WeightCategoryItem = ({ weightCategory }: Props) => {
  const renderChampionItems = () => {
    if (weightCategory.champions.length === 0)
      return <AssignedChampionCategoryItem name="No champions assigned" />;
    return weightCategory.champions.map((champion) => (
      <AssignedChampionCategoryItem
        key={champion.id}
        name={`${champion.firstname} ${champion.lastname}`}
        clubName={champion.clubName}
        gender={champion.gender}
      />
    ));
  };
  return (
    <div className="championCategoryItem">
      <div className="header">
        <FaIcon name="FaWeightHanging" size={16} />
        <p className="field">{weightCategory.gender}</p>
        <p>
          {`< `}
          {weightCategory.maxWeight}kg
        </p>
      </div>

      <div className="body">{renderChampionItems()}</div>
    </div>
  );
};

export default WeightCategoryItem;
