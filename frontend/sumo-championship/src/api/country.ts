import api from "./api"

export const getAllCountries = async () => {
    return await api.get<string[]>("v1/country/all")()
}