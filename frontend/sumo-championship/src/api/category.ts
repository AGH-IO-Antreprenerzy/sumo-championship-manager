import { z } from "zod";
import api from "./api";
import { ChoosableAgeCategory, Gender } from "../types/Category";

export const getCategoriesForSeason = async (season: string): Promise<ChoosableAgeCategory[]> => {
    const response = await api.getPaginated("v2/category/to-season", 100, {season})(0)
    const parsedResponse = categoriesSchema.parse(response);
    return mapCategoryToChoosableCategory(parsedResponse.categories);
}

export const mapCategoriesByGender = (categories: ChoosableAgeCategory[], gender: Gender): ChoosableAgeCategory[] => {
    return categories.map(cat => ({
        ageName: cat.ageName,
        maxAge: cat.maxAge,
        minAge: cat.minAge,
        isChoosen: cat.isChoosen,
        categories: cat.categories.filter(ageCat => ageCat.gender === gender)
    }))
}

export const mapCategoryToChoosableCategory = (categories: CategoryDto[]): ChoosableAgeCategory[]  => {
    return categories.map(cat => ({
        ageName: cat.ageName,
        maxAge: cat.maxAge,
        minAge: cat.minAge,
        categories: cat.weightsAndGender.map(weightCat => ({
            id: weightCat.categoryId,
            maxWeight: weightCat.maxWeight,
            gender: weightCat.gender,
            isChoosen: true
        })),
        isChoosen: true
    }))
}

const weightAndGenderSchema = z.object({
    categoryId: z.number(),
    maxWeight: z.number(),
    gender: z.nativeEnum(Gender)
})

const categorySchema = z.object({
    ageName: z.string(),
    minAge: z.number(),
    maxAge: z.number(),
    weightsAndGender: z.array(weightAndGenderSchema)
})

export type CategoryDto = z.infer<typeof categorySchema>;

const categoriesSchema = z.object({
    categories: z.array(categorySchema),
    pageNo: z.number(), 
    pageSize: z.number(),
    totalPages: z.number(),
    totalElements: z.number(),
})