import api from "./api";
import { Role } from "./login";

interface TrainerToAdd{
    name: string,
    lastname: string,
    password: string,
    email: string,
    role: Role,
    country: string,
    club: string,
}

export const addTrainer = async (trainer: TrainerToAdd) => {
    console.log(trainer)
    // const body = JSON.stringify(trainer)

    // api.post("v1/trainer/add", body)()
}