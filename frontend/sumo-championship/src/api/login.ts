import { z } from "zod";
import { loginInformation } from "../components/organisms/LoginForm";
import { checkIsOk } from "./generalUtils";

export enum Role{
    Admin = "Admin",
    Club = "Club",
    National = "National"
}

const UserSchema = z.object({
    name: z.string(),
    lastname: z.string(),
    email: z.string().email(),
    role: z.nativeEnum(Role)
});

type UserDto = z.infer<typeof UserSchema>;

const fakeUser: UserDto = {
    name: "Tomek",
    lastname: "Taboret",
    email: "tomeczke@gmail.com",
    role: Role.Admin
}

export const postLogin = (loginInfo: loginInformation): Promise<UserDto> => {
    const body = JSON.stringify(loginInfo)

    // return fetch("http://localhost:3000/login", {
    //     method: "POST",
    //     headers: {
    //         "Content-type": "application/json"
    //     },
    //     body: body
    // })
    // .then(checkIsOk)
    // .then(res => res.json())
    // .then(UserSchema.parse)

    return new Promise((res, rej) => res(fakeUser))
}