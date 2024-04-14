export interface GeneralInformation{
    name: string,
    contestStart: string,
    contestEnd: string,
    country: string,
    city: string,
    street: string,
    nr?: number,
    registerEnd: string,
    registerStart: string,
    seasonName: string;
}

export const defaultGeneralInformation: GeneralInformation = {
    name: "",
    contestStart: "",
    contestEnd: "",
    country: "",
    city: "",
    street: "",
    nr: undefined,
    registerEnd: "",
    registerStart: "",
    seasonName: ""
}

export interface GeneralInformationError{
    name: string,
    contestStart: string,
    contestEnd: string,
    country: string,
    city: string,
    street: string,
    nr: string,
    registerEnd: string,
    registerStart: string,
    seasonName: string;
}

export const defaultGeneralInformationErrors: GeneralInformationError = {
    name: "",
    contestStart: "",
    contestEnd: "",
    country: "",
    city: "",
    street: "",
    nr: "",
    registerEnd: "",
    registerStart: "",
    seasonName: ""
}