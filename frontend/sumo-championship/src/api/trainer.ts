import api from "./api";
import { Role } from "./login";

interface TrainerToAdd{
    firstname: string,
    lastname: string,
    password: string,
    email: string,
    role: Role,
    country: string,
    club: string,
}

export const addTrainer = async (trainer: TrainerToAdd) => {
    const body = JSON.stringify(trainer);
    await api.post("v1/website-user/add", body)();
}