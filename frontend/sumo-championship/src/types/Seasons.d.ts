import { Tournament } from './Tournament';

type Gender = 'FEMALE' | 'MALE' | 'ALL';

type WeightCategory = {
  maxWeight: number;
  gender: Gender;
};

type Category = {
  name: string;
  minAge: number;
  maxAge: number;
  weightsAndGender: WeightCategory[];
};

type Season = {
  name: string;
  start: string;
  end: string;
};

type DetailedSeason = Season & {
  categories: Category[];
  status: 'ACTIVE' | 'INACTIVE';
  tournaments: Tournament[];
};

export { DetailedSeason, Season, Category, WeightCategory, Gender };
