import { AssignedChampion } from '../../types/Champion';

type CategoryStep = {
  categoryId: number;
  ageCategory: string;
  weightCategory: WeightCategory;
  champions: AssignedChampion[];
};

export { CategoryStep };
