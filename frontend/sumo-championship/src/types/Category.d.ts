type Gender = 'Female' | 'Male' | 'All';

type Category = {
  name: string;
  gender: Gender;
  minAge: number;
  maxAge: number;
  minWeight: number;
  maxWeight: number;
};

export { Category, Gender };
