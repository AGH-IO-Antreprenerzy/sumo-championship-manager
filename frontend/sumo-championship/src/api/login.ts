import { z } from "zod";
import { loginInformation } from "../components/organisms/LoginForm";
import { BASE_SUMO_URL, checkIsOk } from "./generalUtils";

export const postLogin = (loginInfo: loginInformation): Promise<UserDto> => {
    const body = JSON.stringify(loginInfo)

    return fetch(`${BASE_SUMO_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: body
    })
    .then(checkIsOk)
    .then(res => res.json())
    .then(UserSchema.parse)
}

export enum Role{
    Admin = "ADMIN",
    Club = "CLUB_TRAINER",
    National = "NATIONAL_TRAINER",
    Unregistered = "UNREGISTERED"
}

const UserSchema = z.object({
    id: z.number(),
    firstname: z.string(),
    lastname: z.string(),
    email: z.string().email(),
    userRole: z.nativeEnum(Role)
});

type UserDto = z.infer<typeof UserSchema>;