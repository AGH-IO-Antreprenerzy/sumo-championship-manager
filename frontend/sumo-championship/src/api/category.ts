import { z } from "zod";
import api from "./api";
import { GeneralInformation } from "../types/Tournaments";
import { CategoriesPerSex } from "../pages/AddTournamentPage";
import { json } from "stream/consumers";

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

export const addTournament = async (general: GeneralInformation, male: CategoriesPerSex, female: CategoriesPerSex) => {
    const categories: number[] = []
    categories.push(...mapCategoriesToIds(male))
    categories.push(...mapCategoriesToIds(female))

    const body: addTournamentDto = {
        name: general.name,
        location: {
            country: general.country,
            city: general.city,
            street: general.street,
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            nr: general.nr!
        },
        seasonName: general.seasonName,
        contestStart: general.contestStart,
        contestEnd: general.contestEnd,
        registerStart: general.registerStart,
        registerEnd: general.registerEnd,
        categoryIds: categories
    }
    console.log(body);
    // await api.post("v1/tournament/add", JSON.stringify(body))();
}

const mapCategoriesToIds = (categories: CategoriesPerSex): number[] => {
    if (!categories.isChoosen) return []
    return categories
        .categories
        .filter(cat => cat.isChoosen)
        .map(cat => cat.id)
}

interface addTournamentDto {
    name: string,
    location: {
        country: string,
        city: string,
        street: string,
        nr: number
    },
    seasonName: string,
    contestStart: string,
    contestEnd: string,
    registerStart: string,
    registerEnd: string,
    categoryIds: number[]
}