export const getClubs = (country: string): Promise<string[]> => {
    console.log(country)
    
    return new Promise((res, rej) => {
        return res(["club1", "club2"])
    })
}