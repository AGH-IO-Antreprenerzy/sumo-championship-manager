import React, { useEffect, useState } from 'react';
import './../styles/Pages.css';
import GeneralTrounamentInformation from '../components/organisms/AddTournamentForms/GeneralTrounamentInformation';
import { GeneralInformation, defaultGeneralInformation, defaultGeneralInformationErrors } from '../types/Tournaments';
import { CategoryDto, Gender, getCategoriesForSeason } from '../api/category';
import TournamentCategoriesInformation from '../components/organisms/AddTournamentForms/TournamentCategoriesInformation';
import Button from '../components/Atoms/Button';

interface CategoriesPerSex{
    isChoosen: boolean
    categories: CategoryToAdd[]
}

export type CategoryToAdd = CategoryDto & {isChoosen: boolean}

const AddTournament = () => {

    const [generalInformation, setGeneralInformation] = useState<GeneralInformation>(defaultGeneralInformation);
    const [generalInformationErrors, setGeneralInformationErrors] = useState<GeneralInformation>(defaultGeneralInformationErrors);

    const [maleCategories, setMaleCategories] = useState<CategoriesPerSex>({isChoosen: false, categories: []})
    const [femaleCategories, setFemaleCategories] = useState<CategoriesPerSex>({isChoosen: false, categories: []})

    const removeMaleCategory = (name: string) => {
        const newCategories = maleCategories.categories.filter(category => category.name != name)
        setMaleCategories(prev => ({...prev, categories: newCategories}))
    }

    const removeFemaleCategory = (name: string) => {
        const newCategories = femaleCategories.categories.filter(category => category.name != name)
        setFemaleCategories(prev => ({...prev, categories: newCategories}))
    }

    const setChoosenForMaleCategories = (categoryNames: string[], value: boolean) => {
        const newCategories = maleCategories.categories;
        categoryNames.forEach(name => {
            const cat = newCategories.find(c => c.name === name)

            if(cat !== undefined){
                cat.isChoosen = value
            }
        })

        setMaleCategories(prev => ({...prev, categories: newCategories}))
    }

    const setChoosenForFemaleCategories = (categoryNames: string[], value: boolean) => {
        const newCategories = femaleCategories.categories;
        categoryNames.forEach(name => {
            const cat = newCategories.find(c => c.name === name)

            if(cat !== undefined){
                cat.isChoosen = value
            }
        })

        setFemaleCategories(prev => ({...prev, categories: newCategories}))
    }

    const addTournament = () => {
        let isSuccesful = true

        if (generalInformation.name.trim() === ""){
            isSuccesful = false;
            setGeneralInformationErrors(prev => ({...prev, name: "You need to provide a name"}))
        }

        if (generalInformation.tournamentDate.trim() === ""){
            isSuccesful = false;
            setGeneralInformationErrors(prev => ({...prev, tournamentDate: "You need to provide a Tournament date"}))
        }

        if (generalInformation.location.trim() === ""){
            isSuccesful = false;
            setGeneralInformationErrors(prev => ({...prev, location: "You need to provide a Location"}))
        }

        if (generalInformation.registrationDate.trim() === ""){
            isSuccesful = false;
            setGeneralInformationErrors(prev => ({...prev, registrationDate: "You need to provide a Registration date"}))
        }

        if (generalInformation.season.trim() === ""){
            isSuccesful = false;
            setGeneralInformationErrors(prev => ({...prev, season: "You need to provide a season"}))
        }

        if(!isSuccesful){
            alert("Form contains errors")
            return;
        }

        

    }

    useEffect(() => {
        const getCategories = async () => {
            const categories = await getCategoriesForSeason(generalInformation.season)
            const mappedCategories = categories.map(category => ({...category, isChoosen: true}))

            const mappedMaleCategories = mappedCategories
            .filter(category => category.gender === Gender.MALE || category.gender === Gender.ALL)

            const mappedFemaleCategories = mappedCategories
            .filter(category => category.gender === Gender.FEMALE || category.gender === Gender.ALL) 
            
            setMaleCategories({isChoosen: true, categories: mappedMaleCategories})
            setFemaleCategories({isChoosen: true, categories: mappedFemaleCategories})
        }

        getCategories()
    }, [generalInformation.season])

    return (
        <div className='page'>
            <h1 style={{fontSize: "50px"}}>Add tournament</h1>
            <div className='addTournamentPage'>
                <GeneralTrounamentInformation
                    values={generalInformation}
                    changeValues={setGeneralInformation}
                />
                <TournamentCategoriesInformation
                    label='Men Competition'
                    values={maleCategories.categories}
                    removeCategory={removeMaleCategory}
                    onPerSexCheckboxToggle={(value: boolean) => setMaleCategories(prev => ({...prev, isChoosen: value}))}
                    onPerAgeCheckboxToggle={setChoosenForMaleCategories}
                    isPerSexCheckboxChecked={maleCategories.isChoosen}
                />
                <TournamentCategoriesInformation
                    label='Women Competition'
                    values={femaleCategories.categories}
                    removeCategory={removeFemaleCategory}
                    onPerSexCheckboxToggle={(value: boolean) => setFemaleCategories(prev => ({...prev, isChoosen: value}))}
                    onPerAgeCheckboxToggle={setChoosenForFemaleCategories}
                    isPerSexCheckboxChecked={femaleCategories.isChoosen}
                />
            </div>
            <Button
                value='Add tournament'
                style={{marginTop: "20px"}}
                onClick={addTournament}
            />
        </div>
        
    );
};

export default AddTournament;