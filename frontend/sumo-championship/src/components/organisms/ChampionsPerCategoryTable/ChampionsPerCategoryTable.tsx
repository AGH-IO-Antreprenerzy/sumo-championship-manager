import { Category } from '../../../types/Seasons';
import {
  AssignedChampion,
  ChampionsAgeCategory,
  ChampionsWeightCategory,
} from '../../../types/Champion';
import { useMemo } from 'react';
import AgeCategoryItem from './AgeCategoryItem';

type Props = {
  categories: Category[];
  champions: AssignedChampion[];
};

const ChampionsPerCategoryTable = ({ categories, champions }: Props) => {
  const groupedChampions = useMemo(() => {
    let availableCategories: ChampionsAgeCategory[] = [
      ...(categories as ChampionsAgeCategory[]),
    ];

    availableCategories = availableCategories.map(
      (category: ChampionsAgeCategory) => {
        return {
          ...category,
          weightsAndGender: category.weightsAndGender.map(
            (weightCategory: ChampionsWeightCategory) => {
              return { ...weightCategory, champions: [] };
            },
          ),
        };
      },
    );

    const indexArray = availableCategories.map((category, index) => ({
      index,
      weightCategoryIds: category.weightsAndGender.map(
        (weightCategory: ChampionsWeightCategory) => weightCategory.categoryId,
      ),
    }));

    champions.forEach((champion) => {
      const ageCategoryIndex = indexArray.findIndex((index) =>
        index.weightCategoryIds.includes(champion.categoryId ?? -1),
      );

      const weightCategoryIndex = availableCategories[
        ageCategoryIndex
      ]?.weightsAndGender.findIndex(
        (weightCategory: ChampionsWeightCategory) =>
          weightCategory.categoryId === champion.categoryId,
      );

      if (!weightCategoryIndex && weightCategoryIndex !== 0) {
        return;
      }

      availableCategories[ageCategoryIndex].weightsAndGender[
        weightCategoryIndex
      ].champions.push(champion);
    });

    return availableCategories;
  }, [categories, champions]);

  return (
    <div>
      {groupedChampions.map((category, index) => {
        return <AgeCategoryItem key={index} ageCategory={category} />;
      })}
    </div>
  );
};

export default ChampionsPerCategoryTable;
