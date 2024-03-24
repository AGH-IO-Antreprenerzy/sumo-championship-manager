type Gender = 'FEMALE' | 'MALE' | 'ALL';

type Category = {
  name: string;
  gender: Gender;
  minAge: number;
  maxAge: number;
  minWeight: number;
  maxWeight: number;
};

export { Category, Gender };
