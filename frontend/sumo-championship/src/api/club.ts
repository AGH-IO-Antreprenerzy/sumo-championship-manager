export const getClubs = (country: string): Promise<string[]> => {
    //TODO: add here real backend call

    return new Promise((res) => {
        if (country === ""){
            return res(["club1", "club2"])
        }

        if (country === "ALBANIA"){
            return res(["club3", "club4"])
        }

        return res(["club65", "club71"])
    })
}