export const checkIsOk = (response: Response) => {
    if (!response.ok){
        throw response;
    }

    return response;
}