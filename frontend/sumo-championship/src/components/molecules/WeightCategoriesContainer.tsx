import React from 'react';
import { Category2 } from '../../api/category';
import WeightBox from '../Atoms/WeightBox';
import './../../styles/Molecules.css';

interface props{
    values: Category2[]
    removeCategory: (name: string) => void
}

const WeightCategoriesContainer: React.FC<props> = ({values, removeCategory}) => {
    return (
        <div className='categories'>
            <div className='generalContainer'>
                <div> {`${values[0].name} (< ${values[0].maxAge} old)`}</div>
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