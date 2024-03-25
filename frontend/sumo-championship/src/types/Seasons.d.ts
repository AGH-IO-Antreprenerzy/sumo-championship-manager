import { GeneralInformation } from './Tournaments';

type Gender = 'FEMALE' | 'MALE' | 'ALL';

type Category = {
  name: string;
  gender: Gender;
  minAge: number;
  maxAge: number;
  minWeight: number;
  maxWeight: number;
};

type Season = {
  name: string;
  start: string;
  end: string;
};

type DetailedSeason = Season & {
  categories: Category[];
  status: 'ACTIVE' | 'INACTIVE';
  tournament: GeneralInformation[];
};

export { DetailedSeason, Season, Category, Gender };
