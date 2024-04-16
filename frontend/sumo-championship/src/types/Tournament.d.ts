import { Category } from './Seasons';

type Tournament = {
  id: number;
  name: string;
  location: {
    country: string;
    city: string;
    street: string;
    nr: number;
  };
  season: {
    name: string;
    start: string;
    end: string;
  };
  contestStart: string;
  contestEnd: string;
  registerStart: string;
  registerEnd: string;
};

type PaginatedTournaments = {
  totalPages: number;
  tournamentDtoList: Tournament[];
  pageNo: number;
  pageSize: number;
  totalElements: number;
};

type DetailedTournament = {
  id: number;
  name: string;
  seasonName: string;
  registerStart: string;
  registerEnd: string;
  contestStart: string;
  contestEnd: string;
  location: {
    country: string;
    city: string;
    street: string;
    nr: number;
  };
  ageCategories: Category[];
};

export { Tournament, PaginatedTournaments, DetailedTournament };
