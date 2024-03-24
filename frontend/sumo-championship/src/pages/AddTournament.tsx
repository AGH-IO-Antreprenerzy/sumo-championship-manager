import React, { useEffect, useState } from 'react';
import './../styles/Pages.css';
import GeneralTrounamentInformation from '../components/organisms/AddTournamentForms/GeneralTrounamentInformation';
import { GeneralInformation, defaultGeneralInformation } from '../types/Tournaments';
import { CategoryDto, Gender, getCategoriesForSeason } from '../api/category';
import TournamentCategoriesInformation from '../components/organisms/AddTournamentForms/TournamentCategoriesInformation';

interface CategoriesPerSex{
    isChoosen: boolean
    categories: CategoryToAdd[]
}

type CategoryToAdd = CategoryDto & {isChoosen: boolean}

const AddTournament = () => {

    const [generalInformation, setGeneralInformation] = useState<GeneralInformation>(defaultGeneralInformation);

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
        <div className='addTournamentPage'>
            <GeneralTrounamentInformation
                values={generalInformation}
                changeValues={setGeneralInformation}
            />
            <TournamentCategoriesInformation
                label='Men Competition'
                values={maleCategories.categories}
                removeCategory={removeMaleCategory}
            />
            <TournamentCategoriesInformation
                label='Women Competition'
                values={femaleCategories.categories}
                removeCategory={removeFemaleCategory}
            />
        </div>
    );
};

export default AddTournament;