import React from 'react';
import WeightCategoriesContainer from '../../molecules/AgeCategoryBox';
import { ChoosableAgeCategory } from '../../../types/Category';

interface props{
    label: string,
    values: ChoosableAgeCategory[]
    toggleWeightCategory: (name: string, id: number, value: boolean) => void
    onPerSexCheckboxToggle: (value: boolean) => void
    onPerAgeCheckboxToggle: (categoryNames: string, value: boolean) => void
    isPerSexCheckboxChecked: boolean
}
const TournamentCategoriesInformation: React.FC<props> = ({label, values, toggleWeightCategory,
    onPerSexCheckboxToggle, onPerAgeCheckboxToggle, isPerSexCheckboxChecked}) => {

    const renderElements = () => 
        values.map((cat, index) => (<WeightCategoriesContainer
            key={index}
            ageCategory={cat}
            onCheckboxToggle={onPerAgeCheckboxToggle}
            toggleWeightCategory={toggleWeightCategory}
        />));
    
    return (
        <div className='addTournamentInformationBox'>
            <div className='generalContainer'>
                <h1> {label} </h1>
                <input type='checkbox' onChange={e => onPerSexCheckboxToggle(e.target.checked)} checked={isPerSexCheckboxChecked}/>
            </div>
            {renderElements()}
        </div>
    );
};

export default TournamentCategoriesInformation;