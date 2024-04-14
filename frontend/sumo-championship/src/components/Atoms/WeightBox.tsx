import React from 'react';
import './../../styles/Atoms.css';
import IconButton from './IconButton';
import { ChoosableWeightCategory } from '../../types/Category';

interface props{
    value: ChoosableWeightCategory,
    onClick: () => void
}

const WeightCategoryBox: React.FC<props> = ({value, onClick}) => {
    return (
        <div className='weightBox' style={{backgroundColor: value.isChoosen ? "#f37316" : "#a3a3a3"}}>
            <div> {`< ${value.maxWeight} kg`}</div>
            <IconButton name={value.isChoosen ? 'FaCross' : 'FaPlus'} size={16} onClick={onClick}/>
        </div>
    );
};

export default WeightCategoryBox;