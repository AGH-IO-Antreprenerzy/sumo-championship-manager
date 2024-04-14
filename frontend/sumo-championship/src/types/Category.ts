export enum Gender{
    MALE = "MALE",
    FEMALE = "FEMALE",
}

export interface ChoosableWeightCategory{
    id: number
    maxWeight: number,
    gender: Gender,
    isChoosen: boolean
}

export interface ChoosableAgeCategory{
    ageName: string,
    maxAge: number,
    minAge: number,
    categories: ChoosableWeightCategory[]
    isChoosen: boolean
}