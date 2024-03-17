import React from 'react';
import "./../../styles/Atoms.css"
interface props{
    label: string
}
const Submit: React.FC<props> = ({label}) => {
    return (
        <input type='submit' className='submit' value={label}/>
    );
};

export default Submit;