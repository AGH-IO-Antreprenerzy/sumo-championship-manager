import { CategoriesPerSex } from "../pages/AddTournamentPage"
import { GeneralInformation } from "../types/Tournaments"
import api from "./api"

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
    await api.post("v1/tournament/add", JSON.stringify(body))();
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