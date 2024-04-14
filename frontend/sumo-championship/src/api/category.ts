import { z } from "zod";
import api from "./api";

export const getCategoriesForSeason = async (season: string): Promise<CategoryDto[]> => {
    const response = await api.getPaginated("v1/category/to-season", 100, {season})(0)
    const parsedResponse = categoriesSchema.parse(response);
    return parsedResponse.categories;
}

export enum Gender{
    MALE = "MALE",
    FEMALE = "FEMALE",
    ALL = "ALL"
}

const categorySchema = z.object({
    id: z.number(),
    name: z.string(),
    minAge: z.number(),
    maxAge: z.number(),
    minWeight: z.number(),
    maxWeight: z.number(),
    gender: z.nativeEnum(Gender)
})

export type CategoryDto = z.infer<typeof categorySchema>;

const categoriesSchema = z.object({
    categories: z.array(categorySchema),
    pageNo: z.number(), 
    pageSize: z.number(),
    totalPages: z.number(),
    totalElements: z.number(),
})