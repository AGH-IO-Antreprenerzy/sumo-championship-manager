import {
  ChampionsAgeCategory,
  ChampionsWeightCategory,
} from '../../../types/Champion';
import FaIcon from '../../Atoms/FaIcon';
import WeightCategoryItem from './WeightCategoryItem';

type Props = {
  ageCategory: ChampionsAgeCategory;
};

const AgeCategoryItem = ({ ageCategory }: Props) => {
  return (
    <div className="championCategoryItem">
      <div className="header">
        <FaIcon name="FaUsers" size={16} />
        <p className="field semiBold">
          {ageCategory.minAge} - {ageCategory.maxAge}
        </p>
        <p className="semiBold">{ageCategory.ageName}</p>
      </div>

      <div className="body">
        {ageCategory.weightsAndGender.map(
          (category: ChampionsWeightCategory) => (
            <WeightCategoryItem
              key={ageCategory.ageName + category.gender + category.maxWeight}
              weightCategory={category}
            />
          ),
        )}
      </div>
    </div>
  );
};

export default AgeCategoryItem;
