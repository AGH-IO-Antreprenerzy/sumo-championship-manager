import React from 'react';
import { CategoryDto } from '../../../api/category';
import WeightCategoriesContainer from '../../molecules/WeightCategoriesContainer';

interface props{
    label: string,
    values: CategoryDto[]
    removeCategory: (name: string) => void
}
const TournamentCategoriesInformation: React.FC<props> = ({label, values, removeCategory}) => {

    const categoriesGroupedByAge: { [minAge: number] : CategoryDto[]} = {}

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
            />
        }
    }

    //add checkboxes
    return (
        <div className='addTournamentInformationBox'> 
            <h1> {label} </h1>
            {renderElements()}
        </div>
    );
};

export default TournamentCategoriesInformation;