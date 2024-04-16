import api from "./api";
import { Role } from "./login";

interface TrainerToAdd{
    firstname: string,
    lastname: string,
    password: string,
    email: string,
    userRole: Role,
    country: string,
    club: string,
}


export const addTrainer = async (trainer: TrainerToAdd) => {
    await api.post("v1/website-user/add", trainer)();
}