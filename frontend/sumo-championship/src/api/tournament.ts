import { CategoriesPerSex } from "../pages/AddTournamentPage"
import { GeneralInformation } from "../types/Tournaments"
import { checkIsOk } from "./generalUtils";

const BASE_TOURNAMENT_URL = 'http://localhost:8080/api/v1/tournament';

export const addTournament = async (general: GeneralInformation, male: CategoriesPerSex, female: CategoriesPerSex) => {
    const categories: number[] = []
    categories.push(...mapCategoriesToIds(male))
    categories.push(...mapCategoriesToIds(female))

    if (categories.length === 0) throw new Error("Cannot add tournament without any category");

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

    return fetch(BASE_TOURNAMENT_URL + "/add", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(checkIsOk)
}

const mapCategoriesToIds = (categories: CategoriesPerSex): number[] => {
    if (!categories.isChoosen) return []
    const filteredAgeCategories =  categories.categories.filter(cat => cat.isChoosen)
    const categoriesIds = []

    for (const category of filteredAgeCategories){
        categoriesIds.push(...category.categories.filter(cat => cat.isChoosen))
    }

    return categoriesIds.map(cat => cat.id);
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