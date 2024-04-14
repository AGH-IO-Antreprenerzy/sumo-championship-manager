import { Category, Gender, WeightCategory } from './Seasons';

type Champion = {
  id: number;
  firstname: string;
  lastname: string;
  gender: Gender;
  birthday: string;
  clubId: number;
};

type AssignedChampion = {
  id: number;
  firstname: string;
  lastname: string;
  gender: Gender;
  birthday: string;
  clubName?: string;
  categoryId?: number;
};

type ChampionsWeightCategory = WeightCategory & {
  categoryId: number;
  champions: AssignedChampion[];
};

type ChampionsAgeCategory = Category & {
  weightsAndGender: ChampionsWeightCategory[];
};

export {
  Champion,
  ChampionsAgeCategory,
  ChampionsWeightCategory,
  AssignedChampion,
};
