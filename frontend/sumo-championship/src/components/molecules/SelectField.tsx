import React, { ChangeEvent } from 'react';
import './../../styles/Molecules.css';

interface props {
  options: string[];
  name: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  value: string;
  errorMessage? : string;
}

const SelectField: React.FC<props> = ({
  options,
  name,
  onChange,
  value,
  errorMessage
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
        value={value}
      >
        <option disabled value="">{`Select ${name}`}</option>
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
