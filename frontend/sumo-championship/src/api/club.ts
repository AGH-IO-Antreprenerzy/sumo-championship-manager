import { z } from "zod"
import api from "./api";
const BASE_CLUB_URL = 'http://localhost:8080/api/v1/club';
import { clubInformation } from "../components/organisms/AddClubForm";
import { checkIsOk } from "./generalUtils";
const clubSchema = z.object({
    id: z.number(),
    name: z.string(),
    nationality: z.string()
})


export const getClubsForCountry = (country: string): Promise<Club[]> => {
    return api.get<Club[]>("v1/club/from-country", {countryName: country})()
    .then(z.array(clubSchema).parse)
}
export const addClub = async (clubInfo: clubInformation) => {
    const body = JSON.stringify(clubInfo)
    return fetch(`${BASE_CLUB_URL}/add`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: body
    })
    .then(checkIsOk)
}

type Club = z.infer<typeof clubSchema>



