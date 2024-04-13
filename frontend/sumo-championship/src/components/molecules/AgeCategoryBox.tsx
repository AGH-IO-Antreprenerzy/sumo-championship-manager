import React from 'react';
import WeightCategoryBox from '../Atoms/WeightBox';
import './../../styles/Molecules.css';
import { ChoosableAgeCategory } from '../../types/Category';

interface props{
    ageCategory: ChoosableAgeCategory
    toggleWeightCategory: (name: string, id: number, value: boolean) => void
    onCheckboxToggle: (name: string, value: boolean) => void
}

const WeightCategoriesContainer: React.FC<props> = ({ageCategory, toggleWeightCategory, onCheckboxToggle}) => {
    return (
        <div className='categories'>
            <div className='generalContainer'>
                <div> {`${ageCategory.ageName} ${ageCategory.minAge} - ${ageCategory.maxAge} y old`}</div>
                <input type='checkbox' onChange={(e) => onCheckboxToggle(ageCategory.ageName, e.target.checked)}/>
            </div>
            <div className='weightsContainer'>
                {ageCategory.categories.map( (category, i) => (<WeightCategoryBox
                    value={category}
                    key={i}
                    onClick={() => toggleWeightCategory(ageCategory.ageName, category.id, !category.isChoosen)}
                />))}
            </div>
            
        </div>
    );
};

export default WeightCategoriesContainer;