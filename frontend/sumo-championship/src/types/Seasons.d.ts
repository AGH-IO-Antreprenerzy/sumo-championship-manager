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
  categories: Category[];
};

export { Season, Category, Gender };
