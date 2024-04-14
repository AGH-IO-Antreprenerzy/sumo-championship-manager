import { z } from "zod"
import api from "./api";

const clubSchema = z.object({
    id: z.number(),
    name: z.string(),
    nationality: z.string()
})


export const getClubsForCountry = (country: string): Promise<Club[]> => {
    //TODO: add here real backend call
    return api.get<Club[]>("v1/club/from-country", {countryName: country})()
    .then(z.array(clubSchema).parse)
}


type Club = z.infer<typeof clubSchema>;