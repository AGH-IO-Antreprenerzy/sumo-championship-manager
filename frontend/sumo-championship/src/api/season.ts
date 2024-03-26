import { z } from 'zod';
import api from './api';

export const getAllSeasons = async (): Promise<AllSeasons> => {
  //this should be changed to endpoint with active seasons
  const response = await api.getPaginated<typeof allSeasonsSchema>(
    'v1/season/all',
    1000,
  )(0);
  return allSeasonsSchema.parse(response);
};

const seasonSchema = z.object({
  name: z.string(),
  start: z.string(),
  end: z.string(),
});

const allSeasonsSchema = z.object({
  seasonDtoList: z.array(seasonSchema),
  pageNo: z.number(),
  pageSize: z.number(),
  totalPages: z.number(),
  totalElements: z.number(),
});

export type AllSeasons = z.infer<typeof allSeasonsSchema>;
