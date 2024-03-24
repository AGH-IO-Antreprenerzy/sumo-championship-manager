import React, { ChangeEvent } from 'react';
import './../../styles/Molecules.css';

interface props{
    options: string[]
    name: string,
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

const SelectField: React.FC<props> = ({options, name, onChange}) => {
    return (
        <select name={name} className='selectField' onChange={onChange}>
            {options.map((option, id) => (<option key={id} value={option}>
                {option}
            </option>))}
        </select>
    );
};


export default SelectField;