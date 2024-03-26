export const BASE_SUMO_URL = "http://localhost:8080/api/v1"

export const checkIsOk = (response: Response) => {
    if (!response.ok){
        throw response;
    }

    return response;
}