type Tournament = {
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

export { Tournament, PaginatedTournaments };
