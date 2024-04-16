import { Champion } from './Champion';

type RegisteredChampion = {
  wrestler: Champion;
  categoryId: number;
  categoryName: string;
};

type AllRegisteredChampionsResponse = {
  enrollments: RegisteredChampions[];
};

export { RegisteredChampion, AllRegisteredChampionsResponse };
