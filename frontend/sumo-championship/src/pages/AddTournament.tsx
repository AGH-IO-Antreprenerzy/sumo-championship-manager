import React, { useEffect, useState } from 'react';
import './../styles/Pages.css';
import GeneralTrounamentInformation from '../components/organisms/AddTournamentForms/GeneralTrounamentInformation';
import { GeneralInformation, defaultGeneralInformation } from '../types/Tournaments';
import { Category2, Gender, getCategoriesForSeason } from '../api/category';
import TournamentCategoriesInformation from '../components/organisms/AddTournamentForms/TournamentCategoriesInformation';

const AddTournament = () => {

    const [generalInformation, setGeneralInformation] = useState<GeneralInformation>(defaultGeneralInformation);

    const [choosenSeasonCategories, setChoosenSeasonCategories] = useState<Category2[]>([])

    const removeCategory = (name: string) => {
        setChoosenSeasonCategories(prev => prev.filter(category => category.name != name))
    }

    

    useEffect(() => {
        const getCategories = async () => {
            const categories = await getCategoriesForSeason(generalInformation.season)
            setChoosenSeasonCategories(categories)
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
                values={choosenSeasonCategories.filter(category => category.gender === Gender.MALE || category.gender === Gender.ALL)}
                removeCategory={removeCategory}
            />
            <TournamentCategoriesInformation
                label='Women Competition'
                values={choosenSeasonCategories.filter(category => category.gender === Gender.FEMALE || category.gender === Gender.ALL)}
                removeCategory={removeCategory}
            />
        </div>
    );
};

export default AddTournament;