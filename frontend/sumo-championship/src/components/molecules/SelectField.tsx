import React, { ChangeEvent } from 'react';
import './../../styles/Molecules.css';

interface props {
  options: string[];
  name: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  value: string;
  errorMessage? : string;
  placeholder?: string;
}

const SelectField: React.FC<props> = ({
  options,
  name,
  onChange,
  value,
  errorMessage
  placeholder,
}) => {
  return (
    <div className="textField_container">
      <label htmlFor={name} className="label">
        {name}
      </label>
      <select
        name={name}
        className="selectField"
        onChange={onChange}
        value={defaultOption ?? value}
      >
        {placeholder && (
          <option value="" disabled selected>
            {placeholder}
          </option>
        )}
        {options.map((option, id) => (
          <option key={id} value={option}>
            {option}
          </option>
        ))}
      </select>
      <div className="error"> {errorMessage && `*${errorMessage}`} </div>
    </div>
  );
};

export default SelectField;
