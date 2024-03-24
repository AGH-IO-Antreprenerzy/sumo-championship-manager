import React from 'react';
import { Category2 } from '../../../api/category';
import WeightCategoriesContainer from '../../molecules/WeightCategoriesContainer';

interface props{
    label: string,
    values: Category2[]
}
const TournamentCategoriesInformation: React.FC<props> = ({label, values}) => {

    const categoriesGroupedByAge: { [minAge: number] : Category2[]} = {}

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
            />
        }
    }

    //change naming of class if turns out to be ok
    //add checkboxes
    return (
        <div className='addTournamentInformationBox'> 
            <h1> {label} </h1>
            {renderElements()}
        </div>
    );
};

export default TournamentCategoriesInformation;