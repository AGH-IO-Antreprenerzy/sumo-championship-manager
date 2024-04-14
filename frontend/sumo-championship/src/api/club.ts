import { checkIsOk } from "./generalUtils";
const BASE_CLUB_URL = 'http://localhost:8080/api/v1/club';
import { clubInformation } from "../components/organisms/AddClubForm";
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