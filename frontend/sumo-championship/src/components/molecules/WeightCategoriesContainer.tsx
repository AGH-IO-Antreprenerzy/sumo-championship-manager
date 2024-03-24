import React from 'react';
import { Category2 } from '../../api/category';
import WeightBox from '../Atoms/WeightBox';
import './../../styles/Molecules.css';

interface props{
    values: Category2[]
}

const WeightCategoriesContainer: React.FC<props> = ({values}) => {

    // const categoriesGroupedByAge: { [minAge: number] : Category2[]} = {}

    // values.forEach(category => {
    //     const age = category.maxAge;
    //     if (categoriesGroupedByAge[age]){
    //         categoriesGroupedByAge[age].push(category)
    //     }
    //     else{
    //         categoriesGroupedByAge[age] = [category]
    //     }
    // })

    return (
        <div className='categories'>
            <div className='generalContainer'>
                <div> {`${values[0].name} (< ${values[0].maxAge} old)`}</div>
            </div>
            <div className='weightsContainer'>
                {values.map( (category, i) => (<WeightBox
                    value={category.maxWeight}
                    key={i}
                    onRemove={() => values = values.filter(v => v.maxWeight != category.maxWeight)}
                />))}
            </div>
            
        </div>
    );
};

export default WeightCategoriesContainer;