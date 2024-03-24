import React, { useEffect, useState } from 'react';
import './../../../styles/Organisms.css';
import { getAllSeasons } from '../../../api/season';
import TextField from '../../molecules/TextField';
import { GeneralInformation } from '../../../types/Tournaments';
import SelectField from '../../molecules/SelectField';

interface props{
    values: GeneralInformation,
    changeValues: React.Dispatch<React.SetStateAction<GeneralInformation>>
}

const GeneralTrounamentInformation: React.FC<props> = ({values, changeValues}) => {
    const [seasonNames, setSeasonNames] = useState<string[]>([])

    

    useEffect(() => {
        const getSeasonNames = async () => {
            const seasons = await getAllSeasons();
            const names = seasons.seasonDtoList.map(s => s.name);
            setSeasonNames(names);
        }
        
        getSeasonNames();
    }, [])

    return (
        <div className='addTournamentInformationBox'>
            <h1>General Information</h1>
            <TextField
                label="Name"
                onChange={(e) => changeValues(prev => ({...prev, name: e.target.value}))}
                value={values.name}
                type='text'
            />
            <TextField
                label="Tournament date"
                onChange={(e) => changeValues(prev => ({...prev, tournamentDate: e.target.value}))}
                value={values.tournamentDate}
                type='date'
            />
            <TextField
                label="Location"
                onChange={(e) => changeValues(prev => ({...prev, location: e.target.value}))}
                value={values.location}
            />
            <TextField
                label="Registration date"
                onChange={(e) => changeValues(prev => ({...prev, registrationDate: e.target.value}))}
                value={values.registrationDate}
                type='date'
            />
            <SelectField
                name='Season'
                onChange={(e) => changeValues(prev => ({...prev, season: e.target.value}))}
                options={seasonNames}
            />
        </div>
    );
};

export default GeneralTrounamentInformation;