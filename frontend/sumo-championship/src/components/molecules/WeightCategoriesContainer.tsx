import React from 'react';
import WeightBox from '../Atoms/WeightBox';
import './../../styles/Molecules.css';
import { CategoryToAdd } from '../../pages/AddTournamentPage';

interface props{
    values: CategoryToAdd[]
    removeCategory: (name: string) => void
    onCheckboxToggle: (categoryNames: string[], value: boolean) => void
}

const WeightCategoriesContainer: React.FC<props> = ({values, removeCategory, onCheckboxToggle}) => {
    return (
        <div className='categories'>
            <div className='generalContainer'>
                <div> {`${values[0].name} (< ${values[0].maxAge} old)`}</div>
                <input type='checkbox' onChange={(e) => onCheckboxToggle(values.map(v => v.name), e.target.checked)}/>
            </div>
            <div className='weightsContainer'>
                {values.map( (category, i) => (<WeightBox
                    value={category.maxWeight}
                    key={i}
                    onRemove={() => removeCategory(category.name)}
                />))}
            </div>
            
        </div>
    );
};

export default WeightCategoriesContainer;