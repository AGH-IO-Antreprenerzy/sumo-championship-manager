import React, { ChangeEvent} from 'react';
import "./../../styles/Molecules.css"
interface props{
    label: string
    value: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    errorMessage?: string,
    type?: "text" | "password"
}

const TextField: React.FC<props> = ({label, value, onChange, errorMessage, type}) => {
    return (
        <div className='textField_container'>
            <label htmlFor={`input_${label}`} className='label'> {label} </label>
            <input type={type ?? "text"} 
                    name={`input_${label}`} 
                    value={value} 
                    onChange={onChange} 
                    className='input' 
                    placeholder={label}
                    />
            <div className='error'> {errorMessage && `*${errorMessage}`} </div>
        </div>
    );
};

export default TextField;