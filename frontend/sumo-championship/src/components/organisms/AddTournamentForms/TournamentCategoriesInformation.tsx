import React from 'react';
import WeightCategoriesContainer from '../../molecules/WeightCategoriesContainer';
import { CategoryToAdd } from '../../../pages/AddTournamentPage';

interface props{
    label: string,
    values: CategoryToAdd[]
    removeCategory: (name: string) => void
    onPerSexCheckboxToggle: (value: boolean) => void
    onPerAgeCheckboxToggle: (categoryNames: string[], value: boolean) => void
    isPerSexCheckboxChecked: boolean
}
const TournamentCategoriesInformation: React.FC<props> = ({label, values, removeCategory,
    onPerSexCheckboxToggle, onPerAgeCheckboxToggle, isPerSexCheckboxChecked}) => {

    const categoriesGroupedByAge: { [minAge: number] : CategoryToAdd[]} = {}

    values.forEach(category => {
        const age = category.maxAge;
        if (categoriesGroupedByAge[age]){
            categoriesGroupedByAge[age].push(category)
        }
        else{
            categoriesGroupedByAge[age] = [category]
        }
    })

    const renderElements = () => {
        for( const [key, value] of Object.entries(categoriesGroupedByAge)){
            return value.length > 0 && <WeightCategoriesContainer
                key={key}
                values={value}
                removeCategory={removeCategory}
                onCheckboxToggle={onPerAgeCheckboxToggle}
            />
        }
    }

    //add checkboxes
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